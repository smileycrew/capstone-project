import { Link, useNavigate } from "react-router-dom"

export const StudentNavBar = () => {

    const navigate = useNavigate()

    return (
        <nav className="">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <li className="flex  items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Home</Link>
                            </div>
                        </div>
                    </li>
                    <li className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link to="/worksheets" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Worksheets</Link>
                            </div>
                        </div>
                    </li>
                    {localStorage.getItem("capstone_user") ? (
                        <li
                            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className="relative ml-3">
                                <button
                                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" to=""
                                    onClick={() => {
                                        localStorage.removeItem("capstone_user")
                                        navigate("/", { replace: true })
                                    }}>
                                    <p href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Logout</p>
                                </button>
                            </div>
                        </li>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </nav>
    )
}