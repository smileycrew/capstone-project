import { useEffect, useState } from "react"
import { fetchGrades } from "../../services/gradeServices"
import { postStudentToDatabase } from "../../services/studentServices"
import { useNavigate } from "react-router-dom"

export const CreateStudent = ({ user }) => {

    // Generate a random number between 100,000 and 999,999
    const generateRandomNumber = () => {
        const min = 1000;
        const max = 9999;
        const randomOrderNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomOrderNumber
    }

    const [grades, setGrades] = useState([])
    const [userStudent, setUserStudent] = useState({
        email: "",
        gpa: 100,
        studentCode: generateRandomNumber(),
        userId: user.id
    })

    const navigate = useNavigate()

    const handleCreateStudent = () => {
        const studentToCreate = { ...userStudent }
        postStudentToDatabase(studentToCreate).then(() => { navigate('/students') })
    }

    const handleFetchGrades = () => {
        fetchGrades().then((data) => { setGrades(data) })
    }

    const handleGradeSelectInput = (event) => {
        const updatedUserStudent = { ...userStudent, [event.target.name]: parseInt(event.target.value) }
        setUserStudent(updatedUserStudent)

    }

    const handleUserInputs = (event) => {
        const updatedUserStudent = { ...userStudent, [event.target.name]: event.target.value }
        setUserStudent(updatedUserStudent)
    }

    useEffect(() => {
        handleFetchGrades()
    }, [])

    return (
        <>
            <main className="border flex flex-col h-screen items-center pt-28">
                <div className="bg-white border p-10 rounded-md shadow-lg">
                    <section className="">
                        <div className="flex gap-10 pb-5">
                            <div className="">
                                <img className="bg-gray-500 h-40 rounded-full shadow-lg w-40" src={`https://api.dicebear.com/7.x/big-smile/svg?seed=${userStudent.firstName}%20${userStudent.lastName}`} alt="avatar" />
                            </div>
                            <div className="flex flex-col gap-2 justify-center">
                                <label>Grade:</label>
                                <select className="border h-10 hover:border-blue-500/100 w-52 rounded-md" name="gradeId" onChange={handleGradeSelectInput}>
                                    <option>choose a grade</option>
                                    {grades.map((grade, index) => <option key={index} value={grade.id}>{grade.level}</option>)}
                                </select>
                            </div>
                        </div>
                    </section>
                    <form className="flex flex-col">
                        <fieldset className="flex flex-col">
                            <label>First name</label>
                            <input className="border h-10 hover:border-blue-500/100 rounded-md text-center" name="firstName" onChange={handleUserInputs} placeholder="Enter first name..." />
                        </fieldset>
                        <fieldset className="flex flex-col pb-5 pt-5">
                            <label>Last name</label>
                            <input className="border h-10 hover:border-blue-500/100 rounded-md text-center" name="lastName" onChange={handleUserInputs} placeholder="Enter last name..." />
                        </fieldset>
                    </form>
                    <div className="flex gap-3 justify-between">
                        <button className="bg-gray-200 border h-10 hover:bg-gray-100 w-2/4 rounded-md" onClick={() => { navigate('students') }}>Cancel</button>
                        <button className="bg-blue-500 border h-10 hover:bg-blue-400 w-2/4 rounded-md" onClick={handleCreateStudent}>Create</button>
                    </div>
                </div>
            </main>
        </>
    )
}