import styles from "../style_modules/page_modules/SalesAgent.module.css"
import tableStyles from "../style_modules/component_modules/Table.module.css"
import SideBar from "../components/SideBar"
import NavBar from "../components/NavBar.jsx"
import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import {
  handleClickOnApplyBtnForFilter as clickHandler,
  removePropertyFilterHandler,
  clearAllFiltersHandler,
  sortDataInAscendingOrderByProperty,
  sortDataInDescendingOrderByProperty,
  unsortData,
  getScoreOfAgent,
  numberOfLeadsHandleByAgent,
  leadsHandleByAgentAccordingToStatus,
} from "../service/functions.js"
import {
  getIdByAgentName,
  filterLeadsByProperties,
  getLeadDataByPropertyInATimeRange,
  filterAgentsByProperties,
  getOverallPerformanceScores,
} from "../service/requestToServer.js"
import CompressedSideBar from "../components/CompressedSideBar.jsx"
import { leadsHandledBySalesAgentFilterOptions } from "../service/reactSelectOptions.js"
import Select from "react-select"
import { customStylesForReportPage } from "../service/reactSelectCustomStyles.js"
import TableShimmer from "../shimmer_effects/Table.shimmer.jsx"

export default function SalesAgent() {
  const id = useParams().id
  const [idBtnClicked, setIdBtnClick] = useState(false)
  const [nameBtnClicked, setNameBtnClick] = useState(false)
  const [sourceBtnClicked, setSourceBtnClick] = useState(false)
  const [statusBtnClicked, setStatusBtnClick] = useState(false)
  const [tagsBtnClicked, setTagsBtnClick] = useState(false)
  const [priorityBtnClicked, setPriorityBtnClick] = useState(false)
  const [timeToCloseBtnClicked, setTimeToCloseBtnClick] = useState(false)
  const [closedAtBtnClicked, setClosedAtBtnClick] = useState(false)

  const [leadsData, setLeadsData] = useState([])
  const [updatedLeadsData, setUpdatedLeadsData] = useState([])
  const [agent, setAgent] = useState([])
  const [sortApplied, applySort] = useState(false)
  const [getOverallPerformanceScore, setOverallPerformanceScore] =
    useState(null)

  const [openFilterInput, setOpenFilterInput] = useState("")
  const [properties, setProperties] = useState({})
  const [closeMenu, setCloseMenu] = useState(false)
  const [isMenuBtnClicked, setIsMenuBtnClicked] = useState(false)
  const [selectedFilterOption, setSelectedFilterOption] = useState("")
  const [isError, setIsError] = useState("")
  const [openFilterDropdownMenu, setOpenFilterDropdownMenu] = useState(false)
  const [loading, setLoading] = useState(false)

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
        filterByProperties: filterLeadsByProperties,
        setProperties,
        setFunction: setLeadsData,
        getIdByAgentName,
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
        filterByProperties: filterLeadsByProperties,
        setFunction: setLeadsData,
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
        filterByProperties: filterLeadsByProperties,
        setFunction: setLeadsData,
        setProperties,
        setIsError,
      })
    } catch (error) {
      console.error(error)
      setIsError(error.message)
    }
  }

  function sortLeadsDataInAscOrderByProp(prop) {
    sortDataInAscendingOrderByProperty({
      data: leadsData,
      prop,
      setFunction: setLeadsData,
    })
  }

  function addPropertiesInLeadsData(leadsData) {
    leadsData.forEach((lead) => {
      lead.agentName = agent[0].name
    })
    setUpdatedLeadsData(leadsData)
  }

  function sortLeadsDataInDescOrderByProp(prop) {
    sortDataInDescendingOrderByProperty({
      data: leadsData,
      prop,
      setFunction: setLeadsData,
    })
  }

  async function unsortLeadsData() {
    try {
      unsortData({
        properties,
        filterByProperties: filterLeadsByProperties,
        setFunction: setLeadsData,
        applySort,
        setIsError,
      })
    } catch (error) {
      console.error(error)
      setIsError(error.message)
    }
  }

  const {
    newLeads,
    contactedLeads,
    qualifiedLeads,
    proposalSentLeads,
    closedLeads,
    lostLeads,
  } = leadsHandleByAgentAccordingToStatus({ leadsData, agentId: id })

  async function fetchData(setLoading, setIsError) {
    try {
      setLoading(true)

      const filterString = JSON.stringify({ _id: id })
      await filterAgentsByProperties(filterString, setAgent, setIsError)
      await getLeadDataByPropertyInATimeRange(
        { salesAgent: id },
        30,
        setLeadsData,
        setIsError,
      )
    } catch (error) {
      console.error(error)
      setIsError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(setLoading, setIsError)
  }, [])

  useEffect(() => {
    if (leadsData.length && agent.length && !isError) {
      addPropertiesInLeadsData(leadsData)
      getOverallPerformanceScores({
        salesAgents: agent,
        setFunction: setOverallPerformanceScore,
      })
    }
  }, [leadsData])

  return (
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
          <section className={`${styles.child_section_one}`}>
            <div className={`${styles.profile_image}`}>
              <span>
                {Object.keys(agent).length &&
                  agent[0].name.split("")[0].toUpperCase()}
              </span>
            </div>
            <p>
              Name: <span>{agent[0]?.name}</span>
            </p>
            <p>
              Phone: <span>{agent[0]?.phoneNumber}</span>
            </p>
            <p>
              Email: <span>{agent[0]?.email}</span>
            </p>
            {getOverallPerformanceScore && (
              <p>
                Overall Score:{" "}
                <span>
                  {
                    getOverallPerformanceScore.find((ele) => ele.id === id)
                      .performanceScore
                  }{" "}
                  / 10
                </span>
              </p>
            )}
            <Link
              to={`/editAgent/${agent[0]?._id}`}
              className={`btn btn-outline-success ${styles.edit_agent_btn}`}
            >
              Edit Agent
            </Link>
          </section>
          <section className={`${styles.child_section_two}`}>
            <h6 className="mb-3" style={{ color: "#44C9BD" }}>
              Performance In Between 30 days
            </h6>
            <div className={`${tableStyles.table_container}`}>
              <table className={`table ${styles.table_2} ${tableStyles.table}`}>
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
                    <th scope="row">{newLeads.length}</th>
                    <td>{contactedLeads.length}</td>
                    <td>{qualifiedLeads.length}</td>
                    <td>{proposalSentLeads.length}</td>
                    <td>{closedLeads.length}</td>
                    <td style={{ color: "#44C9BD" }}>
                      {getScoreOfAgent({
                        leadsData,
                        agentId: id,
                      }) || 0}{" "}
                      / 10
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className={`${styles.card_wrapper_2}`}>
                <div className={`${styles.head}`}></div>
                <div className={`${styles.card_container}`}>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <div className={`card mb-3 ${styles.card}`}>
                        <div className="card-body d-flex gap-2 justify-content-between">
                          <div className={`${styles.lead_description}`}>
                            <p>
                              <b>New Lead:</b> {newLeads.length}
                            </p>
                            <p>
                              <b>Contacted:</b> {contactedLeads.length}
                            </p>
                            <p>
                              <b>Qualified:</b> {qualifiedLeads.length}
                            </p>
                            <p>
                              <b>Proposal Send:</b> {proposalSentLeads.length}
                            </p>
                            <p>
                              <b>closed:</b> {closedLeads.length}
                            </p>
                            <p>
                              <b>Score:</b>{" "}
                              <span style={{ color: "#44C9BD" }}>
                                {getScoreOfAgent({
                                  leadsData,
                                  agentId: id,
                                }) || 0}{" "}
                                / 10
                              </span>
                            </p>
                          </div>
                          <div>
                            {agent.length !== 0 && (
                              <p>
                                <span
                                  className={`badge ${styles.badge} ${agent[0].status === "Active" ? "text-bg-success" : "text-bg-danger"}`}
                                >
                                  {agent[0].status}
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={`${styles.child_section_three}`}>
            <div className={`${styles.heading_container}`}>
              <div className={`${styles.heading}`}>
                <h6 style={{ color: "#44C9BD" }}>
                  Leads Handle By Agent In Between 30 days
                </h6>
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
              </div>
            </div>
            <div
              className={`d-flex text-align-center justify-content-end position-relative ${styles.select}`}
            >
              <Select
                options={leadsHandledBySalesAgentFilterOptions}
                styles={customStylesForReportPage}
                placeholder="Filter options"
                classNamePrefix="custom-select"
                name="source"
                id="source"
                onChange={(selected) => {
                  setSelectedFilterOption(selected.value)
                  setOpenFilterDropdownMenu(true)
                }}
                onMenuOpen={() => setOpenFilterDropdownMenu(false)}
              />
              <div
                className="filter_dropdown_menu_container"
                onClick={() => setSelectedFilterOption("")}
              >
                {selectedFilterOption && openFilterDropdownMenu && (
                  <div
                    className={`${tableStyles.filter_dropdown_menu} ${tableStyles.filter_btn_container}`}
                  >
                    <div
                      className={`btn ${tableStyles.button}`}
                      onClick={() => {
                        sortLeadsDataInAscOrderByProp(selectedFilterOption)
                        applySort(true)
                      }}
                    >
                      Sort by ASC
                    </div>
                    <div
                      className={`btn ${tableStyles.button}`}
                      onClick={() => {
                        sortLeadsDataInDescOrderByProp(selectedFilterOption)
                        applySort(true)
                      }}
                    >
                      Sort by DESC
                    </div>
                    {selectedFilterOption !== "leadCode" ? (
                      <div
                        className={`btn ${tableStyles.button}`}
                        onClick={() => setOpenFilterInput(selectedFilterOption)}
                      >
                        Filter
                      </div>
                    ) : (
                      ""
                    )}
                    {selectedFilterOption !== "leadCode" ? (
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
            {updatedLeadsData.length === 0 ? (
              <TableShimmer
                loading={loading}
                isError={isError}
                setLoading={setLoading}
                setIsError={setIsError}
                fetchData={fetchData}
              />
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
                              setSourceBtnClick(false)
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
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
                            onClick={() => {
                              setIdBtnClick(false)
                              setNameBtnClick(nameBtnClicked ? false : true)
                              setSourceBtnClick(false)
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
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
                            onClick={() => {
                              setIdBtnClick(false)
                              setNameBtnClick(false)
                              setSourceBtnClick(sourceBtnClicked ? false : true)
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
                        </th>
                        <th className={`${tableStyles.col}`} scope="col">
                          <span>Status</span>
                          <i
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
                            onClick={() => {
                              setIdBtnClick(false)
                              setNameBtnClick(false)
                              setSourceBtnClick(false)
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
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
                            onClick={() => {
                              setIdBtnClick(false)
                              setNameBtnClick(false)
                              setSourceBtnClick(false)
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
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
                            onClick={() => {
                              setIdBtnClick(false)
                              setNameBtnClick(false)
                              setSourceBtnClick(false)
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
                                  onClick={() =>
                                    removePropertyFilter("priority")
                                  }
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
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
                            onClick={() => {
                              setIdBtnClick(false)
                              setNameBtnClick(false)
                              setSourceBtnClick(false)
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
                                    sortLeadsDataInDescOrderByProp(
                                      "timeToClose",
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
                          <span>Closed At</span>
                          <i
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
                            onClick={() => {
                              setIdBtnClick(false)
                              setNameBtnClick(false)
                              setSourceBtnClick(false)
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
                                  onClick={() =>
                                    removePropertyFilter("closedAt")
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
                      {updatedLeadsData &&
                        updatedLeadsData.map((lead) => {
                          return (
                            <tr key={lead.leadCode}>
                              <th scope="row">{lead.leadCode}</th>
                              <td>{lead.name}</td>
                              <td>{lead.source}</td>
                              <td style={{ color: "#70d89d" }}>
                                {lead.agentName}
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
                                  to={`/lead/${lead._id}`}
                                  className="btn btn-success btn-sm"
                                  state={closeMenu}
                                >
                                  Manage Lead
                                </Link>
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                  <div className={`${styles.card_wrapper}`}>
                    <div className={`${styles.head}`}></div>
                    <div className={`${styles.card_container}`}>
                      <div className="row">
                        {updatedLeadsData &&
                          updatedLeadsData.map((lead) => {
                            return (
                              <div
                                className="col-12 col-lg-6"
                                key={lead.leadCode}
                              >
                                <div className={`card mb-3 ${styles.card}`}>
                                  <div className="card-body d-flex gap-2 justify-content-between">
                                    <div
                                      className={`${styles.lead_description}`}
                                    >
                                      <p>
                                        <b>Code:</b> {lead.leadCode}
                                      </p>
                                      <p>
                                        <b>Name:</b> {lead.name}
                                      </p>
                                      <p>
                                        <b>Source:</b> {lead.source}
                                      </p>
                                      <p>
                                        <b>Sales Agent:</b>{" "}
                                        <span style={{ color: "#70d89d" }}>
                                          {lead.agentName}
                                        </span>
                                      </p>
                                      <p className="d-block d-sm-none">
                                        <b>Status:</b>{" "}
                                        <span style={{ color: "#70d89d" }}>
                                          {lead.status}
                                        </span>
                                      </p>
                                      <p>
                                        <b>Tags:</b> {lead.tags}
                                      </p>
                                      <p>
                                        <b>Priority:</b> {lead.priority}
                                      </p>
                                      <p>
                                        <b>Time To Close:</b>{" "}
                                        {lead.timeToClose
                                          ? `${lead.timeToClose} days`
                                          : "___"}
                                      </p>
                                      <p>
                                        <b>Closed At:</b>{" "}
                                        <span style={{ color: "#70d89d" }}>
                                          {lead.closedAt
                                            ? lead.closedAt
                                            : "___"}
                                        </span>
                                      </p>
                                    </div>
                                    <div>
                                      <p>
                                        <span
                                          className={`badge ${styles.badge} d-none d-sm-block text-bg-success`}
                                        >
                                          {lead.status}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className={`${styles.card_footer}`}>
                                    <p className="mb-0 p-2">
                                      <Link
                                        to={`/lead/${lead._id}`}
                                        className="btn btn-success btn-sm"
                                        state={closeMenu}
                                      >
                                        Manage Lead
                                      </Link>
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
        </section>
      </main>
    </div>
  )
}
