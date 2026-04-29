import styles from "../style_modules/page_modules/Team.module.css"
import tableStyles from "../style_modules/component_modules/Table.module.css"
import SideBar from "../components/SideBar.jsx"
import NavBar from "../components/NavBar.jsx"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import {
  sortCodeNumbersInAscendingOrder,
  sortCodeNumbersInDescendingOrder,
  sortNumbersInAscendingOrder,
  sortNumbersInDescendingOrder,
  sortPhoneNumbersInAscendingOrder,
  sortPhoneNumbersInDescendingOrder,
  sortStringsInAscendingOrder,
  sortStringsInDescendingOrder,
  sortDateInAscendingOrder,
  sortDateInDescendingOrder,
} from "../functions.js"

export default function TeamContactInfo() {
  const [idBtnClicked, setIdBtnClick] = useState(false)
  const [nameBtnClicked, setNameBtnClick] = useState(false)
  const [dateOfBirthBtnClicked, setDateOfBirthBtnClick] = useState(false)
  const [countryBtnClicked, setCountryBtnClick] = useState(false)
  const [phoneNumberBtnClicked, setPhoneNumberBtnClick] = useState(false)
  const [emailBtnClicked, setEmailBtnClick] = useState(false)
  const [salesAgents, setSalesAgents] = useState([])
  const [sortApplied, applySort] = useState(false)

  const [openFilterInput, setOpenFilterInput] = useState("")
  const [properties, setProperties] = useState({})

  function capitalizeFirstLetter(string) {
    const String = string.trim()
    const array = String.split(" ")
    const updatedArray = array.map((word) => {
      const result = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      return result
    })
    return updatedArray.join(" ")
  }

  async function handleClick() {
    const inputField = document.querySelector("#input")
    const inputValue = inputField.value
    if (inputValue) {
      let updatedInputValue
      if (openFilterInput === "phoneNumber") {
        updatedInputValue = inputValue
      } else {
        updatedInputValue = capitalizeFirstLetter(inputValue)
      }

      const updatedProperties = {
        ...properties,
      }

      if (openFilterInput === "phoneNumber") {
        updatedProperties[openFilterInput] = { $regex: updatedInputValue }
      } else {
        updatedProperties[openFilterInput] = updatedInputValue
      }

      const updatedPropertiesString = JSON.stringify(updatedProperties)

      const response = await filterAgentsByProperties(updatedPropertiesString)

      setSalesAgents(response.data)
      setProperties(updatedProperties)
    } else {
      delete properties[openFilterInput]

      const propertiesString = JSON.stringify(properties)

      const response = await filterAgentsByProperties(propertiesString)
      setSalesAgents(response.data)
      setProperties(properties)
    }
  }

  async function filterAgentsByProperties(filtersString) {
    try {
      const response = await axios.get(
        `http://localhost:3000/agents/prop?filters=${encodeURIComponent(JSON.stringify(filtersString))}`,
      )
      return response
    } catch (error) {
      throw error
    }
  }

  async function getAgentData() {
    try {
      const response = await axios.get("http://localhost:3000/agents")
      setSalesAgents(response.data)
    } catch (error) {
      throw error
    }
  }

  async function removePropertyFilter(property) {
    delete properties[property]
    const propertiesString = JSON.stringify(properties)
    const response = await filterAgentsByProperties(propertiesString)
    setSalesAgents(response.data)
    setProperties(properties)
  }

  async function clearAllFilters() {
    Object.keys(properties).forEach((key) => delete properties[key])
    const propertiesString = JSON.stringify(properties)
    const response = await filterAgentsByProperties(propertiesString)
    setSalesAgents(response.data)
    setProperties(properties)
  }

  useEffect(() => {
    getAgentData()
  }, [])

  function sortAgentsDataInAscOrderByProp(prop) {
    if (prop === "agentCode") {
      const updatedAgentsData = sortCodeNumbersInAscendingOrder(
        salesAgents,
        prop,
      )
      setSalesAgents(updatedAgentsData)
    } else if (prop === "dateOfBirth") {
      const updatedAgentsData = sortDateInAscendingOrder(salesAgents, prop)
      setSalesAgents(updatedAgentsData)
    } else if (prop === "phoneNumber") {
      const updatedAgentsData = sortPhoneNumbersInAscendingOrder(
        salesAgents,
        prop,
      )
      setSalesAgents(updatedAgentsData)
    } else {
      const updatedAgentsData = sortStringsInAscendingOrder(
        salesAgents,
        prop,
      )
      setSalesAgents(updatedAgentsData)
    }
  }

  function sortAgentsDataInDescOrderByProp(prop) {
    if (prop === "agentCode") {
      const updatedAgentsData = sortCodeNumbersInDescendingOrder(
        salesAgents,
        prop,
      )
      setSalesAgents(updatedAgentsData)
    } else if (prop === "dateOfBirth") {
      const updatedAgentsData = sortDateInDescendingOrder(salesAgents, prop)
      setSalesAgents(updatedAgentsData)
    } else if (prop === "phoneNumber") {
      const updatedAgentsData = sortPhoneNumbersInDescendingOrder(
        salesAgents,
        prop,
      )
      setSalesAgents(updatedAgentsData)
    } else {
      const updatedAgentsData = sortStringsInDescendingOrder(
        salesAgents,
        prop,
      )
      setSalesAgents(updatedAgentsData)
    }
  }

  async function unsortAgentsData() {
    const propertiesString = JSON.stringify(properties)
    const response = await filterAgentsByProperties(propertiesString)
    setSalesAgents(response.data)
    applySort(false)
  }

  return (
    <div>
      <div className={`app`}>
        <SideBar />
        <main className={`content`}>
          <NavBar />
          <section className={`main_section`}>
            <div className={`${styles.heading_container}`}>
              <div className={`${styles.heading}`}>
                <h2 className={`${styles.text1}`}>Contacts</h2>
                <h5 className={`${styles.text2}`}>
                  Team Contact Information's
                </h5>
              </div>
              <div className="d-flex gap-3">
                {sortApplied && (
                  <div
                    className="btn btn-outline-danger"
                    onClick={unsortAgentsData}
                  >
                    Unsort
                  </div>
                )}
                {Object.keys(properties).length !== 0 && (
                  <button
                    className="btn btn-outline-danger"
                    onClick={clearAllFilters}
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
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
                    <button
                      className="btn btn-success btn-sm mt-3"
                      onClick={handleClick}
                    >
                      Apply
                    </button>
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
                        <span>Code</span>
                        <i
                          className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
                          onClick={() => {
                            setIdBtnClick(idBtnClicked ? false : true)
                            setNameBtnClick(false)
                            setDateOfBirthBtnClick(false)
                            setCountryBtnClick(false)
                            setPhoneNumberBtnClick(false)
                            setEmailBtnClick(false)
                          }}
                        >
                          {idBtnClicked && (
                            <div
                              className={`${tableStyles.filter_btn_container}`}
                            >
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInAscOrderByProp("agentCode")
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInDescOrderByProp("agentCode")
                                  applySort(true)
                                }}
                              >
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
                            setDateOfBirthBtnClick(false)
                            setCountryBtnClick(false)
                            setPhoneNumberBtnClick(false)
                            setEmailBtnClick(false)
                          }}
                        >
                          {nameBtnClicked && (
                            <div
                              className={`${tableStyles.filter_btn_container}`}
                            >
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInAscOrderByProp("name")
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInDescOrderByProp("name")
                                  applySort(true)
                                }}
                              >
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => setOpenFilterInput("name")}
                              >
                                Filter
                              </div>
                              <div
                                className={`btn text-danger ${tableStyles.button}`}
                                onClick={() => removePropertyFilter("name")}
                              >
                                Remove Filter
                              </div>
                            </div>
                          )}
                        </i>
                      </th>
                      <th className={`${tableStyles.col}`} scope="col">
                        <span>Date Of Birth</span>
                        <i
                          className="bi bi-three-dots-vertical"
                          onClick={() => {
                            setIdBtnClick(false)
                            setNameBtnClick(false)
                            setDateOfBirthBtnClick(
                              dateOfBirthBtnClicked ? false : true,
                            )
                            setCountryBtnClick(false)
                            setPhoneNumberBtnClick(false)
                            setEmailBtnClick(false)
                          }}
                        >
                          {dateOfBirthBtnClicked && (
                            <div
                              className={`${tableStyles.filter_btn_container}`}
                            >
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInAscOrderByProp("dateOfBirth")
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInDescOrderByProp("dateOfBirth")
                                  applySort(true)
                                }}
                              >
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
                            setDateOfBirthBtnClick(false)
                            setCountryBtnClick(countryBtnClicked ? false : true)
                            setPhoneNumberBtnClick(false)
                            setEmailBtnClick(false)
                          }}
                        >
                          {countryBtnClicked && (
                            <div
                              className={`${tableStyles.filter_btn_container}`}
                            >
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInAscOrderByProp("country")
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInDescOrderByProp("country")
                                  applySort(true)
                                }}
                              >
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => setOpenFilterInput("country")}
                              >
                                Filter
                              </div>
                              <div
                                className={`btn text-danger ${tableStyles.button}`}
                                onClick={() => removePropertyFilter("country")}
                              >
                                Remove Filter
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
                            setDateOfBirthBtnClick(false)
                            setCountryBtnClick(false)
                            setPhoneNumberBtnClick(false)
                            setEmailBtnClick(emailBtnClicked ? false : true)
                          }}
                        >
                          {emailBtnClicked && (
                            <div
                              className={`${tableStyles.filter_btn_container}`}
                            >
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInAscOrderByProp("email")
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInDescOrderByProp("email")
                                  applySort(true)
                                }}
                              >
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => setOpenFilterInput("email")}
                              >
                                Filter
                              </div>
                              <div
                                className={`btn text-danger ${tableStyles.button}`}
                                onClick={() => removePropertyFilter("email")}
                              >
                                Remove Filter
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
                            setDateOfBirthBtnClick(false)
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
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInAscOrderByProp("phoneNumber")
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInDescOrderByProp("phoneNumber")
                                  applySort(true)
                                }}
                              >
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() =>
                                  setOpenFilterInput("phoneNumberNormalized")
                                }
                              >
                                Filter
                              </div>
                              <div
                                className={`btn text-danger ${tableStyles.button}`}
                                onClick={() =>
                                  removePropertyFilter("phoneNumberNormalized")
                                }
                              >
                                Remove Filter
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
                    {salesAgents &&
                      salesAgents.map((agent) => {
                        return (
                          <tr key={agent.agentCode}>
                            <th scope="row">{agent.agentCode}</th>
                            <td>{agent.name}</td>
                            <td>{agent.dateOfBirth}</td>
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
