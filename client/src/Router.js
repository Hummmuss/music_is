import {Route, Routes} from "react-router-dom"
import Auth from "./pages/Auth";
import Welcome from "./pages/Welcome";
import Account from "./pages/Account";
import {useSelector} from "react-redux";

const AppRouter = () => {
    const isAuth =  useSelector(state => state.isAuth);
    return (
        <div>
            {isAuth ?
                <Routes>
                    <Route path={"/"} element={<Welcome/>} exact/>
                    <Route path={"/registration"} element={<Auth/>} exact/>
                    <Route path={"/login"} element={<Auth/>} exact/>
                    <Route path={"/account"} element={<Account/>} exact/>
                    <Route path={"/playlist/:id"} element={<div>no playlist page yet</div>} exact/>
                </Routes>
                :
                <Routes>
                    <Route path={"/"} element={<Welcome/>} exact/>
                    <Route path={"/registration"} element={<Auth/>} exact/>
                    <Route path={"/login"} element={<Auth/>} exact/>
                </Routes>
            }
        </div>
    )
}

export default AppRouter