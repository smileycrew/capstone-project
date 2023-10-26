import { Link } from "react-router-dom"

export const Profile = ({ user }) => {
  
  return (
    <article
      className="mx-auto lg:max-w-7xl  lg:px-8">
      <section
        className="mt-6 border-t border-gray-100">
        <h3
          className="text-base font-semibold leading-7 text-gray-900">
          Edit Profile Information
        </h3>
        <p
          className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details and information.
        </p>
        <dl
          className="divide-y divide-gray-100">
          <div
            className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt
              className="text-sm font-medium leading-6 text-gray-900">
              First name
            </dt>
            <dd
              className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.firstName}
            </dd>
          </div>
          <div
            className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt
              className="text-sm font-medium leading-6 text-gray-900">
              Last name
            </dt>
            <dd
              className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.lastName}
            </dd>
          </div>
          <div
            className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt
              className="text-sm font-medium leading-6 text-gray-900">
              Cohort
            </dt>
            <dd
              className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.cohort}
            </dd>
          </div>
          <div
            className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt
              className="text-sm font-medium leading-6 text-gray-900">
              About
            </dt>
            <dd
              className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.body}
            </dd>
          </div>
          <div
            className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt
              className="text-sm font-medium leading-6 text-gray-900">
              Options
            </dt>
            <dd
              className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul
                className="">
                <li
                  className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div
                    className="ml-4 flex-shrink-0">
                    <Link
                      to="edit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Edit Profile
                    </Link>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </section>
    </article>
  )
}
