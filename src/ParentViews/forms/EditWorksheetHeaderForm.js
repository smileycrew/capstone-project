import { useNavigate } from "react-router-dom"
import { putWorksheetInDatabase } from "../../services/worksheetServices"

export const EditWorksheetHeaderForm = ({ grades, subjects, worksheet, setWorksheet }) => {

    const navigate = useNavigate()

    const handleUserChoices = (event) => {
        const name = event.target.name
        const value = event.target.value
        const copyOfWorksheet = { ...worksheet }
        copyOfWorksheet[name] = value
        setWorksheet(copyOfWorksheet)
    }

    const handleCreateButton = (event) => {
        event.preventDefault()
        const copyOfWorksheet = { ...worksheet }
        delete copyOfWorksheet.subject
        delete copyOfWorksheet.grade
        putWorksheetInDatabase(copyOfWorksheet).then(() => {
            navigate('/worksheets')
        })
    }

    return (
        <div className="lg:flex lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
                <div className="">
                    <input
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        name="title"
                        onChange={handleUserChoices}
                        placeholder="insert title here"
                        type="text"
                        value={worksheet?.title} />
                </div>
                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                </div>
            </div>
            <div className="mt-5 flex lg:ml-4 lg:mt-0">
                <span className="hidden sm:block">
                    <select
                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        name='gradeId'
                        onChange={handleUserChoices}>
                        <option key={worksheet?.gradeId} value={worksheet?.gradeId}>{worksheet?.grade?.grade}</option>
                        {grades.map((grade) => <option key={grade?.id} value={grade?.id}>{grade?.grade}</option>)}
                    </select>
                </span>
                <span className="ml-3 hidden sm:block">
                    <select
                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        name='subjectId'
                        onChange={handleUserChoices}>
                        <option key={worksheet?.subjectId} value={worksheet?.subjectId}>{worksheet?.subject?.name}</option>
                        {subjects.map((subject) => <option key={subject?.id} value={subject?.id}>{subject?.name}</option>)}
                    </select>
                </span>
                <span className="sm:ml-3">
                    <button
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleCreateButton}>
                        <svg
                            className="-ml-0.5 mr-1.5 h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true">
                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                        </svg>
                        Publish
                    </button>
                </span>
            </div>
        </div>
    )
}