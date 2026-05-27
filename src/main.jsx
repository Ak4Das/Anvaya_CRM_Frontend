import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import theme from "./themeProvider.js"

import App from "./App.jsx"
import Team from "./pages/Team.jsx"
import TeamContactInfo from "./pages/TeamContactInfo.jsx"
import AddAgent from "./pages/AddAgent.jsx"
import SalesInfo from "./pages/SalesInfo.jsx"
import Leads from "./pages/Leads.jsx"
import AddLead from "./pages/AddLead.jsx"
import SalesAgent from "./pages/SalesAgent.jsx"
import LeadManagement from "./pages/LeadManagement.jsx"
import { ToastContainer } from 'react-toastify';
import EditLead from "./pages/EditLead.jsx"
import ReportPage from "./pages/ReportPage.jsx"
import Settings from "./pages/Setting.jsx"
import EditAgent from "./pages/EditAgent.jsx"
import BarChart from "./pages/BarChart.jsx"
import PieChart from "./pages/PieChart.jsx"
import LineChart from "./pages/LineChart.jsx"

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/team", element: <Team /> },
  { path: "/teamContact", element: <TeamContactInfo /> },
  { path: "/addAgent", element: <AddAgent /> },
  { path: "/sales", element: <SalesInfo /> },
  { path: "/leads", element: <Leads /> },
  { path: "/addLead", element: <AddLead /> },
  { path: "/editLead/:id", element: <EditLead /> },
  { path: "/salesAgent/:id", element: <SalesAgent /> },
  { path: "/lead/:id", element: <LeadManagement /> },
  { path: "/report", element: <ReportPage /> },
  { path: "/settings", element: <Settings /> },
  { path: "/editAgent/:id", element: <EditAgent /> },
  { path: "/barChart", element: <BarChart /> },
  { path: "/pieChart", element: <PieChart /> },
  { path: "/lineChart", element: <LineChart /> },
])

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    {/* <StrictMode> */}
      <RouterProvider router={router} />
      <ToastContainer />
    {/* </StrictMode> */}
  </ThemeProvider>,
)
