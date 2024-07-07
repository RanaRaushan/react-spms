import React, { useState } from 'react';
import Login, { Render } from 'react-login-page';
import Logo from 'react-login-page/logo-rect';
import './login.css';
import { Form, Link, Navigate, redirect, useActionData } from 'react-router-dom';
import {DataStore} from '../utils/DataStore.js';
import {auth_get_token} from '../utils/APIHelper.js';
import { useAuth } from '../hooks/useAuth.jsx';
import { validateToken } from '../components/ValidateToken.jsx';


export async function action({ request, params }) {
    // const { addItem } = DataStore();
    // const formData = await request.formData();
    // const updates = Object.fromEntries(formData);
    // const token = await auth_get_token(updates)
    // addItem("token", token)
    // const { token } = useAuth();
    // console.log("calling action", token)
    // return redirect(`/`);;
  }

 

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {token, setAuthenticateUser } = useAuth();

    const handleLogin = async () => {
        console.log("calling hanlde login")
        const token = await auth_get_token({"email":username, "password":password})
        const expireAt = new Date().getTime() + Number(token.expires_in)
        await setAuthenticateUser({"body":token, "expireAt":expireAt})        
        };
    // if (validateToken(token)){
    //     return <Navigate to="/" />;
    // }
    
  return (
    <div className="login-body">
        <Login>
        <Render>
            {({ fields, buttons, blocks, $$index }) => {
            return (
                <div >
                    <Form method="post" id="login-form" action='/'>
                        <header className='login-header'>
                            {blocks.title}
                        </header>
                        <div className='label-input-container input-margin-btm'>
                            <label>{fields.username}</label>
                        </div>
                        <div className='label-input-container'>
                            <label>{fields.password}</label>
                        </div>
                        <div className='link-label'>
                            <Link to={`/signup`}>
                                Don't have an account? Sign in
                            </Link>
                        </div>
                        <div >
                            {buttons.submit}
                        </div>
                    </Form>
                </div>
            );
            }}
        </Render>
        {/* <Login.Block keyname="logo" tagName="span">
            <Logo />
        </Login.Block> */}
        <Login.Block keyname="title" tagName="span">
            Login
        </Login.Block>
        <Login.Input name="email" keyname="username" placeholder="Please enter Email" onChange={(e) => setUsername(e.target.value)}/>
        <Login.Input name="password" keyname="password" placeholder="Please enter password" type="password" onChange={(e) => setPassword(e.target.value)}/>
        <Login.Button keyname="submit" type="submit" onClick={handleLogin}>
            Login
        </Login.Button>
        </Login>
    </div>
    
  );
};
export default LoginPage;