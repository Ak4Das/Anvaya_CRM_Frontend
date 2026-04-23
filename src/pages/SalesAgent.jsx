import styles from "../style_modules/page_modules/SalesAgent.module.css"
import tableStyles from "../style_modules/component_modules/Table.module.css"
import SideBar from "../components/SideBar"
import NavBar from "../components/NavBar.jsx"
import agents from "../agentData.js"
import { useState } from "react"
import leadsData from "../leadData.js"
import { useParams } from "react-router-dom"

export default function SalesAgent() {
  const id = Number(useParams().id)
  const agent = agents.find((agent) => agent.id === id)
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

  const leadsHandledByAgent = leadsData.filter(
    (lead) => lead.salesAgent === agent.name,
  )

  return (
    <div className={`${styles.app}`}>
      <SideBar />
      <main className={`${styles.content}`}>
        <NavBar />
        <section className={`${styles.main_section}`}>
          <section className={`${styles.child_section_one}`}>
            <div className={`${styles.profile_image}`}></div>
            <p>
              Name: <span>{agent.name}</span>
            </p>
            <p>
              Phone: <span>{agent.phoneNumber}</span>
            </p>
            <p>
              Email: <span>{agent.email}</span>
            </p>
            <p>
              Overall Score: <span>{agent.performanceScore}</span>
            </p>
          </section>
          <section className={`${styles.child_section_two}`}>
            <h6 style={{ color: "#44C9BD" }}>Performance In This Month</h6>
            <div className={`${tableStyles.table_container}`}>
              <table className={`table ${tableStyles.table}`}>
                <thead>
                  <tr>
                    <th scope="col">New Lead</th>
                    <th scope="col">Contacted</th>
                    <th scope="col">Qualified</th>
                    <th scope="col">Proposal Send</th>
                    <th scope="col">closed</th>
                    <th scope="col">Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">{agent.newLead}</th>
                    <td>{agent.contacted}</td>
                    <td>{agent.qualified}</td>
                    <td>{agent.proposalSend}</td>
                    <td>{agent.closed}</td>
                    <td style={{ color: "#44C9BD" }}>
                      {Number(((agent.closed / agent.newLead) * 10).toFixed(1))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section className={`${styles.child_section_three}`}>
            <h6 style={{ color: "#44C9BD" }}>Leads Handle By Agent</h6>
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
                                onClick={() => setOpenFilterInput("Source")}
                              >
                                Filter
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${tableStyles.col}`} scope="col">
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
                                  setOpenFilterInput("Sales Agent")
                                }
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
                                onClick={() => setOpenFilterInput("Tags")}
                              >
                                Filter
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${tableStyles.col}`} scope="col">
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
                                  setOpenFilterInput("Time To Close")
                                }
                              >
                                Filter
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${tableStyles.col}`} scope="col">
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
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => setOpenFilterInput("Closed At")}
                              >
                                Filter
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
                    {leadsHandledByAgent.map((lead) => {
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
                          <td>
                            {lead.timeToClose
                              ? `${lead.timeToClose} days`
                              : "_"}
                          </td>
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
        </section>
      </main>
    </div>
  )
}
