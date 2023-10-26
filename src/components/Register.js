import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUser, getUserByEmail } from "../services/userServices"

export const Register = (props) => {
  
  const [customer, setCustomer] = useState({
    body: "Edit your profile to update your about me section!",
    email: "",
    firstName: "",
    lastName: "",
  })

  const navigate = useNavigate()

  const registerNewUser = () => {
    console.log("click")
    createUser(customer).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "capstone_user",
          JSON.stringify({
            id: createdUser.id,
          }),
        )
        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(customer.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateCustomer = (evt) => {
    const copy = { ...customer }
    copy[evt.target.id] = evt.target.value
    setCustomer(copy)
  }

  return (
    <article
      className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <section
        className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <label
          className="mt-10  text-2xl font-bold leading-9 tracking-tight text-gray-900"
          form="">
          Register
        </label>
      </section>
      <section
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={handleRegister}>
          <fieldset>
            <p
              className="block text-sm font-medium leading-6 text-gray-900">
              First Name
            </p>
            <input
              className="mt-2 text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              autoComplete="first name"
              id="firstName"
              onChange={updateCustomer}
              placeholder="Enter your first name"
              required
              type="text" />
          </fieldset>
          <fieldset>
            <label
              className="block text-sm font-medium leading-6 text-gray-900">
              Last Name
            </label>
            <input
              className="mt-2 text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="lastName"
              onChange={updateCustomer}
              placeholder="Enter your last name"
              required
              type="text" />
          </fieldset>
          <fieldset>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <input
              className="mt-2 text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="email"
              onChange={updateCustomer}
              placeholder="Enter your last email"
              required
              type="text" />
          </fieldset>
          <fieldset>
            <input
              id="teacher"
              placeholder=""
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
            <span
              htmlFor="comments"
              className="pl-3 font-medium text-gray-900">
              Teacher?
            </span>
            <span
              htmlFor="comments"
              className="pl-3 font-medium text-gray-400">
              coming soon
            </span>
          </fieldset>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign up
            </button>
          </div>
        </form>
        <p
          className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Login
          </Link>
        </p>
      </section>
    </article>
  )
}
