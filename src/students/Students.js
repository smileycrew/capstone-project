import { useEffect, useState } from "react"
import { fetchUserStudents } from "../services/studentServices"
import { Link } from "react-router-dom"

export const Students = ({ user }) => {

  const [students, setStudents] = useState([])

  const handleFetchCalls = () => {
    fetchUserStudents(user.id).then((data) => {
      setStudents(data)
    })
  }

  useEffect(() => {
    handleFetchCalls()
  }, [user])

  return (
    <main
      className="bg-white py-24 sm:py-32 mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
      <section
        className="max-w-2xl">
        <h1
          className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          My students
        </h1>
        <p
          className="mt-6 mb-6 text-lg leading-8 text-gray-600">
          Please click on a name to see your student's information
        </p>
        <p
          className="mt-6 mb-6 text-lg leading-8 text-gray-600">
          or add a new student
        </p>
        <Link
          className="mt-5 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          to="/addstudent">
          Add Student
        </Link>
      </section>
      <ul
        className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
        {students.map((student) => (
          <li
            className="flex items-center gap-x-6"
            key={student.id}>
            <img
              className="h-16 w-16 rounded-full"
              src={`https://ui-avatars.com/api/?name=${student.firstName}+${student.lastName}`}
              alt="" />
            <div>
              <Link
                to={`${student.id}`}>
                <h3
                  className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                  {student.firstName} {student.lastName}
                </h3>
              </Link>
              <p
                className="text-sm font-semibold leading-6 text-indigo-600">
                <span
                  className="">
                  Grade:
                  <span> </span>
                </span>
                {student.grade.grade}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
