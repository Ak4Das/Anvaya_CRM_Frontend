import Chart from "chart.js/auto"

async function barChart() {
  const data = [
    { agent: "Agni", count: 9 },
    { agent: "Alok", count: 7 },
    { agent: "Akshay", count: 6 },
    { agent: "Puja", count: 5 },
    { agent: "Punam", count: 10 },
    { agent: "Parag", count: 3 },
    { agent: "Pankaj", count: 6 },
    { agent: "Bibhushita", count: 5 },
    { agent: "Chayan", count: 9 },
    { agent: "Daya", count: 7 },
  ]

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
          text: "30 days performance bar chart",
          color: "#70d89d",
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: window.devicePixelRatio,
      animation: false,
    },
    data: {
      labels: data.map((row) => row.agent),
      datasets: [
        {
          data: data.map((row) => row.count),
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
  const data = [
    { agent: "Agni", count: 90 },
    { agent: "Alok", count: 70 },
    { agent: "Akshay", count: 60 },
    { agent: "Puja", count: 50 },
    { agent: "Punam", count: 100 },
    { agent: "Parag", count: 30 },
    { agent: "Pankaj", count: 60 },
    { agent: "Bibhushita", count: 50 },
    { agent: "Chayan", count: 90 },
    { agent: "Daya", count: 70 },
  ]

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
          text: "6 months performance line chart",
          color: "#70d89d",
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: window.devicePixelRatio,
      animation: false,
    },
    data: {
      labels: data.map((row) => row.agent),
      datasets: [
        {
          data: data.map((row) => row.count),
          backgroundColor: "#36A2EB",
          borderColor: "#36A2EB",
        },
      ],
    },
  })
}

async function pieChart() {
  const data = [
    { agent: "Agni", count: 450 },
    { agent: "Alok", count: 420 },
    { agent: "Akshay", count: 380 },
    { agent: "Puja", count: 350 },
    { agent: "Punam", count: 500 },
    { agent: "Parag", count: 250 },
    { agent: "Pankaj", count: 375 },
    { agent: "Bibhushita", count: 350 },
    { agent: "Chayan", count: 480 },
    { agent: "Daya", count: 410 },
  ]

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
          text: "1 year performance pie chart",
          color: "#70d89d",
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: window.devicePixelRatio,
      animation: false,
    },
    data: {
      labels: data.map((row) => row.agent),
      datasets: [
        {
          data: data.map((row) => row.count),
          backgroundColor: [
            "#FF5733",
            "#33FF57",
            "#3357FF",
            "#FF33A6",
            "#FFBD33",
            "#33FFF6",
            "#FFC300",
            "#C70039",
            "#900C3F",
            "#581845",
          ],
        },
      ],
    },
  })
}

export { barChart, lineChart, pieChart }
