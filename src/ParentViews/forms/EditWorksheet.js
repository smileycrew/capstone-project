import { useEffect, useState } from "react"
import { EditWorksheetInputForm } from "./EditWorksheetInputForm"
import { fetchGrades } from "../../services/gradeServices"
import { fetchSubjects } from "../../services/subjectServices"
import { EditWorksheetHeaderForm } from "./EditWorksheetHeaderForm"
import { useParams } from "react-router-dom"
import { fetchExpandedWorksheetById } from "../../services/worksheetServices"
// import { NavBar } from '../../components/NavBar'

export const EditWorksheet = ({ user }) => {

    const [grades, setGrades] = useState([])
    const [subjects, setSubjects] = useState([])
    const [worksheet, setWorksheet] = useState({})
    const { worksheetId } = useParams()

    const handleWorksheetFetchCalls = () => {
        fetchGrades().then((data) => {
            setGrades(data)
        })
        fetchSubjects().then((data) => {
            setSubjects(data)
        })
        fetchExpandedWorksheetById(worksheetId, user?.id).then((data) => {
            setWorksheet(data[0])
        })
    }

    useEffect(() => {
        handleWorksheetFetchCalls()
    }, [user.id, worksheetId])

    return (
        <>
            <div className="relative h-screen isolate overflow-hidden bg-gray-900 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 "></div>
                {/* <NavBar /> */}
                <div class="isolate px-6 lg:px-8">
                    <form className="mx-auto mt-16 max-w-xl sm:mt-20">
                        <EditWorksheetHeaderForm grades={grades} subjects={subjects} user={user} worksheet={worksheet} setWorksheet={setWorksheet} />
                        <EditWorksheetInputForm worksheet={worksheet} setWorksheet={setWorksheet} />
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