import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/NavBar"
import { StudentHome } from '../StudentViews/StudentHome'
import { StudentWorksheets } from '../StudentViews/StudentWorksheets'
import { StudentAnswers } from '../StudentViews/StudentAnswers'

export const StudentsView = ({ user }) => {
    return (
        <Routes>
            <Route path="/" elemen={
                <>
                    <NavBar />
                    <Outlet />
                </>
            }>
                <Route index element={<StudentHome user={user} />} />
                <Route path="worksheets">
                    <Route index element={<StudentWorksheets user={user} />} />
                    <Route path="edit/:worksheetId" element={<StudentAnswers user={user} />} />
                </Route>
            </Route>
        </Routes>
    )
}