import styles from "../style_modules/page_modules/App.module.css"

export default function AppShimmer() {
  return (
    <div
      className={`d-flex justify-content-center align-items-center fs-3 ${styles.agent_performance_table}`}
    >
      Loading...
    </div>
  )
}
