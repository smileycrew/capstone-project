import { useEffect, useState } from "react"
import { postStudentToDatabase } from "../../services/studentServices"
import { fetchGrades } from "../../services/gradeServices"

export const CreateStudent = ({ user, navigate }) => {

  const [grades, setGrades] = useState([])
  const [studentForm, setStudentForm] = useState({})

  const handleFetchCalls = () => {
    fetchGrades().then((data) => {
      setGrades(data)
    })
  }

  const handleInput = (event) => {
    const copy = { ...studentForm }
    const name = event.target.name
    const value = event.target.value
    copy[name] = value
    setStudentForm(copy)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postStudentToDatabase(studentForm).then(() => {
      navigate("/students")
    })
  }

  useEffect(() => {
    const copy = { ...studentForm }
    copy.userId = user.id
    setStudentForm(copy)
    handleFetchCalls()
  }, [user])

  return (
    <main
      className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <section
        className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1
          className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Add New Student
        </h1>
      </section>
      <section
        className="flex mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative h-16 items-center justify-start gap-10 pt-10 sm:col-span-3">
        <section
          className="sm:col-span-3">
          <label
            className="block text-sm font-medium leading-6 text-gray-900">
            Grade
            <form
              className="mt-2">
              <select
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                name="gradeId"
                onChange={handleInput}
                required>
                <option>
                  choose a grade
                </option>
                {grades.map((grade) => {
                  return (
                    <option key={grade.id} value={grade.id}>
                      {grade.grade}
                    </option>
                  )
                })}
              </select>
            </form>
          </label>
        </section>
      </section>
      <section
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <section
          className="space-y-6">
          <label
            className="block text-sm font-medium leading-6 text-gray-900">
            First Name
            <input
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              name="firstName"
              onChange={handleInput}
              required />
          </label>
          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900">
              Last Name
              <input
                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                name="lastName"
                onChange={handleInput}
                required />
            </label>
          </div>
          <div>
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}>
              Add
            </button>
          </div>
        </section>
      </section>
    </main>
  )
}
