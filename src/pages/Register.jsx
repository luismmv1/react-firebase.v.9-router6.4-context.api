import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null); // Estado para manejar los errores
    const { user } = useUserContext();

    useRedirectActiveUser(user, "/dashboard");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Formulario enviado");
        // Reiniciar el estado del error al enviar el formulario
        setError(null);
        // Verificar si las contraseñas coinciden
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        try {
            const credentialUser = await register({ email, password });
            console.log(credentialUser);
        } catch (error) {
            console.log(error);
            setError(error.message); // Manejar errores de registro
        }
    };
    return (
        <div className="register-container">
            <h1>Register</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} className="register-form">
                <input
                    type="text"
                    placeholder="Ingrese su Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Ingrese Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirme Contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Register Now</button>
                <Link to='/'>Log in</Link>
            </form>
        </div>
    );
};
export default Register;