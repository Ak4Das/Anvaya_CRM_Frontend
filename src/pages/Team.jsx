import styles from "../style_modules/page_modules/Team.module.css"
import tableStyles from "../style_modules/component_modules/Table.module.css"
import SideBar from "../components/SideBar.jsx"
import NavBar from "../components/NavBar.jsx"
import { useEffect, useState } from "react"
import agents from "../agentData.js"
import { Link } from "react-router-dom"

export default function Team() {
  const [idBtnClicked, setIdBtnClick] = useState(false)
  const [nameBtnClicked, setNameBtnClick] = useState(false)
  const [roleBtnClicked, setRollBtnClick] = useState(false)
  const [statusBtnClicked, setStatusBtnClicked] = useState(false)
  const [joinedDateBtnClicked, setJoinedDateBtnClicked] = useState(false)
  const [departmentBtnClicked, setDepartmentBtnClick] = useState(false)
  const [managerBtnClicked, setManagerBtnClick] = useState(false)
  const [locationBtnClicked, setLocationBtnClick] = useState(false)
  const [performanceScoreBtnClicked, setPerformanceScoreBtnClick] =
    useState(false)
  const [openFilterInput, setOpenFilterInput] = useState("")

  return (
    <div>
      <div className={`app`}>
        <SideBar />
        <main className={`content`}>
          <NavBar />
          <section className={`main_section`}>
            <div className={`${styles.heading_container}`}>
              <div className={`${styles.heading}`}>
                <h2 className={`${styles.text1}`}>Team</h2>
                <h5 className={`${styles.text2}`}>The Team Members</h5>
              </div>
              <Link
                to="/addAgent"
                className={`btn btn-outline-success ${styles.add_people_btn}`}
              >
                Add New Agent
              </Link>
            </div>
            <div className={`${tableStyles.table_wrapper}`}>
              <div className={`${tableStyles.table_container}`}>
                {openFilterInput && (
                  <div className={`${tableStyles.filter}`}>
                    <label
                      className={`form-label ${tableStyles.form_label}`}
                      htmlFor="input"
                    >
                      {openFilterInput}
                    </label>
                    <input
                      id="input"
                      className={`form-control ${tableStyles.input}`}
                      type="text"
                    />
                    <i
                      className={`bi bi-x-lg ${tableStyles.close}`}
                      onClick={() => setOpenFilterInput("")}
                    ></i>
                  </div>
                )}
                <table className={`table ${tableStyles.table}`}>
                  <thead>
                    <tr>
                      <th className={`${tableStyles.col}`} scope="col">
                        <span>ID</span>
                        <i
                          className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
                          onClick={() => {
                            setIdBtnClick(idBtnClicked ? false : true)
                            setNameBtnClick(false)
                            setRollBtnClick(false)
                            setStatusBtnClicked(false)
                            setJoinedDateBtnClicked(false)
                            setDepartmentBtnClick(false)
                            setManagerBtnClick(false)
                            setLocationBtnClick(false)
                            setPerformanceScoreBtnClick(false)
                          }}
                        >
                          {idBtnClicked && (
                            <div
                              className={`${tableStyles.filter_btn_container}`}
                            >
                              <div className={`btn ${tableStyles.button}`}>
                                Unsort
                              </div>
                              <div className={`btn ${tableStyles.button}`}>
                                Sort by ASC
                              </div>
                              <div className={`btn ${tableStyles.button}`}>
                                Sort by DESC
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${tableStyles.col}`} scope="col">
                        <span>Name</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(nameBtnClicked ? false : true)
                            setRollBtnClick(false)
                            setStatusBtnClicked(false)
                            setJoinedDateBtnClicked(false)
                            setDepartmentBtnClick(false)
                            setManagerBtnClick(false)
                            setLocationBtnClick(false)
                            setPerformanceScoreBtnClick(false)
                          }}
                        >
                          {nameBtnClicked && (
                            <div
                              className={`${tableStyles.filter_btn_container}`}
                            >
                              <div className={`btn ${tableStyles.button}`}>
                                Unsort
                              </div>
                              <div className={`btn ${tableStyles.button}`}>
                                Sort by ASC
                              </div>
                              <div className={`btn ${tableStyles.button}`}>
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => setOpenFilterInput("Name")}
                              >
                                Filter
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${tableStyles.col}`} scope="col">
                        <span>Role</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setRollBtnClick(roleBtnClicked ? false : true)
                            setStatusBtnClicked(false)
                            setJoinedDateBtnClicked(false)
                            setDepartmentBtnClick(false)
                            setManagerBtnClick(false)
                            setLocationBtnClick(false)
                            setPerformanceScoreBtnClick(false)
                          }}
                        >
                          {roleBtnClicked && (
                            <div
                              className={`${tableStyles.filter_btn_container}`}
                            >
                              <div className={`btn ${tableStyles.button}`}>
                                Unsort
                              </div>
                              <div className={`btn ${tableStyles.button}`}>
                                Sort by ASC
                              </div>
                              <div className={`btn ${tableStyles.button}`}>
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => setOpenFilterInput("Role")}
                              >
                                Filter
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${tableStyles.col}`} scope="col">
                        <span>Status</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setRollBtnClick(false)
                            setStatusBtnClicked(statusBtnClicked ? false : true)
                            setJoinedDateBtnClicked(false)
                            setDepartmentBtnClick(false)
                            setManagerBtnClick(false)
                            setLocationBtnClick(false)
                            setPerformanceScoreBtnClick(false)
                          }}
                        >
                          {statusBtnClicked && (
                            <div
                              className={`${tableStyles.filter_btn_container}`}
                            >
                              <div className={`btn ${tableStyles.button}`}>
                                Unsort
                              </div>
                              <div className={`btn ${tableStyles.button}`}>
                                Sort by ASC
                              </div>
                              <div className={`btn ${tableStyles.button}`}>
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => setOpenFilterInput("Status")}
                              >
                                Filter
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${tableStyles.col}`} scope="col">
                        <span>Joined Date</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setRollBtnClick(false)
                            setStatusBtnClicked(false)
                            setJoinedDateBtnClicked(
                              joinedDateBtnClicked ? false : true,
                            )
                            setDepartmentBtnClick(false)
                            setManagerBtnClick(false)
                            setLocationBtnClick(false)
                            setPerformanceScoreBtnClick(false)
                          }}
                        >
                          {joinedDateBtnClicked && (
                            <div
                              className={`${tableStyles.filter_btn_container}`}
                            >
                              <div className={`btn ${tableStyles.button}`}>
                                Unsort
                              </div>
                              <div className={`btn ${tableStyles.button}`}>
                                Sort by ASC
                              </div>
                              <div className={`btn ${tableStyles.button}`}>
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() =>
                                  setOpenFilterInput("Joined Date")
                                }
                              >
                                Filter
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${tableStyles.col}`} scope="col">
                        <span>Department</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setRollBtnClick(false)
                            setStatusBtnClicked(false)
                            setJoinedDateBtnClicked(false)
                            setDepartmentBtnClick(
                              departmentBtnClicked ? false : true,
                            )
                            setManagerBtnClick(false)
                            setLocationBtnClick(false)
                            setPerformanceScoreBtnClick(false)
                          }}
                        >
                          {departmentBtnClicked && (
                            <div
                              className={`${tableStyles.filter_btn_container}`}
                            >
                              <div className={`btn ${tableStyles.button}`}>
                                Unsort
                              </div>
                              <div className={`btn ${tableStyles.button}`}>
                                Sort by ASC
                              </div>
                              <div className={`btn ${tableStyles.button}`}>
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => setOpenFilterInput("Department")}
                              >
                                Filter
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${tableStyles.col}`} scope="col">
                        <span>Manager</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setRollBtnClick(false)
                            setStatusBtnClicked(false)
                            setJoinedDateBtnClicked(false)
                            setDepartmentBtnClick(false)
                            setManagerBtnClick(managerBtnClicked ? false : true)
                            setLocationBtnClick(false)
                            setPerformanceScoreBtnClick(false)
                          }}
                        >
                          {managerBtnClicked && (
                            <div
                              className={`${tableStyles.filter_btn_container}`}
                            >
                              <div className={`btn ${tableStyles.button}`}>
                                Unsort
                              </div>
                              <div className={`btn ${tableStyles.button}`}>
                                Sort by ASC
                              </div>
                              <div className={`btn ${tableStyles.button}`}>
                                Sort by DESC
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${tableStyles.col}`} scope="col">
                        <span>Location</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setRollBtnClick(false)
                            setStatusBtnClicked(false)
                            setJoinedDateBtnClicked(false)
                            setDepartmentBtnClick(false)
                            setManagerBtnClick(false)
                            setLocationBtnClick(
                              locationBtnClicked ? false : true,
                            )
                            setPerformanceScoreBtnClick(false)
                          }}
                        >
                          {locationBtnClicked && (
                            <div
                              className={`${tableStyles.filter_btn_container}`}
                            >
                              <div className={`btn ${tableStyles.button}`}>
                                Unsort
                              </div>
                              <div className={`btn ${tableStyles.button}`}>
                                Sort by ASC
                              </div>
                              <div className={`btn ${tableStyles.button}`}>
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => setOpenFilterInput("Location")}
                              >
                                Filter
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${tableStyles.col}`} scope="col">
                        <span>Performance Score</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setRollBtnClick(false)
                            setStatusBtnClicked(false)
                            setJoinedDateBtnClicked(false)
                            setDepartmentBtnClick(false)
                            setManagerBtnClick(false)
                            setLocationBtnClick(false)
                            setPerformanceScoreBtnClick(
                              performanceScoreBtnClicked ? false : true,
                            )
                          }}
                        >
                          {performanceScoreBtnClicked && (
                            <div
                              className={`${tableStyles.filter_btn_container} ${tableStyles.filter_btn_container_end}`}
                            >
                              <div className={`btn ${tableStyles.button}`}>
                                Unsort
                              </div>
                              <div className={`btn ${tableStyles.button}`}>
                                Sort by ASC
                              </div>
                              <div className={`btn ${tableStyles.button}`}>
                                Sort by DESC
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${tableStyles.col}`} scope="col">
                        <span>View Profile</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((agent) => {
                      return (
                        <tr key={agent.id}>
                          <th scope="row">{agent.id}</th>
                          <td>{agent.name}</td>
                          <td>{agent.role}</td>
                          <td style={{ color: "#70d89d" }}>{agent.status}</td>
                          <td>{agent.joinedDate}</td>
                          <td>{agent.department}</td>
                          <td>{agent.manager}</td>
                          <td>{agent.location}</td>
                          <td>
                            <span style={{ color: "#70d89d" }}>
                              {agent.performanceScore.toFixed(1)}
                            </span>{" "}
                            out of 10
                          </td>
                          <td>
                            <Link
                              to={`/salesAgent/${agent.id}`}
                              className="btn btn-success btn-sm"
                            >
                              View Profile
                            </Link>
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
