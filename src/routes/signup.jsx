import React from 'react';
import Login, { Render } from 'react-login-page';
import Logo from 'react-login-page/logo-rect';
import './login.css';
import { Form, Link } from 'react-router-dom';

export async function action() {
    
    return { "test":"test" };
  }

const SingupPage = () => {
  return (
    <div className="login-body">
        <Login>
        <Render>
            {({ fields, buttons, blocks, $$index }) => {
            return (
                <div >
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
                        <Link to={`/login`}>
                            Already have an account? Sign in
                        </Link>
                    </div>
                    <div >
                        <Form method="post">
                            {buttons.submit}
                        </Form>
                    </div>
                </div>
            );
            }}
        </Render>
        {/* <Login.Block keyname="logo" tagName="span">
            <Logo />
        </Login.Block> */}
        <Login.Block keyname="title" tagName="span">
            Singup
        </Login.Block>
        <Login.Input keyname="username" placeholder="Please enter Email" />
        <Login.Input keyname="password" placeholder="Please enter Password" type="password"/>
        <Login.Button keyname="submit" type="submit">
            Singup
        </Login.Button>
        </Login>
    </div>
    
  );
};
export default SingupPage;