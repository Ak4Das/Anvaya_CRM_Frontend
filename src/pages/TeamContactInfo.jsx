import styles from "../style_modules/page_modules/Team.module.css"
import tableStyles from "../style_modules/component_modules/Table.module.css"
import SideBar from "../components/SideBar.jsx"
import NavBar from "../components/NavBar.jsx"
import { useState } from "react"
import agents from "../agentData.js"
import { Link } from "react-router-dom"

export default function TeamContactInfo() {
  const [idBtnClicked, setIdBtnClick] = useState(false)
  const [nameBtnClicked, setNameBtnClick] = useState(false)
  const [ageBtnClicked, setAgeBtnClick] = useState(false)
  const [countryBtnClicked, setCountryBtnClick] = useState(false)
  const [phoneNumberBtnClicked, setPhoneNumberBtnClick] = useState(false)
  const [emailBtnClicked, setEmailBtnClick] = useState(false)
  const [openFilterInput, setOpenFilterInput] = useState("")

  return (
    <div>
      <div className={`${styles.app}`}>
        <SideBar />
        <main className={`${styles.content}`}>
          <NavBar />
          <section className={`${styles.main_section}`}>
            <div className={`${styles.heading}`}>
              <h2 className={`${styles.text1}`}>Contacts</h2>
              <h5 className={`${styles.text2}`}>Team Contact Information's</h5>
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
                            setAgeBtnClick(false)
                            setCountryBtnClick(false)
                            setPhoneNumberBtnClick(false)
                            setEmailBtnClick(false)
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
                            setAgeBtnClick(false)
                            setCountryBtnClick(false)
                            setPhoneNumberBtnClick(false)
                            setEmailBtnClick(false)
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
                        <span>Age</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setAgeBtnClick(ageBtnClicked ? false : true)
                            setCountryBtnClick(false)
                            setPhoneNumberBtnClick(false)
                            setEmailBtnClick(false)
                          }}
                        >
                          {ageBtnClicked && (
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
                        <span>Country</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setAgeBtnClick(false)
                            setCountryBtnClick(countryBtnClicked ? false : true)
                            setPhoneNumberBtnClick(false)
                            setEmailBtnClick(false)
                          }}
                        >
                          {countryBtnClicked && (
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
                                onClick={() => setOpenFilterInput("Country")}
                              >
                                Filter
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${tableStyles.col}`} scope="col">
                        <span>Email</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setAgeBtnClick(false)
                            setCountryBtnClick(false)
                            setPhoneNumberBtnClick(false)
                            setEmailBtnClick(emailBtnClicked ? false : true)
                          }}
                        >
                          {emailBtnClicked && (
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
                                onClick={() => setOpenFilterInput("Email")}
                              >
                                Filter
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${tableStyles.col}`} scope="col">
                        <span>Phone Number</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setAgeBtnClick(false)
                            setCountryBtnClick(false)
                            setPhoneNumberBtnClick(
                              phoneNumberBtnClicked ? false : true,
                            )
                            setEmailBtnClick(false)
                          }}
                        >
                          {phoneNumberBtnClicked && (
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
                          <td>{agent.age}</td>
                          <td>{agent.country}</td>
                          <td style={{ color: "#70d89d" }}>{agent.email}</td>
                          <td>{agent.phoneNumber}</td>
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
