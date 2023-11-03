import { Outlet, Route, Routes } from "react-router-dom"
import { Home } from '../ParentViews/Home'
import { Students } from '../ParentViews/Students'
import { Worksheets } from '../ParentViews/Worksheets'
import { CreateWorksheet } from '../ParentViews/forms/CreateWorksheet'
import { EditWorksheet } from '../ParentViews/forms/EditWorksheet'
import { ReviewWorksheets } from '../ParentViews/ReviewWorksheets'


export const ParentsView = ({ user, setUser }) => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
            }>
                <Route index element={<Home user={user} setUser={setUser} />} />
                <Route path="students" element={<Students user={user} />} />
                <Route path="worksheets">
                    <Route index element={<Worksheets user={user} />}></Route>
                    <Route path="create" element={<CreateWorksheet user={user} />} />
                    <Route path="edit/:worksheetId" element={<EditWorksheet user={user} />}></Route>
                    <Route path="review" element={<ReviewWorksheets user={user} />}></Route>
                </Route>
            </Route>
        </Routes>
    )
}