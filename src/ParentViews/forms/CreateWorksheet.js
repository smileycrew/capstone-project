import { useEffect, useState } from "react"
import { WorksheetHeaderForm } from "./WorksheetHeaderForm"
import { WorksheetInputForm } from "./WorksheetInputForm"
import { fetchGrades } from "../../services/gradeServices"
import { fetchSubjects } from "../../services/subjectServices"
import { NavBar } from "../../components/NavBar"

export const CreateWorksheet = ({ user }) => {

    const [grades, setGrades] = useState([])
    const [subjects, setSubjects] = useState([])
    const [worksheetForm, setWorksheetForm] = useState({})

    const handleWorksheetFetchCalls = () => {
        fetchGrades().then((data) => {
            setGrades(data)
        })
        fetchSubjects().then((data) => {
            setSubjects(data)
        })
    }

    useEffect(() => {
        handleWorksheetFetchCalls()
    }, [])

    return (
        <>

            <div className="relative h-screen isolate overflow-hidden bg-gray-900 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 "></div>
                <NavBar />
                <div className="isolate px-6 lg:px-8">
                    <form className="mx-auto mt-16 max-w-xl sm:mt-20 ">
                        <WorksheetHeaderForm grades={grades} subjects={subjects} user={user} worksheetForm={worksheetForm} setWorksheetForm={setWorksheetForm} />
                        <WorksheetInputForm worksheetForm={worksheetForm} setWorksheetForm={setWorksheetForm} />
                    </form>
                </div>
                <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
                    <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30">
                    </div>
                </div>
            </div>
        </>
    )
}