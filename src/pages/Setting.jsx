import styles from "../style_modules/page_modules/Team.module.css"
import tableStyles from "../style_modules/component_modules/Table.module.css"
import SideBar from "../components/SideBar.jsx"
import NavBar from "../components/NavBar.jsx"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  handleClickOnApplyBtnForFilter as clickHandler,
  capitalizeFirstLetter,
  removePropertyFilterHandler,
  clearAllFiltersHandler,
  sortDataInAscendingOrderByProperty,
  sortDataInDescendingOrderByProperty,
  unsortData,
} from "../service/functions.js"
import {
  getIdByManagerName,
  getAllAgentsData,
  getAllManagersData,
  filterAgentsByProperties,
  findOverallPerformanceScoreOfAgent,
  getOverallPerformanceScores,
  deleteAgent,
} from "../service/requestToServer.js"
import CompressedSideBar from "../components/CompressedSideBar.jsx"
import { teamFilterOptions } from "../service/reactSelectOptions.js"
import Select from "react-select"
import { customStylesForReportPage } from "../service/reactSelectCustomStyles.js"
import TableShimmer from "../shimmer_effects/Table.shimmer.jsx"
import { toast } from "react-toastify"

export default function Settings() {
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
  const [overallPerformanceScores, setOverallPerformanceScores] = useState([])
  const [sortApplied, applySort] = useState(false)

  const [openFilterInput, setOpenFilterInput] = useState("")
  const [properties, setProperties] = useState({})
  const [closeMenu, setCloseMenu] = useState(false)
  const [isMenuBtnClicked, setIsMenuBtnClicked] = useState(false)
  const [selectedFilterOption, setSelectedFilterOption] = useState("")
  const [isError, setIsError] = useState("")

  const { state } = useLocation()

  useEffect(() => {
    if (state !== null) {
      setCloseMenu(state)
    }
  }, [])

  async function handleClick() {
    try {
      clickHandler({
        openFilterInput,
        properties,
        filterByProperties: filterAgentsByProperties,
        setFunction: setSalesAgents,
        setProperties,
        getIdByManagerName,
        setIsError,
      })
    } catch (error) {
      console.error(error)
      setIsError(error.message)
    }
  }

  async function removePropertyFilter(property) {
    try {
      removePropertyFilterHandler({
        properties,
        property,
        filterByProperties: filterAgentsByProperties,
        setFunction: setSalesAgents,
        setProperties,
        setIsError,
      })
    } catch (error) {
      console.error(error)
      setIsError(error.message)
    }
  }

  async function clearAllFilters() {
    try {
      clearAllFiltersHandler({
        properties,
        filterByProperties: filterAgentsByProperties,
        setFunction: setSalesAgents,
        setProperties,
        setIsError,
      })
    } catch (error) {
      console.error(error)
      setIsError(error.message)
    }
  }

  function getPerformanceScoreByAgentId(id) {
    const obj = overallPerformanceScores.find((obj) => obj.id === id)
    return obj && obj.performanceScore
  }

  function getManagerNameById(id) {
    const manager = managers.find((manager) => manager._id === id)
    return manager && manager.name
  }

  function addManagerNameInAgentsData(salesAgents) {
    salesAgents.forEach((agent) => {
      const manager = managers.find((manager) => manager._id === agent.manager)
      agent.managerName = manager.name
    })
  }

  function sortAgentsDataInAscOrderByProp(prop) {
    sortDataInAscendingOrderByProperty({
      data: salesAgents,
      prop,
      setFunction: setSalesAgents,
    })
  }

  function sortAgentsDataInDescOrderByProp(prop) {
    sortDataInDescendingOrderByProperty({
      data: salesAgents,
      prop,
      setFunction: setSalesAgents,
    })
  }

  async function unsortAgentsData() {
    try {
      unsortData({
        properties,
        filterByProperties: filterAgentsByProperties,
        setFunction: setSalesAgents,
        applySort,
        setIsError,
      })
    } catch (error) {
      console.error(error)
      setIsError(error.message)
    }
  }

  useEffect(() => {
    async function fetch() {
      try {
        await getAllAgentsData(setSalesAgents, setIsError)
        await getAllManagersData(setManagers, setIsError)
      } catch (error) {
        console.error(error)
        setIsError(error.message)
      }
    }
    fetch()
  }, [])

  useEffect(() => {
    salesAgents.length &&
      getOverallPerformanceScores({
        salesAgents,
        setFunction: setOverallPerformanceScores,
      })
    if (salesAgents.length && managers.length) {
      addManagerNameInAgentsData(salesAgents)
    }
  }, [managers, salesAgents])

  return (
    <div>
      <div className={`app ${styles.app}`}>
        <div className={`${styles.sidebar_container_1}`}>
          {!closeMenu ? (
            <SideBar closeMenu={closeMenu} setCloseMenu={setCloseMenu} />
          ) : (
            <CompressedSideBar
              closeMenu={closeMenu}
              setCloseMenu={setCloseMenu}
            />
          )}
        </div>
        <div className={`${styles.sidebar_container_2}`}>
          {isMenuBtnClicked && (
            <SideBar
              closeMenu={closeMenu}
              setCloseMenu={setCloseMenu}
              setIsMenuBtnClicked={setIsMenuBtnClicked}
            />
          )}
        </div>
        <button
          className={`${styles.menu_button}`}
          title="Menu"
          onClick={() => setIsMenuBtnClicked(true)}
        >
          <i className="bi bi-list"></i>
        </button>
        <main className={`content`}>
          <NavBar setIsMenuBtnClicked={setIsMenuBtnClicked} />
          <section className={`main_section`}>
            <div className={`${styles.heading_container}`}>
              <div className={`${styles.heading}`}>
                <h2 className={`${styles.text1}`}>Settings</h2>
                <h5 className={`${styles.text2}`}>Remove Agent</h5>
              </div>
              <div className="d-flex gap-3">
                {sortApplied && (
                  <div
                    className={`btn btn-outline-danger ${styles.unsort_btn_1}`}
                    onClick={unsortAgentsData}
                  >
                    Unsort
                  </div>
                )}
                {Object.keys(properties).length !== 0 && (
                  <button
                    className={`btn btn-outline-danger ${styles.clear_filter_btn_1}`}
                    onClick={clearAllFilters}
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
            <div
              className={`d-flex text-align-center justify-content-end position-relative ${styles.select}`}
            >
              <Select
                options={teamFilterOptions}
                styles={customStylesForReportPage}
                placeholder="Filter options"
                classNamePrefix="custom-select"
                name="source"
                id="source"
                onChange={(selected) => setSelectedFilterOption(selected.value)}
              />
              <div
                className="filter_dropdown_menu_container"
                onClick={() => setSelectedFilterOption("")}
              >
                {selectedFilterOption && (
                  <div
                    className={`${tableStyles.filter_dropdown_menu} ${tableStyles.filter_btn_container}`}
                  >
                    <div
                      className={`btn ${tableStyles.button}`}
                      onClick={() => {
                        sortAgentsDataInAscOrderByProp(selectedFilterOption)
                        applySort(true)
                      }}
                    >
                      Sort by ASC
                    </div>
                    <div
                      className={`btn ${tableStyles.button}`}
                      onClick={() => {
                        sortAgentsDataInDescOrderByProp(selectedFilterOption)
                        applySort(true)
                      }}
                    >
                      Sort by DESC
                    </div>
                    {selectedFilterOption !== "agentCode" &&
                    selectedFilterOption !== "performanceScore" ? (
                      <div
                        className={`btn ${tableStyles.button}`}
                        onClick={() => setOpenFilterInput(selectedFilterOption)}
                      >
                        Filter
                      </div>
                    ) : (
                      ""
                    )}
                    {selectedFilterOption !== "agentCode" &&
                    selectedFilterOption !== "performanceScore" ? (
                      <div
                        className={`btn text-danger ${tableStyles.button}`}
                        onClick={() =>
                          removePropertyFilter(selectedFilterOption)
                        }
                      >
                        Remove Filter
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            </div>
            {salesAgents.length === 0 ? (
              <TableShimmer />
            ) : (
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
                  <table
                    className={`table ${styles.table} ${tableStyles.table}`}
                  >
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
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
                            onClick={() => {
                              setIdBtnClick(false)
                              setNameBtnClick(false)
                              setRollBtnClick(false)
                              setStatusBtnClicked(
                                statusBtnClicked ? false : true,
                              )
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
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                                    sortAgentsDataInDescOrderByProp(
                                      "joinedDate",
                                    )
                                    applySort(true)
                                  }}
                                >
                                  Sort by DESC
                                </div>
                                <div
                                  className={`btn ${tableStyles.button}`}
                                  onClick={() =>
                                    setOpenFilterInput("joinedDate")
                                  }
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
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                                    sortAgentsDataInDescOrderByProp(
                                      "department",
                                    )
                                    applySort(true)
                                  }}
                                >
                                  Sort by DESC
                                </div>
                                <div
                                  className={`btn ${tableStyles.button}`}
                                  onClick={() =>
                                    setOpenFilterInput("department")
                                  }
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
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
                            onClick={() => {
                              setIdBtnClick(false)
                              setNameBtnClick(false)
                              setRollBtnClick(false)
                              setStatusBtnClicked(false)
                              setJoinedDateBtnClicked(false)
                              setDepartmentBtnClick(false)
                              setManagerBtnClick(
                                managerBtnClicked ? false : true,
                              )
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
                                  onClick={() =>
                                    removePropertyFilter("manager")
                                  }
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
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                                  onClick={() =>
                                    removePropertyFilter("location")
                                  }
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
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                          <span>Remove Agent</span>
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
                              <td style={{ color: "#70d89d" }}>
                                {agent.status}
                              </td>
                              <td>{agent.joinedDate}</td>
                              <td>{agent.department}</td>
                              <td>{getManagerNameById(agent.manager)}</td>
                              <td>{agent.location}</td>
                              <td>
                                <span style={{ color: "#70d89d" }}>
                                  {overallPerformanceScores.length &&
                                    getPerformanceScoreByAgentId(agent._id)}
                                </span>{" "}
                                out of 10
                              </td>
                              <td>
                                <button
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={async () => {
                                    // await deleteAgent(agent._id,setIsError)
                                    // await getAllAgentsData(setSalesAgents,setIsError)
                                    toast("Agent Removed Successfully👍")
                                  }}
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                  <div className={`${styles.card_wrapper}`}>
                    <div
                      className={`d-flex align-items-center px-2 justify-content-end gap-3 ${styles.head}`}
                    >
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
                    <div className={`${styles.card_container}`}>
                      <div className="row">
                        {salesAgents &&
                          salesAgents.map((agent) => {
                            return (
                              <div
                                className="col-12 col-lg-6"
                                key={agent.agentCode}
                              >
                                <div className={`card mb-3 ${styles.card}`}>
                                  <div className="card-body d-flex gap-2 justify-content-between">
                                    <div
                                      className={`${styles.agent_description}`}
                                    >
                                      <p>
                                        <b>Code:</b> {agent.agentCode}
                                      </p>
                                      <p>
                                        <b>Name:</b> {agent.name}
                                      </p>
                                      <p>
                                        <b>Role:</b> {agent.role}
                                      </p>
                                      <p className="d-block d-sm-none">
                                        <b>Status:</b>{" "}
                                        <span style={{ color: "#70d89d" }}>
                                          {agent.status}
                                        </span>
                                      </p>
                                      <p>
                                        <b>Joined Date:</b> {agent.joinedDate}
                                      </p>
                                      <p>
                                        <b>Department:</b> {agent.department}
                                      </p>
                                      <p>
                                        <b>Manager:</b>{" "}
                                        {getManagerNameById(agent.manager)}
                                      </p>
                                      <p>
                                        <b>Location:</b> {agent.location}
                                      </p>
                                      <p className="mb-0">
                                        <b>Performance Score:</b>{" "}
                                        <span style={{ color: "#70d89d" }}>
                                          {overallPerformanceScores.length &&
                                            getPerformanceScoreByAgentId(
                                              agent._id,
                                            )}{" "}
                                          / 10
                                        </span>
                                      </p>
                                    </div>
                                    <div>
                                      <p>
                                        <span
                                          className={`badge d-none d-sm-block ${styles.badge} ${agent.status === "Active" ? "text-bg-success" : "text-bg-danger"}`}
                                        >
                                          {agent.status}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className={`${styles.card_footer}`}>
                                    <p className="mb-0 p-2">
                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={async () => {
                                          // await deleteAgent(agent._id,setIsError)
                                          // await getAllAgentsData(setSalesAgents,setIsError)
                                          toast("Agent Removed Successfully👍")
                                        }}
                                      >
                                        Remove
                                      </button>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
