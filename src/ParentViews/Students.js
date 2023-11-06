import { useEffect, useState } from "react"
import { fetchGrades } from '../services/gradeServices'
import { deleteStudentFromDatabase, fetchUserStudents } from '../services/studentServices'

export const Students = ({ user }) => {

    const [chosenStudent, setChosenStudent] = useState({
        email: "select a student to see the student email",
        gpa: "select a student to see student gpa",
        gradeId: "select a student to see student grade"
    })
    const [grades, setGrades] = useState([])
    const [userStudents, setUserStudents] = useState([])

    const handleChosenStudent = (studentId) => {
        const updatedChosenStudent = userStudents.find((student) => student.id === studentId)
        setChosenStudent(updatedChosenStudent)
    }

    const handleDeleteStudent = () => {
        deleteStudentFromDatabase(chosenStudent.id).then(() => handleFetchUserStudents())
    }

    const handleFetchGrades = () => {
        fetchGrades().then((data) => { setGrades(data) })
    }

    const handleFetchUserStudents = () => {
        fetchUserStudents(user.id).then((data) => {
            setUserStudents(data)
        })
    }

    useEffect(() => {
        handleFetchUserStudents()
        handleFetchGrades()
    }, [user.id])

    return (
        <>
            <div className="flex justify-start h-screen pt-3 relative">
                <aside className="border-r h-full w-80">
                    <div className="flex">
                        <section className="flex flex-col w-full">
                            <p className="flex font-medium text-lg pb-2 pl-5 pt-5">{userStudents.length} students</p>
                            {userStudents.map((userStudent) => {
                                return (
                                    <>
                                        <div className="flex gap-5 justify-start hover:bg-gray-200 ml-1 mr-1 pb-3 pl-5 pt-3 rounded-md w-6/6">
                                            <div className="">
                                                <img className="bg-white rounded-full shadow-lg w-20" src={`https://api.dicebear.com/7.x/big-smile/svg?seed=${userStudent.firstName}%20${userStudent.lastName}`} alt="" onClick={() => { handleChosenStudent(userStudent.id) }} />
                                            </div>
                                            <div className="flex flex-col justify-center gap-2">
                                                <p className="font-semibold">{userStudent.firstName} {userStudent.lastName}</p>
                                                <p className="text-gray-500">{grades.find((grade) => grade.id === userStudent.gradeId)?.level} Grade</p>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </section>
                    </div>
                </aside>
                <main className="bg-white border-r flex flex-col pl-3 pr-3 pt-3 w-3/6">
                    <header className="flex flex-col h-80 justify-between items-center">
                        <div className="pb-5">
                            <img className="bg-white rounded-full  shadow-lg w-40" src={`https://api.dicebear.com/7.x/big-smile/svg?seed=${chosenStudent.firstName}%20${chosenStudent.lastName}`} alt="" />
                        </div>
                        <div className="pl-3 pb-3">
                            <h1 className="text-5xl font-semibold">{chosenStudent.firstName} {chosenStudent.lastName}</h1>
                        </div>
                        <div className="pl-3">
                            <p>
                                <span className="font-bold">Student login code:</span><span className="text-gray-600"> {chosenStudent.studentCode}{chosenStudent.id}</span>
                            </p>
                        </div>
                    </header>
                    <ul className="pt-3">
                        <li className=" pb-3">
                            <p className="bg-white border pb-3 pl-3 pt-3 rounded-md shadow-md">
                                <span className="font-semibold">Email: </span><span>{chosenStudent.email}</span>
                            </p>
                        </li>
                        <li className="pb-3">
                            <p className="bg-white border pb-3 pl-3 pt-3 rounded-md shadow-md">
                                <span className=" font-semibold">GPA: </span><span>{chosenStudent.gpa}</span>
                            </p>
                        </li>
                        <li className="pb-3">
                            <p className="bg-white border pb-3 pl-3 pt-3 rounded-md shadow-md">
                                <span className="font-semibold">Grade: </span><span>{chosenStudent.gradeId >= 0 ? grades.find((grade) => grade.id === chosenStudent.gradeId).level : chosenStudent.gradeId}</span>
                            </p>
                        </li>
                    </ul>
                    <section className="flex justify-around pt-3">
                        <button className="bg-blue-500 p-3 rounded w-36">Edit</button>
                        <button className="bg-red-500 p-3 rounded w-36" onClick={handleDeleteStudent}>Delete</button>
                    </section>
                </main>
                <aside>
                    <p>assign a worksheet</p>
                </aside>
            </div>
        </>
    )
}
