import type { SongDto } from "../types";
import { useMusicStore } from "../store/musicStore";
import SongDetailsModal from "./SongDetailsModal";

type Props = {
  songs: SongDto[];
  loading: boolean;
  page: number;
  onPageChange: (p: number) => void;
};

export default function TableView({
  songs,
  loading,
  page,
  onPageChange,
}: Props) {
  const expandedIndex = useMusicStore((s) => s.expandedIndex);
  const toggleExpanded = useMusicStore((s) => s.toggleExpanded);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="hidden md:grid md:grid-cols-[42px_70px_2fr_2fr_1.3fr_1fr] md:items-center md:border-b md:border-slate-200 md:bg-slate-50 md:font-bold">
        <div className="px-3 py-4"></div>
        <div className="px-3 py-4 tabular-nums">#</div>
        <div className="px-3 py-4">Song</div>
        <div className="px-3 py-4">Artist</div>
        <div className="px-3 py-4">Album</div>
        <div className="px-3 py-4">Genre</div>
      </div>

      {loading && songs.length === 0 ? (
        <div className="px-4 py-4 text-slate-500">Loading…</div>
      ) : null}

      {songs.map((s) => {
        const expanded = expandedIndex === s.index;

        return (
          <div key={s.index} className={expanded ? "bg-blue-50/50" : ""}>
            <div
              className="md:hidden border-b border-slate-200 p-3 cursor-pointer hover:bg-slate-50"
              onClick={() => toggleExpanded(s.index)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 text-slate-500 select-none">
                  {expanded ? "▴" : "▾"}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-500">
                      #{s.index}
                    </span>
                    <div className="truncate font-extrabold">{s.title}</div>
                  </div>

                  <div className="mt-1 truncate text-sm text-slate-600">
                    {s.artist}
                  </div>

                  <div className="mt-1 truncate text-xs text-slate-500">
                    {s.album} • {s.genre} • {s.likes} 👍
                  </div>
                </div>
              </div>
            </div>

            <div
              className="hidden md:grid md:grid-cols-[42px_70px_2fr_2fr_1.3fr_1fr] md:items-center md:border-b md:border-slate-200 md:cursor-pointer md:hover:bg-slate-50"
              onClick={() => toggleExpanded(s.index)}
            >
              <div className="h-full w-[42px] flex items-center justify-center text-slate-500 select-none">
                {expanded ? "▴" : "▾"}
              </div>

              <div className="px-3 py-3 tabular-nums">{s.index}</div>
              <div className="px-3 py-3">{s.title}</div>
              <div className="px-3 py-3">{s.artist}</div>
              <div className="px-3 py-3 text-slate-500">{s.album}</div>
              <div className="px-3 py-3">{s.genre}</div>
            </div>

            {expanded ? (
              <div className="border-b border-slate-200 px-3 py-3 sm:px-4 sm:py-4">
                <SongDetailsModal index={s.index} />
              </div>
            ) : null}
          </div>
        );
      })}

      <div className="flex flex-wrap items-center justify-center gap-2 p-3 sm:p-4">
        <button
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 disabled:opacity-50"
          disabled={page === 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          ‹
        </button>

        {[1, 2, 3].map((p) => (
          <button
            key={p}
            className={`h-10 w-10 rounded-lg border border-slate-200 ${
              page === p ? "border-blue-600 bg-blue-600 text-white" : "bg-white"
            }`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}

        <button
          className="h-10 rounded-lg border border-slate-200 bg-white px-3"
          onClick={() => onPageChange(page + 1)}
        >
          ›
        </button>
      </div>
    </div>
  );
}
