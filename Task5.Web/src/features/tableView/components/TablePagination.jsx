export default function TablePagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="pagination">
      <button className="btn" disabled={page <= 1} onClick={onPrev}>
        Prev
      </button>
      <div className="pagination__text">
        Page <b>{page}</b> / {totalPages}
      </div>
      <button className="btn" disabled={page >= totalPages} onClick={onNext}>
        Next
      </button>
    </div>
  );
}
