import styles from "./style_modules/page_modules/App.module.css"
import { useState, useEffect } from "react"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap-icons/font/bootstrap-icons.css"
import { useTheme } from "styled-components"
import SideBar from "./components/SideBar.jsx"
import NavBar from "./components/NavBar.jsx"
import { barChart, lineChart, pieChart } from "./chart.js"
import agents from "./agentData.js"
import { sortAgentsArrayByProperty } from "./functions.js"

const sortAgentsByPerformanceScore = sortAgentsArrayByProperty(
  agents,
  "performanceScore",
)

function App() {
  const theme = useTheme()

  useEffect(() => {
    pieChart()
    barChart()
    lineChart()
  }, [])

  return (
    <>
      <div className={`${styles.app}`}>
        <SideBar />
        <main className={`${styles.content}`}>
          <NavBar />
          <section className={`${styles.main_section}`}>
            <div className={`${styles.grid_container}`}>
              <div className={`${styles.first_row_item_wrapper}`}>
                <div className={`${styles.first_row_item_container}`}>
                  <div className={`${styles.first_row_item_content}`}>
                    <span>
                      <i className="bi bi-people-fill"></i>
                    </span>
                    <span>1400</span>
                    <span className={`${styles.about}`}>New Lead</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.first_row_item_wrapper}`}>
                <div className={`${styles.first_row_item_container}`}>
                  <div className={`${styles.first_row_item_content}`}>
                    <span>
                      <i className="bi bi-telephone-outbound-fill"></i>
                    </span>
                    <span>700</span>
                    <span className={`${styles.about}`}>Contacted</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.first_row_item_wrapper}`}>
                <div className={`${styles.first_row_item_container}`}>
                  <div className={`${styles.first_row_item_content}`}>
                    <span>
                      <i className="bi bi-check-square-fill"></i>
                    </span>
                    <span>200</span>
                    <span className={`${styles.about}`}>Qualified</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.first_row_item_wrapper}`}>
                <div className={`${styles.first_row_item_container}`}>
                  <div className={`${styles.first_row_item_content}`}>
                    <span>
                      <i className="bi bi-lock-fill"></i>
                    </span>
                    <span>100</span>
                    <span className={`${styles.about}`}>Closed</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.agent_performance_table}`}>
                <h6>Agents overall performance table</h6>
                <table className={`table ${styles.table}`}>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">Agent Name</th>
                      <th scope="col">New Lead</th>
                      <th scope="col">Closed</th>
                      <th scope="col">Performance Score</th>
                      <th scope="col">Status</th>
                      <th scope="col">Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortAgentsByPerformanceScore.map((agent, index) => {
                      return (
                        <tr key={agent.id}>
                          <th scope="row">{agent.id}</th>
                          <td>{agent.name}</td>
                          <td>{agent.newLead}</td>
                          <td>{agent.closed}</td>
                          <td>
                            <span style={{ color: "#70d89d" }}>
                              {agent.performanceScore.toFixed(1)}
                            </span>{" "}
                            out of 10
                          </td>
                          <td style={{ color: "#70d89d" }}>{agent.status}</td>
                          <td>{index + 1}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className={`${styles.agent_performance_pie_chart}`}>
                <canvas
                  className={`${styles.pie_chart}`}
                  id="pie_chart"
                ></canvas>
              </div>
              <div className={`${styles.agent_performance_bar_chart}`}>
                <canvas
                  className={`${styles.bar_chart}`}
                  id="bar_chart"
                ></canvas>
              </div>
              <div className={`${styles.agent_performance_line_chart}`}>
                <canvas
                  className={`${styles.line_chart}`}
                  id="line_chart"
                ></canvas>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default App
