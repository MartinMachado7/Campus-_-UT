import { Navigate, Route, Routes } from "react-router-dom"
import { JournalPage } from "../Pages/JournalPage"

export const JournalRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={ <JournalPage/> }/>
        <Route path="/*" element={ <Navigate to='/'/> }/>
        
    </Routes>
    </>    
  )
}
