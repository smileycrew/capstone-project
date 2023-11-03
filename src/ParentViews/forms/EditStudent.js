import { useEffect, useState } from "react"
import { fetchGrades } from "../../services/gradeServices"
import { putStudentInDatabase } from "../../services/studentServices"

export const EditStudent = ({ chosenStudent, editStudentToggle, setEditStudentToggle, handleFetchCalls }) => {

    const [editedStudent, setEditedStudent] = useState({})
    const [grades, setGrades] = useState([])

    const handleEditStudentInput = (event) => {
        const copy = { ...editedStudent }
        const name = event.target.name
        const value = event.target.value
        copy[name] = value
        setEditedStudent(copy)
    }

    const handleEditStudentToggle = () => {
        setEditStudentToggle(!editStudentToggle)
    }

    const handleEditFetchCalls = () => {
        fetchGrades().then((data) => {
            setGrades(data)
        })
    }

    const handleUpdateButton = (event) => {
        event.preventDefault()
        const copy = { ...editedStudent }
        delete copy.grade
        putStudentInDatabase(copy).then(() => {
            handleEditStudentToggle()
            handleFetchCalls()
        })
    }

    useEffect(() => {
        setEditedStudent(chosenStudent)
        handleEditFetchCalls()
    }, [chosenStudent])

    return (
        <>
            {editStudentToggle ?
                <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <div className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <b className="text-lg font-medium text-gray-900" id="slide-over-title"></b>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button onClick={handleEditStudentToggle} type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                                                        <span className="absolute -inset-0.5"></span>
                                                        <span className="sr-only">Close panel</span>
                                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                className="flex mx-auto max-w-7xl px- sm:px-6 lg:px-8 relative h-16 items-center justify-center gap-10 pt-10">
                                                <img
                                                    className="text-center h-32 w-32 rounded-full"
                                                    src={`https://api.dicebear.com/7.x/big-smile/svg?seed=${editedStudent?.firstName}`}
                                                    alt="" />
                                                <section
                                                    className="sm:col-span-3">
                                                    <label
                                                        className="block text-sm font-medium leading-6 text-gray-900">
                                                        Grade
                                                        <select
                                                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                            name="gradeId"
                                                            onChange={handleEditStudentInput}
                                                            required>
                                                            <option
                                                                value={chosenStudent?.gradeId}>
                                                                {chosenStudent?.grade?.grade}
                                                            </option>
                                                            {grades.map((grade) => {
                                                                return (
                                                                    <option
                                                                        key={grade?.id}
                                                                        value={grade?.id}>
                                                                        {grade?.grade}
                                                                    </option>
                                                                )
                                                            })}
                                                        </select>
                                                    </label>
                                                </section>
                                            </div>
                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <form
                                                        className="space-y-6"
                                                        onSubmit={"handleRegisterUser"}>
                                                        <fieldset>
                                                            <label
                                                                className="block text-sm font-medium leading-6 text-gray-900">
                                                                First Name
                                                                <input
                                                                    className="mt-2 text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    autoComplete="first name"
                                                                    name="firstName"
                                                                    onChange={handleEditStudentInput}
                                                                    placeholder="Enter your first name"
                                                                    required
                                                                    type="text"
                                                                    value={editedStudent?.firstName} />
                                                            </label>
                                                        </fieldset>
                                                        <fieldset>
                                                            <label
                                                                className="block text-sm font-medium leading-6 text-gray-900">
                                                                Last Name
                                                                <input
                                                                    className="mt-2 text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    onChange={handleEditStudentInput}
                                                                    name="lastName"
                                                                    placeholder="Enter your last name"
                                                                    required
                                                                    type="text"
                                                                    value={editedStudent?.lastName} />
                                                            </label>
                                                        </fieldset>
                                                        <div className="sm:col-span-4">
                                                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                                                Student Code
                                                                <p
                                                                    className="mt-2 text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                                    {chosenStudent?.studentCode}{chosenStudent?.id}
                                                                </p>
                                                            </label>
                                                        </div>
                                                        <div
                                                            className="flex justify-end">
                                                            <button
                                                                type="submit"
                                                                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                onClick={handleUpdateButton}>
                                                                Update
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> :
                null
            }
        </>
    )
}