import { useEffect, useState } from "react"
import { deleteWorksheetFromDatabase, fetchAllWorksheets } from "../services/worksheetServices"
import { fetchGrades } from '../services/gradeServices'
import { fetchSubjects } from '../services/subjectServices'
import { useNavigate } from "react-router-dom"
import { deleteLikeFromDatabase, fetchUserLikes, postLikeToDatabase } from "../services/likeServices"
// SORT THIS ALSO BY MY WORKSHEETS!!!!!
export const Worksheets = ({ user }) => {

    const [grades, setGrades] = useState([])
    // const [studentWorksheets, setStudentWorksheets] = useState([])
    const [subjects, setSubjects] = useState([])
    const [userLikes, setUserLikes] = useState([])
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

    const handleFetchUserLikes = () => {
        fetchUserLikes(user.id).then((data) => { setUserLikes(data) })
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

    const handleLikeButton = (worksheetId) => {
        fetchUserLikes(user.id).then((data) => {
            const foundLike = data.find((datum) => datum.worksheetId === worksheetId)
            if (foundLike === undefined) {
                const likeToPost = {
                    userId: user.id,
                    worksheetId: worksheetId
                }
                postLikeToDatabase(likeToPost).then(() => { handleFetchWorksheets() })
            } else {
                deleteLikeFromDatabase(foundLike.id).then((data) => {
                    console.log("🚀 ~ file: Worksheets.js:67 ~ fetchUserLikes ~ data:", data)

                    console.log('made it here')
                })
            }
        })
    }

    useEffect(() => {
        handleFetchGrades()
        handleFetchSubjects()
        handleFetchUserLikes()
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
                                    <div className="">
                                        <img className="h-52 w-52" src={worksheet.imageURL} alt="" />
                                    </div>
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
                                            <button className={`${userLikes.find((like) => like.worksheetId === worksheet.id) === undefined ? 'bg-white' : 'bg-yellow-500'} border hover:bg-yellow-400 rounded-full w-10`} onClick={() => { handleLikeButton(worksheet.id) }}>
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