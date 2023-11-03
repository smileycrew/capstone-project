export const InputField = ({ handleUpdateUser, user, userTypes }) => {
    return (
        <>
            <fieldset>
                <p
                    className="block text-sm font-medium leading-6 text-gray-900">
                    First Name
                </p>
                <input
                    className="mt-2 text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    autoComplete="first name"
                    id="firstName"
                    onChange={handleUpdateUser}
                    placeholder="Enter your first name"
                    required
                    type="text"
                    value={user?.userTypeId * 1 === 2 ? "enter student code" : user?.firstName} />
            </fieldset>
            <fieldset>
                <label
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Last Name
                </label>
                <input
                    className="mt-2 text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="lastName"
                    onChange={handleUpdateUser}
                    placeholder="Enter your last name"
                    required
                    type="text"
                    value={user?.userTypeId * 1 === 2 ? "enter student code" : user?.lastName} />
            </fieldset>
            <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                <div className="flex mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span
                        className="text-center border-0 bg-transparent py-1.5 focus:ring-0  sm:leading-6 flex select-none pl-2 text-gray-500 sm:text-sm">
                        {user?.firstName || user?.lastName ? `${user?.firstName?.toLowerCase()}.${user?.lastName?.toLowerCase()}` : null}{user?.userTypeId ? "@" + userTypes.find((userType) => userType?.id === user?.userTypeId * 1).description?.toLowerCase() + ".com" : "@email.com"}
                    </span>
                </div>
            </div>
        </>
    )
}