import styles from "../style_modules/page_modules/Team.module.css"
import tableStyles from "../style_modules/component_modules/Table.module.css"
import SideBar from "../components/SideBar.jsx"
import NavBar from "../components/NavBar.jsx"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  handleClickOnApplyBtnForFilter as clickHandler,
  removePropertyFilterHandler,
  clearAllFiltersHandler,
  sortDataInAscendingOrderByProperty,
  sortDataInDescendingOrderByProperty,
  unsortData,
} from "../service/functions.js"
import {
  getIdByAgentName,
  getLeadsDataInATimeRange,
  filterLeadsByProperties,
  getAllAgentsData,
} from "../service/requestToServer.js"
import CompressedSideBar from "../components/CompressedSideBar.jsx"
import { leadsFilterOptions } from "../service/reactSelectOptions.js"
import Select from "react-select"
import { customStylesForReportPage } from "../service/reactSelectCustomStyles.js"

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
  const [closeMenu, setCloseMenu] = useState(false)
  const [isMenuBtnClicked, setIsMenuBtnClicked] = useState(false)
  const [selectedFilterOption, setSelectedFilterOption] = useState("")

  const { state } = useLocation()

  useEffect(() => {
    if (state !== null) {
      setCloseMenu(state)
    }
  }, [])

  function getAgentNameById(id) {
    const agent = salesAgents.find((agent) => agent._id === id)
    return agent.name
  }

  async function handleClick() {
    clickHandler({
      openFilterInput,
      properties,
      filterByProperties: filterLeadsByProperties,
      setProperties,
      getIdByAgentName,
      setFunction: setLeadsData,
    })
  }

  async function removePropertyFilter(property) {
    removePropertyFilterHandler({
      properties,
      property,
      filterByProperties: filterLeadsByProperties,
      setFunction: setLeadsData,
      setProperties,
    })
  }

  async function clearAllFilters() {
    clearAllFiltersHandler({
      properties,
      filterByProperties: filterLeadsByProperties,
      setFunction: setLeadsData,
      setProperties,
    })
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
      const agent = salesAgents.find((agent) => agent._id === lead.salesAgent)
      lead.agentName = agent.name
    })
  }

  function sortLeadsDataInDescOrderByProp(prop) {
    sortDataInDescendingOrderByProperty({
      data: leadsData,
      prop,
      setFunction: setLeadsData,
    })
  }

  async function unsortLeadsData() {
    unsortData({
      properties,
      filterByProperties: filterLeadsByProperties,
      setFunction: setLeadsData,
      applySort,
    })
  }

  useEffect(() => {
    async function fetch() {
      await getAllAgentsData(setSalesAgents)
      await getLeadsDataInATimeRange({ setFunction: setLeadsData, endDay: 30 })
    }
    fetch()
  }, [])

  useEffect(() => {
    if (leadsData.length && salesAgents.length) {
      addPropertiesInLeadsData(leadsData)
    }
  }, [leadsData])

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
                  state={closeMenu}
                >
                  Add New Lead
                </Link>
              </div>
            </div>
            <div
              className={`d-flex text-align-center justify-content-end position-relative ${styles.select}`}
            >
              <Select
                options={leadsFilterOptions}
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
                        onClick={() =>
                          setOpenFilterInput(
                            selectedFilterOption === "agentName"
                              ? "salesAgent"
                              : selectedFilterOption,
                          )
                        }
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
                          removePropertyFilter(
                            selectedFilterOption === "agentName"
                              ? "salesAgent"
                              : selectedFilterOption,
                          )
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
                <table className={`table ${styles.table} ${tableStyles.table}`}>
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
                          className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                          className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                          className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                          className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                          className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                          className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                          className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                          className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                      {leadsData &&
                        leadsData.map((lead) => {
                          return (
                            <div
                              className="col-12 col-lg-6"
                              key={lead.leadCode}
                            >
                              <div className={`card mb-3 ${styles.card}`}>
                                <div className="card-body d-flex gap-2 justify-content-between">
                                  <div className={`${styles.lead_description}`}>
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
                                        {getAgentNameById(lead.salesAgent)}
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
                                    <p className="mb-0">
                                      <b>Closed At:</b>{" "}
                                      {lead.closedAt ? lead.closedAt : "___"}
                                    </p>
                                  </div>
                                  <div>
                                    <p>
                                      <span
                                        className={`badge d-none d-sm-block ${styles.badge} text-bg-success`}
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
          </section>
        </main>
      </div>
    </div>
  )
}
