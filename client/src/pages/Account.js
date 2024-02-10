import React, {useContext, useEffect, useState} from 'react';
import "../styles/main.scss"
import {Form, Input} from "antd";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {getOneUser, updateUser} from "../http/API";

const Account = () => {
    const history = useNavigate()
    const {user} = useContext(Context)
    const [changeUsername, setChangeUsername] = useState(false)
    const [newUsername, setNewUsername] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    console.log("rerender!")
    async function getUserInfo() {
        return await getOneUser(user.userId)
    }

    useEffect(()=> {
        getUserInfo().then(response => {setUserInfo(response.user)}).then(setIsLoading(false))
    }, [])
    async function updateUsername() {
        let response = await updateUser(newUsername, user.userId)
        console.log(response)
    }

    function logOut() {
        localStorage.setItem('token', null)
        user.setIsAuth(false)
        user.setUserId(null)
        history('/')
    }

    if (isLoading) {
        return (
            <div className="wrapper">
                <span className="loader"></span>
            </div>
        );
    }

    return (
        <div className="wrapper">
            <div className="options">
                <div className="change-username">
                    {userInfo.username}
                </div>
                <div className="change-username">
                    {userInfo.email}
                </div>
                <div className="change-username">
                    ---
                </div>
                {changeUsername === true &&
                    <div className="username-input">
                        <Input defaultValue={userInfo.username} onChange={e => setNewUsername(e.target.value)} placeholder="new username"/>
                        <div className="ok" onClick={() => updateUsername()}>OK</div>
                    </div>
                }
                <div onClick={() => changeUsername ? setChangeUsername(false) : setChangeUsername(true)}
                     className="change-username">change username
                </div>
                <div className="delete-account">delete account</div>
                <div onClick={() => logOut()} className="log-out">log out</div>
            </div>
        </div>
    );
};

export default Account;