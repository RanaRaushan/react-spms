import React, { useEffect, useState } from 'react';
import Login, { Render } from 'react-login-page';
import './login.css';
import { Form, Link, Navigate, Outlet, redirect, useActionData, useBeforeUnload, useNavigate, useNavigation, useSubmit } from 'react-router-dom';
import {auth_get_token} from '../utils/APIHelper.js';
import { useAuth } from '../hooks/useAuth.jsx';


        // const {setAuthenticateUser } = useAuth();
            // await setAuthenticateUser({"body":response, "expireAt":expireAt});

const REDIRECT_URL = "/callback";

export async function action({ request }) {
    console.log("login action | start")
    const loginFormData = await request.formData();
    const loginData = Object.fromEntries(loginFormData);
    let response;
    let error;
    if (loginData && loginData.email && loginData.password) {
        response = await auth_get_token({"email":loginData.email, "password":loginData.password})
    } else {
        return {loginData:loginData, error: "Please enter data to login"};
    }
    if (response && response.event === "Error") {
        error = response.message
        return {loginData:loginData, error: error};
    }
    console.log("login action | response", response)
    const expireAt = new Date().getTime() + Number(response.expires_in)
    return {loginData:loginData, tokenData:{"body":response, "expireAt":expireAt}};
  }


const LoginPage = () => {
    console.log("calling LoginPage")
    const navigation = useNavigation();
    const actionData = useActionData();
    const navigate = useNavigate();
    // const {setAuthenticateUser } = useAuth();
    // useBeforeUnload(() => {
        // console.log("Inside useBeforeUnload", actionData);
        // await setAuthenticateUser(actionData.tokenData)
    //   });
    console.log("actionData", actionData)

    useEffect(() => {
        if (actionData && actionData.tokenData) {
            console.log("Inside usesubmit")
          const { tokenData } = actionData;
          navigate(REDIRECT_URL, { state: tokenData, replace: true });
        }
      }, [actionData, navigate]);
      
    const loginButtonText =
    navigation.state === "submitting"
      ? "Loggin..."
      : navigation.state === "loading"
      ? "Logged-in!"
      : "Login";
  return (
    <>
    <div className="login-body">
        <Login>
        <Render>
            {({ fields, buttons, blocks, $$index }) => {
            return (
                <div >
                    <Form method="post" id="login-form" >
                        <header className='login-header'>
                            {blocks.title}
                        </header>
                        <div className='label-input-container input-margin-btm'>
                            <label>{fields.email}</label>
                        </div>
                        <div className='label-input-container'>
                            <label>{fields.password}</label>
                        </div>
                        <div className='link-label'>
                            <Link to={`/signup`}>
                                Don't have an account? Sign in
                            </Link>
                        </div>
                        {actionData && actionData.error && <div className='singup-label-error'>{actionData.error}</div>}
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
        <Login.Input name="email" keyname="email" placeholder="Please enter Email" defaultValue={actionData?.loginData?.email} />
        <Login.Input name="password" keyname="password" placeholder="Please enter password" type="password" defaultValue={actionData?.loginData?.password} />
        <Login.Button keyname="submit" type="submit" >
            {loginButtonText}
        </Login.Button>
        </Login>
    </div>
    </>
  );
};
export default LoginPage;