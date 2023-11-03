export const AddWorksheetInput = ({ html, setHtml }) => {

    const inputField = () => {
        <>
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
                            id="1"
                            name="question"
                            onChange={"handleUserInput"}
                            type="text" />
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
                            id="1"
                            name="answer"
                            onChange={"handleUserInput"}
                            type="text" />
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
                            id="1"
                            name="hint"
                            onChange={"handleUserInput"}
                            type="text" />
                    </div>
                </div>
            </fieldset>
        </>
    }

    return (
        <>
            {html}
            <button onClick={(event) => {
                event.preventDefault()
                console.log(html)
                const copy = html += inputField()
                setHtml(copy)
            }}>click me</button>
        </>
    )
}