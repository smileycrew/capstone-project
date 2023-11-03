import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fetchAllStudentWorksheets, putStudentWorksheetInDatabase } from "../services/worksheetServices"

export const StudentAnswers = ({ user }) => {

    const [studentWorksheet, setStudentWorksheet] = useState([])

    const navigate = useNavigate()

    const { worksheetId } = useParams()

    const handleAnswerInput = (event) => {
        const copy = { ...studentWorksheet }
        const id = parseInt(event.target.id)
        // const name = event.target.name
        const value = event.target.value
        const updateQuestionAndAnswers = copy?.worksheet?.questionAndAnswers?.map((question) => {
            if (question.id === id) {
                return (
                    { ...question, studentAnswer: value }
                )
            } else {
                return (
                    question
                )
            }
        })
        copy.worksheet.questionAndAnswers = updateQuestionAndAnswers
        copy.questionAndAnswers = updateQuestionAndAnswers
        setStudentWorksheet(copy)
    }

    const handlestudentWorksheetFetch = () => {
        fetchAllStudentWorksheets().then((data) => {
            const filteredData = data.filter((datum) => datum.studentId === user.studentId && datum?.id === worksheetId * 1)
            setStudentWorksheet(filteredData[0])
        })
    }

    const handleUpdateButton = (event) => {
        event.preventDefault()
        const copy = { ...studentWorksheet }
        const questionAndAnswers = copy?.worksheet?.questionAndAnswers
        delete copy.student
        delete copy.worksheet
        copy.questionAndAnswers = questionAndAnswers
        putStudentWorksheetInDatabase(copy).then(() => {
            navigate('/worksheets')
        })
    }

    useEffect(() => {
        handlestudentWorksheetFetch()
    }, [user?.id])

    return (
        <>
            <div className="relative h-screen isolate overflow-hidden bg-gray-900 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 "></div>
                <div className="container mx-auto p-4">
                    <h2 className="text-2xl text-white font-bold mb-4">Student Worksheet</h2>
                    <form onSubmit={handleUpdateButton} className="max-w-lg mx-auto">
                        {studentWorksheet?.worksheet?.questionAndAnswers?.map((item, index) => (
                            <div key={index} className="mb-4">
                                <label className="block text-sm font-medium text-white">Question {index + 1}</label>
                                <p
                                    className="mt-1 p-2 border border-gray-300 text-white rounded-md w-full"
                                >{item.question}</p>
                                <label className="block text-sm font-medium text-white">Answer</label>
                                <input
                                    id={item?.id}
                                    type="text"
                                    value={item?.studentAnswer}
                                    onChange={(event) => { handleAnswerInput(event) }}
                                    placeholder="type your answer here"
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    required
                                />
                                <label className="block text-sm font-medium text-white">Hints</label>
                                <p
                                    className="mt-1 p-2 border border-gray-300 text-white rounded-md w-full"
                                >{item?.hint}</p>
                            </div>
                        ))}
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Submit
                        </button>
                    </form>
                </div>
                <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
                    <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" ></div>
                </div>
            </div>
        </>
    )
}