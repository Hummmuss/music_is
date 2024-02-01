import React, {useContext, useState} from 'react';
import "../styles/main.scss"
import {Form, Input} from "antd";
import {updateUser} from "../http/API";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";

const Account = () => {
    const history = useNavigate()
    const {user} = useContext(Context)
    const [changeUsername, setChangeUsername] = useState(false)
    const [newUsername, setNewUsername] = useState(false)

    async function updateUsername() {
        let response = await updateUser(newUsername, user.userId)
        console.log(response)
    }

    function logOut () {
        localStorage.setItem('token', null)
        user.setIsAuth(false)
        user.setUserId(null)
        history('/')
    }

    return (
        <div className="wrapper">
            <div className="options">
                {changeUsername === true &&
                    <div className="username-input">
                        <Form.Item
                            value={newUsername}
                            onChange={e => setNewUsername(e.target.value)}
                            rules={[{required: true, message: "Enter your new username!"}]}
                        >
                            <Input placeholder="new username"/>
                        </Form.Item>
                        <div className="ok" onClick={()=>updateUsername()}>OK </div>
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