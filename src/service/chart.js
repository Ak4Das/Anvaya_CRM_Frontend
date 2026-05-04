import Chart from "chart.js/auto"

export async function thirtyDaysAgentsPerformanceReportBarChart(
  thirtyDaysPerformanceReport,
) {
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

export async function sixMonthsAgentsPerformanceReportLineChart(
  sixMonthsPerformanceReport,
) {
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

export async function oneYearAgentsPerformanceReportPieChart(
  oneYearPerformanceReport,
) {
  const oneYearPerformanceScoresArr = oneYearPerformanceReport.map(
    (a) => a.score,
  )

  const maxIndex = oneYearPerformanceScoresArr.indexOf(
    Math.max(...oneYearPerformanceScoresArr),
  )

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
          ids: [
            "AG-0292582413",
            "AG-6086212578",
            "AG-8957270755",
            "AG-4701339252",
            "AG-6426045967",
            "AG-0234367290",
            "AG-3381478618",
            "AG-8888710130",
            "AG-1653318933",
            "AG-7506422052",
          ],
          offset: oneYearPerformanceReport.map((_, i) =>
            i === maxIndex ? 20 : 0,
          ),
        },
      ],
    },
  })
}

export async function leadsClosedAndInPipelinePieChart(
  leadsClosedAndInPipeline,
) {
  const { closedLeads, leadsInPipeline, lostLeads } = leadsClosedAndInPipeline
  new Chart(document.getElementById("leadsClosedAndInPipeline"), {
    type: "pie",
    options: {
      plugins: {
        legend: {
          display: true,
          position: "right",
          labels: {
            color: "#ffffff",
            font: {
              size: 15,
            },
          },
        },
        title: {
          display: true,
          text: "Leads Lost, Closed And In Pipeline",
          color: "#70d89d",
          padding: {
            bottom: 30,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: window.devicePixelRatio,
      animation: false,
    },
    data: {
      labels: ["Closed", "Pipeline", "Lost"],
      datasets: [
        {
          data: [closedLeads, leadsInPipeline, lostLeads],
          backgroundColor: ["#4CAF50", "#2196F3", "#FFC107"],
        },
      ],
    },
  })
}

export async function leadStatusDistributionPieChart(leadStatusDistribution) {
  const {
    newLeads,
    contactedLeads,
    qualifiedLeads,
    proposalSentLeads,
    closedLeads,
    lostLeads,
  } = leadStatusDistribution
  new Chart(document.getElementById("leadStatusDistribution"), {
    type: "pie",
    options: {
      plugins: {
        legend: {
          display: true,
          position: "right",
          labels: {
            color: "#ffffff",
            font: {
              size: 15,
            },
          },
        },
        title: {
          display: true,
          text: "Lead Status Distribution",
          color: "#70d89d",
          padding: {
            bottom: 30,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: window.devicePixelRatio,
      animation: false,
    },
    data: {
      labels: [
        "New",
        "Contacted",
        "Qualified",
        "Proposal Sent",
        "Closed",
        "Lost",
      ],
      datasets: [
        {
          data: [
            newLeads,
            contactedLeads,
            qualifiedLeads,
            proposalSentLeads,
            closedLeads,
            lostLeads,
          ],
          backgroundColor: [
            "#4CAF50",
            "#2196F3",
            "#FFC107",
            "#FF5722",
            "#9C27B0",
            "#00BCD4",
          ],
        },
      ],
    },
  })
}
