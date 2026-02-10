import { useMemo, useState } from "react";
import Toolbar from "../components/Toolbar";
import TableView from "./components/TableView";
import GalleryView from "./components/GalleryView";

const LOCALES = [
  { value: "en-US", label: "English (USA)" },
  { value: "de-DE", label: "German (Germany)" },
];

export default function App() {
  const [locale, setLocale] = useState("en-US");
  const [seed, setSeed] = useState(() => String(BigInt(Date.now())));
  const [likesAvg, setLikesAvg] = useState(3.7);
  const [view, setView] = useState("table");

  const generationKey = useMemo(
    () => `${locale}|${seed}|${likesAvg}`,
    [locale, seed, likesAvg],
  );

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 16 }}>
      <h1 style={{ margin: "8px 0 16px" }}>Music Store Showcase</h1>

      <Toolbar
        locales={LOCALES}
        locale={locale}
        onLocaleChange={setLocale}
        seed={seed}
        onSeedChange={setSeed}
        likesAvg={likesAvg}
        onLikesAvgChange={setLikesAvg}
        view={view}
        onViewChange={setView}
      />

      <div style={{ marginTop: 16 }}>
        {view === "table" ? (
          <TableView
            locale={locale}
            seed={seed}
            likesAvg={likesAvg}
            generationKey={generationKey}
          />
        ) : (
          <GalleryView
            locale={locale}
            seed={seed}
            likesAvg={likesAvg}
            generationKey={generationKey}
          />
        )}
      </div>
    </div>
  );
}
