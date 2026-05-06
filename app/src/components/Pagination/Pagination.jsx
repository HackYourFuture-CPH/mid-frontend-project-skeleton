
import styles from "./Pagination.module.css";

const Pagination = ({ page, setPage , totalPages}) =>  {
  return (
    <div className={styles.pagination}>
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
      >
        Prev
      </button>

      <span>Page {page}</span>

      <button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
}

export default Pagination;