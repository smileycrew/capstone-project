import { useEffect, useState } from "react"
import { deleteWorksheetFromDatabase, fetchAllWorksheets } from "../services/worksheetServices"
import { fetchGrades } from '../services/gradeServices'
import { fetchSubjects } from '../services/subjectServices'
import { useNavigate } from "react-router-dom"
import { NavBar } from "../navbar/NavBar"
// SORT THIS ALSO BY MY WORKSHEETS!!!!!
export const Worksheets = ({ user }) => {

    const [grades, setGrades] = useState([])
    // const [studentWorksheets, setStudentWorksheets] = useState([])
    const [subjects, setSubjects] = useState([])
    const [worksheets, setWorksheets] = useState([])
    const [worksheetsToDisplay, setWorksheetsToDisplay] = useState([])

    const navigate = useNavigate()

    const handleDeleteWorksheet = (worksheet) => {
        deleteWorksheetFromDatabase(worksheet.id).then(() => {
            handleFetchWorksheets()
        })
    }

    const displayWorksheetsByGrade = (event) => {
        const filteredWorksheets = worksheets.filter((worksheet) => worksheet.gradeId === parseInt(event.target.value))
        setWorksheetsToDisplay(filteredWorksheets)
    }

    const displayWorksheetsBySubject = (event) => {
        const filteredWorksheets = worksheets.filter((worksheet) => worksheet.subjectId === parseInt(event.target.value))
        setWorksheetsToDisplay(filteredWorksheets)
    }

    const handleFetchGrades = () => {
        fetchGrades().then((data) => { setGrades(data) })
    }

    const handleFetchSubjects = () => {
        fetchSubjects().then((data) => {
            setSubjects(data)
        })
    }

    const handleFetchWorksheets = () => {
        fetchAllWorksheets().then((data) => {
            setWorksheets(data)
            setWorksheetsToDisplay(data)
        })
    }

    useEffect(() => {
        handleFetchGrades()
        handleFetchSubjects()
        handleFetchWorksheets()
    }, [user.id])

    return (
        <main>
            <main className="flex pt-10">
                {/* this is done dont touch pls */}
                <aside className="pl-10 w-2/12">
                    <header>Filters</header>
                    <nav>
                        <h3 className="pt-3 text-lg">By Grade</h3>
                        <ul className="border-b border-gray-900/10 mr-10 pb-3">
                            {grades.map((grade, index) => (<li key={index}>
                                <button className="hover: hover:text-blue-800 hover:underline mr-10 pl-3 pt-2 rounded text-gray-500" onClick={displayWorksheetsByGrade} value={grade.id}>
                                    {grade.level}
                                </button>
                            </li>))}
                        </ul>
                        <h3 className="pt-3 text-lg">By Subject</h3>
                        <ul>
                            {subjects.map((subject, index) => (
                                <li key={index}>
                                    <button className="hover: hover:text-blue-800 hover:underline mr-10 pl-3 pt-2 rounded text-gray-500" onClick={displayWorksheetsBySubject} value={subject.id}>
                                        {subject.name}
                                    </button>
                                </li>))}
                        </ul>
                    </nav>
                </aside>
                {/* this is done dont touch pls */}
                <div>
                    <header>
                        <h1 className="font-medium text-4xl">Worksheets</h1>
                    </header>
                    <main className="grid grid-cols-4">
                        {worksheetsToDisplay.map((worksheet, index) => {
                            return (
                                <section className="bg-white border-2 m-3 rounded shadow-xl" key={index}>
                                    {/* add some sort of border around the images */}
                                    <img className="h-50 w-50" src={worksheet.imageURL} alt="" />
                                    <h2 className="p-1">{worksheet.title}</h2>
                                    {worksheet.userId === user.id ?
                                        <div className="flex gap-5 justify-end p-1">
                                            {/* this needs to be a LINK maybe??? */}
                                            <button className="bg-blue-500 hover:bg-blue-400 rounded-md w-16">
                                                Edit
                                            </button>
                                            <button className="bg-red-500 hover:bg-red-400 rounded-md w-16" onClick={() => { handleDeleteWorksheet(worksheet) }}>
                                                Delete
                                            </button>
                                        </div> :
                                        <div className="flex justify-end p-1">
                                            <b></b>
                                            <button className="border hover:bg-yellow-400 rounded-full w-10">
                                                👍
                                            </button>
                                        </div>
                                    }
                                </section>
                            )
                        })}
                    </main>
                </div>
                {/* i might not need this part */}
                {/* <aside className="">side bar will go here</aside> */}
            </main>
        </main>
    )
}