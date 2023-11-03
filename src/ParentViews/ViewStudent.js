import { useEffect } from "react"
import { deleteStudentFromDatabase, fetchUserStudentById } from "../services/studentServices"
import { useState } from "react"
import { deleteStudentWorksheetFromDatabase, fetchExpandedStudentWorksheetByStudentId, fetchUserWorksheets, postStudentWorksheetToDatabase } from '../services/worksheetServices'

export const ViewStudent = ({ setChosenStudent, handleViewStudentToggle, user, chosenStudent, viewStudentToggle, setViewStudentToggle, editStudentToggle, setEditStudentToggle, handleFetchCalls }) => {

    const [studentWorksheets, setStudentWorksheets] = useState([])
    const [worksheets, setWorksheets] = useState([])

    const handleAssignStudentWorksheets = (event) => {
        const value = event.target.value
        const object = {
            userId: user.id,
            studentId: chosenStudent.id,
            worksheetId: value
        }
        object.worksheetId = parseInt(value)
        postStudentWorksheetToDatabase(object).then(() => {
            fetchUserStudentById(user?.id, chosenStudent.id).then((data) => {
                setChosenStudent(data[0])
            })
        })
    }

    const handleDeleteAssignedWorksheet = (event, studentWorksheetId) => {
        event.preventDefault()
        deleteStudentWorksheetFromDatabase(studentWorksheetId).then(() => {
            fetchUserStudentById(user?.id, chosenStudent.id).then((data) => {
                setChosenStudent(data[0])
            })
        })
    }

    const handleWorksheetFetchCalls = () => {
        fetchUserWorksheets(user.id).then((data) => {
            setWorksheets(data)
        })
    }

    const handleExpandedWorksheetFetch = () => {
        fetchExpandedStudentWorksheetByStudentId(chosenStudent?.id).then((data) => {
            setStudentWorksheets(data)
        })
    }

    const handleViewStudentToggleButtton = () => {
        setViewStudentToggle(!viewStudentToggle)
    }

    const handleDeleteButton = (event) => {
        event.preventDefault()
        const copy = { ...chosenStudent }
        deleteStudentFromDatabase(copy.id).then(() => {
            handleViewStudentToggleButtton()
            handleFetchCalls()
        })
    }

    const handleEditStudentToggle = (event) => {
        event.preventDefault()
        setViewStudentToggle(!viewStudentToggle)
        setEditStudentToggle(!editStudentToggle)
    }

    useEffect(() => {
        handleWorksheetFetchCalls()
    }, [user.id])

    useEffect(() => {
        handleExpandedWorksheetFetch()
    }, [chosenStudent])

    return (
        <>
            {viewStudentToggle ?
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
                                                    <button onClick={handleViewStudentToggle} type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
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
                                                    src={`https://api.dicebear.com/7.x/big-smile/svg?seed=${chosenStudent?.firstName}`}
                                                    alt="" />
                                                <section
                                                    className="sm:col-span-3">

                                                    <label
                                                        className="block text-sm font-medium leading-6 text-gray-900">
                                                        Grade
                                                        <p
                                                            className="text-center mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                            name="gradeId"
                                                            onChange={"handleStudentInput"}
                                                            required>
                                                            <span>
                                                                {chosenStudent?.grade?.grade}
                                                            </span>
                                                        </p>
                                                    </label>
                                                </section>
                                            </div>
                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <form
                                                        className="space-y-6"
                                                        onSubmit={"handleRegisterUser"}>
                                                        <fieldset>
                                                            <p
                                                                className="block text-sm font-medium leading-6 text-gray-900">
                                                                First Name?
                                                            </p>
                                                            <p
                                                                className="mt-2 text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                autoComplete="first name"
                                                                id="firstName"
                                                                name="firstName"
                                                                placeholder="Enter your first name"
                                                                required
                                                                type="text">
                                                                {chosenStudent?.firstName}
                                                            </p>
                                                        </fieldset>
                                                        <fieldset>
                                                            <label
                                                                className="block text-sm font-medium leading-6 text-gray-900">
                                                                Last Name
                                                            </label>
                                                            <p
                                                                className="mt-2 text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                id="lastName"
                                                                onChange={"handleStudentInput"}
                                                                name="lastName"
                                                                placeholder="Enter your last name"
                                                                required
                                                                type="text">
                                                                {chosenStudent?.lastName}
                                                            </p>
                                                        </fieldset>

                                                        <div className="sm:col-span-4">
                                                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                                                Student Code
                                                            </label>
                                                            <p
                                                                className="mt-2 text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                id="lastName"
                                                                onChange={"handleStudentInput"}
                                                                name="lastName"
                                                                placeholder="Enter your last name"
                                                                required
                                                                type="text">
                                                                {chosenStudent?.studentCode}{chosenStudent?.id}
                                                            </p>
                                                        </div>
                                                        <div className="sm:col-span-4">
                                                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                                                Worksheets
                                                            </label>
                                                            <div
                                                                className="flex gap flex-wrap">
                                                                {studentWorksheets.length > 0 ?
                                                                    studentWorksheets.map((studentWorksheet) => {
                                                                        if (studentWorksheet?.studentId == chosenStudent?.id)
                                                                            return (
                                                                                <span
                                                                                    className="m-3 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                                                                    {studentWorksheet?.worksheet?.title}
                                                                                    <button
                                                                                        onClick={(event) => {
                                                                                            handleDeleteAssignedWorksheet(event, studentWorksheet?.id)
                                                                                        }}>
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-3 w-3 opacity-80">
                                                                                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                                                                        </svg>
                                                                                    </button>
                                                                                </span>
                                                                            )
                                                                    }) :
                                                                    <span
                                                                        className="m-3 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">No Worksheet Assigned</span>}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="flex justify-around">
                                                            <button
                                                                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                onClick={handleEditStudentToggle}>
                                                                Edit
                                                            </button>
                                                            <select
                                                                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                                onChange={handleAssignStudentWorksheets}>
                                                                <option>assign worksheets</option>
                                                                {worksheets.map((worksheet) => {
                                                                    return (
                                                                        <option key={worksheet?.id} value={worksheet?.id}>{worksheet?.title}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                            <button
                                                                className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                                                onClick={handleDeleteButton}>
                                                                Delete
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