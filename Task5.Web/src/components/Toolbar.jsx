import { LOCALES, LIKES_MAX, LIKES_MIN } from "../shared/config/constants.js";

function randomSeed64() {
  const a = BigInt(Date.now());
  const b = BigInt(Math.floor(Math.random() * 1_000_000_000));
  return String((a << 20n) ^ b);
}

export default function Toolbar({
  locale,
  onLocaleChange,
  seed,
  onSeedChange,
  likesAvg,
  onLikesAvgChange,
  view,
  onViewChange,
}) {
  return (
    <section className="toolbar">
      <div className="toolbar__row">
        <label className="field">
          <span className="field__label">Language</span>
          <select
            value={locale}
            onChange={(e) => onLocaleChange(e.target.value)}
          >
            {LOCALES.map((x) => (
              <option key={x.value} value={x.value}>
                {x.label}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field__label">Seed (64-bit)</span>
          <input
            value={seed}
            onChange={(e) => onSeedChange(e.target.value)}
            placeholder="Enter seed"
          />
        </label>

        <button
          type="button"
          className="btn"
          onClick={() => onSeedChange(randomSeed64())}
        >
          Random seed
        </button>

        <label className="field">
          <span className="field__label">
            Likes avg ({LIKES_MIN}–{LIKES_MAX})
          </span>
          <input
            type="number"
            min={LIKES_MIN}
            max={LIKES_MAX}
            step={0.1}
            value={likesAvg}
            onChange={(e) => onLikesAvgChange(e.target.value)}
          />
        </label>

        <div className="spacer" />

        <div className="segmented">
          <button
            type="button"
            className={`segmented__btn ${view === "table" ? "is-active" : ""}`}
            onClick={() => onViewChange("table")}
          >
            Table
          </button>
          <button
            type="button"
            className={`segmented__btn ${view === "gallery" ? "is-active" : ""}`}
            onClick={() => onViewChange("gallery")}
          >
            Gallery
          </button>
        </div>
      </div>
    </section>
  );
}
