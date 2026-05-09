import React from "react"
import styles from "../style_modules/component_modules/CompressedSideBar.module.css"
import { Link } from "react-router-dom"

export default function CompressedSideBar(prop) {
  const { setCloseMenu } = prop
  return (
    <div className={`${styles.sidebar_wrapper}`}>
      <div
        className={`${styles.sidebar_menu_btn}`}
        onClick={() => setCloseMenu(false)}
      >
        <i className={`bi bi-list ${styles.icon}`} title="menu"></i>
      </div>
      <div className={`${styles.sidebar_container}`}>
        <div className={`${styles.sidebar_items_category}`}>
          <Link className="text-decoration-none" to="/">
            <i
              className={`bi bi-house-door ${styles.dashboard_icon}`}
              title="Dashboard"
            ></i>
          </Link>
        </div>
        <div className={`${styles.sidebar_items_category}`}>
          <h6>Data</h6>
          <Link className="text-decoration-none" to="/team">
            <i
              className={`bi bi-microsoft-teams ${styles.icon}`}
              title="Team"
            ></i>
          </Link>
          <Link className="text-decoration-none" to="/teamContact">
            <i
              className={`bi bi-person-rolodex ${styles.icon}`}
              title="Team Contact Info"
            ></i>
          </Link>
          <Link className="text-decoration-none" to="/sales">
            <i
              className={`bi bi-currency-dollar ${styles.icon}`}
              title="Sales"
            ></i>
          </Link>
        </div>
        <div className={`${styles.sidebar_items_category}`}>
          <h6>Pages</h6>
          <Link className="text-decoration-none" to="/leads">
            <i className={`bi bi-people-fill ${styles.icon}`} title="Leads"></i>
          </Link>
          <Link className="text-decoration-none" to="/report">
            <i
              className={`bi bi-file-earmark-fill ${styles.icon}`}
              title="Reports"
            ></i>
          </Link>
          <i className={`bi bi-calendar ${styles.icon}`} title="Calender"></i>
        </div>
        <div className={`${styles.sidebar_items_category}`}>
          <h6>Charts</h6>
          <i
            className={`bi bi-bar-chart-line-fill ${styles.icon}`}
            title="Bar Chart"
          ></i>
          <i
            className={`bi bi-pie-chart-fill ${styles.icon}`}
            title="Pie Chart"
          ></i>
          <i
            className={`bi bi-graph-up-arrow ${styles.icon}`}
            title="Line Chart"
          ></i>
        </div>
        <div className={`${styles.sidebar_items_category}`}>
          <h6>Settings</h6>
          <i className={`bi bi-gear ${styles.icon}`} title="Setting"></i>
        </div>
      </div>
    </div>
  )
}
