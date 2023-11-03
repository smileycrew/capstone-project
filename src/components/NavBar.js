import React from "react"
import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {

  const navigate = useNavigate()

  return (
    <header
      className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <nav
        className="relative flex h-16 items-center justify-between">
        <ul
          className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <li className="flex  items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link to="/" className="text-white hover:bg-gray-600 rounded-md px-3 py-2 text-sm font-medium">Home</Link>
              </div>
            </div>
          </li>
          <li className="flex  items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link to="/students" className="text-white hover:bg-gray-600 rounded-md px-3 py-2 text-sm font-medium">Students</Link>
              </div>
            </div>
          </li>
          <li className="flex  items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link to="/worksheets" className="text-white hover:bg-gray-600 rounded-md px-3 py-2 text-sm font-medium">Worksheets</Link>
              </div>
            </div>
          </li>
          <li className="flex  items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link to="/worksheets/create" className="text-white hover:bg-gray-600 rounded-md px-3 py-2 text-sm font-medium">New Worksheet</Link>
              </div>
            </div>
          </li>
        </ul>
        {localStorage.getItem("capstone_user") ? (
          <li
            className="flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link
              className="text-white hover:bg-gray-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              to=""
              onClick={() => {
                localStorage.removeItem("capstone_user")
                navigate("/", { replace: true })
              }}>
              Logout
            </Link>
          </li>
        ) : (
          ""
        )}
      </nav>
    </header>
  )
}
