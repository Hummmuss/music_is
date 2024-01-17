import React, {useState} from 'react';
import {Button, Form, Input} from "antd";
import "../styles/main.scss"
import Title from "antd/es/skeleton/Title";
import {NavLink} from "react-router-dom";
import {registration, login} from "../http/API";

const Auth = () => {
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [authWay, setAuthWay] = useState("login")

    function Toggle() {
        if (authWay === "login") {
            setAuthWay("registration")
        } else {
            setAuthWay("login")
        }
    }

    async function Auth() {
        if (authWay==="registration") {
            let res = await registration(username, email, password)
            if(res) {
                console.log(res)
            }
        }
        else {
            let res = await login(email, password)
            if(res) {
                console.log(res)
            }
        }
    }

    return (
        <div className="wrapper">
            <card className="card">
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
                        <div>
                            Are you new here? <NavLink to="/registration" onClick={Toggle}> Sign up!</NavLink>
                        </div> :
                        <div>
                            Already signed up? <NavLink to="/login" onClick={Toggle}> Sign in!</NavLink>
                        </div>
                    }
                    <Button onClick={Auth} type="primary" htmlType="submit" className="button">
                        {authWay === "login" ? "Log in" : "Sign up"}
                    </Button>
                </Form>
            </card>
            <card>

            </card>
        </div>
    );
};

export default Auth;