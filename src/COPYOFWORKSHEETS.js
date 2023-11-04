import { useEffect, useState } from "react"
import { deleteWorksheetFromDatabase, fetchAllStudentWorksheets, fetchUserWorksheets } from "../services/worksheetServices"
import { useNavigate } from "react-router-dom"
import { NavBar } from "../components/NavBar"

export const Worksheets = ({ user }) => {

    const [studentWorksheets, setStudentWorksheets] = useState([])
    const [worksheets, setWorksheets] = useState([])

    const navigate = useNavigate()

    const handleDeleteButton = (event, id) => {
        event.preventDefault()
        deleteWorksheetFromDatabase(id).then(() => {
            handleWorksheetsFetchCall()
        })
    }

    const handleWorksheetsFetchCall = () => {
        fetchUserWorksheets(user.id).then((data) => {
            setWorksheets(data)
        })
        fetchAllStudentWorksheets().then((data) => {
            setStudentWorksheets(data)
        })
    }
    useEffect(() => {
        handleWorksheetsFetchCall()
    }, [user.id])

    return (
        <>
            <div className="relative h-screen isolate overflow-hidden bg-gray-900 ">
                <NavBar />
                <div className="mx-auto max-w-7xl px-6 lg:px-8 "></div>
                {worksheets.map((worksheet) => {
                    return (
                        <div
                            className="ml-10 lg:flex lg:items-center lg:justify-start py-8"
                            key={worksheet.id}>
                            <div
                                className="min-w-0">
                                <h2
                                    className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                                    {worksheet?.title}
                                </h2>
                                <div
                                    className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                                    <div
                                        className="mt-2 flex items-center text-sm text-gray-500">
                                        <svg
                                            className="h-8 w-8 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />

                                        </svg>
                                        {worksheet?.grade?.grade} Grade
                                    </div>
                                    <div
                                        className="mt-2 flex items-center text-sm text-gray-500">
                                        <svg
                                            className="h-8 w-8 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        {worksheet?.subject?.name}
                                    </div>
                                    <div
                                        className="mt-2 flex items-center text-sm text-gray-500">
                                        <svg
                                            className="h-8 w-8 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {worksheet?.questionAndAnswers?.length} Questions
                                    </div>
                                </div>
                            </div>
                            {worksheet?.userId === user?.id &&
                                <div
                                    className="mt-5 flex lg:ml-4 lg:mt-0">
                                    <span
                                        className="hidden sm:block">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            onClick={() => { navigate(`edit/${worksheet?.id}`) }}>
                                            <svg
                                                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true">
                                                <path
                                                    d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                                            </svg>
                                            Edit
                                        </button>
                                    </span>
                                    <span
                                        className="ml-3 hidden sm:block">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            onClick={(event) => {
                                                handleDeleteButton(event, worksheet?.id)
                                            }}>
                                            <svg
                                                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true">
                                                <path
                                                    d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                                                <path
                                                    d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                                            </svg>
                                            Delete
                                        </button>
                                    </span>
                                </div>
                            }
                        </div>
                    )
                })}
                <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
                    <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" ></div>
                </div>
            </div>
        </>
    )
}
