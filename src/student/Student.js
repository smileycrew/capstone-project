import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { deleteStudentFromDatabase, fetchUserStudentByIds, } from "../services/studentServices"

export const Student = ({ navigate, user }) => {

  const [student, setStudent] = useState({})

  const { studentId } = useParams()

  const handleFetchCalls = () => {
    fetchUserStudentByIds(user?.id, studentId).then((data) => {
      setStudent(data[0])
    })
  }

  const handleDelete = () => {
    deleteStudentFromDatabase(student.id).then(() => {
      navigate("/students")
    })
  }

  useEffect(() => {
    handleFetchCalls()
  }, [studentId, user])

  return (
    <section
      className="flex flex-col items-center justify-center h-screen">
      <ul
        className="flex justify-around item gap-x-6 py-5">
        <li
          className="flex gap-x-4">
          <img
            className="h-48 w-48 flex-none rounded-full bg-gray-50"
            src={`https://ui-avatars.com/api/?name=${student?.firstName}+${student?.lastName}`}
            alt="" />
          <div
            className="">
            <p
              className="text-2xl font-semibold leading-6 text-gray-400">
              Name:
            </p>
            <p
              className="mt-3 truncate text-2xl leading-5 text-gray-900">
              {student?.firstName} {student?.lastName}
            </p>
            <Link
              to={'edit'}>
              <button
                className="mt-5 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Edit Student
              </button>
            </Link>
          </div>
        </li>
        <li
          className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p
            className="text-2xl leading-6 text-gray-400">
            Grade:
          </p>
          <p
            className="mt-3 text-xl leading-5 text-gray-900">
            {student?.grade?.grade}
          </p>
          <div
            className="mt-1 flex items-center gap-x-1.5">
          </div>
          <div>
            <button
              className="mt-4 rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={handleDelete}>
              Delete Student
            </button>
          </div>
        </li>
      </ul>
    </section>
  )
}
