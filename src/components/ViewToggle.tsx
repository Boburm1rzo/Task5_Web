import { useMusicStore } from "../store/musicStore";

export default function ViewToggle() {
  const view = useMusicStore((s) => s.view);
  const setView = useMusicStore((s) => s.setView);

  return (
    <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <button
        className={`h-10 w-12 text-lg ${view === "table" ? "bg-blue-600 text-white" : "text-slate-700"}`}
        onClick={() => setView("table")}
        title="Table view"
      >
        ▦
      </button>
      <button
        className={`h-10 w-12 text-lg ${view === "gallery" ? "bg-blue-600 text-white" : "text-slate-700"}`}
        onClick={() => setView("gallery")}
        title="Gallery view"
      >
        ▤
      </button>
    </div>
  );
}
