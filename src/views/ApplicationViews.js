import { useEffect, useState } from "react"
import { Home } from "../home/Home"
import { Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { fetchUserById } from "../services/userServices"
import { NavBar } from "../components/NavBar"
import { Students } from "../students/Students"
import { Student } from "../student/Student"
import { CreateStudent } from "../forms/createStudent/CreateStudent"
import { EditStudent } from "../forms/editStudent/EditStudent"
import { Worksheets } from "../worksheets/Worksheets"
import { CreateWorksheet } from "../forms/createWorksheet/CreateWorksheet"
import { Worksheet } from "../worksheet/Worksheet"
import { EditWorksheet } from "../forms/editWorksheet/EditWorksheet"
import { Profile } from "../profile/Profile"
import { EditProfile } from "../forms/editProfile/EditProfile"

export const ApplicationViews = () => {

  const navigate = useNavigate()

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
    <Routes>
      <Route path="/" element={
        <>
          <NavBar />
          <Outlet />
        </>
      }>
        <Route index element={<Home user={user} />}></Route>
        <Route path="students">
          <Route index element={<Students user={user} />}></Route>
          <Route path=":studentId">
            <Route index element={<Student navigate={navigate} user={user} />}></Route>
            <Route path="edit" element={<EditStudent navigate={navigate} user={user} />}></Route>
          </Route>
        </Route>
        <Route
          path="addstudent"
          element={<CreateStudent user={user} navigate={navigate} />}></Route>
        <Route path="worksheets">
          <Route index element={<Worksheets user={user} />}></Route>
          <Route path=":worksheetId">
            <Route index element={<Worksheet navigate={navigate} />}></Route>
            <Route path="edit" element={<EditWorksheet navigate={navigate} user={user} />}></Route>
          </Route>
        </Route>
        <Route
          path="addworksheet"
          element={<CreateWorksheet user={user} navigate={navigate} />}></Route>
        <Route path="profile">
          <Route index element={<Profile user={user} />}></Route>
          <Route path="edit" element={<EditProfile user={user} handleUserFetchCalls={handleUserFetchCalls} navigate={navigate} />}></Route>
        </Route>
      </Route>
    </Routes>
  )
}
