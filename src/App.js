import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import React, {useEffect, useState} from "react";

import SignUp from "./components/signup.component";

function App() {
    return (
        <Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/sign-in"}>Hoa Hung</Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Switch>
                            <Route exact path='/'><Home/></Route>
                            <Route path={'/sign-in'}><Login/></Route>
                            <Route path={'/sign-up'} component={SignUp}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}

function Home() {
    useEffect(() => {
        fetch("/api").then(resp => resp.json()).then(resp => console.log(resp))
    }, [])
    return <h2>Home</h2>
}

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitClick = (e) => {
        e.preventDefault()
        console.log("You pressed login")
        let opts = {
            'username': username,
            'password': password
        }
        console.log(opts)
        fetch('/api/login', {
            method: 'post',
            body: JSON.stringify(opts)
        }).then(r => r.json())
            .then(token => {
                if (token.access_token) {
                    console.log(token)
                } else {
                    console.log("Please type in correct username/password")
                }
            })
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    return (
        <form>
            <h3>Sign In</h3>
            <div className="form-group">
                <label>Email address</label>
                <input type="text" className="form-control" placeholder={"Enter email"} onChange={handleUsernameChange}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className={"form-control"} placeholder={"Enter password"} onChange={handlePasswordChange}/>
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className={"custom-control-input"} id={"customCheck1"}/>
                    <label htmlFor="customCheck1" className="custom-control-label">Remember me</label>
                </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block" onClick={onSubmitClick}>Submit</button>
            <p className="forgot-password text-right"><a href="#">Forgot password?</a></p>
        </form>
    );
}

export default App;
