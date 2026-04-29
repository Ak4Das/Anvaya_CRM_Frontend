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
  const [salesAgents, setSalesAgents] = useState([])
  const [managers, setManagers] = useState([])
  const [performanceScores, setPerformanceScores] = useState([])
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

  async function getIdByManagerName(name) {
    try {
      const response = await axios.get(
        `http://localhost:3000/managers/name/${name}`,
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

      if (openFilterInput === "manager") {
        const arrayOfAgentsId = await getIdByManagerName(updatedInputValue)
        updatedProperties.manager = { $in: arrayOfAgentsId }
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

  async function getAgentData() {
    try {
      const response = await axios.get("http://localhost:3000/agents")
      setSalesAgents(response.data)
    } catch (error) {
      throw error
    }
  }

  async function getManagerData() {
    try {
      const response = await axios.get("http://localhost:3000/managers")
      setManagers(response.data)
    } catch (error) {
      throw error
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

  async function findOverallPerformanceScore(id) {
    // Lost leads
    const filtersToFindLostLeadsInOneYear = { salesAgent: id, status: "Lost" }
    const findLostFilterString = JSON.stringify(filtersToFindLostLeadsInOneYear)
    const lostLeadsInOneYear = await axios.get(
      `http://localhost:3000/leads?minDay=0&maxDay=360&filters=${findLostFilterString}`,
    )

    // Closed leads
    const filtersToFindClosedLeadsInOneYear = {
      salesAgent: id,
      status: "Closed",
    }
    const findClosedFilterString = JSON.stringify(
      filtersToFindClosedLeadsInOneYear,
    )
    const closedLeadsInOneYear = await axios.get(
      `http://localhost:3000/leads?minDay=0&maxDay=360&filters=${findClosedFilterString}`,
    )

    // New leads
    const filtersToFindNewLeadsInOneYear = { salesAgent: id, status: "New" }
    const findNewFilterString = JSON.stringify(filtersToFindNewLeadsInOneYear)
    const NewLeadsInOneYear = await axios.get(
      `http://localhost:3000/leads?minDay=0&maxDay=360&filters=${findNewFilterString}`,
    )

    // Contacted leads
    const filtersToFindContactedLeadsInOneYear = {
      salesAgent: id,
      status: "Contacted",
    }
    const findContactedFilterString = JSON.stringify(
      filtersToFindContactedLeadsInOneYear,
    )
    const ContactedLeadsInOneYear = await axios.get(
      `http://localhost:3000/leads?minDay=0&maxDay=360&filters=${findContactedFilterString}`,
    )

    // Qualified leads
    const filtersToFindQualifiedLeadsInOneYear = {
      salesAgent: id,
      status: "Qualified",
    }
    const findQualifiedFilterString = JSON.stringify(
      filtersToFindQualifiedLeadsInOneYear,
    )
    const QualifiedLeadsInOneYear = await axios.get(
      `http://localhost:3000/leads?minDay=0&maxDay=360&filters=${findQualifiedFilterString}`,
    )

    // Proposal sent leads
    const filtersToFindProposalSentLeadsInOneYear = {
      salesAgent: id,
      status: "Proposal Sent",
    }
    const findProposalSentFilterString = JSON.stringify(
      filtersToFindProposalSentLeadsInOneYear,
    )
    const ProposalSentLeadsInOneYear = await axios.get(
      `http://localhost:3000/leads?minDay=0&maxDay=360&filters=${findProposalSentFilterString}`,
    )

    const denominator =
      NewLeadsInOneYear.data.length +
      ContactedLeadsInOneYear.data.length +
      QualifiedLeadsInOneYear.data.length +
      ProposalSentLeadsInOneYear.data.length +
      lostLeadsInOneYear.data.length +
      closedLeadsInOneYear.data.length

    const numerator = closedLeadsInOneYear.data.length

    return (numerator / denominator) * 10
  }

  async function getPerformanceScores() {
    try {
      const performanceScores = await Promise.all(
        salesAgents.map(async (agent) => {
          const performanceScore = await findOverallPerformanceScore(agent._id)
          agent.performanceScore = Number(performanceScore.toFixed(1)) || 0
          return {
            id: agent._id,
            performanceScore: Number(performanceScore.toFixed(1)) || 0,
          }
        }),
      )
      setPerformanceScores(performanceScores)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getAgentData()
    getManagerData()
  }, [])

  useEffect(() => {
    salesAgents.length && getPerformanceScores()
    if (salesAgents.length && managers.length) {
      addPropertiesInAgentsData(salesAgents)
    }
  }, [salesAgents, managers])

  function getPerformanceScoreByAgentId(id) {
    const obj = performanceScores.find((obj) => obj.id === id)
    return obj && obj.performanceScore
  }

  function getManagerNameById(id) {
    const manager = managers.find((manager) => manager._id === id)
    return manager && manager.name
  }

  function addPropertiesInAgentsData(salesAgents) {
    salesAgents.forEach((agent) => {
      const manager = managers.find((manager) => manager._id === agent.manager)
      agent.managerName = manager.name
    })
  }

  function sortAgentsDataInAscOrderByProp(prop) {
    if (prop === "agentCode") {
      const updatedAgentsData = sortArrayOfCodeNumbersInAscendingOrder(
        salesAgents,
        prop,
      )
      setSalesAgents(updatedAgentsData)
    } else if (prop === "performanceScore") {
      const updatedAgentsData = sortArrayOfNumbersInAscendingOrder(
        salesAgents,
        prop,
      )
      setSalesAgents(updatedAgentsData)
    } else if (prop === "joinedDate") {
      const updatedAgentsData = sortDateInAscOrder(salesAgents, prop)
      setSalesAgents(updatedAgentsData)
    } else {
      const updatedAgentsData = sortArrayOfStringsInAscendingOrder(
        salesAgents,
        prop,
      )
      setSalesAgents(updatedAgentsData)
    }
  }

  function sortAgentsDataInDescOrderByProp(prop) {
    if (prop === "agentCode") {
      const updatedAgentsData = sortArrayOfCodeNumbersInDescendingOrder(
        salesAgents,
        prop,
      )
      setSalesAgents(updatedAgentsData)
    } else if (prop === "performanceScore") {
      const updatedAgentsData = sortArrayOfNumbersInDescendingOrder(
        salesAgents,
        prop,
      )
      setSalesAgents(updatedAgentsData)
    } else if (prop === "joinedDate") {
      const updatedAgentsData = sortDateInDescOrder(salesAgents, prop)
      setSalesAgents(updatedAgentsData)
    } else {
      const updatedAgentsData = sortArrayOfStringsInDescendingOrder(
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
                <h2 className={`${styles.text1}`}>Team</h2>
                <h5 className={`${styles.text2}`}>The Team Members</h5>
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
                <Link
                  to="/addAgent"
                  className={`btn btn-outline-success ${styles.add_people_btn}`}
                >
                  Add New Agent
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
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInAscOrderByProp("role")
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInDescOrderByProp("role")
                                  applySort(true)
                                }}
                              >
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => setOpenFilterInput("role")}
                              >
                                Filter
                              </div>
                              <div
                                className={`btn text-danger ${tableStyles.button}`}
                                onClick={() => removePropertyFilter("role")}
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
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInAscOrderByProp("status")
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInDescOrderByProp("status")
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
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInAscOrderByProp("joinedDate")
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInDescOrderByProp("joinedDate")
                                  applySort(true)
                                }}
                              >
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => setOpenFilterInput("joinedDate")}
                              >
                                Filter
                              </div>
                              <div
                                className={`btn text-danger ${tableStyles.button}`}
                                onClick={() =>
                                  removePropertyFilter("joinedDate")
                                }
                              >
                                Remove Filter
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
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInAscOrderByProp("department")
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInDescOrderByProp("department")
                                  applySort(true)
                                }}
                              >
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => setOpenFilterInput("department")}
                              >
                                Filter
                              </div>
                              <div
                                className={`btn text-danger ${tableStyles.button}`}
                                onClick={() =>
                                  removePropertyFilter("department")
                                }
                              >
                                Remove Filter
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
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInAscOrderByProp("manager")
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInDescOrderByProp("manager")
                                  applySort(true)
                                }}
                              >
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => setOpenFilterInput("manager")}
                              >
                                Filter
                              </div>
                              <div
                                className={`btn text-danger ${tableStyles.button}`}
                                onClick={() => removePropertyFilter("manager")}
                              >
                                Remove Filter
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
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInAscOrderByProp("location")
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInDescOrderByProp("location")
                                  applySort(true)
                                }}
                              >
                                Sort by DESC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => setOpenFilterInput("location")}
                              >
                                Filter
                              </div>
                              <div
                                className={`btn text-danger ${tableStyles.button}`}
                                onClick={() => removePropertyFilter("location")}
                              >
                                Remove Filter
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
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInAscOrderByProp(
                                    "performanceScore",
                                  )
                                  applySort(true)
                                }}
                              >
                                Sort by ASC
                              </div>
                              <div
                                className={`btn ${tableStyles.button}`}
                                onClick={() => {
                                  sortAgentsDataInDescOrderByProp(
                                    "performanceScore",
                                  )
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
                            <td>{agent.role}</td>
                            <td style={{ color: "#70d89d" }}>{agent.status}</td>
                            <td>{agent.joinedDate}</td>
                            <td>{agent.department}</td>
                            <td>{getManagerNameById(agent.manager)}</td>
                            <td>{agent.location}</td>
                            <td>
                              <span style={{ color: "#70d89d" }}>
                                {performanceScores.length &&
                                  getPerformanceScoreByAgentId(agent._id)}
                              </span>{" "}
                              out of 10
                            </td>
                            <td>
                              <Link
                                to={`/salesAgent/${agent._id}`}
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
