import { useEffect, useState } from "react"

export const EditWorksheetInputForm = ({ worksheet, setWorksheet }) => {

    const [questionAndAnswers, setQuestionAndAnswers] = useState([])

    const handleQuestionAndAnswers = () => {
        setQuestionAndAnswers(worksheet?.questionAndAnswers)
    }

    const handleUserInput = (event) => {
        const copyOfQuestionAndAnswers = [...questionAndAnswers]
        const id = event.target.id
        const name = event.target.name
        const value = event.target.value
        const updatedCopy = copyOfQuestionAndAnswers.map((questionAndAnswer) => {
            if (questionAndAnswer.id === id) {
                return (
                    { ...questionAndAnswer, [name]: value }

                )
            }
            return questionAndAnswer
        })
        const copyOfWorksheet = { ...worksheet, questionAndAnswers: updatedCopy }
        setWorksheet(copyOfWorksheet)

    }

    useEffect(() => {
        // const copy = { ...worksheetForm }
        // copy.questionAndAnswers = worksheet
        // setWorksheetForm(copy)
    }, [worksheet])

    useEffect(() => {
        handleQuestionAndAnswers()
    }, [worksheet.questionAndAnswers])

    return (
        <>
            {questionAndAnswers?.map((questionAndAnswer) => {
                return (
                    <fieldset
                        className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3 mt-3">
                        <div>
                            <label
                                className="block text-sm font-semibold leading-6 text-gray-900">
                                Question
                            </label>
                            <div
                                className="mt-2.5">
                                <input
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    id={questionAndAnswer?.id}
                                    name="question"
                                    onChange={handleUserInput}
                                    type="text"
                                    value={questionAndAnswer?.question} />
                            </div>
                        </div>
                        <div>
                            <label
                                className="block text-sm font-semibold leading-6 text-gray-900">
                                Answer
                            </label>
                            <div
                                className="mt-2.5">
                                <input
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    id={questionAndAnswer?.id}
                                    name="answer"
                                    onChange={handleUserInput}
                                    type="text"
                                    value={questionAndAnswer?.answer} />
                            </div>
                        </div>
                        <div>
                            <label
                                className="block text-sm font-semibold leading-6 text-gray-900">
                                Hint?
                            </label>
                            <div
                                className="mt-2.5">
                                <input
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    id={questionAndAnswer?.id}
                                    name="hint"
                                    onChange={handleUserInput}
                                    type="text"
                                    value={questionAndAnswer?.hint} />
                            </div>
                        </div>
                    </fieldset>
                )
            })}
        </>
    )
}