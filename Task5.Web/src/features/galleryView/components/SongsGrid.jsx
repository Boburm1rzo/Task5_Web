import Spinner from "../../../shared/ui/Spinner.jsx";
import ErrorBanner from "../../../shared/ui/ErrorBanner.jsx";
import useInfiniteGallery from "../model/useInfiniteGallery.jsx";
import SongCard from "./SongCard.jsx";

export default function SongsGrid({ locale, seed, likesAvg, generationKey }) {
  const { query, items, topRef, sentinelRef } = useInfiniteGallery({
    locale,
    seed,
    likesAvg,
    generationKey,
  });

  if (query.isLoading) return <Spinner label="Loading gallery…" />;
  if (query.isError) return <ErrorBanner error={query.error} />;

  return (
    <section>
      <div ref={topRef} />

      <div className="grid">
        {items.map((x) => (
          <SongCard key={x.index} item={x} />
        ))}
      </div>

      <div ref={sentinelRef} style={{ height: 1 }} />

      <div className="muted" style={{ marginTop: 12 }}>
        {query.isFetchingNextPage
          ? "Loading more…"
          : query.hasNextPage
            ? "Scroll to load more…"
            : "End."}
      </div>
    </section>
  );
}
