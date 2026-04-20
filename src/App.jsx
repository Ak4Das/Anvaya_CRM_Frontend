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
                <h6>30 days performance table</h6>
                <table className={`table ${styles.table}`}>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">Agent Name</th>
                      <th scope="col">Lead No.</th>
                      <th scope="col">Closed No.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Agni</td>
                      <td>20</td>
                      <td>9</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Alok</td>
                      <td>25</td>
                      <td>7</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Akshay</td>
                      <td>15</td>
                      <td>6</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>Puja</td>
                      <td>37</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <th scope="row">5</th>
                      <td>Punam</td>
                      <td>32</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <th scope="row">6</th>
                      <td>Parag</td>
                      <td>10</td>
                      <td>3</td>
                    </tr>
                    <tr>
                      <th scope="row">7</th>
                      <td>Pankaj</td>
                      <td>16</td>
                      <td>6</td>
                    </tr>
                    <tr>
                      <th scope="row">8</th>
                      <td>Bibhushita</td>
                      <td>19</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <th scope="row">9</th>
                      <td>Chayan</td>
                      <td>29</td>
                      <td>9</td>
                    </tr>
                    <tr>
                      <th scope="row">10</th>
                      <td>Daya</td>
                      <td>12</td>
                      <td>7</td>
                    </tr>
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
