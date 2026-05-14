import tableStyles from "../style_modules/component_modules/Table.module.css"

export default function TableShimmer() {
  return (
    <div
      className={`d-flex justify-content-center align-items-center fs-3 ${tableStyles.table_wrapper}`}
      style={{ backgroundColor: "#1F2A40" }}
    >
      Loading...
    </div>
  )
}
