import React, {useEffect, useState} from 'react'

const Register = () => {
    const [error, setError] = useState('');
    const [values, setValues] = useState();
    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.values
        })
    }
    useEffect(() => {
        document.title = 'Register'
    });
    const onSubmit = ({serialezed, fields, form}) => {
        console.log(serialezed, fields, form)
    }
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form action={onSubmit}>
                    <h3>Đăng ký</h3>
                    <div className="form-group d-flex justify-content-between">
                        {/*<label htmlFor='email'>Họ</label>*/}
                        <input type="lastname"
                               id='lastname'
                               name='lastname'
                               className="form-control col-6"
                               placeholder="Họ"
                               onChange={onChange}
                               required/>
                        <input type="firstname"
                               id='firstname'
                               name='firstname'
                               className="form-control col-6"
                               placeholder="Tên"
                               onChange={onChange}
                               required/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
