import {Route, Routes} from "react-router-dom"
import Auth from "./pages/Auth";
import Welcome from "./pages/Welcome";
import Account from "./pages/Account";

const AppRouter = ({user}) => {
    return (
        <div>
            {user.isAuth ?
                <Routes>
                    <Route path={"/"} element={<Welcome/>} exact/>
                    <Route path={"/registration"} element={<Auth user={user}/>} exact/>
                    <Route path={"/login"} element={<Auth user={user}/>} exact/>
                    <Route path={"/account"} element={<Account/>} exact/>
                    <Route path={"/playlist/:id"} element={<div>no playlist page yet</div>} exact/>
                </Routes>
                :
                <Routes>
                    <Route path={"/"} element={<Welcome/>} exact/>
                    <Route path={"/registration"} element={<Auth user={user}/>} exact/>
                    <Route path={"/login"} element={<Auth user={user}/>} exact/>
                </Routes>
            }
        </div>
    )
}

export default AppRouter