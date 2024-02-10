import React, {useState} from 'react';
import {Alert, Button, Form, Input} from "antd";
import "../styles/main.scss"
import Title from "antd/es/skeleton/Title";
import {NavLink} from "react-router-dom";


import {useDispatch, useSelector} from "react-redux";

const Auth = () => {
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [authWay, setAuthWay] = useState("login")
    const dispatch = useDispatch();
    const showMessage =  useSelector(state => state.showMessage);
    const isLoading =  useSelector(state => state.isLoading);
    const authMessage = useSelector(state => state.authMessage)
    const reg = () => {
        dispatch({ type: 'registration', payload: username, email, password});
    };
    const log = () => {
        dispatch({ type: 'login', payload: email, password});
    };

    function Toggle() {
        if (authWay === "login") {
            setAuthWay("registration")
        } else {
            setAuthWay("login")
        }
    }


    function Auth() {
        console.log("auth")
        if (authWay === "registration") {
            reg();
        } else {
            log()
        }
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
                        showMessage && authMessage==='Success!' ?
                        <Alert style={{marginTop: 20}} message={authMessage} type="success" showIcon/>
                    :
                        <Alert style={{marginTop: 20}} message={authMessage} type="error" showIcon/>
                    }
                </Form>
            </div>
        </div>
    );
}

export default Auth;