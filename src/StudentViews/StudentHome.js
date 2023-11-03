import { useEffect, useState } from "react"
import { fetchAllStudentWorksheets } from "../services/worksheetServices"
import { Link } from "react-router-dom"
import { StudentNavBar } from '../StudentViews/StudentNavBar'

export const StudentHome = ({ user }) => {

    const [studentWorksheets, setStudentWorksheets] = useState([])


    const handleStudentWorksheetFetch = () => {
        fetchAllStudentWorksheets().then((data) => {
            const filteredData = data.filter((datum) => datum.studentId === user.studentId * 1 && datum.isApproved !== true)
            setStudentWorksheets(filteredData)
        })
    }

    useEffect(() => {
        handleStudentWorksheetFetch()
    }, [user.studentId])

    return (
        <div className="relative h-screen isolate overflow-hidden bg-gray-900">
            <StudentNavBar />
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                    <div className="max-w-xl lg:max-w-lg">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Welcome {user?.firstName} {user?.lastName}</h2>
                        <p className="mt-4 text-lg leading-8 text-gray-300">Please click on the worksheet icons to see your assigned worksheets</p>
                    </div>
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                        <div className="flex flex-col items-start">
                            <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                <Link to={'/worksheets'}>
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                    </svg>
                                </Link>
                            </div>
                            <dt className="mt-4 font-semibold text-white">{studentWorksheets?.length} worksheets to complete</dt>
                            <dd className="mt-2 leading-7 text-gray-400">Click on the icon to select a worksheet.</dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
                <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" ></div>
            </div>
        </div>
    )
}