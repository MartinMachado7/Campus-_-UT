import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, Registerpages } from "../Pages"

export const AuthRoutes = () => {
    
  return (
        <>
        <Routes>
            <Route path="login" element={<LoginPage/>} />
            <Route path="register" element={<Registerpages/>} />

            <Route path="/*" element={<Navigate to= "/auth/register" />} />


        </Routes>
        </>
    )
}
