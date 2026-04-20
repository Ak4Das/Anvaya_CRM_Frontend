import styles from "../style_modules/page_modules/Team.module.css"
import SideBar from "../components/SideBar.jsx"
import NavBar from "../components/NavBar.jsx"
import { useEffect, useState } from "react"

export default function Team() {
  const [idBtnClicked, setIdBtnClick] = useState(false)
  const [nameBtnClicked, setNameBtnClick] = useState(false)
  const [ageBtnClicked, setAgeBtnClick] = useState(false)
  const [countryBtnClicked, setCountryBtnClick] = useState(false)
  const [phoneNumberBtnClicked, setPhoneNumberBtnClick] = useState(false)
  const [emailBtnClicked, setEmailBtnClick] = useState(false)
  const [openFilterInput, setOpenFilterInput] = useState("")

  // function openFilterBox() {
  //   setOpenFilterInput(true)
  // }

  return (
    <div>
      <div className={`${styles.app}`}>
        <SideBar />
        <main className={`${styles.content}`}>
          <NavBar />
          <section className={`${styles.main_section}`}>
            <div className={`${styles.heading}`}>
              <h2 className={`${styles.text1}`}>Team</h2>
              <h5 className={`${styles.text2}`}>The Team Members</h5>
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
                            setAgeBtnClick(false)
                            setCountryBtnClick(false)
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
                            setAgeBtnClick(false)
                            setCountryBtnClick(false)
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
                                onClick={() => setOpenFilterInput("Country")}
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
                            setAgeBtnClick(false)
                            setCountryBtnClick(false)
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Agni Dey</td>
                      <td>27</td>
                      <td>United States</td>
                      <td>(+1) 202-555-0123</td>
                      <td>agni@gmail.com</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Alok Kumar</td>
                      <td>24</td>
                      <td>India</td>
                      <td>(+91) 98765-43210</td>
                      <td>alok@gmail.com</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Akshay Karmakar</td>
                      <td>25</td>
                      <td>United Kingdom</td>
                      <td>(+44) 20-7946-0958</td>
                      <td>akshay@gmail.com</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>Puja Choudhary</td>
                      <td>25</td>
                      <td>Germany</td>
                      <td>(+49) 30-1234567</td>
                      <td>puja@gmail.com</td>
                    </tr>
                    <tr>
                      <th scope="row">5</th>
                      <td>Punam Das</td>
                      <td>24</td>
                      <td>Brazil</td>
                      <td>(+55) 11-98765-4321</td>
                      <td>punam@gmail.com</td>
                    </tr>
                    <tr>
                      <th scope="row">6</th>
                      <td>Parag Coube</td>
                      <td>25</td>
                      <td>Japan</td>
                      <td>(+81) 3-1234-5678</td>
                      <td>parag@gmail.com</td>
                    </tr>
                    <tr>
                      <th scope="row">7</th>
                      <td>Pankaj Chatterjee</td>
                      <td>24</td>
                      <td>Australia</td>
                      <td>(+61) 4-1234-5678</td>
                      <td>pankaj@gmail.com</td>
                    </tr>
                    <tr>
                      <th scope="row">8</th>
                      <td>Bibhushita Mondal</td>
                      <td>25</td>
                      <td>Nigeria</td>
                      <td>(+234) 803-123-4567</td>
                      <td>bibhushita@gmail.com</td>
                    </tr>
                    <tr>
                      <th scope="row">9</th>
                      <td>Chayan Das</td>
                      <td>24</td>
                      <td>France</td>
                      <td>(+33) 1-23-45-67-89</td>
                      <td>chayan@gmail.com</td>
                    </tr>
                    <tr>
                      <th scope="row">10</th>
                      <td>Daya Pathak</td>
                      <td>25</td>
                      <td>China</td>
                      <td>(+86) 10-1234-5678</td>
                      <td>daya@gmail.com</td>
                    </tr>
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
