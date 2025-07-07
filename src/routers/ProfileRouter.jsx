import { Route, Routes } from "react-router-dom"
import { AssignPermission } from "../components/settings/Security/AssignPermission"
import { Profile } from "../components/settings/users/Profile"

export const ProfileRouter = () =>{
    return(
        <Routes>
            <Route path="account/:userId" element={<Profile/>} />
            <Route path="assign/role/:userId" element={<AssignPermission/>} />
        </Routes>
    )
}