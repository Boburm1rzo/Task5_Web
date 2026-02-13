import { useEffect, useMemo, useState } from "react";
import { getLyrics, getSongDetails } from "../services/api";
import { useMusicStore } from "../store/musicStore";
import AudioPlayer from "./AudioPlayer";
import { toApiAbsoluteUrl } from "../utils/url";

type Props = { index: number };

export default function SongDetailsModal({ index }: Props) {
  const locale = useMusicStore((s) => s.locale);
  const seed = useMusicStore((s) => s.seed);
  const likesAvg = useMusicStore((s) => s.likesAvg);

  const [loading, setLoading] = useState(true);
  const [detailsErr, setDetailsErr] = useState<string | null>(null);
  const [lyricsErr, setLyricsErr] = useState<string | null>(null);

  const [details, setDetails] = useState<any>(null);
  const [lyrics, setLyrics] = useState<any>(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      setDetailsErr(null);
      setLyricsErr(null);
      setDetails(null);
      setLyrics(null);

      try {
        const d = await getSongDetails({ index, locale, seed, likesAvg });
        if (!alive) return;
        setDetails(d);

        try {
          const l = await getLyrics({ index, locale, seed });
          if (!alive) return;
          setLyrics(l);
        } catch (e: any) {
          if (!alive) return;
          setLyricsErr(e?.message ?? "Lyrics error");
        }
      } catch (e: any) {
        if (!alive) return;
        setDetailsErr(e?.message ?? "Details error");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [index, locale, seed, likesAvg]);

  const duration = useMemo(
    () => formatDur(details?.durationSeconds ?? 0),
    [details?.durationSeconds],
  );

  if (loading) return <div className="text-slate-500">Loading details…</div>;
  if (detailsErr)
    return <div className="text-red-600">Failed: {detailsErr}</div>;
  if (!details) return null;

  const coverBase = toApiAbsoluteUrl(details.coverUrl ?? "");
  const coverSrc =
    coverBase.length > 0
      ? coverBase.includes("?")
        ? `${coverBase}&size=256`
        : `${coverBase}?size=256`
      : "";

  const previewSrc = toApiAbsoluteUrl(details.previewUrl ?? "");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
      <div className="grid gap-4 lg:grid-cols-[170px_1.6fr_1.2fr]">
        <div className="flex items-start gap-4 lg:block">
          <img
            className="h-[120px] w-[120px] flex-none rounded-2xl border border-slate-200 object-cover sm:h-[170px] sm:w-[170px]"
            src={coverSrc}
            alt={`${details.title} cover`}
            loading="lazy"
            decoding="async"
            width={170}
            height={170}
          />

          <div className="flex flex-wrap gap-2 lg:mt-2">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs">
              {details.likes} 👍
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs">
              {details.releaseYear}
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs">
              {duration}
            </span>
          </div>
        </div>

        <div className="min-w-0">
          <div className="text-xl font-extrabold leading-tight sm:text-2xl">
            {details.title}
          </div>

          <div className="mt-1 text-sm text-slate-500">
            from <b>{details.album}</b> by <b>{details.artist}</b>
          </div>

          <div className="mt-3">
            <AudioPlayer src={previewSrc} />
          </div>

          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800">
            {details.review}
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-center justify-between">
            <div className="font-extrabold">Lyrics</div>
            <div className="text-xs text-slate-400">
              {locale} • seed {seed}
            </div>
          </div>

          <div className="mt-2 max-h-[260px] overflow-auto rounded-xl border border-slate-200 bg-white p-3 lg:h-[170px]">
            {lyricsErr ? <div className="text-red-600">{lyricsErr}</div> : null}

            {!lyrics?.lines?.length ? (
              <div className="text-slate-500">No lyrics.</div>
            ) : (
              lyrics.lines.map((l: any, i: number) => (
                <div
                  key={`${index}-${locale}-${seed}-${i}`}
                  className="py-1 text-sm"
                >
                  {l.text}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDur(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
