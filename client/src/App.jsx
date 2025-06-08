import React from "react"
import NavBar from "./components/NavBar"
import MainRoutes from "./components/MainRoutes"
import "./App.css"

const App = () => {
  return (
    <div className="bg-[#393E46] text-[#EEEEEE] w-full h-auto">
      <NavBar />
      <MainRoutes />
    </div>
  )
}

export default App
