import tableStyles from "../style_modules/component_modules/Table.module.css"

export default function TableShimmer(prop) {
  const { loading, isError, fetchData, setLoading, setIsError } = prop
  return (
    <div
      className={`d-flex justify-content-center align-items-center fs-3 ${tableStyles.table_wrapper}`}
      style={{ backgroundColor: "#1F2A40" }}
    >
      {loading && "Loading..."}
      {isError && !loading && (
        <div className="text-center">
          <h3>Something went wrong!</h3>
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
