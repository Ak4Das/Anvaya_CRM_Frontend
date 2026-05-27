import React from "react"
import styles from "../style_modules/component_modules/CompressedSideBar.module.css"
import { Link } from "react-router-dom"

export default function CompressedSideBar(prop) {
  const { closeMenu, setCloseMenu } = prop
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
          <Link className="text-decoration-none" to="/" state={closeMenu}>
            <i
              className={`bi bi-house-door ${styles.dashboard_icon}`}
              title="Dashboard"
            ></i>
          </Link>
        </div>
        <div className={`${styles.sidebar_items_category}`}>
          <h6>Data</h6>
          <Link className="text-decoration-none" to="/team" state={closeMenu}>
            <i
              className={`bi bi-microsoft-teams ${styles.icon}`}
              title="Team"
            ></i>
          </Link>
          <Link
            className="text-decoration-none"
            to="/teamContact"
            state={closeMenu}
          >
            <i
              className={`bi bi-person-rolodex ${styles.icon}`}
              title="Team Contact Info"
            ></i>
          </Link>
          <Link className="text-decoration-none" to="/sales" state={closeMenu}>
            <i
              className={`bi bi-currency-dollar ${styles.icon}`}
              title="Sales"
            ></i>
          </Link>
          <Link className="text-decoration-none" to="/leads" state={closeMenu}>
            <i className={`bi bi-people-fill ${styles.icon}`} title="Leads"></i>
          </Link>
        </div>
        <div className={`${styles.sidebar_items_category}`}>
          <h6>Pages</h6>
          <Link className="text-decoration-none" to="/report" state={closeMenu}>
            <i
              className={`bi bi-file-earmark-fill ${styles.icon}`}
              title="Reports"
            ></i>
          </Link>
          <i className={`bi bi-calendar ${styles.icon}`} title="Calender"></i>
        </div>
        <div className={`${styles.sidebar_items_category}`}>
          <h6>Charts</h6>
          <Link
            className="text-decoration-none"
            to="/barChart"
            state={closeMenu}
          >
            <i
              className={`bi bi-bar-chart-line-fill ${styles.icon}`}
              title="Bar Chart"
            ></i>
          </Link>
          <Link
            className="text-decoration-none"
            to="/pieChart"
            state={closeMenu}
          >
            <i
              className={`bi bi-pie-chart-fill ${styles.icon}`}
              title="Pie Chart"
            ></i>
          </Link>
          <Link
            className="text-decoration-none"
            to="/lineChart"
            state={closeMenu}
          >
            <i
              className={`bi bi-graph-up-arrow ${styles.icon}`}
              title="Line Chart"
            ></i>
          </Link>
        </div>
        <div className={`${styles.sidebar_items_category}`}>
          <h6>Settings</h6>
          <Link
            className="text-decoration-none"
            to="/settings"
            state={closeMenu}
          >
            <i className={`bi bi-gear ${styles.icon}`} title="Setting"></i>
          </Link>
        </div>
      </div>
    </div>
  )
}
