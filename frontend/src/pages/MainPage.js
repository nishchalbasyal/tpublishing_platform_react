import { Outlet } from "react-router-dom"
import Navigation from "../components/Navigation"
const MainPage = () => {
  return (
    <>
    <Navigation />
    <Outlet />
      
    </>
  )
}

export default MainPage
