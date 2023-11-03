import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { fetchAllStudentWorksheets, putStudentWorksheetInDatabase } from "../services/worksheetServices"
import { fetchGrades } from '../services/gradeServices'
import { fetchSubjects } from '../services/subjectServices'
import { StudentNavBar } from "./StudentNavBar"

export const StudentWorksheets = ({ user }) => {

    const [grades, setGrades] = useState([])
    const [studentWorksheets, setStudentWorksheets] = useState([])
    const [subjects, setSubjects] = useState([])

    const navigate = useNavigate()

    const handlEditButton = (studentWorksheet) => {
        navigate(`edit/${studentWorksheet?.id}`)
    }

    const handleStudentWorksheetFetch = () => {
        fetchAllStudentWorksheets().then((data) => {
            const filteredData = data.filter((datum) => datum.studentId === user.studentId && datum.isApproved !== true)
            setStudentWorksheets(filteredData)
        })
        fetchGrades().then((data) => {
            setGrades(data)
        })
        fetchSubjects().then((data) => {
            setSubjects(data)
        })
    }

    const markWorksheetAsCompleted = (event, studentWorksheet) => {
        event.preventDefault()
        const copy = { ...studentWorksheet, isComplete: true }
        delete copy.worksheet
        delete copy.student
        putStudentWorksheetInDatabase(copy).then(() => {
            handleStudentWorksheetFetch()
        })
    }

    useEffect(() => { handleStudentWorksheetFetch() }, [user.id])

    return (
        <>

            <div className="relative h-screen isolate overflow-hidden bg-gray-900 ">
                <StudentNavBar />
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
                    <div className="mx-auto max-w-3xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:flex lg:flex-col lg:items-center lg:justify-between">
                            {studentWorksheets.map((studentWorksheet) => {
                                return (
                                    <div className="min-w-0 flex-2"
                                        key={studentWorksheet.id}>
                                        <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">{studentWorksheet?.worksheet?.title}</h2>
                                        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                                <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 016 4.193V3.75zm6.5 0v.325a41.622 41.622 0 00-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25zM10 10a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V11a1 1 0 00-1-1H10z" clipRule="evenodd" />
                                                    <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 01-9.274 0C3.985 17.585 3 16.402 3 15.055z" />
                                                </svg>
                                                {grades.find((grade) => grade?.id === studentWorksheet?.worksheet?.gradeId * 1)?.grade} Grade
                                            </div>
                                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                                <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                                                </svg>
                                                {subjects.find((subject) => subject?.id === studentWorksheet?.worksheet?.subjectId * 1)?.name}
                                            </div>
                                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                                <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152z" />
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a.75.75 0 01.75.75v.316a3.78 3.78 0 011.653.713c.426.33.744.74.925 1.2a.75.75 0 01-1.395.55 1.35 1.35 0 00-.447-.563 2.187 2.187 0 00-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 11-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 111.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 01-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 011.653-.713V4.75A.75.75 0 0110 4z" clipRule="evenodd" />
                                                </svg>
                                                {studentWorksheet?.worksheet?.questionAndAnswers?.length} Questions
                                            </div>
                                            <div className="mt-5 flex lg:ml-4 lg:mt-0">
                                                {studentWorksheet?.isComplete !== true ?
                                                    <span className="hidden sm:block">
                                                        <button type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onClick={() => { handlEditButton(studentWorksheet) }}>
                                                            <svg className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                                                            </svg>
                                                            Edit
                                                        </button>
                                                    </span> :
                                                    null
                                                }

                                                {studentWorksheet.isApproved === false &&
                                                    <span className="ml-3 hidden sm:block">
                                                        <button type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                            Rejected
                                                        </button>
                                                    </span>
                                                }
                                                {studentWorksheet?.isComplete ? null :
                                                    <span className="sm:ml-3">
                                                        <button type="button" className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                            onClick={(event) => { markWorksheetAsCompleted(event, studentWorksheet) }}>
                                                            <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                                            </svg>
                                                            Submit
                                                        </button>
                                                    </span>
                                                }
                                                {studentWorksheet?.isApproved !== true && studentWorksheet?.isApproved !== false && studentWorksheet?.isComplete === true &&
                                                    <span className="sm:ml-3">
                                                        <button type="button" className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                                            onClick={(event) => { markWorksheetAsCompleted(event, studentWorksheet) }}>
                                                            <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                                            </svg>
                                                            Pending
                                                        </button>
                                                    </span>}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
                    <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" ></div>
                </div>
            </div>
        </>
    )
}

