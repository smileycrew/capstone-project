import { useEffect, useState } from "react"
import { fetchUserStudents } from "../../services/studentServices"
import { fetchSubjects } from "../../services/subjectServices"
import { postWorksheetToDatabase } from "../../services/worksheetServices"

export const CreateWorksheet = ({ user, navigate }) => {

  const [newWorksheet, setNewWorksheet] = useState({
    title: "",
    imageURL: ""
  })

  const [subjects, setSubjects] = useState([])
  const [userStudents, setUserStudent] = useState([])

  const handlFetchCalls = () => {
    fetchUserStudents(user.id).then((data) => {
      setUserStudent(data)
    })
    fetchSubjects().then((data) => {
      setSubjects(data)
    })
  }

  const handleInput = (event) => {
    const copy = { ...newWorksheet }
    const name = event.target.name
    const value = event.target.value
    copy[name] = value
    setNewWorksheet(copy)
  }

  function formatDate(date) {
    const month = (date.getMonth() + 1).toString().padStart(2, "0") // Add 1 to get the correct month (months are 0-based)
    const day = date.getDate().toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }

  const today = new Date()
  const formattedDate = formatDate(today)

  const handleAddWorksheet = (event) => {
    event.preventDefault()
    const copy = { ...newWorksheet }
    copy.userId = user.id
    copy.date = formattedDate
    console.log("🚀 ~ file: CreateWorksheet.js:42 ~ handleAddWorksheet ~ copy:", copy)
    // postWorksheetToDatabase(copy).then(() => {
    //   navigate("/worksheets")
    // })
  }

  useEffect(() => {
    handlFetchCalls()
  }, [user])

  return (
    <div
      className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div
        className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2
          className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Add New Worksheet
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
              <option>
                select a student
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
                select a subject
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
      <section
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div
          className="space-y-6">
          <label
            className="block text-sm font-medium leading-6 text-gray-900">
            Title
            <input
              className="text-center mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              name="title"
              required
              onChange={handleInput}
              value={newWorksheet?.title} />
          </label>
          <label
            className="block text-sm font-medium leading-6 text-gray-900">
            Image URL
            <input
              className="text-center mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              name="imageURL"
              required
              onChange={handleInput}
              value={newWorksheet?.imageURL} />
            {/* https://images.app.goo.gl/5Pom7SPuGdYLT4cc9 */}
          </label>
          <div>
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleAddWorksheet}>
              Add
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}