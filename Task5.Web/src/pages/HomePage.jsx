import { useMemo } from "react";
import Toolbar from "../components/Toolbar.jsx";
import useGenerationState from "../features/generation/model/useGenerationState.js";
import SongsTable from "../features/tableView/components/SongsTable.jsx";
import SongsGrid from "../features/galleryView/components/SongsGrid.jsx";

export default function HomePage() {
  const gen = useGenerationState();

  const generationKey = useMemo(
    () => `${gen.locale}|${gen.seed}|${gen.likesAvg}`,
    [gen.locale, gen.seed, gen.likesAvg],
  );

  return (
    <div className="container">
      <header className="header">
        <h1>Music Store</h1>
        <p className="muted">
          Table = pagination, Gallery = infinite scroll. Parametr o‘zgarsa
          hammasi reset bo‘ladi.
        </p>
      </header>

      <Toolbar
        locale={gen.locale}
        onLocaleChange={gen.setLocale}
        seed={gen.seed}
        onSeedChange={gen.setSeed}
        likesAvg={gen.likesAvg}
        onLikesAvgChange={gen.setLikesAvg}
        view={gen.view}
        onViewChange={gen.setView}
      />

      <main className="main">
        {gen.view === "table" ? (
          <SongsTable
            locale={gen.locale}
            seed={gen.seed}
            likesAvg={gen.likesAvg}
            generationKey={generationKey}
          />
        ) : (
          <SongsGrid
            locale={gen.locale}
            seed={gen.seed}
            likesAvg={gen.likesAvg}
            generationKey={generationKey}
          />
        )}
      </main>
    </div>
  );
}
