import React from "react";
import { useState } from "react";
import "./login.css";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const signin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((e) => alert(e.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login__contianer">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button className="login__sign" onClick={signin} type="submit">
            Sign in
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Condition fo Use &
          Sale, Please see our Privacy Notice, our Cookies Notice and
          Interest-Based Ads Notice
        </p>
        <Link to="/create account">
          <button className="login__register">Create New Account</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
