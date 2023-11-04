import { CreateStudent } from './forms/CreateStudent'
import { useEffect, useState } from "react"
import { fetchUserStudentById, fetchUserStudents } from '../services/studentServices'
import { ViewStudent } from './ViewStudent'
import { EditStudent } from './forms/EditStudent'
// import { NavBar } from '../components/NavBar'

export const Students = ({ user }) => {

    const [chosenStudent, setChosenStudent] = useState({})
    const [students, setStudents] = useState([])
    const [createStudentToggle, setCreateStudentToggle] = useState(false)
    const [editStudentToggle, setEditStudentToggle] = useState(false)
    const [viewStudentToggle, setViewStudentToggle] = useState(false)

    const handleToggle = () => {
        setCreateStudentToggle(!createStudentToggle)
    }

    const handleFetchCalls = () => {
        fetchUserStudents(user?.id).then((data) => {
            setStudents(data)
        })
    }

    const handleViewStudentToggle = (student) => {
        fetchUserStudentById(user?.id, student.id).then((data) => {
            setViewStudentToggle(!viewStudentToggle)
            setChosenStudent(data[0])
        })
    }

    useEffect(() => {
        handleFetchCalls()
    }, [user?.id])

    return (
        <>
            <div className="relative h-screen isolate overflow-hidden bg-gray-900 ">
                {/* <NavBar /> */}
                <CreateStudent user={user} createStudentToggle={createStudentToggle} setCreateStudentToggle={setCreateStudentToggle} handleFetchCalls={handleFetchCalls} />
                <ViewStudent handleViewStudentToggle={handleViewStudentToggle} chosenStudent={chosenStudent} setChosenStudent={setChosenStudent} user={user} viewStudentToggle={viewStudentToggle} setViewStudentToggle={setViewStudentToggle} editStudentToggle={editStudentToggle} setEditStudentToggle={setEditStudentToggle} handleFetchCalls={handleFetchCalls} />
                <EditStudent chosenStudent={chosenStudent} editStudentToggle={editStudentToggle} setEditStudentToggle={setEditStudentToggle} handleFetchCalls={handleFetchCalls} />
                <div className="mx-auto max-w-7xl px-6 lg:px-8 "></div>
                <main
                    className="py-24 sm:py-32 mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3 lg:py-32">
                    <section
                        className="max-w-2xl">
                        <h1
                            className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            My students
                        </h1>
                        <p
                            className="mt-6 mb-6 text-lg leading-8 text-gray-400">
                            Please click on a name to see your student's information
                        </p>
                        <p
                            className="mt-6 mb-6 text-lg leading-8 text-gray-400">
                            or add a new student
                        </p>
                        <button
                            className="mt-5 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleToggle}>
                            Add Student
                        </button>
                    </section>
                    <ul
                        className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                        {students.map((student) => (
                            <li
                                className="flex items-center gap-x-6"
                                key={student?.id}>
                                <img
                                    alt=""
                                    className="h-16 w-16 rounded-full"
                                    src={`https://api.dicebear.com/7.x/big-smile/svg?seed=${student?.firstName}`} />
                                <h3
                                    className="hover:text-xl  text-base font-semibold leading-7 tracking-tight text-white"
                                    onClick={() => {
                                        handleViewStudentToggle(student)
                                    }}>
                                    {student?.firstName} {student?.lastName}
                                </h3>
                                <p
                                    className="text-sm font-semibold leading-6 text-gray-400">
                                    <span>
                                        Grade: {student?.grade?.grade}
                                    </span>

                                </p>
                            </li>
                        ))}
                    </ul>
                </main>
                <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
                    <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" ></div>
                </div>
            </div>
        </>
    )
}
