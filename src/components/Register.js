import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUser, getUserByEmail, fetchUserTypes } from "../services/userServices"
import { fetchStudents } from '../services/studentServices'
import { InputField } from "./InputField"

export const Register = (props) => {

  const object = {
    aboutMe: "Edit your profile to update your about me section!",
    email: "",
    firstName: "",
    lastName: "",
    userTypeId: ""
  }

  const [studentCode, setStudentCode] = useState(0)
  const [user, setUser] = useState(object)

  const [userTypes, setUserTypes] = useState([])

  const navigate = useNavigate()

  const registerNewUser = (copyOfUser) => {
    createUser(copyOfUser).then((createdUser) => {
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

  const handleFetchCalls = () => {
    fetchUserTypes().then((data) => {
      setUserTypes(data)
    })
  }

  const handleStudentCode = (event) => {
    setStudentCode(event.target.value)
  }

  const handleStudentLogin = (event) => {
    event.preventDefault()
    fetchStudents().then((data) => {
      const object = data.find((dataset) => `${dataset.studentCode}` + `${dataset.id}` === studentCode)
      if (object) {
        const userToCreate = {
          aboutMe: "Edit your profile to update your about me section!",
          email: `${object?.firstName}.${object?.lastName}@student.com`,
          firstName: object?.firstName,
          lastName: object?.lastName,
          studentId: object?.id,
          userTypeId: 2
        }
        createUser(userToCreate).then(() => {
          window.alert(`${userToCreate?.email}`)
        })
      } else {
        window.alert('No student matches this code')
      }
    })
  }

  const handleRegisterUser = (e) => {
    e.preventDefault()
    const copyOfUser = { ...user, email: `${user?.firstName}.${user?.lastName}@${userTypes.find((userType) => userType?.id === user?.userTypeId * 1).description?.toLowerCase()}.com` }
    copyOfUser.userTypeId = parseInt(copyOfUser?.userTypeId)
    // setUser(copyOfUser)
    getUserByEmail(user?.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser(copyOfUser)
      }
    })
  }

  const handleUserInput = (event) => {
    const copy = { ...user }
    const name = event?.target?.name
    const value = event?.target?.value
    copy[name] = value
    setUser(copy)
  }

  const handleUpdateUser = (evt) => {
    const copy = { ...user }
    copy[evt.target.id] = evt.target.value
    setUser(copy)
  }

  useEffect(() => {
    handleFetchCalls()
  }, [])

  return (
    <article
      className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <section
        className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <label
          className="mt-10  text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register
        </label>
      </section>
      <section
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6">
          <InputField handleUpdateUser={handleUpdateUser} user={user} userTypes={userTypes} />
          {userTypes?.map((userType) => {
            return (
              <fieldset
                key={userType?.id}>
                <input
                  checked={user?.userTypeId * 1 === userType?.id}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  id={userType?.description}
                  name="userTypeId"
                  onChange={handleUserInput}
                  type="checkbox"
                  value={userType?.id} />
                <label
                  htmlFor={userType?.description}
                  className="pl-3 font-medium text-gray-900">
                  {userType?.description}?

                  {userType?.id * 1 === 2 && user?.userTypeId * 1 === 2 ?
                    <fieldset
                      className="flex gap-3 mt-3">
                      <input
                        className="text-center w-auto block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        id="firstName"
                        onChange={handleStudentCode}
                        placeholder="Enter student code"
                        required
                        type="text" />
                      <button
                        className="flex w-m justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleStudentLogin}>
                        Find
                      </button>
                    </fieldset> :
                    null
                  }
                </label>
              </fieldset>
            )
          })}
          <div>
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleRegisterUser}>
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
    </article >
  )
}
