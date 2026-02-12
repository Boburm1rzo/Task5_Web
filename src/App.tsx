import { useEffect, useState } from "react";
import Toolbar from "./components/Toolbar";
import TableView from "./components/TableView";
import GalleryView from "./components/GalleryView";
import { useMusicStore } from "./store/musicStore";
import { getSongs } from "./services/api";
import type { SongDto } from "./types";

export default function App() {
  const view = useMusicStore((s) => s.view);

  const locale = useMusicStore((s) => s.locale);
  const seed = useMusicStore((s) => s.seed);
  const likesAvg = useMusicStore((s) => s.likesAvg);

  const page = useMusicStore((s) => s.page);
  const pageSize = useMusicStore((s) => s.pageSize);
  const setPage = useMusicStore((s) => s.setPage);

  const [songs, setSongs] = useState<SongDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (view !== "table") return;

    let alive = true;

    async function load() {
      setLoading(true);
      setErr(null);

      try {
        const data = await getSongs({ locale, seed, likesAvg, page, pageSize });
        if (!alive) return;
        setSongs(data.songs);
      } catch (e: any) {
        if (!alive) return;
        setErr(e?.message ?? "Error");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [view, locale, seed, likesAvg, page, pageSize]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <Toolbar />
      </header>

      <main className="mx-auto max-w-6xl px-3 py-4 sm:px-5">
        {err ? (
          <div className="mb-4 rounded-xl border border-red-200 bg-white p-4 text-red-700">
            API error: {err}
          </div>
        ) : null}

        {view === "table" ? (
          <TableView
            songs={songs}
            loading={loading}
            page={page}
            onPageChange={setPage}
          />
        ) : (
          <GalleryView />
        )}
      </main>
    </div>
  );
}
