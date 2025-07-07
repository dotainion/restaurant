import { Route, Routes } from "react-router-dom"
import { Password } from "../components/settings/Security/Password"
import { UserBuilder } from "../components/settings/users/UserBuilder"
import { PermissionViewer } from "../components/settings/Security/PermissionViewer"

export const SecurityRouter = () =>{
    return(
        <Routes>
            <Route path="credentials" element={<Password/>} />
            <Route path="users" element={<UserBuilder/>} />
            <Route path="permission" element={<PermissionViewer/>} /> 
        </Routes>
    )
}