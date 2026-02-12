import { useMusicStore } from "../store/musicStore";
import ViewToggle from "./ViewToggle";

export default function Toolbar() {
  const locale = useMusicStore((s) => s.locale);
  const seed = useMusicStore((s) => s.seed);
  const likesAvg = useMusicStore((s) => s.likesAvg);

  const setLocale = useMusicStore((s) => s.setLocale);
  const setSeed = useMusicStore((s) => s.setSeed);
  const randomSeed = useMusicStore((s) => s.randomSeed);
  const setLikesAvg = useMusicStore((s) => s.setLikesAvg);

  return (
    <div className="mx-auto max-w-6xl px-3 py-3 sm:px-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-end">
          <label className="flex flex-col gap-1">
            <span className="text-xs text-slate-500">Language</span>
            <select
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none sm:w-44"
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
            >
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="ru">Русский</option>
              <option value="uk">Українська</option>
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs text-slate-500">Seed</span>
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <input
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none sm:w-44"
                type="number"
                value={seed}
                onChange={(e) => setSeed(Number(e.target.value))}
              />
              <button
                className="h-10 flex-none rounded-lg border border-slate-200 bg-white px-3 hover:bg-slate-50"
                onClick={randomSeed}
                title="Random seed"
              >
                🔀
              </button>
            </div>
          </label>

          <label className="flex flex-col gap-1 sm:col-span-2 lg:w-[360px]">
            <span className="text-xs text-slate-500">Likes</span>
            <div className="flex items-center gap-3">
              <input
                className="w-full"
                type="range"
                min={0}
                max={10}
                step={0.1}
                value={likesAvg}
                onChange={(e) => setLikesAvg(Number(e.target.value))}
              />
              <div className="w-12 text-right text-sm text-slate-500 tabular-nums">
                {likesAvg.toFixed(1)}
              </div>
            </div>
          </label>
        </div>

        <div className="flex justify-start lg:justify-end">
          <ViewToggle />
        </div>
      </div>
    </div>
  );
}
