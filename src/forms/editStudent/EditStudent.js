import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchUserStudentByIds, putStudentInDatabase, } from "../../services/studentServices"
import { fetchGrades } from "../../services/gradeServices"

export const EditStudent = ({ user, navigate }) => {

  const [editStudent, setEditStudent] = useState({})
  const [grades, setGrades] = useState([])

  const { studentId } = useParams()

  const handleFetchCalls = () => {
    fetchUserStudentByIds(user.id, studentId).then((data) => {
      setEditStudent(data[0])
    })
    fetchGrades().then((data) => {
      setGrades(data)
    })
  }

  const handleInput = (event) => {
    const name = event.target.name
    const value = event.target.value
    const copy = { ...editStudent }
    copy[name] = value
    setEditStudent(copy)
  }

  const handleUpdate = (event) => {
    event.preventDefault()
    const object = {
      id: editStudent.id,
      firstName: editStudent.firstName,
      lastName: editStudent.lastName,
      gradeId: editStudent.gradeId,
      userId: editStudent.userId,
    }
    putStudentInDatabase(object).then(() => {
      navigate("/students")
    })
  }

  useEffect(() => {
    handleFetchCalls()
  }, [studentId, user])

  return (
    <div
      className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div
        className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2
          className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Update Student
        </h2>
      </div>
      <div
        className="flex mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative h-16 items-center justify-start gap-10 pt-10">
        <section
          className="sm:col-span-3">
          <label
            className="block text-sm font-medium leading-6 text-gray-900">
            Grade
          </label>
          <div
            className="mt-2">
            <select
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              name="gradeId"
              onChange={handleInput}
              required>
              <option>
                {editStudent?.grade?.grade}
              </option>
              {grades.map((grade) => {
                return (
                  <option key={grade.id} value={grade.id}>
                    {grade.grade}
                  </option>
                )
              })}
            </select>
          </div>
        </section>
      </div>
      <div
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900">
              First Name
            </label>
            <div
              className="mt-2">
              <input
                className=" text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                name="firstName"
                onChange={handleInput}
                required
                value={editStudent?.firstName} />
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900">
              Last Name
            </label>
            <div
              className="mt-2">
              <input
                className=" text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                name="lastName"
                onChange={handleInput}
                required
                value={editStudent?.lastName} />
            </div>
          </div>
          <div>
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
