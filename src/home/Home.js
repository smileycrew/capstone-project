import { useEffect, useState } from "react"
import { fetchUserStudents } from "../services/studentServices"
import { fetchUserWorksheets } from "../services/worksheetServices"

export const Home = ({ user }) => {

    const [userInfo, setUserInfo] = useState({})
    const [userStudents, setUserStudents] = useState([])
    const [userWorksheets, setUserWorksheets] = useState([])

    const handleFetchCalls = () => {
        fetchUserStudents(user.id).then((data) => {
            setUserStudents(data)
        })
        fetchUserWorksheets(user.id).then((data) => {
            setUserWorksheets(data)
        })
        setUserInfo(user)
    }

    useEffect(() => {
        handleFetchCalls()
    }, [user])

    return (
        <main
            className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
            <section
                className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl">
                <div
                    className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}>
                </div>
            </section>
            <section
                className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu">
                <div
                    className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }} />
            </section>
            <section
                className="mx-auto max-w-7xl px-6 lg:px-8 ">
                <p
                    className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
                    Welcome,
                </p>
                <h1
                    className="text-4xl font-bold tracking-tight text-white sm:text-6xl mt-4">
                    {userInfo.firstName} {userInfo.lastName}
                </h1>
                <p
                    className="mt-6 text-lg leading-8 text-gray-300">
                    {userInfo.body}
                </p>
            </section>
            <section
                className="mx-auto max-w-7xl px-6 lg:px-8">
                <ul
                    className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                    <li
                        className="flex flex-col-reverse">
                        <p
                            className="text-base leading-7 text-gray-300">
                            Students Added
                        </p>
                        <p
                            className="text-2xl font-bold leading-9 tracking-tight text-white">
                            {userStudents.length}
                        </p>
                    </li>
                    <li
                        className="flex flex-col-reverse">
                        <p
                            className="text-base leading-7 text-gray-300">
                            Worksheets Added
                        </p>
                        <p
                            className="text-2xl font-bold leading-9 tracking-tight text-white">
                            {userWorksheets.length}
                        </p>
                    </li>
                </ul>
            </section>
        </main>
    )
}
