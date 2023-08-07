import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile,sendEmailVerification } from "firebase/auth";
import "./Register.css";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const auth = getAuth();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(auth.currentUser, {
                displayName: username,
            });
            await sendEmailVerification(user)
            .then(() => {
                // Email verification sent!
                // ...
                alert("Verification email has been sent!");
            });
            auth.signOut();
        } catch (error) {
            alert(error.message);
        }

        navigate("/");
    };

    return (
        <div className="register-container">
            <h2 className="register-header">Sign up</h2>
            <form onSubmit={handleRegister}>
                <div className="r-container">
                    <div className="r-sub-container">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                
                <div className="register-button-container">
                <button className="btn btn-danger" type="submit">Sign up</button>
                </div>
                </div>
                </div>
            </form>
        </div>
    );
}

export default Register;
