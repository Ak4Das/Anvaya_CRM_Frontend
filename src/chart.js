import Chart from "chart.js/auto"
import agents from "./agentData"

const thirtyDaysPerformanceReport = agents.map((agent) => {
  return {
    id: agent.id,
    name: agent.name.split(" ")[0],
    score: Number(((agent.closed / agent.newLead) * 10).toFixed(1)),
  }
})

const sixMonthsPerformanceReport = agents.map((agent) => {
  return {
    id: agent.id,
    name: agent.name.split(" ")[0],
    score: Number(
      ((agent.closedUnderSixMonths / agent.leadsUnderSixMonths) * 10).toFixed(
        1,
      ),
    ),
  }
})

const oneYearPerformanceReport = agents.map((agent) => {
  return {
    id: agent.id,
    name: agent.name.split(" ")[0],
    score: Number(
      ((agent.closedUnderOneYear / agent.leadsUnderOneYear) * 10).toFixed(1),
    ),
  }
})

const oneYearPerformanceScoresArr = oneYearPerformanceReport.map((a) => a.score)

const maxIndex = oneYearPerformanceScoresArr.indexOf(
  Math.max(...oneYearPerformanceScoresArr),
)

async function barChart() {
  new Chart(document.getElementById("bar_chart"), {
    type: "bar",
    options: {
      scales: {
        x: {
          ticks: {
            color: "#ffffff",
          },
          grid: {
            color: "#2a3447",
            lineWidth: 1,
          },
        },
        y: {
          ticks: {
            color: "#ffffff",
          },
          grid: {
            color: "#2a3447",
            lineWidth: 1,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "30 days performance report (out of 10)",
          color: "#70d89d",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const point = context.raw

              return ` ${point.y.toFixed(1)} _ ( ID : ${point.id} ) `
            },
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: window.devicePixelRatio,
      animation: false,
    },
    data: {
      labels: thirtyDaysPerformanceReport.map((row) => row.name),
      datasets: [
        {
          data: thirtyDaysPerformanceReport.map((row) => ({
            x: row.name,
            y: row.score,
            id: row.id,
          })),
          backgroundColor: "#36A2EB",
          borderColor: "#36A2EB",
          borderWidth: 1,
          categoryPercentage: 0.7,
          barPercentage: 0.7,
        },
      ],
    },
  })
}

async function lineChart() {
  new Chart(document.getElementById("line_chart"), {
    type: "line",
    options: {
      scales: {
        x: {
          ticks: {
            color: "#ffffff",
          },
          grid: {
            color: "#2a3447",
            lineWidth: 1,
          },
        },
        y: {
          ticks: {
            color: "#ffffff",
          },
          grid: {
            color: "#2a3447",
            lineWidth: 1,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "6 months performance report (out of 10)",
          color: "#70d89d",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const point = context.raw

              return ` ${point.y.toFixed(1)} _ ( ID : ${point.id} ) `
            },
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: window.devicePixelRatio,
      animation: false,
    },
    data: {
      labels: sixMonthsPerformanceReport.map((row) => row.name),
      datasets: [
        {
          data: sixMonthsPerformanceReport.map((row) => ({
            x: row.name,
            y: row.score,
            id: row.id,
          })),
          backgroundColor: "#36A2EB",
          borderColor: "#36A2EB",
        },
      ],
    },
  })
}

async function pieChart() {
  new Chart(document.getElementById("pie_chart"), {
    type: "pie",
    options: {
      scales: {
        x: {
          ticks: {
            color: "#ffffff",
          },
          grid: {
            color: "#2a3447",
            lineWidth: 1,
          },
        },
        y: {
          ticks: {
            color: "#ffffff",
          },
          grid: {
            color: "#2a3447",
            lineWidth: 1,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "1 year performance report (out of  10)",
          color: "#70d89d",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label
              const value = context.raw

              const id = context.dataset.ids[context.dataIndex]

              return ` ${value} _ ( ID - ${id} ) `
            },
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: window.devicePixelRatio,
      animation: false,
    },
    data: {
      labels: oneYearPerformanceReport.map((row) => row.name),
      datasets: [
        {
          data: oneYearPerformanceReport.map((row) => row.score),
          backgroundColor: [
            "#4CAF50",
            "#2196F3",
            "#FFC107",
            "#FF5722",
            "#9C27B0",
            "#00BCD4",
            "#8BC34A",
            "#FF9800",
            "#E91E63",
            "#3F51B5",
          ],
          ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          offset: oneYearPerformanceReport.map((_, i) =>
            i === maxIndex ? 20 : 0,
          ),
        },
      ],
    },
  })
}

export { barChart, lineChart, pieChart }
