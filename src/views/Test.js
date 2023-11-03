{/* <NavBar />
            <CreateStudent user={user} createStudentToggle={createStudentToggle} setCreateStudentToggle={setCreateStudentToggle} handleFetchCalls={handleFetchCalls} />
            <ViewStudent handleViewStudentToggle={handleViewStudentToggle} chosenStudent={chosenStudent} setChosenStudent={setChosenStudent} user={user} viewStudentToggle={viewStudentToggle} setViewStudentToggle={setViewStudentToggle} editStudentToggle={editStudentToggle} setEditStudentToggle={setEditStudentToggle} handleFetchCalls={handleFetchCalls} />
            <EditStudent chosenStudent={chosenStudent} editStudentToggle={editStudentToggle} setEditStudentToggle={setEditStudentToggle} handleFetchCalls={handleFetchCalls} />
            <main
                className="bg-white py-24 sm:py-32 mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <section
                    className="max-w-2xl">
                    <h1
                        className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        My students
                    </h1>
                    <p
                        className="mt-6 mb-6 text-lg leading-8 text-gray-600">
                        Please click on a name to see your student's information
                    </p>
                    <p
                        className="mt-6 mb-6 text-lg leading-8 text-gray-600">
                        or add a new student
                    </p>
                    <button
                        className="mt-5 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleToggle}>
                        Add Student
                    </button>
                </section>
                <ul
                    className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                    {students.map((student) => (
                        <li
                            className="flex items-center gap-x-6"
                            key={student?.id}>
                            <img
                                alt=""
                                className="h-16 w-16 rounded-full"
                                src={`https://api.dicebear.com/7.x/big-smile/svg?seed=${student.firstName}`} />
                            <h3
                                className="text-base font-semibold leading-7 tracking-tight text-gray-900"
                                onClick={() => {
                                    handleViewStudentToggle(student)
                                }}>
                                {student.firstName} {student.lastName}
                            </h3>
                            <p
                                className="text-sm font-semibold leading-6 text-indigo-600">
                                <span>
                                    Grade: {student.grade.grade}
                                </span>

                            </p>
                        </li>
                    ))}
                </ul>
            </main> */}