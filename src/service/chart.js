import Chart from "chart.js/auto"

export async function thirtyDaysAgentsPerformanceReportBarChart(obj) {
  const { data, chartRef, chartInstance } = obj
  if (chartInstance.current) {
    chartInstance.current.data.datasets[0].data = data.map((row) => ({
      x: row.name,
      y: row.score,
      id: row.id,
    }))
    chartInstance.current.update()
  } else {
    chartInstance.current = new Chart(chartRef.current, {
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
            padding: {
              bottom: 30,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const point = context.raw

                return ` ${point.y.toFixed(1)} _ ( CODE : ${point.id} ) `
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
        datasets: [
          {
            data: data.map((row) => ({
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
}

export async function sixMonthsAgentsPerformanceReportLineChart(obj) {
  const { data, chartRef, chartInstance } = obj
  if (chartInstance.current) {
    chartInstance.current.data.datasets[0].data = data.map((row) => ({
      x: row.name,
      y: row.score,
      id: row.id,
    }))
    chartInstance.current.update()
  } else {
    chartInstance.current = new Chart(chartRef.current, {
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
            padding: {
              bottom: 30,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const point = context.raw

                return ` ${point.y.toFixed(1)} _ ( CODE : ${point.id} ) `
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
        datasets: [
          {
            data: data.map((row) => ({
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
}

export async function oneYearAgentsPerformanceReportPieChart(obj) {
  const { data, chartRef, chartInstance } = obj
  const oneYearPerformanceScoresArr = data.map((a) => a.score)

  const maxIndex = oneYearPerformanceScoresArr.indexOf(
    Math.max(...oneYearPerformanceScoresArr),
  )

  if (chartInstance.current) {
    chartInstance.current.data.datasets[0].data = data.map((row) => row.score)
    chartInstance.current.update()
  } else {
    chartInstance.current = new Chart(chartRef.current, {
      type: "pie",
      options: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "1 year performance report (out of  10)",
            color: "#70d89d",
            padding: {
              bottom: 30,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label
                const value = context.raw

                const id = context.dataset.ids[context.dataIndex]

                return ` ${value} _ ( CODE - ${id} ) `
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
        datasets: [
          {
            data: data.map((row) => row.score),
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
            ids: data.map((row) => row.id),
            offset: data.map((obj, i) => (i === maxIndex ? 20 : 0)),
          },
        ],
      },
    })
  }
}

export async function leadsClosedAndInPipelinePieChart(obj) {
  const { data, chartRef, chartInstance, isMobile } = obj
  const { closedLeads, leadsInPipeline, lostLeads } = data
  if (chartInstance.current) {
    chartInstance.current.data.datasets[0].data = [
      closedLeads,
      leadsInPipeline,
      lostLeads,
    ]
    chartInstance.current.update()
  } else {
    chartInstance.current = new Chart(chartRef.current, {
      type: "pie",
      options: {
        plugins: {
          legend: {
            display: true,
            position: isMobile ? "bottom" : "right",
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
        animation: {
          duration: 500,
          easing: "easeInOutCubic",
        },
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
}

export async function leadStatusDistributionPieChart(obj) {
  const { data, chartRef, chartInstance, isMobile } = obj
  const {
    newLeads,
    contactedLeads,
    qualifiedLeads,
    proposalSentLeads,
    closedLeads,
    lostLeads,
  } = data
  if (chartInstance.current) {
    chartInstance.current.data.datasets[0].data = [
      newLeads,
      contactedLeads,
      qualifiedLeads,
      proposalSentLeads,
      closedLeads,
      lostLeads,
    ]
    chartInstance.current.update()
  } else {
    chartInstance.current = new Chart(chartRef.current, {
      type: "pie",
      options: {
        plugins: {
          legend: {
            display: true,
            position: isMobile ? "bottom" : "right",
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
        animation: {
          duration: 500,
          easing: "easeInOutCubic",
        },
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
}

export async function leadsClosedBySalesAgentsBarChart(obj) {
  const { data, chartRef, chartInstance } = obj
  if (chartInstance.current) {
    chartInstance.current.data.datasets[0].data = data.map((row) => ({
      x: row.name,
      y: row.leadsClosedByAgent,
      agentCode: row.agentCode,
    }))
    chartInstance.current.update()
  } else {
    chartInstance.current = new Chart(chartRef.current, {
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
            text: "Leads Closed By Sales Agents",
            color: "#70d89d",
            padding: {
              bottom: 30,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const point = context.raw

                return ` ${point.y.toFixed(1)} _ ( CODE : ${point.agentCode} ) `
              },
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: window.devicePixelRatio,
        animation: {
          duration: 500,
          easing: "easeInOutCubic",
        },
      },
      data: {
        labels: data.map((row) => row.name),
        datasets: [
          {
            data: data.map((row) => ({
              x: row.name,
              y: row.leadsClosedByAgent,
              agentCode: row.agentCode,
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
}
