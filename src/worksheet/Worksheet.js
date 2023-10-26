import { useEffect } from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { deleteWorksheetFromDatabase, fetchStudentWorksheetById, } from "../services/worksheetServices"

export const Worksheet = ({ navigate }) => {

  const [worksheet, setWorksheet] = useState([])

  const { worksheetId } = useParams()

  const handleFetchCalls = () => {
    fetchStudentWorksheetById(worksheetId).then((data) => {
      setWorksheet(data[0])
    })
  }

  const handleDelete = () => {
    deleteWorksheetFromDatabase(worksheetId).then(() => {
      navigate("/worksheets")
    })
  }

  useEffect(() => {
    handleFetchCalls()
  }, [worksheetId])

  return (
    <main
      className="bg-white">
      <div
        className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <p
            className="text-gray-500">
            Worksheet Details
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {worksheet.title}
          </h2>
          <dl
            className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div
              className="border-t border-gray-200 pt-4">
              <dd
                className="text-sm text-gray-500">
                First name
              </dd>
              <dt
                className="mt-2 font-medium text-gray-900">
                {worksheet?.student?.firstName}
              </dt>
            </div>
            <div
              className="border-t border-gray-200 pt-4">
              <dd
                className="text-sm text-gray-500">
                Last name
              </dd>
              <dt
                className="mt-2 font-medium text-gray-900">
                {worksheet?.student?.lastName}
              </dt>
            </div>
            <div
              className="border-t border-gray-200 pt-4">
              <dd
                className="text-sm text-gray-500">
                Subject
              </dd>
              <dt
                className="mt-2 font-medium text-gray-900">
                {worksheet?.subject?.name}
              </dt>
            </div>
            <div
              className="border-t border-gray-200 pt-4">
              <dd
                className="text-sm text-gray-500">
                Date
              </dd>
              <dt
                className="mt-2 font-medium text-gray-900">
                {worksheet.date}
              </dt>
            </div>
          </dl>
          <dl
            className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div
              className="border-t border-gray-200 pt-4">
              <dt
                className="font-medium text-gray-900">
                Edit Worksheet
              </dt>
              <section>
                <Link
                  to="edit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Edit
                </Link>
              </section>
            </div>
            <div
              className="border-t border-gray-200 pt-4">
              <dt
                className="font-medium text-gray-900">
                Delete Worksheet
              </dt>
              <section>
                <button
                  className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  onClick={handleDelete}>
                  Delete
                </button>
              </section>
            </div>
          </dl>
        </div>
        <img
          src="https://placehold.co/400"
          alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
          className="rounded-lg bg-gray-100" />
      </div>
    </main>
  )
} 
