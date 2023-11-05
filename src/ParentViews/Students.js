import { useEffect, useState } from "react"
import { fetchUserStudents } from '../services/studentServices'

export const Students = ({ user }) => {

    const [userStudents, setUserStudents] = useState([])

    const handleFetchUserStudents = () => {
        fetchUserStudents(user.id).then((data) => {
            setUserStudents(data)
        })
    }

    useEffect(() => {
        handleFetchUserStudents()
    }, [user.id])

    return (
        <>
            {userStudents.map((userStudent) => {
                return (
                    <>
                        <aside>aside content is going to be here</aside>
                        <img className="bg-gray-500 h-40 rounded-full shadow-lg w-40" src={`https://api.dicebear.com/7.x/big-smile/svg?seed=${userStudent.firstName}%20${userStudent.lastName}`} alt="avatar" />
                        <p>first name: {userStudent.firstName}</p>
                        <p>last name: {userStudent.lastName}</p>
                        <p>gpa: {userStudent.gpa}</p>
                    </>
                )
            })}
        </>
    )
}
