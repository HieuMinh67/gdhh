import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {login, useAuth, authFetch, logout} from './auth'


const PrivateRoute = ({component: Component, ...rest}) => {
    const [logged] = useAuth();

    return <Route {...rest} render={(props) => (
        logged
            ? <Component {...props} />
            : <Redirect to={'/login'}/>
    )}/>
}

function App() {
    const [logged] = useAuth();
    return (
        <Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/login"}>Hoa Hung</Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                {!logged ?
                                    <React.Fragment>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/login"}>Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                                        </li>
                                    </React.Fragment>
                                    :
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/logout"}>Logout</Link>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Switch>
                            <Route exact path='/'><Home/></Route>
                            <Route path={'/login'}><Login/></Route>
                            <Route path={'/sign-up'}><Signup/></Route>
                            <PrivateRoute path={"/secret"} component={Secret}/>
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
    }, []);
    return <h2>Home</h2>;
}

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [logged] = useAuth();

    const onSubmitClick = (e) => {
        e.preventDefault()
        if (username === '' || password === '') {
            setError('Fields are required');
            return;
        }
        let opts = {
            'username': username,
            'password': password
        }
        fetch('/api/login', {
            method: 'post',
            body: JSON.stringify(opts)
        }).then(r => r.json())
            .then(token => {
                if (token.access_token) {
                    login(token);
                } else {
                    alert("Invalid credential")
                }
            })
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    return (
        <React.Fragment>
            {!logged ?
                <form>
                    <h3>Sign In</h3>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="text" className="form-control" placeholder={"Enter email"}
                               onChange={handleUsernameChange}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className={"form-control"} placeholder={"Enter password"}
                               onChange={handlePasswordChange}/>
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className={"custom-control-input"} id={"customCheck1"}/>
                            <label htmlFor="customCheck1" className="custom-control-label">Remember me</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" onClick={onSubmitClick}>Submit</button>
                    <p className="forgot-password text-right"><a href="#">Forgot password?</a></p>
                </form> : <Redirect to={'/secret'}/>
            }
        </React.Fragment>
    );
}

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [email, setEmail] = useState('');
    let registered = false;

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleRetypePasswordChange = (e) => {
        setRetypePassword(e.target.value);
    }

    const onSubmitClick = (e) => {
        e.preventDefault();
        if (password === retypePassword) {
            let opts = {
                'username': username,
                'password': password,
                'email': email
            };
            fetch('api/register', {
                method: 'POST',
                body: JSON.stringify(opts)
            }).then(r => {
                if (r.status === 201)
                    registered = true;
            });

        } else {
            alert("Retype password not matches")
        }
    }

    if (registered) return <Redirect to={'/login'}/>;
    // <div className="form-group">
    //     <label>First name</label>
    //     <input type="text" className="form-control" placeholder="First name"/>
    // </div>
    //
    // <div className="form-group">
    //     <label>Last name</label>
    //     <input type="text" className="form-control" placeholder="Last name"/>
    // </div>
    else
    return (
        <form>
            <h3>Sign Up</h3>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email"
                       onChange={handleEmailChange}/>
            </div>

            <div className="form-group">
                <label>Username</label>
                <input type="email" className="form-control" placeholder="Enter email"
                       onChange={handleUsernameChange}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password"
                       onChange={handlePasswordChange}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Retype your password"
                       onChange={handleRetypePasswordChange}/>
            </div>

            <button type="submit" className="btn btn-primary btn-block" onClick={onSubmitClick}>Sign Up</button>
            <p className="forgot-password text-right">
                Already registered <a href="#">sign in?</a>
            </p>
        </form>
    );
}

function Secret() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        authFetch("/api/protected").then(response => {
            if (response.status === 401) {
                setMessage('You need to login first!');
                return null;
            }
            return response.json();
        }).then(response => {
            if (response && response.message) {
                setMessage(response.message)
            }
        })
    }, []);
    return (<h2>Secret: {message}</h2>);
}

export default App;
