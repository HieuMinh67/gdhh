import {logout, useAuth} from "../auth";
import React from "react";
import {Link, withRouter} from "react-router-dom";

const Header = () => {
    const [logged] = useAuth();

    return <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
            <Link className="navbar-brand" to={"/"}>Hoa Hung</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                    {!logged ?
                        <React.Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/login"}>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/signup"}>Sign up</Link>
                            </li>
                        </React.Fragment>
                        :
                        <li className="nav-item">
                            <span className="nav-link" onClick={logout}>Logout</span>
                        </li>
                    }
                </ul>
            </div>
        </div>
    </nav>
}

export default withRouter(Header);