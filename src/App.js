import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import React from "react";
import {useAuth} from './auth'
import SignUp from "./pages/Auth/signup";
import Login from "./pages/Auth/login";
import Dashboard from "./pages/dashboard";
import ProfileForm from './component/Form/ProfileForm';

const PrivateRoute = ({component: Component, ...rest}) => {
    const [logged] = useAuth();

    return <Route {...rest} render={(props) => (
        logged
            ? <Component {...props} />
            : <Redirect to={'/login'}/>
    )}/>
}

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/'><Redirect path='/dashboard'/></Route>
                <Route path={'/login'} component={Login}/>
                <Route path={'/signup'} component={SignUp}/>
                <Route path={'/register'} component={ProfileForm}/>
                <PrivateRoute path={'/dashboard'} component={Dashboard}/>
            </Switch>
        </Router>
    );
}

// function Home() {
//     useEffect(() => {
//         fetch("/api").then(resp => resp.json()).then(resp => console.log(resp))
//     }, []);
//     return <h2>Home</h2>;
// }

// function UserList() {
//     const [users, setUsers] = useState([]);
//     useEffect(() => {
//         authFetch("/api/users/")
//             .then(resp => resp.json())
//             .then((res) => {
//                 setUsers(res.users)
//             })
//     }, []);
//     return (
//         <Fragment>
//             <div className="auth-wrapper">
//                 <div className="auth-inner">
//                     <ul>
//                         {users.map(u => (
//                             <li key={u}>{u.username}</li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </Fragment>
//     );
// }
//
// function Secret() {
//     const [message, setMessage] = useState('');
//
//     useEffect(() => {
//         authFetch("/api/protected").then(response => {
//             if (response.status === 401) {
//                 setMessage('You need to login first!');
//                 return null;
//             }
//             return response.json();
//         }).then(response => {
//             if (response && response.message) {
//                 setMessage(response.message)
//             }
//         })
//     }, []);
//     return (<h2>Secret: {message}</h2>);
// }

export default App;
