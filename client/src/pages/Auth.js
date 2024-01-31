import React, {useContext, useState} from 'react';
import {Alert, Button, Form, Input} from "antd";
import "../styles/main.scss"
import Title from "antd/es/skeleton/Title";
import {NavLink} from "react-router-dom";
import {createPlaylist, login, registration} from "../http/API";
import {Context} from "../index"
import {observer} from "mobx-react";

const Auth = observer(() => {
        const [username, setUserName] = useState("")
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [authWay, setAuthWay] = useState("login")
        const [showMessage, setShowMessage] = useState("")
        const [response, setResponse] = useState({})
        const {user} = useContext(Context)

        function Toggle() {
            if (authWay === "login") {
                setAuthWay("registration")
            } else {
                setAuthWay("login")
            }
        }

        async function reg() {
            console.log("registration")
            let res = await registration(username, email, password);
            return res
        }

        async function createFavouritePlaylist(id) {
            console.log("fav " + id)
            await createPlaylist("favourite", id)
        }

        async function log() {
            let res = await login(email, password);
            console.log("login")
            return res
        }

        function message(response) {
            console.log("message")
            if (response.success === true) {
                user.setIsAuth(true);
                user.setUserId(response.token.id)
                setShowMessage("success")
            } else {
                setResponse(response.message)
                setShowMessage("fail")
            }
        }

        function Auth() {
            console.log("auth")
            if (authWay === "registration") {
                reg().then(result => {
                    message(result)
                    createFavouritePlaylist(result.token.id);
                });
            } else {
                log().then(message)
            }
        }

        return (
            <div className="wrapper">
                <div className="card">
                    {authWay === "login" ? <h1>Welcome back ♪</h1> : <h1>Nice to meet you ♪</h1>}
                    <Form
                        name="login"
                        initialValues={{remember: true}}
                        style={{width: 300}}
                    >
                        <Title level={3} style={{textAlign: "center"}}>Авторизация</Title>
                        {authWay === "registration" &&
                            <Form.Item
                                value={username}
                                onChange={e => setUserName(e.target.value)}
                                rules={[{required: true, message: "Please, enter your username!"}]}
                            >
                                <Input placeholder="username"/>
                            </Form.Item>
                        }
                        <Form.Item
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            rules={[{required: true, message: "Please, enter your email!"}]}
                        >
                            <Input placeholder="email"/>
                        </Form.Item>
                        <Form.Item
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            name="password"
                            rules={[{required: true, message: "Please, enter your password!"}]}
                        >
                            <Input.Password placeholder="password"/>
                        </Form.Item>
                        {authWay === "login" ?
                            <div style={{color: "white"}}>
                                Are you new here? <NavLink style={{color: "#56b9cb"}} to="/registration"
                                                           onClick={Toggle}> Sign
                                up!</NavLink>
                            </div> :
                            <div style={{color: "white"}}>
                                Already signed up? <NavLink style={{color: "#56b9cb"}} to="/login" onClick={Toggle}> Sign
                                in!</NavLink>
                            </div>
                        }
                        <Button onClick={Auth} type="primary" htmlType="submit" className="button">
                            {authWay === "login" ? "Log in" : "Sign up"}
                        </Button>
                        {
                            showMessage === "success" &&
                            <Alert style={{marginTop: 20}} message="success!" type="success" showIcon/>
                        }
                        {
                            showMessage === "fail" &&
                            <Alert style={{marginTop: 20}} message={response} type="error" showIcon/>
                        }
                    </Form>
                </div>
            </div>
        );
    }
)

export default Auth;