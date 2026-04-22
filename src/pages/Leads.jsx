import styles from "../style_modules/page_modules/Team.module.css"
import SideBar from "../components/SideBar.jsx"
import NavBar from "../components/NavBar.jsx"
import { useEffect, useState } from "react"
import leadsData from "../leadData.js"
import { Link } from "react-router-dom"

export default function Leads() {
  const [idBtnClicked, setIdBtnClick] = useState(false)
  const [nameBtnClicked, setNameBtnClick] = useState(false)
  const [sourceBtnClicked, setSourceBtnClick] = useState(false)
  const [salesAgentBtnClicked, setSalesAgentBtnClick] = useState(false)
  const [statusBtnClicked, setStatusBtnClick] = useState(false)
  const [tagsBtnClicked, setTagsBtnClick] = useState(false)
  const [priorityBtnClicked, setPriorityBtnClick] = useState(false)
  const [timeToCloseBtnClicked, setTimeToCloseBtnClick] = useState(false)
  const [closedAtBtnClicked, setClosedAtBtnClick] = useState(false)
  const [openFilterInput, setOpenFilterInput] = useState("")

  return (
    <div>
      <div className={`${styles.app}`}>
        <SideBar />
        <main className={`${styles.content}`}>
          <NavBar />
          <section className={`${styles.main_section}`}>
            <div className={`${styles.heading_container}`}>
              <div className={`${styles.heading}`}>
                <h2 className={`${styles.text1}`}>Leads</h2>
                <h5 className={`${styles.text2}`}>The Potential Customers</h5>
              </div>
              <Link
                to="/addLead"
                className={`btn btn-outline-success ${styles.add_people_btn}`}
              >
                Add New Lead
              </Link>
            </div>
            <div className={`${styles.table_wrapper}`}>
              <div className={`${styles.table_container}`}>
                {openFilterInput && (
                  <div className={`${styles.filter}`}>
                    <label
                      className={`form-label ${styles.form_label}`}
                      htmlFor="input"
                    >
                      {openFilterInput}
                    </label>
                    <input
                      id="input"
                      className={`form-control ${styles.input}`}
                      type="text"
                    />
                    <i
                      className={`bi bi-x-lg ${styles.close}`}
                      onClick={() => setOpenFilterInput("")}
                    ></i>
                  </div>
                )}
                <table className={`table ${styles.table}`}>
                  <thead>
                    <tr>
                      <th className={`${styles.col}`} scope="col">
                        <span>ID</span>
                        <i
                          className={`bi bi-three-dots-vertical ${styles.vertical_three_dot_icon}`}
                          onClick={() => {
                            setIdBtnClick(idBtnClicked ? false : true)
                            setNameBtnClick(false)
                            setSourceBtnClick(false)
                            setSalesAgentBtnClick(false)
                            setStatusBtnClick(false)
                            setTagsBtnClick(false)
                            setPriorityBtnClick(false)
                            setTimeToCloseBtnClick(false)
                            setClosedAtBtnClick(false)
                          }}
                        >
                          {idBtnClicked && (
                            <div className={`${styles.filter_btn_container}`}>
                              <div className={`btn ${styles.button}`}>
                                Unsort
                              </div>
                              <div className={`btn ${styles.button}`}>
                                Sort by ASC
                              </div>
                              <div className={`btn ${styles.button}`}>
                                Sort by DESC
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${styles.col}`} scope="col">
                        <span>Name</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(nameBtnClicked ? false : true)
                            setSourceBtnClick(false)
                            setSalesAgentBtnClick(false)
                            setStatusBtnClick(false)
                            setTagsBtnClick(false)
                            setPriorityBtnClick(false)
                            setTimeToCloseBtnClick(false)
                            setClosedAtBtnClick(false)
                          }}
                        >
                          {nameBtnClicked && (
                            <div className={`${styles.filter_btn_container}`}>
                              <div className={`btn ${styles.button}`}>
                                Unsort
                              </div>
                              <div className={`btn ${styles.button}`}>
                                Sort by ASC
                              </div>
                              <div className={`btn ${styles.button}`}>
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${styles.button}`}
                                onClick={() => setOpenFilterInput("Name")}
                              >
                                Filter
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${styles.col}`} scope="col">
                        <span>Source</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setSourceBtnClick(sourceBtnClicked ? false : true)
                            setSalesAgentBtnClick(false)
                            setStatusBtnClick(false)
                            setTagsBtnClick(false)
                            setPriorityBtnClick(false)
                            setTimeToCloseBtnClick(false)
                            setClosedAtBtnClick(false)
                          }}
                        >
                          {sourceBtnClicked && (
                            <div className={`${styles.filter_btn_container}`}>
                              <div className={`btn ${styles.button}`}>
                                Unsort
                              </div>
                              <div className={`btn ${styles.button}`}>
                                Sort by ASC
                              </div>
                              <div className={`btn ${styles.button}`}>
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${styles.button}`}
                                onClick={() => setOpenFilterInput("Source")}
                              >
                                Filter
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${styles.col}`} scope="col">
                        <span>Sales Agent</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setSourceBtnClick(false)
                            setSalesAgentBtnClick(
                              salesAgentBtnClicked ? false : true,
                            )
                            setStatusBtnClick(false)
                            setTagsBtnClick(false)
                            setPriorityBtnClick(false)
                            setTimeToCloseBtnClick(false)
                            setClosedAtBtnClick(false)
                          }}
                        >
                          {salesAgentBtnClicked && (
                            <div className={`${styles.filter_btn_container}`}>
                              <div className={`btn ${styles.button}`}>
                                Unsort
                              </div>
                              <div className={`btn ${styles.button}`}>
                                Sort by ASC
                              </div>
                              <div className={`btn ${styles.button}`}>
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${styles.button}`}
                                onClick={() => setOpenFilterInput("Sales Agent")}
                              >
                                Filter
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${styles.col}`} scope="col">
                        <span>Status</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setSourceBtnClick(false)
                            setSalesAgentBtnClick(false)
                            setStatusBtnClick(statusBtnClicked ? false : true)
                            setTagsBtnClick(false)
                            setPriorityBtnClick(false)
                            setTimeToCloseBtnClick(false)
                            setClosedAtBtnClick(false)
                          }}
                        >
                          {statusBtnClicked && (
                            <div className={`${styles.filter_btn_container}`}>
                              <div className={`btn ${styles.button}`}>
                                Unsort
                              </div>
                              <div className={`btn ${styles.button}`}>
                                Sort by ASC
                              </div>
                              <div className={`btn ${styles.button}`}>
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${styles.button}`}
                                onClick={() =>
                                  setOpenFilterInput("Status")
                                }
                              >
                                Filter
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${styles.col}`} scope="col">
                        <span>Tags</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setSourceBtnClick(false)
                            setSalesAgentBtnClick(false)
                            setStatusBtnClick(false)
                            setTagsBtnClick(tagsBtnClicked ? false : true)
                            setPriorityBtnClick(false)
                            setTimeToCloseBtnClick(false)
                            setClosedAtBtnClick(false)
                          }}
                        >
                          {tagsBtnClicked && (
                            <div
                              className={`${styles.filter_btn_container} ${styles.filter_btn_container_email}`}
                            >
                              <div className={`btn ${styles.button}`}>
                                Unsort
                              </div>
                              <div className={`btn ${styles.button}`}>
                                Sort by ASC
                              </div>
                              <div className={`btn ${styles.button}`}>
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${styles.button}`}
                                onClick={() => setOpenFilterInput("Tags")}
                              >
                                Filter
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${styles.col}`} scope="col">
                        <span>Priority</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setSourceBtnClick(false)
                            setSalesAgentBtnClick(false)
                            setStatusBtnClick(false)
                            setTagsBtnClick(false)
                            setPriorityBtnClick(
                              priorityBtnClicked ? false : true,
                            )
                            setTimeToCloseBtnClick(false)
                            setClosedAtBtnClick(false)
                          }}
                        >
                          {priorityBtnClicked && (
                            <div
                              className={`${styles.filter_btn_container} ${styles.filter_btn_container_email}`}
                            >
                              <div className={`btn ${styles.button}`}>
                                Unsort
                              </div>
                              <div className={`btn ${styles.button}`}>
                                Sort by ASC
                              </div>
                              <div className={`btn ${styles.button}`}>
                                Sort by DESC
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${styles.col}`} scope="col">
                        <span>Time To Close</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setSourceBtnClick(false)
                            setSalesAgentBtnClick(false)
                            setStatusBtnClick(false)
                            setTagsBtnClick(false)
                            setPriorityBtnClick(false)
                            setTimeToCloseBtnClick(
                              timeToCloseBtnClicked ? false : true,
                            )
                            setClosedAtBtnClick(false)
                          }}
                        >
                          {timeToCloseBtnClicked && (
                            <div
                              className={`${styles.filter_btn_container} ${styles.filter_btn_container_email}`}
                            >
                              <div className={`btn ${styles.button}`}>
                                Unsort
                              </div>
                              <div className={`btn ${styles.button}`}>
                                Sort by ASC
                              </div>
                              <div className={`btn ${styles.button}`}>
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${styles.button}`}
                                onClick={() => setOpenFilterInput("Time To Close")}
                              >
                                Filter
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${styles.col}`} scope="col">
                        <span>Closed At</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setSourceBtnClick(false)
                            setSalesAgentBtnClick(false)
                            setStatusBtnClick(false)
                            setTagsBtnClick(false)
                            setPriorityBtnClick(false)
                            setTimeToCloseBtnClick(false)
                            setClosedAtBtnClick(
                              closedAtBtnClicked ? false : true,
                            )
                          }}
                        >
                          {closedAtBtnClicked && (
                            <div
                              className={`${styles.filter_btn_container} ${styles.filter_btn_container_email}`}
                            >
                              <div className={`btn ${styles.button}`}>
                                Unsort
                              </div>
                              <div className={`btn ${styles.button}`}>
                                Sort by ASC
                              </div>
                              <div className={`btn ${styles.button}`}>
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${styles.button}`}
                                onClick={() => setOpenFilterInput("Closed At")}
                              >
                                Filter
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${styles.col}`} scope="col">
                        <span>View Profile</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leadsData.map((lead) => {
                      return (
                        <tr key={lead.id}>
                          <th scope="row">{lead.id}</th>
                          <td>{lead.name}</td>
                          <td>{lead.source}</td>
                          <td style={{ color: "#70d89d" }}>
                            {lead.salesAgent}
                          </td>
                          <td>{lead.status}</td>
                          <td>{lead.tags}</td>
                          <td>{lead.priority}</td>
                          <td>{lead.timeToClose ? `${lead.timeToClose} days` : "_"}</td>
                          <td>{lead.closedAt ? lead.closedAt : "_"}</td>
                          <td>
                            <button className="btn btn-success btn-sm">
                              View Profile
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
