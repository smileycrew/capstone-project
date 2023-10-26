import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { fetchUserWorksheets } from "../services/worksheetServices"
import { fetchSubjects } from "../services/subjectServices"
import { fetchUserStudents } from "../services/studentServices"

export const Worksheets = ({ user }) => {

  const [students, setStudents] = useState([])
  const [subjects, setSubjects] = useState([])
  const [worksheets, setWorksheets] = useState([])
  const [worksheetsToDisplay, setworksheetsToDisplay] = useState([])

  const handleFilters = (event) => {
    const name = event.target.name
    const value = event.target.value
    const filterWorksheets = worksheets.filter((worksheet) => {
      return worksheet[name] === value
    })
    setworksheetsToDisplay(filterWorksheets)
  }

  const handleFetchCalls = () => {
    fetchUserWorksheets(user.id).then((data) => {
      setWorksheets(data)
    })
    fetchSubjects().then((data) => {
      setSubjects(data)
    })
    fetchUserStudents(user.id).then((data) => {
      setStudents(data)
    })
  }

  useEffect(() => {
    handleFetchCalls()
  }, [user])

  useEffect(() => {
    setworksheetsToDisplay(worksheets)
  }, [worksheets])

  return (
    <>
      <header
        className="flex mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative h-16 items-center justify-start gap-10 pt-10">
        <section
          className="sm:col-span-3">
          <label
            className="block text-sm font-medium leading-6 text-gray-900">
            Sort By Subject
            <select
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              name="subjectId"
              onChange={handleFilters}>
              <option>
                choose a subject
              </option>
              {subjects.map((subject) => {
                return (
                  <option
                    key={subject.id}
                    value={subject.id}>
                    {subject.name}
                  </option>
                )
              })}
            </select>
          </label>
        </section>
        <section
          className="sm:col-span-3">
          <label
            className="block text-sm font-medium leading-6 text-gray-900">
            Sort By Student
            <select
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              name="studentId"
              onChange={handleFilters}>
              <option>
                choose a student
              </option>
              {students.map((student) => {
                return (
                  <option
                    key={student.id}
                    value={student.id}>
                    {student.firstName} {student.lastName}
                  </option>
                )
              })}
            </select>
          </label>
        </section>
        <section
          className="sm:col-span-3">
          <label
            className="block text-sm font-medium leading-6 text-gray-900">
            Clear Filters
            <button
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              onClick={handleFetchCalls}>
              Clear
            </button>
          </label>
        </section>
        <section
          className="sm:col-span-1 absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 focus:outline-none">
          <p
            className="block text-sm font-medium leading-6 text-gray-900">
            Options
          </p>
          <Link
            to="/addworksheet"
            className="mt-2 text-center w-md rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add Worksheet
          </Link>
        </section>
      </header>

      <main
        className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <section
          className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {worksheetsToDisplay.map((worksheet) => {
            return (
              <Link
                key={worksheet.id}
                to={`${worksheet.id}`}>
                <div
                  className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src="https://placehold.co/400"
                    alt=""
                    className="h-full w-full object-cover object-center group-hover:opacity-75" />
                </div>
                <h3
                  className="mt-4 text-sm text-gray-700">
                  {worksheet.title}
                </h3>
                <p
                  className="mt-1 text-lg font-medium text-gray-900">
                  {worksheet.student.firstName} {worksheet.student.lastName}
                </p>
                <p
                  className="mt-1 text-sm text-gray-700">
                  {worksheet.subject.name}
                </p>
              </Link>
            )
          })}
        </section>
      </main>
    </>
  )
} 
