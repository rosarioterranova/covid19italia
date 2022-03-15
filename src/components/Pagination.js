import style from "./Pagination.module.css";

export default function Pagination({
  onPrevPage,
  onNextPage,
  prevEnabled,
  nextEnabled,
  pageIndex,
  totalPages,
}) {
  return (
    <div className={style.pagination}>
      <button
        className="btn btn-primary"
        onClick={onPrevPage}
        disabled={!prevEnabled}
      >
        {"<"} Pagina Precedente
      </button>
      <p className={style.info}>
        Pagina {pageIndex} di {totalPages}
      </p>
      <button
        className="btn btn-primary"
        onClick={onNextPage}
        disabled={!nextEnabled}
      >
        Pagina Successiva {">"}
      </button>
    </div>
  );
}
