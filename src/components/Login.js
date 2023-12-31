import React, {useState} from "react";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "./Login.css";
import { useNavigate } from 'react-router-dom';  // import useNavigate


function Login () {

    const navigate = useNavigate();  // define navigate
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
    
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if(user.emailVerified) {
                navigate('/');  // navigate to the main page if email is verified
            } else {
                // Optionally, alert the user to verify their email
                alert('Please verify your email before logging in.');
            }
        })
        .catch((error) => {
            // eslint-disable-next-line
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
        const result = await signInWithPopup(auth, provider);
        // eslint-disable-next-line
        const user = result.user;
        // ...
        navigate('/');  // navigate to the main page

    } catch (error) {
        // eslint-disable-next-line
        const errorCode = error.code;
        // eslint-disable-next-line
        const errorMessage = error.message;
        // eslint-disable-next-line
        const email = error.email;
        // eslint-disable-next-line
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
       

    }

 }




    return (


        <div className="main-log-container">
            <h2 className="login-header">Please, come in</h2>
            <div className="login-form">
                <h3 className="email">E-mail</h3>
            <form  onSubmit={handleLogin}>
                <div className="mail-input-container">
                <div>
                <input
                type="email"
                value={email}
                onChange= {(e) => setEmail(e.target.value)}
                placeholder= "E-mail"
                />
                </div>
                <div>
                <input
                type="password"
                value={password}
                onChange= {(e) => setPassword(e.target.value)}
                placeholder="Password"
                />
                </div>

                <div className="button-container">
                <button className="btn btn-dark login-button-style" type="submit"> Submit</button>
                </div>
                </div>
            </form>
            <div>
                <h3 className="google">or sign in with</h3>
                <button className="btn btn-danger ggl-btn" onClick={handleGoogleLogin}>Google</button>
            </div>
            </div>
        </div>

    );
}

export default Login;