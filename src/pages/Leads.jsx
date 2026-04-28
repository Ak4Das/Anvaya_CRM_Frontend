import styles from "../style_modules/page_modules/Team.module.css"
import tableStyles from "../style_modules/component_modules/Table.module.css"
import SideBar from "../components/SideBar.jsx"
import NavBar from "../components/NavBar.jsx"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import {
  sortArrayOfCodeNumbersInAscendingOrder,
  sortArrayOfCodeNumbersInDescendingOrder,
  sortArrayOfNumbersInAscendingOrder,
  sortArrayOfNumbersInDescendingOrder,
  sortArrayOfStringsInAscendingOrder,
  sortArrayOfStringsInDescendingOrder,
  sortDateInAscOrder,
  sortDateInDescOrder,
} from "../functions.js"

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
  const [leadsData, setLeadsData] = useState([])
  const [salesAgents, setSalesAgents] = useState([])
  const [sortApplied, applySort] = useState(false)

  const [openFilterInput, setOpenFilterInput] = useState("")
  const [properties, setProperties] = useState({})

  function getAgentNameById(id) {
    const agent = salesAgents.find((agent) => agent._id === id)
    return agent.name
  }

  function capitalizeFirstLetter(string) {
    const String = string.trim()
    const array = String.split(" ")
    const updatedArray = array.map((word) => {
      const result = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      return result
    })
    return updatedArray.join(" ")
  }

  async function getIdByAgentName(name) {
    try {
      const response = await axios.get(
        `http://localhost:3000/agents/name/${name}`,
      )
      const arrayOfId = response.data.map((agent) => agent._id)
      return arrayOfId
    } catch (error) {
      throw error
    }
  }

  async function handleClick() {
    const inputField = document.querySelector("#input")
    const inputValue = inputField.value
    if (inputValue) {
      const updatedInputValue = capitalizeFirstLetter(inputValue)
      const updatedProperties = {
        ...properties,
      }

      if (openFilterInput === "salesAgent") {
        const arrayOfAgentsId = await getIdByAgentName(updatedInputValue)
        updatedProperties.salesAgent = { $in: arrayOfAgentsId }
      } else {
        updatedProperties[openFilterInput] = updatedInputValue
      }

      const updatedPropertiesString = JSON.stringify(updatedProperties)

      const response = await filterLeadsByProperties(updatedPropertiesString)
      setLeadsData(response.data)
      setProperties(updatedProperties)
    } else {
      delete properties[openFilterInput]

      const propertiesString = JSON.stringify(properties)

      const response = await filterLeadsByProperties(propertiesString)
      setLeadsData(response.data)
      setProperties(properties)
    }
  }

  async function getLeadData() {
    try {
      const response = await axios.get(
        "http://localhost:3000/leads?minDay=0&maxDay=30",
      )
      setLeadsData(response.data)
    } catch (error) {
      throw error
    }
  }

  async function filterLeadsByProperties(filtersString) {
    try {
      const response = await axios.get(
        `http://localhost:3000/leads?minDay=0&maxDay=30&filters=${filtersString}`,
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

  useEffect(() => {
    getLeadData()
    getAgentData()
  }, [])

  async function removePropertyFilter(property) {
    delete properties[property]
    const propertiesString = JSON.stringify(properties)
    const response = await filterLeadsByProperties(propertiesString)
    setLeadsData(response.data)
    setProperties(properties)
  }

  async function clearAllFilters() {
    Object.keys(properties).forEach((key) => delete properties[key])
    const propertiesString = JSON.stringify(properties)
    const response = await filterLeadsByProperties(propertiesString)
    setLeadsData(response.data)
    setProperties(properties)
  }

  function sortLeadsDataInAscOrderByProp(prop) {
    if (prop === "leadCode") {
      const updatedLeadsData = sortArrayOfCodeNumbersInAscendingOrder(
        leadsData,
        prop,
      )
      setLeadsData(updatedLeadsData)
    } else if (prop === "timeToClose") {
      const updatedLeadsData = sortArrayOfNumbersInAscendingOrder(
        leadsData,
        prop,
      )
      setLeadsData(updatedLeadsData)
    } else if (prop === "closedAt") {
      const updatedLeadsData = sortDateInAscOrder(leadsData, prop)
      setLeadsData(updatedLeadsData)
    } else {
      const updatedLeadsData = sortArrayOfStringsInAscendingOrder(
        leadsData,
        prop,
      )
      setLeadsData(updatedLeadsData)
    }
  }

  function addPropertiesInLeadsData(leadsData) {
    leadsData.forEach((lead) => {
      const agent = salesAgents.find((agent) => agent._id === lead.salesAgent)
      lead.agentName = agent.name
    })
  }

  useEffect(() => {
    if (leadsData.length && salesAgents.length) {
      addPropertiesInLeadsData(leadsData)
    }
  }, [leadsData, salesAgents])

  function sortLeadsDataInDescOrderByProp(prop) {
    if (prop === "leadCode") {
      const updatedLeadsData = sortArrayOfCodeNumbersInDescendingOrder(
        leadsData,
        prop,
      )
      setLeadsData(updatedLeadsData)
    } else if (prop === "timeToClose") {
      const updatedLeadsData = sortArrayOfNumbersInDescendingOrder(
        leadsData,
        prop,
      )
      setLeadsData(updatedLeadsData)
    } else if (prop === "closedAt") {
      const updatedLeadsData = sortDateInDescOrder(leadsData, prop)
      setLeadsData(updatedLeadsData)
    } else {
      const updatedLeadsData = sortArrayOfStringsInDescendingOrder(
        leadsData,
        prop,
      )
      setLeadsData(updatedLeadsData)
    }
  }

  async function unsortLeadsData() {
    const propertiesString = JSON.stringify(properties)
    const response = await filterLeadsByProperties(propertiesString)
    setLeadsData(response.data)
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
                <h2 className={`${styles.text1}`}>Leads</h2>
                <h5 className={`${styles.text2}`}>The Potential Customers</h5>
              </div>
              <div className="d-flex gap-3">
                {sortApplied && (
                  <div
                    className="btn btn-outline-danger"
                    onClick={unsortLeadsData}
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
                <Link
                  to="/addLead"
                  className={`btn btn-outline-success ${styles.add_people_btn}`}
                >
                  Add New Lead
                </Link>
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
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortLeadsDataInAscOrderByProp("leadCode")
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortLeadsDataInDescOrderByProp("leadCode")
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
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortLeadsDataInAscOrderByProp("name")
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortLeadsDataInDescOrderByProp("name")
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
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortLeadsDataInAscOrderByProp("source")
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortLeadsDataInDescOrderByProp("source")
                                  applySort(true)
                                }}
                              >
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => setOpenFilterInput("source")}
                              >
                                Filter
                              </div>
                              <div
                                className={`btn text-danger ${tableStyles.button}`}
                                onClick={() => removePropertyFilter("source")}
                              >
                                Remove Filter
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
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortLeadsDataInAscOrderByProp("agentName")
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortLeadsDataInDescOrderByProp("agentName")
                                  applySort(true)
                                }}
                              >
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => setOpenFilterInput("salesAgent")}
                              >
                                Filter
                              </div>
                              <div
                                className={`btn text-danger ${tableStyles.button}`}
                                onClick={() =>
                                  removePropertyFilter("salesAgent")
                                }
                              >
                                Remove Filter
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
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortLeadsDataInAscOrderByProp("status")
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortLeadsDataInDescOrderByProp("status")
                                  applySort(true)
                                }}
                              >
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => setOpenFilterInput("status")}
                              >
                                Filter
                              </div>
                              <div
                                className={`btn text-danger ${tableStyles.button}`}
                                onClick={() => removePropertyFilter("status")}
                              >
                                Remove Filter
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
                              className={`${tableStyles.filter_btn_container} ${tableStyles.filter_btn_container_email}`}
                            >
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortLeadsDataInAscOrderByProp("tags")
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortLeadsDataInDescOrderByProp("tags")
                                  applySort(true)
                                }}
                              >
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => setOpenFilterInput("tags")}
                              >
                                Filter
                              </div>
                              <div
                                className={`btn text-danger ${tableStyles.button}`}
                                onClick={() => removePropertyFilter("tags")}
                              >
                                Remove Filter
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
                              className={`${tableStyles.filter_btn_container} ${tableStyles.filter_btn_container_email}`}
                            >
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortLeadsDataInAscOrderByProp("priority")
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortLeadsDataInDescOrderByProp("priority")
                                  applySort(true)
                                }}
                              >
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => setOpenFilterInput("priority")}
                              >
                                Filter
                              </div>
                              <div
                                className={`btn text-danger ${tableStyles.button}`}
                                onClick={() => removePropertyFilter("priority")}
                              >
                                Remove Filter
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
                              className={`${tableStyles.filter_btn_container} ${tableStyles.filter_btn_container_email}`}
                            >
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortLeadsDataInAscOrderByProp("timeToClose")
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortLeadsDataInDescOrderByProp("timeToClose")
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
                              className={`${tableStyles.filter_btn_container} ${tableStyles.filter_btn_container_email}`}
                            >
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortLeadsDataInAscOrderByProp("closedAt")
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortLeadsDataInDescOrderByProp("closedAt")
                                  applySort(true)
                                }}
                              >
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => setOpenFilterInput("closedAt")}
                              >
                                Filter
                              </div>
                              <div
                                className={`btn text-danger ${tableStyles.button}`}
                                onClick={() => removePropertyFilter("closedAt")}
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
                    {leadsData &&
                      leadsData.map((lead) => {
                        return (
                          <tr key={lead.leadCode}>
                            <th scope="row">{lead.leadCode}</th>
                            <td>{lead.name}</td>
                            <td>{lead.source}</td>
                            <td style={{ color: "#70d89d" }}>
                              {getAgentNameById(lead.salesAgent)}
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
                              <Link
                                to={`/lead/${lead.id}`}
                                className="btn btn-success btn-sm"
                              >
                                Manage Lead
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
