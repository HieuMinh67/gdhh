import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Header from "../../component/header";

const SignUp = props => {
    const [error, setError] = useState('');
    const [values, setValues] = useState();
    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    }
    useEffect(() => {
        document.title = 'Sign Up';
    });

    const onSubmitClick = (e) => {
        e.preventDefault();
        console.log(values);
        if (values.password === values.retype_password) {
            fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify(values)
            }).then(r => {
                if (r.status === 201)
                    props.history.push('/login');
            }).catch((error) => {
                setError(error.message);
            });

        } else {
            setError("Retype password not matches");
        }
    }

    return (
        <React.Fragment>
        <Header/>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Sign Up</h3>
                        {error && <div className="text-danger">{error}</div>}
                        <div className="form-group">
                            <label htmlFor='email'>Email address</label>
                            <input type="email"
                                   id='email'
                                   name='email'
                                   className="form-control"
                                   placeholder="Enter email"
                                   onChange={onChange}
                                   required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor='password'>Password</label>
                            <input type="password"
                                   id='password'
                                   name='password'
                                   className="form-control"
                                   placeholder="Enter password"
                                   onChange={onChange}/>
                        </div>

                        <div className="form-group">
                            <label>Re-type password</label>
                            <input type="password"
                                   name="retype_password"
                                   className="form-control"
                                   placeholder="Retype your password"
                                   onChange={onChange}/>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" onClick={onSubmitClick}>Sign Up
                        </button>
                        <p className="forgot-password text-right">
                            Already registered <Link to='/login'>sign in?</Link>
                        </p>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SignUp;