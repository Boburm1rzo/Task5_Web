import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getSongs } from "../services/api";
import type { SongDto } from "../types";
import { useMusicStore } from "../store/musicStore";
import SongCard from "./SongCard";
import SongDetailsModal from "./SongDetailsModal";

export default function GalleryView() {
  const locale = useMusicStore((s) => s.locale);
  const seed = useMusicStore((s) => s.seed);
  const likesAvg = useMusicStore((s) => s.likesAvg);
  const pageSize = useMusicStore((s) => s.pageSize);

  const [items, setItems] = useState<SongDto[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const [loadingFirst, setLoadingFirst] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pageRef = useRef(1);

  useEffect(() => {
    pageRef.current = 1;
    setItems([]);
    setHasMore(true);
    setOpenIndex(null);
    setError(null);
  }, [locale, seed, likesAvg, pageSize]);

  async function loadMore() {
    if (!hasMore) return;

    const nextPage = pageRef.current;

    try {
      setError(null);

      const data = await getSongs({
        locale,
        seed,
        likesAvg,
        page: nextPage,
        pageSize,
      });

      const songs = data.songs ?? [];
      if (songs.length === 0) {
        setHasMore(false);
        return;
      }

      setItems((prev) => [...prev, ...songs]);
      pageRef.current = nextPage + 1;
    } catch (e: any) {
      setError(e?.message ?? "Failed to load songs");
      setHasMore(false);
    } finally {
      setLoadingFirst(false);
    }
  }

  useEffect(() => {
    if (items.length === 0 && hasMore) {
      setLoadingFirst(true);
      loadMore();
    }
  }, [locale, seed, likesAvg, pageSize]);

  if (error && items.length === 0) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
        {error}
      </div>
    );
  }

  const columns = "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="space-y-3">
      {loadingFirst && items.length === 0 ? (
        <div className="py-4 text-center text-slate-500">Loading data…</div>
      ) : null}

      <InfiniteScroll
        dataLength={items.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="py-4 text-center text-slate-500">Loading more…</div>
        }
        endMessage={
          <div className="py-4 text-center text-slate-400">No more songs.</div>
        }
      >
        <div className={columns}>
          {items.map((s) => {
            const expanded = openIndex === s.index;

            return (
              <div key={`${locale}-${seed}-${s.index}`} className="contents">
                <div>
                  <SongCard
                    song={s}
                    onOpen={(i) =>
                      setOpenIndex((prev) => (prev === i ? null : i))
                    }
                  />
                </div>

                {expanded ? (
                  <div className="col-span-full">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
                      <SongDetailsModal index={s.index} />
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
