import { useEffect, useState } from "react"
import { fetchAllStudentWorksheets, putStudentWorksheetInDatabase } from "../services/worksheetServices"
import { useNavigate } from "react-router-dom"
import { NavBar } from "../components/NavBar"

export const ReviewWorksheets = ({ user }) => {

    const [studentWorksheets, setStudentWorksheets] = useState([])

    const navigate = useNavigate()

    const fetchCalls = () => {
        fetchAllStudentWorksheets().then((data) => {
            const filterStudentWorksheets = data.filter((datum) => datum.isApproved !== true && datum.isComplete === true && datum?.userId === user?.id)
            setStudentWorksheets(filterStudentWorksheets)
        })
    }

    const approveWorksheet = (event, studentWorksheet) => {
        event.preventDefault()
        const copy = { ...studentWorksheet }
        copy.isApproved = true
        delete copy.student
        delete copy.worksheet
        putStudentWorksheetInDatabase(copy).then(() => {
            navigate('/')
        })
    }

    const rejectWorksheet = (event, studentWorksheet) => {
        event.preventDefault()
        const copy = { ...studentWorksheet }
        copy.isApproved = false
        delete copy.student
        delete copy.worksheet
        putStudentWorksheetInDatabase(copy).then(() => {
            navigate('/')
        })
    }

    useEffect(() => {
        fetchCalls()
    }, [])

    return (
        <>
            <div className=" h-screen isolate  bg-gray-900 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 "></div>
                <NavBar />
                <div className="container mx-auto p-4">
                    <h2 className="text-2xl text-white font-bold mb-4">Review Worksheet</h2>
                    <form onSubmit={"handleUpdateButton"} className="max-w-lg mx-auto">
                        {studentWorksheets.map((studentWorksheet) => {
                            if (studentWorksheet?.isApproved === true || studentWorksheet?.isApproved === false) {
                                return (
                                    null
                                )
                            } else {
                                return (
                                    <>
                                        {studentWorksheet?.questionAndAnswers?.map((studentAnswer, index) => {
                                            return (
                                                <>

                                                    <div key={index} className="mb-4">
                                                        <label className="block text-sm font-medium text-white">Question {index + 1}</label>
                                                        <p className="mt-1 p-2 border border-gray-300 text-white rounded-md w-full">{studentAnswer?.question}</p>
                                                        <label className="block text-sm font-medium text-white">Answer</label>
                                                        <p className="mt-1 p-2 border border-gray-300 rounded-md text-white w-full">{studentAnswer?.studentAnswer}</p>
                                                        <label className="block text-sm font-medium text-white">Hints</label>
                                                        <p className="mt-1 p-2 border border-gray-300 rounded-md w-full text-white">{studentAnswer?.hint}</p>
                                                    </div>
                                                </>
                                            )
                                        })}
                                        <div className="flex justify-end gap-5">
                                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={(event) => { approveWorksheet(event, studentWorksheet) }}>
                                                Submit
                                            </button>
                                            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={(event) => { rejectWorksheet(event, studentWorksheet) }}>
                                                Reject
                                            </button>
                                        </div>
                                    </>
                                )
                            }

                        })}
                    </form >
                </div >
                <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
                    <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30">
                    </div>
                </div>
            </div >
        </>
    )
}