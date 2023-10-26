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
          <li
            className="hidden sm:ml-6 sm:block">
            <div
              className="flex space-x-4">
              <Link
                className=""
                to="/">
                Home
              </Link>
            </div>
          </li>
          <li
            className="hidden sm:ml-6 sm:block">
            <div
              className="flex space-x-4">
              <Link
                className=""
                to="/students">
                My Students
              </Link>
            </div>
          </li>
          <li
            className="hidden sm:ml-6 sm:block">
            <div
              className="flex space-x-4">
              <Link
                className=""
                to="/worksheets">
                My Worksheets
              </Link>
            </div>
          </li>
          <li
            className="hidden sm:ml-6 sm:block">
            <div
              className="flex space-x-4">
              <Link
                className=""
                to="/profile">
                My Profile
              </Link>
            </div>
          </li>
        </ul>
        {localStorage.getItem("capstone_user") ? (
          <li
            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link
              className="h-8 w-8 rounded-full"
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
