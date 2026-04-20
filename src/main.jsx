import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import theme from "./themeProvider.js"

import App from "./App.jsx"
import Team from "./pages/Team.jsx"

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/team", element: <Team /> },
])

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </ThemeProvider>,
)
