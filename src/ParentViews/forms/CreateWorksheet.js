import { useEffect, useState } from "react"
import { fetchGrades } from "../../services/gradeServices"
import { fetchSubjects } from "../../services/subjectServices"
import { postWorksheetToDatabase } from "../../services/worksheetServices"
import { useNavigate } from "react-router-dom"
import { postQuestionAndAnswerToDatabase } from "../../services/questionAndAnswerServices"

export const CreateWorksheet = ({ user }) => {

    const [grades, setGrades] = useState([])
    const [userQuestionsAndAnswers, setUserQuestionsAndAnswers] = useState([{
        answer: "",
        hint: "",
        question: "",
        userId: user.id
    }])
    const [userWorksheet, setUserWorksheet] = useState({
        gradeId: "",
        imageURL: "",
        subjectId: "",
        title: "",
        userId: user.id
    })
    const [subjects, setSubjects] = useState([])

    const navigate = useNavigate()

    const addNewLine = (event) => {
        event.preventDefault()
        const updatedUserQuestionsAndAnswers = [...userQuestionsAndAnswers, {
            answer: "",
            hint: "",
            question: "",
            userId: user.id
        }]
        setUserQuestionsAndAnswers(updatedUserQuestionsAndAnswers)
    }

    const handldCreateWorksheet = (event) => {
        event.preventDefault()
        const questionsAndAnswersToSave = [...userQuestionsAndAnswers]
        const worksheetToSave = { ...userWorksheet }
        postWorksheetToDatabase(worksheetToSave, questionsAndAnswersToSave).then((data) => {
            const worksheetId = data.id
            postQuestionAndAnswerToDatabase(questionsAndAnswersToSave, worksheetId).then(() => { navigate('/worksheets') })
        })
    }

    const handleFetchGrades = () => {
        fetchGrades().then((data) => { setGrades(data) })
    }

    const handleFetchSubjects = () => {
        fetchSubjects().then((data) => { setSubjects(data) })
    }

    const handleRemoveLine = (event, indexToRemove) => {
        event.preventDefault()
        const updatedUserQuestionsAndAnswers = userQuestionsAndAnswers.map((userQuestionAndAnswer, index) => {
            if (index === indexToRemove) {
                return null
            }
            return userQuestionAndAnswer
        }).filter((updatedQuestionAndAnswer) => updatedQuestionAndAnswer !== null)
        setUserQuestionsAndAnswers(updatedUserQuestionsAndAnswers)
    }

    const handleSelectInputs = (event) => {
        const updatedUserWorksheet = { ...userWorksheet, [event.target.name]: parseInt(event.target.value) }
        setUserWorksheet(updatedUserWorksheet)
    }

    const handleUserQAInput = (event, index) => {
        const updatedUserQuestionsAndAnswers = [...userQuestionsAndAnswers]
        updatedUserQuestionsAndAnswers[index][event.target.name] = event.target.value
        setUserQuestionsAndAnswers(updatedUserQuestionsAndAnswers)
    }

    const handleTitleAndURLInputs = (event) => {
        const updatedUserWorksheet = { ...userWorksheet, [event.target.name]: event.target.value }
        setUserWorksheet(updatedUserWorksheet)
    }

    useEffect(() => {
        handleFetchGrades()
        handleFetchSubjects()
    }, [])

    return (
        <>
            <main className="flex gap-5 pl-10 pr-10 pt-10">
                {/* add flex stretch to this? */}
                <form className="bg-white border p-10 rounded-md shadow-lg w-6/6">
                    <section className="flex justify-between">
                        <div className="flex flex-col w-full">
                            <fieldset className="flex flex-col pb-7">
                                <label>Title</label>
                                <input
                                    className="border h-10 hover:border-blue-500/100 rounded-md text-center w-1/2"
                                    name="title"
                                    onChange={handleTitleAndURLInputs}
                                    placeholder="insert title"
                                    type="text" />
                            </fieldset>
                            <fieldset className="flex flex-col pb-7">
                                <label>Image URL</label>
                                <input
                                    className="border h-10 hover:border-blue-500/100 rounded-md text-center w-1/2"
                                    name="imageURL"
                                    onChange={handleTitleAndURLInputs}
                                    placeholder="insert url"
                                    type="text" />
                            </fieldset>
                        </div>
                        <div>
                            <img className="h-40" src={userWorksheet.imageURL} alt="" />
                        </div>
                    </section>
                    <section className="flex justify-between gap-5 items-center pb-7">
                        <div className="flex gap-10">
                            <fieldset>
                                <select className="border h-10 hover:border-blue-500/100 rounded-md" name="gradeId" onChange={handleSelectInputs}>
                                    <option value={0}>choose a grade</option>
                                    {grades.map((grade, index) => <option key={index} value={grade.id}>{grade.level}</option>)}
                                </select>
                            </fieldset>
                            <fieldset>
                                <select className="border h-10 hover:border-blue-500/100 rounded-md" name="subjectId" onChange={handleSelectInputs}>
                                    <option>choose a subject</option>
                                    {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
                                </select>
                            </fieldset>
                        </div>
                        <div className="self-end">
                            <button className="bg-blue-500 h-10 hover:bg-blue-400 rounded-lg text-white w-36" onClick={addNewLine}>
                                + New Line
                            </button>
                        </div>
                    </section>
                    {userQuestionsAndAnswers.map((userQuestionAndAnswer, index) => {
                        return (
                            <section className="flex items-center gap-10 pb-5">
                                <fieldset className="flex flex-col">
                                    <label>
                                        Question
                                    </label>
                                    <textarea
                                        className="border h-10 pl-3 pt-1 rounded w-64"
                                        name="question"
                                        onChange={(event) => { handleUserQAInput(event, index) }}
                                        placeholder="insert question..."
                                        type="text"
                                        value={userQuestionAndAnswer.question} />
                                </fieldset>
                                <fieldset className="flex flex-col">
                                    <label>
                                        Answer
                                    </label>
                                    <textarea
                                        className="border h-10 pl-3 pt-1 rounded w-64"
                                        name="answer"
                                        onChange={(event) => { handleUserQAInput(event, index) }}
                                        placeholder="insert answer..."
                                        type="text"
                                        value={userQuestionAndAnswer.answer} />
                                </fieldset>
                                <fieldset className="flex flex-col">
                                    <label>
                                        Hint?
                                    </label>
                                    <textarea
                                        className="border h-10 pl-3 pt-1 rounded w-40"
                                        name="hint"
                                        onChange={(event) => { handleUserQAInput(event, index) }}
                                        placeholder="insert hint..."
                                        type="text"
                                        value={userQuestionAndAnswer.hint} />
                                </fieldset>
                                <div className="self-center">
                                    <br></br>
                                    {index === 0 && (
                                        <button className="bg-blue-500 h-10 hover:bg-blue-400 rounded-md text-white w-36" onClick={(event) => { handldCreateWorksheet(event) }}>Create</button>
                                    )}
                                    {index > 0 && (
                                        <button className="bg-red-500 h-10 hover:bg-red-400 rounded-md w-36" onClick={(event) => { handleRemoveLine(event, index) }}>Remove</button>
                                    )}
                                </div>
                            </section>
                        )
                    })}
                </form>
                <aside className="bg-white border rounded-md shadow-lg w-2/6">
                    <div className="p-5">
                        <header className="flex justify-between">
                            <div>
                                <p>{userWorksheet.title}</p>
                            </div>
                            <div>
                                {grades.find((grade) => grade.id === parseInt(userWorksheet.gradeId))?.level}
                            </div>
                        </header>
                        <ul>
                            {userQuestionsAndAnswers.map((userQuestionAndAnswer, index) => {
                                return (
                                    <li className="border-b">
                                        <p>Question # {index + 1}</p>
                                        <p>Question: {userQuestionAndAnswer.question}</p>
                                        <p>Answer: {userQuestionAndAnswer.answer}</p>
                                        <p>Hint: {userQuestionAndAnswer.hint}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </aside>
            </main >
        </>
    )
}