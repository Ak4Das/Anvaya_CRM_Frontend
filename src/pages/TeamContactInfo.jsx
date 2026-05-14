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
  filterAgentsByProperties,
  getAllAgentsData,
} from "../service/requestToServer.js"
import CompressedSideBar from "../components/CompressedSideBar.jsx"
import { teamContactFilterOptions } from "../service/reactSelectOptions.js"
import Select from "react-select"
import { customStylesForReportPage } from "../service/reactSelectCustomStyles.js"
import TableShimmer from "../shimmer_effects/Table.shimmer.jsx"

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
  const [closeMenu, setCloseMenu] = useState(false)
  const [isMenuBtnClicked, setIsMenuBtnClicked] = useState(false)
  const [selectedFilterOption, setSelectedFilterOption] = useState("")

  const { state } = useLocation()

  useEffect(() => {
    if (state !== null) {
      setCloseMenu(state)
    }
  }, [])

  function handleClick() {
    clickHandler({
      openFilterInput,
      properties,
      filterByProperties: filterAgentsByProperties,
      setFunction: setSalesAgents,
      setProperties,
    })
  }

  function removePropertyFilter(property) {
    removePropertyFilterHandler({
      properties,
      property,
      filterByProperties: filterAgentsByProperties,
      setFunction: setSalesAgents,
      setProperties,
    })
  }

  async function clearAllFilters() {
    clearAllFiltersHandler({
      properties,
      filterByProperties: filterAgentsByProperties,
      setFunction: setSalesAgents,
      setProperties,
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
    unsortData({
      properties,
      filterByProperties: filterAgentsByProperties,
      setFunction: setSalesAgents,
      applySort,
    })
  }

  useEffect(() => {
    getAllAgentsData(setSalesAgents)
  }, [])

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
            <div
              className={`d-flex text-align-center justify-content-end position-relative ${styles.select}`}
            >
              <Select
                options={teamContactFilterOptions}
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
                    {selectedFilterOption !== "agentCode" ? (
                      <div
                        className={`btn ${tableStyles.button}`}
                        onClick={() => setOpenFilterInput(selectedFilterOption)}
                      >
                        Filter
                      </div>
                    ) : (
                      ""
                    )}
                    {selectedFilterOption !== "agentCode" ? (
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
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                                    sortAgentsDataInAscOrderByProp(
                                      "dateOfBirth",
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
                                      "dateOfBirth",
                                    )
                                    applySort(true)
                                  }}
                                >
                                  Sort by DESC
                                </div>
                                <div
                                  className={`btn ${tableStyles.button}`}
                                  onClick={() =>
                                    setOpenFilterInput("dateOfBirth")
                                  }
                                >
                                  Filter
                                </div>
                                <div
                                  className={`btn text-danger ${tableStyles.button}`}
                                  onClick={() =>
                                    removePropertyFilter("dateOfBirth")
                                  }
                                >
                                  Remove Filter
                                </div>
                              </div>
                            )}
                          </i>
                        </th>
                        <th className={`${tableStyles.col}`} scope="col">
                          <span>Country</span>
                          <i
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
                            onClick={() => {
                              setIdBtnClick(false)
                              setNameBtnClick(false)
                              setDateOfBirthBtnClick(false)
                              setCountryBtnClick(
                                countryBtnClicked ? false : true,
                              )
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
                                  onClick={() =>
                                    removePropertyFilter("country")
                                  }
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
                            className={`bi bi-three-dots-vertical ${tableStyles.vertical_three_dot_icon}`}
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
                                    setOpenFilterInput("phoneNumberNormalized")
                                  }
                                >
                                  Filter
                                </div>
                                <div
                                  className={`btn text-danger ${tableStyles.button}`}
                                  onClick={() =>
                                    removePropertyFilter(
                                      "phoneNumberNormalized",
                                    )
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
                              <td style={{ color: "#70d89d" }}>
                                {agent.email}
                              </td>
                              <td>{agent.phoneNumber}</td>
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
                                        <b>Date Of Birth:</b>{" "}
                                        {agent.dateOfBirth}
                                      </p>
                                      <p>
                                        <b>Country:</b> {agent.country}
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
                                      <p className="d-block d-sm-none">
                                        <b>Status:</b>{" "}
                                        <span style={{ color: "#70d89d" }}>
                                          {agent.status}
                                        </span>
                                      </p>
                                    </div>
                                    <div>
                                      <p>
                                        <span
                                          className={`badge ${styles.badge} d-none d-sm-block ${agent.status === "Active" ? "text-bg-success" : "text-bg-danger"}`}
                                        >
                                          {agent.status}
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
