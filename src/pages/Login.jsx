import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import './Login.css';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user } = useUserContext();

    useRedirectActiveUser(user, "/dashboard");


    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const credentialUser = await login({ email, password });
            console.log(credentialUser);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    placeholder="Ingrese email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input
                    type="password"
                    placeholder="Ingrese Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                <Link to='/register'>Register Now</Link>
            </form>
        </div>
    );
};
export default Login;