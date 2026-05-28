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
  getTotalSalesAmountOfAgent,
  sortDataInAscendingOrderByProperty,
  sortDataInDescendingOrderByProperty,
  unsortData,
  sortArrayOfObjectsInDescendingOrderByPropertyContainingNumber,
} from "../service/functions.js"

import {
  filterAgentsByProperties,
  getSalesDataInATimeRange,
} from "../service/requestToServer.js"
import CompressedSideBar from "../components/CompressedSideBar.jsx"
import { salesInfoFilterOptions } from "../service/reactSelectOptions.js"
import Select from "react-select"
import { customStylesForReportPage } from "../service/reactSelectCustomStyles.js"
import TableShimmer from "../shimmer_effects/Table.shimmer.jsx"

export default function SalesInfo() {
  const [idBtnClicked, setIdBtnClick] = useState(false)
  const [nameBtnClicked, setNameBtnClick] = useState(false)
  const [phoneNumberBtnClicked, setPhoneNumberBtnClick] = useState(false)
  const [emailBtnClicked, setEmailBtnClick] = useState(false)
  const [totalSaleBtnClicked, setTotalSaleBtnClick] = useState(false)
  const [rankBtnClicked, setRankBtnClicked] = useState(false)
  const [salesAgents, setSalesAgents] = useState([])
  const [updatedSalesAgents, setUpdatedSalesAgents] = useState([])
  const [salesData, setSalesData] = useState([])
  const [sortApplied, applySort] = useState(false)

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
        filterByProperties: filterAgentsByProperties,
        setProperties,
        setFunction: getUpdatedAgentsArray,
        setIsError,
      })
    } catch (error) {
      if (import.meta.env.VITE_MODE === "DEVELOPMENT") {
        console.error(error)
      }
      setIsError(error.message)
    }
  }

  async function removePropertyFilter(property) {
    try {
      removePropertyFilterHandler({
        properties,
        property,
        filterByProperties: filterAgentsByProperties,
        setFunction: getUpdatedAgentsArray,
        setProperties,
        setIsError,
      })
    } catch (error) {
      if (import.meta.env.VITE_MODE === "DEVELOPMENT") {
        console.error(error)
      }
      setIsError(error.message)
    }
  }

  async function clearAllFilters() {
    try {
      clearAllFiltersHandler({
        properties,
        filterByProperties: filterAgentsByProperties,
        setFunction: getUpdatedAgentsArray,
        setProperties,
        setIsError,
      })
    } catch (error) {
      if (import.meta.env.VITE_MODE === "DEVELOPMENT") {
        console.error(error)
      }
      setIsError(error.message)
    }
  }

  function getUpdatedAgentsArray(salesAgents) {
    const updatedArray = salesAgents.map((agent) => {
      const totalSaleDoneByTheAgent = getTotalSalesAmountOfAgent({
        agentId: agent._id,
        salesData,
      })
      agent.totalSalesDoneInBtw30Days = totalSaleDoneByTheAgent
      return agent
    })
    const SortBySalesDoneInBtw30Days =
      sortArrayOfObjectsInDescendingOrderByPropertyContainingNumber(
        updatedArray,
        "totalSalesDoneInBtw30Days",
      )
    const assignRankToEachSalesAgents = SortBySalesDoneInBtw30Days.map(
      (agent, index) => {
        agent.rank = index + 1
        return agent
      },
    )
    setUpdatedSalesAgents(assignRankToEachSalesAgents)
  }

  function sortAgentsDataInAscOrderByProp(prop) {
    sortDataInAscendingOrderByProperty({
      data: salesAgents,
      prop,
      setFunction: setUpdatedSalesAgents,
    })
  }

  function sortAgentsDataInDescOrderByProp(prop) {
    sortDataInDescendingOrderByProperty({
      data: salesAgents,
      prop,
      setFunction: setUpdatedSalesAgents,
    })
  }

  async function unsortAgentsData() {
    try {
      unsortData({
        properties,
        filterByProperties: filterAgentsByProperties,
        setFunction: getUpdatedAgentsArray,
        applySort,
        setIsError,
      })
    } catch (error) {
      if (import.meta.env.VITE_MODE === "DEVELOPMENT") {
        console.error(error)
      }
      setIsError(error.message)
    }
  }

  async function fetchData(setLoading, setIsError) {
    try {
      setLoading(true)

      await getSalesDataInATimeRange({
        setFunction: setSalesData,
        endDay: 30,
        setIsError,
      })
      const filterString = JSON.stringify({ isInTeam: true })
      await filterAgentsByProperties(filterString, setSalesAgents, setIsError)
    } catch (error) {
      if (import.meta.env.VITE_MODE === "DEVELOPMENT") {
        console.error(error)
      }
      setIsError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(setLoading, setIsError)
  }, [])

  useEffect(() => {
    salesAgents.length && !isError && getUpdatedAgentsArray(salesAgents)
  }, [salesAgents])

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
                <h2 className={`${styles.text1}`}>Sales</h2>
                <h5 className={`${styles.text2}`}>Sales In This Month</h5>
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
            <div
              className={`d-flex text-align-center justify-content-end position-relative ${styles.select}`}
            >
              <Select
                options={salesInfoFilterOptions}
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
                    selectedFilterOption !== "totalSalesDoneInBtw30Days" &&
                    selectedFilterOption !== "rank" ? (
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
                    selectedFilterOption !== "totalSalesDoneInBtw30Days" &&
                    selectedFilterOption !== "rank" ? (
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
            {updatedSalesAgents.length === 0 ? (
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
                              setTotalSaleBtnClick(false)
                              setRankBtnClicked(false)
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
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                          <span>Email</span>
                          <i
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                                className={`${tableStyles.filter_btn_container} ${tableStyles.filter_btn_container_end}`}
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
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                              <div
                                className={`${tableStyles.filter_btn_container}`}
                              >
                                <div
                                  className={`btn ${tableStyles.button}`}
                                  onClick={() => {
                                    sortAgentsDataInAscOrderByProp(
                                      "phoneNumber",
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
                                      "phoneNumber",
                                    )
                                    applySort(true)
                                  }}
                                >
                                  Sort by DESC
                                </div>
                                <div
                                  className={`btn ${tableStyles.button}`}
                                  onClick={() =>
                                    setOpenFilterInput("phoneNumber")
                                  }
                                >
                                  Filter
                                </div>
                                <div
                                  className={`btn text-danger ${tableStyles.button}`}
                                  onClick={() =>
                                    removePropertyFilter("phoneNumber")
                                  }
                                >
                                  Remove Filter
                                </div>
                              </div>
                            )}
                          </i>
                        </th>
                        <th className={`${tableStyles.col}`} scope="col">
                          <span>Total Sale</span>
                          <i
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                              <div
                                className={`${tableStyles.filter_btn_container}`}
                              >
                                <div
                                  className={`btn ${tableStyles.button}`}
                                  onClick={() => {
                                    sortAgentsDataInAscOrderByProp(
                                      "totalSalesDoneInBtw30Days",
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
                                      "totalSalesDoneInBtw30Days",
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
                          <span>Rank</span>
                          <i
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                              <div
                                className={`${tableStyles.filter_btn_container}`}
                              >
                                <div
                                  className={`btn ${tableStyles.button}`}
                                  onClick={() => {
                                    sortAgentsDataInAscOrderByProp("rank")
                                    applySort(true)
                                  }}
                                >
                                  Sort by ASC
                                </div>
                                <div
                                  className={`btn ${tableStyles.button}`}
                                  onClick={() => {
                                    sortAgentsDataInDescOrderByProp("rank")
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
                      {updatedSalesAgents &&
                        updatedSalesAgents.map((agent) => {
                          return (
                            <tr key={agent.agentCode}>
                              <th scope="row">{agent.agentCode}</th>
                              <td>{agent.name}</td>
                              <td style={{ color: "#70d89d" }}>
                                {agent.email}
                              </td>
                              <td>{agent.phoneNumber}</td>
                              <td style={{ color: "#70d89d" }}>
                                ${agent.totalSalesDoneInBtw30Days}
                              </td>
                              <td>{agent.rank}</td>
                              <td>
                                <Link
                                  to={`/salesAgent/${agent._id}`}
                                  className="btn btn-success btn-sm"
                                  state={closeMenu}
                                >
                                  View Profile
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
                        {updatedSalesAgents &&
                          updatedSalesAgents.map((agent) => {
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
                                        <b>Email:</b>{" "}
                                        <span style={{ color: "#70d89d" }}>
                                          {agent.email}
                                        </span>
                                      </p>
                                      <p>
                                        <b>Phone Number:</b> {agent.phoneNumber}
                                      </p>
                                      <p>
                                        <b>Total Sale:</b>{" "}
                                        <span style={{ color: "#70d89d" }}>
                                          ${agent.totalSalesDoneInBtw30Days}
                                        </span>
                                      </p>
                                      <p className="d-block d-sm-none">
                                        <b>Rank:</b> {agent.rank}
                                      </p>
                                    </div>
                                    <div>
                                      <p>
                                        <span
                                          className={`badge ${styles.badge} d-none d-sm-block text-bg-success`}
                                        >
                                          Rank: {agent.rank}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className={`${styles.card_footer}`}>
                                    <p className="mb-0 p-2">
                                      <Link
                                        to={`/salesAgent/${agent._id}`}
                                        className="btn btn-success btn-sm"
                                        state={closeMenu}
                                      >
                                        View Profile
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
        </main>
      </div>
    </div>
  )
}
