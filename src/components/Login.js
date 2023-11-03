import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getUserByEmail } from "../services/userServices"

export const Login = () => {

  const [email, set] = useState("hpassfield7@netvibes.com")

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers?.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "capstone_user",
          JSON.stringify({
            id: user.id,
          })
        )

        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <article
      className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 text-center">
      <form
        onSubmit={handleLogin}>
        <h1
          className="mt-4 mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Please Sign In
        </h1>
        <label
          className="text-base leading-7 text-gray-600">
          Login to begin
          <input
            className="mt-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center"
            onChange={(evt) => set(evt.target.value)}
            placeholder="Please enter your email"
            required />
        </label>
        <div
          className="mt-10 flex items-center justify-center gap-x-6">
          <button
            href="#"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign in
          </button>
          <Link
            className="text-sm font-semibold text-gray-900"
            to="/register">
            Sign up
            <span>
              &rarr;
            </span>
          </Link>
        </div>
      </form>
    </article >
  )
}
