import { useQuery } from "@tanstack/react-query";
import { fetchSongs } from "../../../shared/api/songs.api.js";
import { TABLE_PAGE_SIZE } from "../../../shared/config/constants.js";
import Spinner from "../../../shared/ui/Spinner.jsx";
import ErrorBanner from "../../../shared/ui/ErrorBanner.jsx";
import useTableController from "../model/useTableController.js";
import SongDetails from "../../songs/components/SongDetails.jsx";
import TablePagination from "./TablePagination.jsx";

export default function SongsTable({ locale, seed, likesAvg, generationKey }) {
  const { page, setPage, expandedIndex, toggleExpanded } =
    useTableController(generationKey);

  const query = useQuery({
    queryKey: ["songs", "table", locale, seed, likesAvg, page],
    queryFn: () =>
      fetchSongs({
        locale,
        seed,
        likesAvg,
        page,
        pageSize: TABLE_PAGE_SIZE,
      }),
    keepPreviousData: true,
  });

  if (query.isLoading) return <Spinner label="Loading table…" />;
  if (query.isError) return <ErrorBanner error={query.error} />;

  const total = query.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / TABLE_PAGE_SIZE));
  const items = query.data?.items ?? [];

  return (
    <section className="card">
      <TablePagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
      />

      <div className="tableWrap">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Genre</th>
              <th>Likes</th>
            </tr>
          </thead>

          <tbody>
            {items.map((x) => {
              const open = expandedIndex === x.index;
              return (
                <>
                  <tr
                    key={x.index}
                    className="tableRow"
                    onClick={() => toggleExpanded(x.index)}
                    title="Click to expand"
                  >
                    <td>{x.index}</td>
                    <td className="mono">{x.title}</td>
                    <td>{x.artist}</td>
                    <td>{x.album}</td>
                    <td>{x.genre}</td>
                    <td>❤️ {x.likes}</td>
                  </tr>

                  {open && (
                    <tr key={`${x.index}-details`}>
                      <td colSpan={6} className="expandCell">
                        <SongDetails item={x} />
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
