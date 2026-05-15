import styles from "../style_modules/page_modules/App.module.css"

export default function AppShimmer(prop) {
  const { loading, isError, fetchData, setLoading, setIsError } = prop
  return (
    <div
      className={`d-flex justify-content-center align-items-center fs-3 ${styles.agent_performance_table}`}
    >
      {loading && "Loading..."}
      {isError && !loading && (
        <div className="text-center">
          <h5>Something Went Wrong!</h5>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setIsError("")
              fetchData(setLoading, setIsError)
            }}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  )
}
