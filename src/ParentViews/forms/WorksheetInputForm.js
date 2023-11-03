import { useEffect, useState } from "react"

export const WorksheetInputForm = ({ worksheetForm, setWorksheetForm }) => {

    const [worksheet, setWorksheet] = useState([])

    const handleUserInput = (event) => {
        const copyOfWorksheet = [...worksheet]
        if (copyOfWorksheet.find((question) => question.id === parseInt(event.target.id))) {
            const id = parseInt(event.target.id)
            const name = event.target.name
            const value = event.target.value
            const updatedCopy = copyOfWorksheet.map((question) => {
                if (question.id === id) {
                    return (
                        { ...question, [name]: value }

                    )
                }
                return question
            })
            setWorksheet(updatedCopy)
        } else {
            const id = parseInt(event.target.id)
            const name = event.target.name
            const value = event.target.value
            const object = {
                "id": id,
                [name]: value
            }
            copyOfWorksheet.push(object)

            setWorksheet(copyOfWorksheet)
        }
    }

    useEffect(() => {
        const copy = { ...worksheetForm }
        copy.questionAndAnswers = worksheet
        setWorksheetForm(copy)
    }, [worksheet])

    return (
        <>
            <fieldset
                className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3 mt-3">
                <div>
                    <label
                        className="block text-sm font-semibold leading-6 text-white">
                        Question
                    </label>
                    <div
                        className="mt-2.5">
                        <input
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id="1"
                            name="question"
                            onChange={handleUserInput}
                            type="text" />
                    </div>
                </div>
                <div>
                    <label
                        className="block text-sm font-semibold leading-6 text-white">
                        Answer
                    </label>
                    <div
                        className="mt-2.5">
                        <input
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id="1"
                            name="answer"
                            onChange={handleUserInput}
                            type="text" />
                    </div>
                </div>
                <div>
                    <label
                        className="block text-sm font-semibold leading-6 text-white">
                        Hint?
                    </label>
                    <div
                        className="mt-2.5">
                        <input
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id="1"
                            name="hint"
                            onChange={handleUserInput}
                            type="text" />
                    </div>
                </div>
            </fieldset>
            <fieldset
                className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3 mt-3">
                <div>
                    <label
                        className="block text-sm font-semibold leading-6 text-white">
                        Question
                    </label>
                    <div
                        className="mt-2.5">
                        <input
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id="2"
                            name="question"
                            onChange={handleUserInput}
                            type="text" />
                    </div>
                </div>
                <div>
                    <label
                        className="block text-sm font-semibold leading-6 text-white">
                        Answer
                    </label>
                    <div
                        className="mt-2.5">
                        <input
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id="2"
                            name="answer"
                            onChange={handleUserInput}
                            type="text" />
                    </div>
                </div>
                <div>
                    <label
                        className="block text-sm font-semibold leading-6 text-white">
                        Hint?
                    </label>
                    <div
                        className="mt-2.5">
                        <input
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id="2"
                            name="hint"
                            onChange={handleUserInput}
                            type="text" />
                    </div>
                </div>
            </fieldset>
            <fieldset
                className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3 mt-3">
                <div>
                    <label
                        className="block text-sm font-semibold leading-6 text-white">
                        Question
                    </label>
                    <div
                        className="mt-2.5">
                        <input
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id="3"
                            name="question"
                            onChange={handleUserInput}
                            type="text" />
                    </div>
                </div>
                <div>
                    <label
                        className="block text-sm font-semibold leading-6 text-white">
                        Answer
                    </label>
                    <div
                        className="mt-2.5">
                        <input
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id="3"
                            name="answer"
                            onChange={handleUserInput}
                            type="text" />
                    </div>
                </div>
                <div>
                    <label
                        className="block text-sm font-semibold leading-6 text-white">
                        Hint?
                    </label>
                    <div
                        className="mt-2.5">
                        <input
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id="3"
                            name="hint"
                            onChange={handleUserInput}
                            type="text" />
                    </div>
                </div>
            </fieldset>
            <fieldset
                className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3 mt-3">
                <div>
                    <label
                        className="block text-sm font-semibold leading-6 text-white">
                        Question
                    </label>
                    <div
                        className="mt-2.5">
                        <input
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id="4"
                            name="question"
                            onChange={handleUserInput}
                            type="text" />
                    </div>
                </div>
                <div>
                    <label
                        className="block text-sm font-semibold leading-6 text-white">
                        Answer
                    </label>
                    <div
                        className="mt-2.5">
                        <input
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id="4"
                            name="answer"
                            onChange={handleUserInput}
                            type="text" />
                    </div>
                </div>
                <div>
                    <label
                        className="block text-sm font-semibold leading-6 text-white">
                        Hint?
                    </label>
                    <div
                        className="mt-2.5">
                        <input
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id="4"
                            name="hint"
                            onChange={handleUserInput}
                            type="text" />
                    </div>
                </div>
            </fieldset>
            <fieldset
                className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3 mt-3">
                <div>
                    <label
                        className="block text-sm font-semibold leading-6 text-white">
                        Question
                    </label>
                    <div
                        className="mt-2.5">
                        <input
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id="5"
                            name="question"
                            onChange={handleUserInput}
                            type="text" />
                    </div>
                </div>
                <div>
                    <label
                        className="block text-sm font-semibold leading-6 text-white">
                        Answer
                    </label>
                    <div
                        className="mt-2.5">
                        <input
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id="5"
                            name="answer"
                            onChange={handleUserInput}
                            type="text" />
                    </div>
                </div>
                <div>
                    <label
                        className="block text-sm font-semibold leading-6 text-white">
                        Hint?
                    </label>
                    <div
                        className="mt-2.5">
                        <input
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id="5"
                            name="hint"
                            onChange={handleUserInput}
                            type="text" />
                    </div>
                </div>
            </fieldset>
        </>
    )
}