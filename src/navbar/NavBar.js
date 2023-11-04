import React from "react"
import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {

  const navigate = useNavigate()

  return (
    <nav className="border-b border-gray-900/10 flex ml-3 p-4 border-">
      <ul className="flex flex-1 gap-11 pl-11">
        <li className="hover:bg-gray-300 p-2 rounded">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:bg-gray-300 p-2 rounded">
          <Link to="/students" >Students</Link>
        </li>
        <li className="hover:bg-gray-300 p-2 rounded">
          <Link to="/worksheets">Worksheets</Link>
        </li>
        <li className="hover:bg-gray-300 p-2 rounded">
          <Link to="/worksheets/create">New Worksheet</Link>
        </li>
      </ul>
      <ul className="pr-11">
        {localStorage.getItem("capstone_user") ? (
          <li className="hover:bg-gray-300 p-2 rounded" onClick={() => {
            localStorage.removeItem("capstone_user")
            navigate("/", { replace: true })
          }}>Logout</li>) : ("")
        }
      </ul>
    </nav>
  )
}
