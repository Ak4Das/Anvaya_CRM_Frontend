import styles from "../style_modules/page_modules/Team.module.css"
import tableStyles from "../style_modules/component_modules/Table.module.css"
import SideBar from "../components/SideBar.jsx"
import NavBar from "../components/NavBar.jsx"
import { useEffect, useState } from "react"
import { sortArrayByProperty } from "../functions.js"
import { Link } from "react-router-dom"
import axios from "axios"
import {
  sortArrayOfCodeNumbersInAscendingOrder,
  sortArrayOfCodeNumbersInDescendingOrder,
  sortArrayOfNumbersInAscendingOrder,
  sortArrayOfNumbersInDescendingOrder,
  sortArrayOfPhoneNumbersInAscendingOrder,
  sortArrayOfPhoneNumbersInDescendingOrder,
  sortArrayOfStringsInAscendingOrder,
  sortArrayOfStringsInDescendingOrder,
} from "../functions.js"

export default function SalesInfo() {
  const [idBtnClicked, setIdBtnClick] = useState(false)
  const [nameBtnClicked, setNameBtnClick] = useState(false)
  const [phoneNumberBtnClicked, setPhoneNumberBtnClick] = useState(false)
  const [emailBtnClicked, setEmailBtnClick] = useState(false)
  const [totalSaleBtnClicked, setTotalSaleBtnClick] = useState(false)
  const [rankBtnClicked, setRankBtnClicked] = useState(false)
  const [salesAgents, setSalesAgents] = useState([])
  const [salesData, setSalesData] = useState([])
  const [sortApplied, applySort] = useState(false)

  const [openFilterInput, setOpenFilterInput] = useState("")
  const [properties, setProperties] = useState({})

  const sortAgentsByTotalSales = sortArrayByProperty(
    salesData,
    "purchaseAmount",
  )

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

      getUpdatedAgentsArray(response.data)
      setProperties(updatedProperties)
    } else {
      delete properties[openFilterInput]

      const propertiesString = JSON.stringify(properties)

      const response = await filterAgentsByProperties(propertiesString)
      getUpdatedAgentsArray(response.data)
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

  async function getSalesDataInThisMonth() {
    try {
      const response = await axios.get(
        "http://localhost:3000/sales/prop?minDay=0&maxDay=30",
      )
      setSalesData(response.data)
    } catch (error) {
      throw error
    }
  }

  async function removePropertyFilter(property) {
    delete properties[property]
    const propertiesString = JSON.stringify(properties)
    const response = await filterAgentsByProperties(propertiesString)
    getUpdatedAgentsArray(response.data)
    setProperties(properties)
  }

  async function clearAllFilters() {
    Object.keys(properties).forEach((key) => delete properties[key])
    const propertiesString = JSON.stringify(properties)
    const response = await filterAgentsByProperties(propertiesString)
    getUpdatedAgentsArray(response.data)
    setProperties(properties)
  }

  useEffect(() => {
    getAgentData()
    getSalesDataInThisMonth()
  }, [])

  function getTotalSalesAmountOfAAgent(id) {
    const arrayOfSalesDoneByAgent = salesData.filter(
      (sales) => sales.salesAgent === id,
    )
    const totalSales = arrayOfSalesDoneByAgent.reduce((acc, curr) => {
      return acc + curr.purchaseAmount
    }, 0)
    return totalSales
  }

  function getUpdatedAgentsArray(salesAgents) {
    const updatedArray = salesAgents.map((agent) => {
      const totalSaleDoneByTheAgent = getTotalSalesAmountOfAAgent(agent._id)
      agent.totalSalesDoneInBtw30Days = totalSaleDoneByTheAgent
      return agent
    })
    const SortBySalesDoneInBtw30Days = sortArrayByProperty(
      updatedArray,
      "totalSalesDoneInBtw30Days",
    )
    const assignRankToEachSalesAgents = SortBySalesDoneInBtw30Days.map(
      (agent, index) => {
        agent.rank = index + 1
        return agent
      },
    )
    setSalesAgents(assignRankToEachSalesAgents)
  }

  useEffect(() => {
    salesData.length && getUpdatedAgentsArray(salesAgents)
  }, [salesData])

  function sortAgentsDataInAscOrderByProp(prop) {
    if (prop === "agentCode") {
      const updatedAgentsData = sortArrayOfCodeNumbersInAscendingOrder(
        salesAgents,
        prop,
      )
      setSalesAgents(updatedAgentsData)
    } else if (prop === "totalSalesDoneInBtw30Days" || prop === "rank") {
      const updatedAgentsData = sortArrayOfNumbersInAscendingOrder(
        salesAgents,
        prop,
      )
      setSalesAgents(updatedAgentsData)
    } else if (prop === "phoneNumber") {
      const updatedAgentsData = sortArrayOfPhoneNumbersInAscendingOrder(
        salesAgents,
        prop,
      )
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
    } else if (prop === "totalSalesDoneInBtw30Days" || prop === "rank") {
      const updatedAgentsData = sortArrayOfNumbersInDescendingOrder(
        salesAgents,
        prop,
      )
      setSalesAgents(updatedAgentsData)
    } else if (prop === "phoneNumber") {
      const updatedAgentsData = sortArrayOfPhoneNumbersInDescendingOrder(
        salesAgents,
        prop,
      )
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
    getUpdatedAgentsArray(response.data)
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
                          className="bi bi-three-dots-vertical"
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
                          className="bi bi-three-dots-vertical"
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
                          className="bi bi-three-dots-vertical"
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
                          className="bi bi-three-dots-vertical"
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
                          className="bi bi-three-dots-vertical"
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
                    {salesAgents &&
                      salesAgents.map((agent) => {
                        return (
                          <tr key={agent.agentCode}>
                            <th scope="row">{agent.agentCode}</th>
                            <td>{agent.name}</td>
                            <td style={{ color: "#70d89d" }}>{agent.email}</td>
                            <td>{agent.phoneNumber}</td>
                            <td style={{ color: "#70d89d" }}>
                              ${agent.totalSalesDoneInBtw30Days}
                            </td>
                            <td>{agent.rank}</td>
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
