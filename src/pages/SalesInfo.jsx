import styles from "../style_modules/page_modules/Team.module.css"
import SideBar from "../components/SideBar.jsx"
import NavBar from "../components/NavBar.jsx"
import { useState } from "react"
import agents from "../agentData.js"
import { sortAgentsArrayByProperty } from "../functions.js"

const sortAgentsByTotalSales = sortAgentsArrayByProperty(
  agents,
  "salesInThisMonth",
)

export default function SalesInfo() {
  const [idBtnClicked, setIdBtnClick] = useState(false)
  const [nameBtnClicked, setNameBtnClick] = useState(false)
  const [phoneNumberBtnClicked, setPhoneNumberBtnClick] = useState(false)
  const [emailBtnClicked, setEmailBtnClick] = useState(false)
  const [totalSaleBtnClicked, setTotalSaleBtnClick] = useState(false)
  const [rankBtnClicked, setRankBtnClicked] = useState(false)
  const [openFilterInput, setOpenFilterInput] = useState("")

  return (
    <div>
      <div className={`${styles.app}`}>
        <SideBar />
        <main className={`${styles.content}`}>
          <NavBar />
          <section className={`${styles.main_section}`}>
            <div className={`${styles.heading}`}>
              <h2 className={`${styles.text1}`}>Sales</h2>
              <h5 className={`${styles.text2}`}>Sales In This Month</h5>
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
                            setTotalSaleBtnClick(false)
                            setRankBtnClicked(false)
                            setPhoneNumberBtnClick(false)
                            setEmailBtnClick(false)
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
                            setTotalSaleBtnClick(false)
                            setRankBtnClicked(false)
                            setPhoneNumberBtnClick(false)
                            setEmailBtnClick(false)
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
                        <span>Email</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setTotalSaleBtnClick(false)
                            setRankBtnClicked(false)
                            setPhoneNumberBtnClick(false)
                            setEmailBtnClick(emailBtnClicked ? false : true)
                          }}
                        >
                          {emailBtnClicked && (
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
                                onClick={() => setOpenFilterInput("Email")}
                              >
                                Filter
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${styles.col}`} scope="col">
                        <span>Phone Number</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setTotalSaleBtnClick(false)
                            setRankBtnClicked(false)
                            setPhoneNumberBtnClick(
                              phoneNumberBtnClicked ? false : true,
                            )
                            setEmailBtnClick(false)
                          }}
                        >
                          {phoneNumberBtnClicked && (
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
                                  setOpenFilterInput("Phone Number")
                                }
                              >
                                Filter
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${styles.col}`} scope="col">
                        <span>Total Sale</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setTotalSaleBtnClick(
                              totalSaleBtnClicked ? false : true,
                            )
                            setRankBtnClicked(false)
                            setPhoneNumberBtnClick(false)
                            setEmailBtnClick(false)
                          }}
                        >
                          {totalSaleBtnClicked && (
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
                        <span>Rank</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setTotalSaleBtnClick(false)
                            setRankBtnClicked(rankBtnClicked ? false : true)
                            setPhoneNumberBtnClick(false)
                            setEmailBtnClick(false)
                          }}
                        >
                          {rankBtnClicked && (
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
                        <span>View Profile</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortAgentsByTotalSales.map((agent, index) => {
                      return (
                        <tr key={agent.id}>
                          <th scope="row">{agent.id}</th>
                          <td>{agent.name}</td>
                          <td style={{ color: "#70d89d" }}>{agent.email}</td>
                          <td>{agent.phoneNumber}</td>
                          <td style={{ color: "#70d89d" }}>
                            ${agent.salesInThisMonth}
                          </td>
                          <td>{index + 1}</td>
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
