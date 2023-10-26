import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { fetchExpandedWorksheetById, putWorksheetInDatabase, } from "../../services/worksheetServices"
import { fetchUserStudents } from "../../services/studentServices"
import { fetchSubjects } from "../../services/subjectServices"

export const EditWorksheet = ({ user, navigate }) => {

  const [subjects, setSubjects] = useState([])
  const [userStudents, setUserStudents] = useState([])
  const [worksheet, setWorksheet] = useState([])

  const { worksheetId } = useParams()

  const handleFetchCalls = () => {
    fetchExpandedWorksheetById(worksheetId).then((data) => {
      setWorksheet(data[0])
    })
    fetchUserStudents(user.id).then((data) => {
      setUserStudents(data)
    })
    fetchSubjects().then((data) => {
      setSubjects(data)
    })
  }

  const handleInput = (event) => {
    const copy = { ...worksheet }
    const name = event.target.name
    const value = event.target.value
    copy[name] = value
    setWorksheet(copy)
  }

  const handleUpdate = (event) => {
    event.preventDefault()
    const object = {
      id: worksheet.id,
      date: worksheet.date,
      studentId: worksheet.studentId,
      subjectId: worksheet.subjectId,
      title: worksheet.title,
      userId: worksheet.userId,
    }
    putWorksheetInDatabase(object).then(() => {
      navigate("/worksheets")
    })
  }

  useEffect(() => {
    handleFetchCalls()
  }, [user, worksheetId])

  return (
    <main
      className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div
        className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2
          className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Edit Worksheet
        </h2>
      </div>
      <div
        className="flex mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative h-16 items-center justify-start gap-10 pt-10">
        <section
          className="sm:col-span-3">
          <label
            className="block text-sm font-medium leading-6 text-gray-900">
            Your Students
            <select
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              name="studentId"
              onChange={handleInput}>
              <option
                value={worksheet.studentId}>
                {worksheet?.student?.firstName} {worksheet?.student?.lastName}
              </option>
              {userStudents.map((student) => {
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
            Subjects
            <select
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              name="subjectId"
              onChange={handleInput}>
              <option>
                {worksheet?.subject?.name}
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
      </div>
      <div
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900">
              Title
              <input
                className="text-center mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                name="title"
                required
                onChange={handleInput}
                value={worksheet.title} />
            </label>
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
    </main>
  )
}
