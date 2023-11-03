import { useEffect, useState } from "react"
import { fetchGrades } from "../../services/gradeServices"
import { postStudentToDatabase } from "../../services/studentServices"

export const CreateStudent = ({ user, createStudentToggle, setCreateStudentToggle, handleFetchCalls }) => {

    const [grades, setGrades] = useState([])
    const [studentForm, setStudentForm] = useState({})

    const handleCreateStudent = (event) => {
        event.preventDefault()
        const copy = { ...studentForm, userId: user.id, studentCode: handleRandomNumber() }
        copy.gradeId = parseInt(copy.gradeId)
        studentForm.firstName && studentForm.lastName && studentForm.gradeId ?
            postStudentToDatabase(copy).then(() => {
                setCreateStudentToggle(false)
                handleFetchCalls()
            }) :
            window.alert("please complete all fields")
    }

    const handleCreateFetchCalls = () => {
        fetchGrades().then((data) => {
            setGrades(data)
        })
    }

    // Generate a random number between 100,000 and 999,999
    const handleRandomNumber = () => {
        const min = 1000;
        const max = 9999;
        const randomOrderNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomOrderNumber
    }

    const handleStudentInput = (event) => {
        const copy = { ...studentForm }
        const name = event?.target?.name
        const value = event?.target?.value
        copy[name] = value
        setStudentForm(copy)
    }

    const handleToggle = () => {
        setCreateStudentToggle(!createStudentToggle)
        setStudentForm({})
    }

    useEffect(() => {
        handleCreateFetchCalls()
    }, [])

    return (
        <>
            {createStudentToggle ?
                <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <div className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <b className="text-lg font-medium text-gray-900" id="slide-over-title"></b>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button onClick={handleToggle} type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                                                        <span className="absolute -inset-0.5"></span>
                                                        <span className="sr-only">Close panel</span>
                                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                className="flex mx-auto max-w-7xl px- sm:px-6 lg:px-8 relative h-16 items-center justify-center gap-10 pt-10">
                                                <img
                                                    className="text-center h-32 w-32 rounded-full"
                                                    src={`https://api.dicebear.com/7.x/big-smile/svg?seed=${studentForm?.firstName}`}
                                                    alt="" />
                                                <section
                                                    className="sm:col-span-3">

                                                    <label
                                                        className="block text-sm font-medium leading-6 text-gray-900">
                                                        Grades
                                                        <select
                                                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                            name="gradeId"
                                                            onChange={handleStudentInput}
                                                            required>
                                                            <option>
                                                                select a grade
                                                            </option>
                                                            {grades.map((grade) => {
                                                                return (
                                                                    <option
                                                                        key={grade?.id}
                                                                        value={grade?.id}>
                                                                        {grade?.grade}
                                                                    </option>
                                                                )
                                                            })}
                                                        </select>
                                                    </label>
                                                </section>
                                            </div>
                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <form
                                                        className="space-y-6">
                                                        <fieldset>
                                                            <p
                                                                className="block text-sm font-medium leading-6 text-gray-900">
                                                                First Name
                                                            </p>
                                                            <input
                                                                className="mt-2 text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                autoComplete="first name"
                                                                id="firstName"
                                                                onChange={handleStudentInput}
                                                                name="firstName"
                                                                placeholder="Enter your first name"
                                                                required
                                                                type="text" />
                                                        </fieldset>
                                                        <fieldset>
                                                            <label
                                                                className="block text-sm font-medium leading-6 text-gray-900">
                                                                Last Name
                                                            </label>
                                                            <input
                                                                className="mt-2 text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                id="lastName"
                                                                onChange={handleStudentInput}
                                                                name="lastName"
                                                                placeholder="Enter your last name"
                                                                required
                                                                type="text" />
                                                        </fieldset>

                                                        <div className="sm:col-span-4">
                                                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                                                            <div className="flex mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button
                                                                type="submit"
                                                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                onClick={handleCreateStudent}>
                                                                Create Student
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> :
                null
            }
        </>
    )
}