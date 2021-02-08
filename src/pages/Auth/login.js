import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { login, useAuth } from "../../auth";
import Header from "../../component/header";
import './styles.css';

const Login = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [logged] = useAuth();
    if (logged) {
        return <Redirect to='/dashboard'/>
    }

    const onSubmitClick = (e) => {
        e.preventDefault()
        if (email === '' || password === '') {
            setError('Fields are required');
            return;
        }
        let opts = {
            'email': email,
            'password': password
        }
        fetch('/api/login', {
            method: 'post',
            body: JSON.stringify(opts)
        }).then(r => r.json())
            .then(token => {
                if (token.access_token) {
                    login(token);
                    props.history.push('/dashboard');
                } else {
                    alert("Invalid credential")
                }
            })
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    return (
        <React.Fragment>
            <Header />
            <div className="auth-wrapper">
                <div className="auth-inner">

                    <form>
                        <h3>Sign In</h3>
                        {error && 
                            <div className="form-group">
                                <span className="text-danger">
                                    {error}
                                </span>
                            </div>
                        }
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder={"Enter email"}
                                onChange={handleEmailChange} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className={"form-control"} placeholder={"Enter password"}
                                onChange={handlePasswordChange} />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className={"custom-control-input"} id={"customCheck1"} />
                                <label htmlFor="customCheck1" className="custom-control-label">Remember me</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block" onClick={onSubmitClick}>Submit
                            </button>
                        <p className="forgot-password text-right"><a href="#">Forgot password?</a></p>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Login;