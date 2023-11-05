import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUser, getUserByEmail } from "../services/userServices"
import { fetchStudents } from '../services/studentServices'

export const Register = (props) => {

  // student selected state
  const [studentCode, setStudentCode] = useState(0)
  const [user, setUser] = useState({ aboutMe: "Edit your about me section in your profile", isStudent: false })

  const navigate = useNavigate()

  const checkForExistingUser = (event) => {
    event.preventDefault()
    const copyOfUser = { ...user }
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerUser(copyOfUser)
      }
    })
  }

  const registerUser = (copyOfUser) => {
    createUser(copyOfUser).then((response) => {
      if (response.hasOwnProperty("id")) {
        localStorage.setItem(
          "capstone_user",
          JSON.stringify({
            id: response.id,
          }),
        )
        navigate("/")
      }
    })
  }
  // i may need this for the student code
  const handleStudentCode = (event) => {
    setStudentCode(event.target.value)
  }


  const handleUserInput = (event) => {
    const updatedUser = { ...user, [event.target.name]: event.target.value }
    setUser(updatedUser)
  }

  useEffect(() => { }, [])

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <form className="border rounded-md flex flex-col items-center p-10 shadow-lg">
          <h1 className="font-bold text-4xl">Register</h1>
          <label className="pt-5 pl-5 self-start">First Name</label>
          <input
            className="border h-10 hover:border-blue-500/100 w-80 rounded-md text-center"
            name="firstName"
            onChange={handleUserInput}
            placeholder="Enter your first name"
            required
            type="text" />
          <p className="pt-5 pl-5 self-start">Last Name</p>
          <input
            className="border h-10 hover:border-blue-500/100 w-80 rounded-md text-center"
            name="lastName"
            onChange={handleUserInput}
            placeholder="Enter your last name"
            required
            type="text" />
          <p className="pt-5 pl-5 self-start">Email</p>
          <input
            className="border h-10 hover:border-blue-500/100 w-80 rounded-md text-center"
            name="email"
            onChange={handleUserInput}
            placeholder="Enter your email"
            required
            type="text" />
          <section className="flex flex-col gap-5 items-start pt-5 w-80">
            {/* <div>
              <input id="teacher" name="userType" type="checkbox" /><label className="pl-3" htmlFor="parent">Teacher?</label>
            </div> */}
            <div>
              <input id="student" name="userType" type="checkbox" /><label className="pl-3" htmlFor="student">Student??</label>
            </div>
          </section>
          <div className="p-5">
            <button className="bg-blue-500 h-10 hover:bg-blue-400 rounded-md w-80" onClick={checkForExistingUser}>
              Sign up
            </button>
          </div>
          <p>Already a member?</p>
          <Link className="pt-3" to="/login">
            <button className="bg-green-500 h-10 hover:bg-green-400 rounded-md w-80">
              Sign In
            </button>
          </Link>
        </form>
      </div>
    </>
  )
}
