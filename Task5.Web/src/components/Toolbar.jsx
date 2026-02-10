function randomSeed64() {
  const a = BigInt(Date.now());
  const b = BigInt(Math.floor(Math.random() * 1_000_000_000));
  return String((a << 20n) ^ b);
}

export default function Toolbar({
  locales,
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
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        flexWrap: "wrap",
        padding: 12,
        border: "1px solid #ddd",
        borderRadius: 12,
      }}
    >
      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span>Language</span>
        <select value={locale} onChange={(e) => onLocaleChange(e.target.value)}>
          {locales.map((x) => (
            <option key={x.value} value={x.value}>
              {x.label}
            </option>
          ))}
        </select>
      </label>

      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span>Seed (64-bit)</span>
        <input
          value={seed}
          onChange={(e) => onSeedChange(e.target.value)}
          style={{ width: 260 }}
          inputMode="numeric"
        />
      </label>

      <button type="button" onClick={() => onSeedChange(randomSeed64())}>
        Random seed
      </button>

      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span>Likes avg (0–10)</span>
        <input
          type="number"
          min={0}
          max={10}
          step={0.1}
          value={likesAvg}
          onChange={(e) => onLikesAvgChange(Number(e.target.value))}
          style={{ width: 90 }}
        />
      </label>

      <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
        <button
          type="button"
          onClick={() => onViewChange("table")}
          style={{ fontWeight: view === "table" ? "700" : "400" }}
        >
          Table
        </button>
        <button
          type="button"
          onClick={() => onViewChange("gallery")}
          style={{ fontWeight: view === "gallery" ? "700" : "400" }}
        >
          Gallery
        </button>
      </div>
    </div>
  );
}
