import { useEffect, useState } from "react"
import { fetchUserById } from "../services/userServices"
import { ParentsView } from "./ParentsView"
import { StudentsView } from "./StudentsView"

export const ApplicationViews = () => {

  const [user, setUser] = useState({})

  const handleUserFetchCalls = (id) => {
    fetchUserById(id).then((data) => {
      setUser(data)
    })
  }

  useEffect(() => {
    const localUser = localStorage.getItem("capstone_user")
    const userObject = JSON.parse(localUser)
    handleUserFetchCalls(userObject.id)
  }, [])

  return (
    user?.userTypeId !== 1 && user?.userTypeId !== 3 ? <StudentsView user={user} /> : <ParentsView user={user} setUser={setUser} />
  )
}
