import type { SongDto } from "../types";

type Props = {
  song: SongDto;
  onOpen: (index: number) => void;
};

function withCoverSize(url: string, size: number) {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}size=${size}`;
}

export default function SongCard({ song, onOpen }: Props) {
  const coverSrc = withCoverSize(song.coverUrl, 128);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        className="flex w-full gap-3 p-3 text-left"
        onClick={() => onOpen(song.index)}
      >
        <img
          className="h-16 w-16 rounded-2xl border border-slate-200 object-cover"
          src={coverSrc}
          alt={`${song.title} cover`}
          loading="lazy"
          decoding="async"
          width={64}
          height={64}
        />

        <div className="min-w-0">
          <div className="truncate font-extrabold">
            <div className="mt-1 truncate text-sm text-slate-500">
              <span className="mr-2 rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-500">
                #{song.index}
              </span>
              {song.title}
            </div>
          </div>

          <div className="mt-1 truncate text-sm text-slate-500">
            <div className="mt-1 truncate text-sm text-slate-500">
              {song.artist}
            </div>
          </div>

          <div className="mt-1 truncate text-xs text-slate-500">
            {song.album} • {song.genre} • {song.likes} 👍
          </div>
        </div>
      </button>
    </div>
  );
}
