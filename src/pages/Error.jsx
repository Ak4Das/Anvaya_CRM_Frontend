export default function Error() {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center gap-3 bg-dark text-light"
      style={{ width: "100vw", height: "100vh" }}
    >
      <h1>Something Went Wrong!</h1>
      <button
        className="btn btn-lg btn-secondary"
        onClick={() => window.location.reload()}
      >
        Retry
      </button>
    </div>
  )
}
