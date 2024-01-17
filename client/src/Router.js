import {Route, Routes} from "react-router-dom"
import Auth from "./pages/Auth";

const AppRouter = () => {
    return (
    <Routes>
        <Route path={"/registration"} element={<Auth/>} exact/>
        <Route path={"/login"} element={<Auth/>} exact/>
        <Route path={"/playlist/:id"} element={<div>no playlist page yet</div>} exact/>
    </Routes>
    )
}

export default AppRouter