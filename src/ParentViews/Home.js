import { useEffect, useState } from "react"
import { fetchUserStudents } from "../services/studentServices"
import { fetchAllStudentWorksheets, fetchUserWorksheets } from "../services/worksheetServices"
import { Link } from "react-router-dom"
import { putUserToDatabase } from '../services/userServices'
import { NavBar } from '../components/NavBar'

export const Home = ({ user, setUser }) => {

    const [studentWorksheets, setStudentWorksheets] = useState([])
    const [userStudents, setUserStudents] = useState([])
    const [userWorksheets, setUserWorksheets] = useState([])

    const handleFetchCalls = () => {
        fetchUserStudents(user?.id).then((data) => {
            setUserStudents(data)
        })
        fetchUserWorksheets(user?.id).then((data) => {
            const filterWorksheets = data?.filter((datum) => datum?.userId === user?.id)
            setUserWorksheets(filterWorksheets)
        })
        fetchAllStudentWorksheets().then((data) => {
            const filterStudentWorksheets = data.filter((datum) => datum.isComplete === true && datum.isApproved !== true && datum?.userId === user?.id)
            setStudentWorksheets(filterStudentWorksheets)
        })
    }

    const aboutMeInput = (event) => {
        const copy = { ...user }
        const value = event.target.value
        copy.aboutMe = value
        setUser(copy)
    }

    const updateAboutMe = () => {
        const copy = { ...user }
        putUserToDatabase(copy).then((data) => {
            setUser(data)

        })
    }

    useEffect(() => {
        handleFetchCalls()
    }, [user.id])

    return (
        <div
            className="relative h-screen isolate overflow-hidden bg-gray-900 ">
            <NavBar />
            <div
                className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
                <div
                    className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                    <div
                        className="max-w-xl lg:max-w-lg">
                        <h2
                            className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Welcome {user?.firstName} {user?.lastName}
                        </h2>
                        <p
                            className="mt-4 text-lg leading-8 text-gray-300">
                            {user?.aboutMe}
                        </p>
                        <div className="mt-6 flex max-w-md gap-x-4">
                            <input
                                required
                                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                onChange={aboutMeInput}
                                placeholder="Enter something about yourself" />
                            <button
                                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                onClick={updateAboutMe}>
                                Update
                            </button>
                        </div>
                    </div>
                    <dl
                        className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                        <div
                            className="flex flex-col items-start">
                            <div
                                className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                <Link
                                    to={'/students'}>
                                    <svg
                                        className="h-8 w-8 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </Link>
                            </div>
                            <dt
                                className="mt-4 font-semibold text-white">
                                {userStudents?.length} students added
                            </dt>
                            <dd
                                className="mt-2 leading-7 text-gray-400">
                                Click on the icon to see all students.
                            </dd>
                        </div>
                        <div
                            className="flex flex-col items-start">
                            <div
                                className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                <Link
                                    to={'/worksheets/create'}>
                                    <svg
                                        className="h-8 w-8 text-white"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path
                                            stroke="none"
                                            d="M0 0h24v24H0z" />
                                        <path
                                            d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                                        <path
                                            d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2" />
                                    </svg>
                                </Link>
                            </div>
                            <dt
                                className="mt-4 font-semibold text-white">
                                {userWorksheets?.length} worksheets added
                            </dt>
                            <dd
                                className="mt-2 leading-7 text-gray-400">
                                Click on the icon to add a worksheet.
                            </dd>
                        </div>
                        <div
                            className="flex flex-col items-start">
                            <div
                                className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                <Link
                                    to={'/worksheets/review'}>
                                    <svg
                                        className="h-8 w-8 text-white"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path
                                            stroke="none"
                                            d="M0 0h24v24H0z" />
                                        <path
                                            d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                                        <line
                                            x1="13.5"
                                            y1="6.5"
                                            x2="17.5"
                                            y2="10.5" />
                                    </svg>
                                </Link>
                            </div>
                            <dt
                                className="mt-4 font-semibold text-white">
                                {studentWorksheets?.length} worksheets to review
                            </dt>
                            <dd
                                className="mt-2 leading-7 text-gray-400">
                                Click on the icon to see all worksheets pending review.
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div
                className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" >
                <div
                    className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" >

                </div>
            </div>
        </div>
    )
}

