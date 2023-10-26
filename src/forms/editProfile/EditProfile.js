import { useEffect } from "react"
import { useState } from "react"
import { putUserToDatabase } from "../../services/userServices"

export const EditProfile = ({ user, handleUserFetchCalls, navigate }) => {

  const [profile, setProfile] = useState({
    body: "",
    cohort: "",
    firstName: "",
    lastName: "",
  })

  const handleInput = (event) => {
    const copy = { ...profile }
    const name = event.target.name
    const value = event.target.value
    copy[name] = value
    setProfile(copy)
  }

  const handleUpdate = (event) => {
    event.preventDefault();
    putUserToDatabase(profile).then(() => {
      handleUserFetchCalls(profile.id)
      navigate("/")
    })
  }

  useEffect(() => {
    setProfile(user)
  }, [user])

  return (
    <article
      className="flex justify-around mx-auto lg:max-w-7xl lg:px-8">
      <section
        className="mt-6 border-t border-gray-100">
        <h3
          className="text-base font-semibold leading-7 text-gray-900">
          Edit Profile Information
        </h3>
        <p
          className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details and application.
        </p>
        <dl
          className="divide-y divide-gray-100">
          <div
            className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt
              className="text-sm font-medium leading-6 text-gray-900">
              First name
            </dt>
            <div
              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                name="firstName"
                onChange={handleInput}
                value={profile?.firstName} />
            </div>
          </div>
          <div
            className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt
              className="text-sm font-medium leading-6 text-gray-900">
              Last name
            </dt>
            <div
              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                name="lastName"
                onChange={handleInput}
                value={profile?.lastName} />
            </div>
          </div>
          <div
            className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt
              className="text-sm font-medium leading-6 text-gray-900">
              Cohort
            </dt>
            <div
              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                name="cohort"
                onChange={handleInput}
                value={profile?.cohort} />
            </div>
          </div>
          <div
            className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt
              className="text-sm font-medium leading-6 text-gray-900">
              About
            </dt>
            <div
              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600  sm:max-w-sm">
              <textarea
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                name="body"
                onChange={handleInput}
                value={profile?.body} />
            </div>
          </div>
          <div
            className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt
              className="text-sm font-medium leading-6 text-gray-900">
              Options
            </dt>
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleUpdate}>
              Update
            </button>
          </div>
        </dl>
      </section>
    </article>
  )
}
