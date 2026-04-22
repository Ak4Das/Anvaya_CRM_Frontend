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

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/team", element: <Team /> },
  { path: "/teamContact", element: <TeamContactInfo /> },
  { path: "/addAgent", element: <AddAgent /> },
  { path: "/sales", element: <SalesInfo /> },
  { path: "/leads", element: <Leads /> },
  { path: "/addLead", element: <AddLead /> },
])

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </ThemeProvider>,
)
