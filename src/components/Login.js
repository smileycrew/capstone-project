import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getUserByEmail } from "../services/userServices"

export const Login = () => {

  const [email, setEmail] = useState("")

  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()
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
    <>
      {/* this is done dont touch pls */}
      <div className="h-screen flex items-center justify-center">
        <section className="bg-white border flex flex-col items-center p-10 rounded-md shadow-xl w-2/6">
          <header className="p-5">
            <h1 className="font-bold text-4xl">Education Connect</h1>
          </header>
          <p>Please Sign In</p>
          <form className="p-5">
            <input className="border h-10 w-80 text-center rounded-md" placeholder="Enter your email" required />
          </form>
          <section>
            <button className="bg-blue-500 h-10 hover:bg-blue-400 rounded-md w-80">Sign In</button>
          </section>
          {/* come back and fix this */}
          <div className="border-b border-gray-900/10 pt-5 w-full"><span>or</span></div>
          <section className="p-5">
            <Link to={'/register'}>
              <button className="bg-green-500 h-10 rounded-md w-80">
                Sign Up
              </button>
            </Link>
          </section>
        </section>
      </div>
    </>
  )
}
