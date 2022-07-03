import style from "./Pagination.module.css";
import arrowLeft from "../imgs/arrow-left.svg";
import arrowRight from "../imgs/arrow-right.svg";

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
        className="btn btn-dark"
        onClick={onPrevPage}
        disabled={!prevEnabled}
      >
        <img src={arrowLeft} alt="arrow left" />
      </button>
      <p className={style.info}>
        Pagina {pageIndex} di {totalPages}
      </p>
      <button
        className="btn btn-dark"
        onClick={onNextPage}
        disabled={!nextEnabled}
      >
        <img src={arrowRight} alt="arrow right" />
      </button>
    </div>
  );
}
