import styles from "../style_modules/component_modules/SideBar.module.css"
import { Link } from "react-router-dom"

export default function SideBar() {
  return (
    <>
      <div className={`${styles.sidebar}`}>
        <div className={`${styles.sidebar_inner}`}>
          <div className={`${styles.pro_sidebar_layout}`}>
            <nav className={`${styles.menu}`}>
              <ul>
                <li className={`${styles.menu_item}`}>
                  <div className={`${styles.inner_item}`}>
                    <span className={`${styles.item_content}`}>
                      <div className={`${styles.item_container}`}>
                        <h3 className={`${styles.admins}`}>ADMINS</h3>
                        <button>
                          <i className="bi bi-list"></i>
                        </button>
                      </div>
                    </span>
                  </div>
                </li>
                <div className={`${styles.admin_box}`}>
                  <div className={`${styles.admin_image_container}`}>
                    <img
                      className={`${styles.admin_image}`}
                      src="https://tse4.mm.bing.net/th/id/OIP.JKwY_NtRXVKFeDPermgvKQHaHa?pid=Api&P=0&h=180"
                      alt=""
                    />
                  </div>
                  <div className={`${styles.admin_description}`}>
                    <h2 className={`${styles.admin_name}`}>John Doe</h2>
                    <h5 className={`${styles.admin_profile}`}>
                      Marketing Manager
                    </h5>
                  </div>
                </div>
                <div className={`${styles.navigation_section}`}>
                  <Link className="text-decoration-none" to="/">
                    <li
                      className={`${styles.dashboard_section} ${styles.navigation_section_item}`}
                    >
                      <div className={`${styles.navigation_item_container}`}>
                        <span
                          className={`${styles.navigation_item_icon_wrapper}`}
                        >
                          <span
                            className={`${styles.navigation_item_icon_container}`}
                          >
                            <i
                              className={`bi bi-house-door ${styles.icon}`}
                            ></i>
                          </span>
                        </span>
                        <span
                          className={`${styles.navigation_item_content_wrapper}`}
                        >
                          <p
                            className={`mt-1 ${styles.navigation_item_content}`}
                          >
                            Dashboard
                          </p>
                        </span>
                      </div>
                    </li>
                  </Link>
                  <h6 className={`${styles.section_heading}`}>Data</h6>
                  <Link className="text-decoration-none" to="/team">
                    <li className={`${styles.navigation_section_item}`}>
                      <div className={`${styles.navigation_item_container}`}>
                        <span
                          className={`${styles.navigation_item_icon_wrapper}`}
                        >
                          <span
                            className={`${styles.navigation_item_icon_container}`}
                          >
                            <i
                              className={`bi bi-microsoft-teams ${styles.icon}`}
                            ></i>
                          </span>
                        </span>
                        <span
                          className={`${styles.navigation_item_content_wrapper}`}
                        >
                          <p className={`${styles.navigation_item_content}`}>
                            Team
                          </p>
                        </span>
                      </div>
                    </li>
                  </Link>
                  <li className={`${styles.navigation_section_item}`}>
                    <div className={`${styles.navigation_item_container}`}>
                      <span
                        className={`${styles.navigation_item_icon_wrapper}`}
                      >
                        <span
                          className={`${styles.navigation_item_icon_container}`}
                        >
                          <i
                            className={`bi bi-person-rolodex ${styles.icon}`}
                          ></i>
                        </span>
                      </span>
                      <span
                        className={`${styles.navigation_item_content_wrapper}`}
                      >
                        <p className={`${styles.navigation_item_content}`}>
                          Team Contact Info.
                        </p>
                      </span>
                    </div>
                  </li>
                  <li className={`${styles.navigation_section_item}`}>
                    <div className={`${styles.navigation_item_container}`}>
                      <span
                        className={`${styles.navigation_item_icon_wrapper}`}
                      >
                        <span
                          className={`${styles.navigation_item_icon_container}`}
                        >
                          <i
                            className={`bi bi-currency-dollar ${styles.icon}`}
                          ></i>
                        </span>
                      </span>
                      <span
                        className={`${styles.navigation_item_content_wrapper}`}
                      >
                        <p className={`${styles.navigation_item_content}`}>
                          Sales
                        </p>
                      </span>
                    </div>
                  </li>
                  <h6 className={`${styles.section_heading}`}>Pages</h6>
                  <li className={`${styles.navigation_section_item}`}>
                    <div className={`${styles.navigation_item_container}`}>
                      <span
                        className={`${styles.navigation_item_icon_wrapper}`}
                      >
                        <span
                          className={`${styles.navigation_item_icon_container}`}
                        >
                          <i className={`bi bi-people-fill ${styles.icon}`}></i>
                        </span>
                      </span>
                      <span
                        className={`${styles.navigation_item_content_wrapper}`}
                      >
                        <p className={`${styles.navigation_item_content}`}>
                          Leads
                        </p>
                      </span>
                    </div>
                  </li>
                  <li className={`${styles.navigation_section_item}`}>
                    <div className={`${styles.navigation_item_container}`}>
                      <span
                        className={`${styles.navigation_item_icon_wrapper}`}
                      >
                        <span
                          className={`${styles.navigation_item_icon_container}`}
                        >
                          <i
                            className={`bi bi-file-earmark-fill ${styles.icon}`}
                          ></i>
                        </span>
                      </span>
                      <span
                        className={`${styles.navigation_item_content_wrapper}`}
                      >
                        <p className={`${styles.navigation_item_content}`}>
                          Reports
                        </p>
                      </span>
                    </div>
                  </li>
                  <li className={`${styles.navigation_section_item}`}>
                    <div className={`${styles.navigation_item_container}`}>
                      <span
                        className={`${styles.navigation_item_icon_wrapper}`}
                      >
                        <span
                          className={`${styles.navigation_item_icon_container}`}
                        >
                          <i className={`bi bi-calendar ${styles.icon}`}></i>
                        </span>
                      </span>
                      <span
                        className={`${styles.navigation_item_content_wrapper}`}
                      >
                        <p className={`${styles.navigation_item_content}`}>
                          Calender
                        </p>
                      </span>
                    </div>
                  </li>
                  <h6 className={`${styles.section_heading}`}>Charts</h6>
                  <li className={`${styles.navigation_section_item}`}>
                    <div className={`${styles.navigation_item_container}`}>
                      <span
                        className={`${styles.navigation_item_icon_wrapper}`}
                      >
                        <span
                          className={`${styles.navigation_item_icon_container}`}
                        >
                          <i
                            className={`bi bi-bar-chart-line-fill ${styles.icon}`}
                          ></i>
                        </span>
                      </span>
                      <span
                        className={`${styles.navigation_item_content_wrapper}`}
                      >
                        <p className={`${styles.navigation_item_content}`}>
                          Bar Chart
                        </p>
                      </span>
                    </div>
                  </li>
                  <li className={`${styles.navigation_section_item}`}>
                    <div className={`${styles.navigation_item_container}`}>
                      <span
                        className={`${styles.navigation_item_icon_wrapper}`}
                      >
                        <span
                          className={`${styles.navigation_item_icon_container}`}
                        >
                          <i
                            className={`bi bi-pie-chart-fill ${styles.icon}`}
                          ></i>
                        </span>
                      </span>
                      <span
                        className={`${styles.navigation_item_content_wrapper}`}
                      >
                        <p className={`${styles.navigation_item_content}`}>
                          Pie Chart
                        </p>
                      </span>
                    </div>
                  </li>
                  <li className={`${styles.navigation_section_item}`}>
                    <div className={`${styles.navigation_item_container}`}>
                      <span
                        className={`${styles.navigation_item_icon_wrapper}`}
                      >
                        <span
                          className={`${styles.navigation_item_icon_container}`}
                        >
                          <i
                            className={`bi bi-graph-up-arrow ${styles.icon}`}
                          ></i>
                        </span>
                      </span>
                      <span
                        className={`${styles.navigation_item_content_wrapper}`}
                      >
                        <p className={`${styles.navigation_item_content}`}>
                          Line Chart
                        </p>
                      </span>
                    </div>
                  </li>
                  <h6 className={`${styles.section_heading}`}>Settings</h6>
                  <li className={`${styles.navigation_section_item}`}>
                    <div className={`${styles.navigation_item_container}`}>
                      <span
                        className={`${styles.navigation_item_icon_wrapper}`}
                      >
                        <span
                          className={`${styles.navigation_item_icon_container}`}
                        >
                          <i className={`bi bi-gear ${styles.icon}`}></i>
                        </span>
                      </span>
                      <span
                        className={`${styles.navigation_item_content_wrapper}`}
                      >
                        <p className={`${styles.navigation_item_content}`}>
                          Settings
                        </p>
                      </span>
                    </div>
                  </li>
                </div>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
