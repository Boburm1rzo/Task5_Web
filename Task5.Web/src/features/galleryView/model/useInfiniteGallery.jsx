import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSongs } from "../../../shared/api/songs.api.js";
import { GALLERY_PAGE_SIZE } from "../../../shared/config/constants.js";

export default function useInfiniteGallery({
  locale,
  seed,
  likesAvg,
  generationKey,
}) {
  const topRef = useRef(null);
  const sentinelRef = useRef(null);

  // Parametr o‘zgarsa: scroll top
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
  }, [generationKey]);

  const query = useInfiniteQuery({
    queryKey: ["songs", "gallery", locale, seed, likesAvg],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchSongs({
        locale,
        seed,
        likesAvg,
        page: pageParam,
        pageSize: GALLERY_PAGE_SIZE,
      }),
    getNextPageParam: (lastPage) => {
      const page = lastPage?.page ?? 1;
      const total = lastPage?.total ?? 0;
      const pageSize = lastPage?.pageSize ?? GALLERY_PAGE_SIZE;
      const totalPages = Math.max(1, Math.ceil(total / pageSize));
      return page < totalPages ? page + 1 : undefined;
    },
  });

  // Infinite scroll trigger
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (
          first.isIntersecting &&
          query.hasNextPage &&
          !query.isFetchingNextPage
        ) {
          query.fetchNextPage();
        }
      },
      { rootMargin: "600px" },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [query.hasNextPage, query.isFetchingNextPage, query.fetchNextPage]);

  const items = query.data?.pages?.flatMap((p) => p.items ?? []) ?? [];

  return { query, items, topRef, sentinelRef };
}
