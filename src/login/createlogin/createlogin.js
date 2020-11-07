import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import "../createlogin.css";

function Createlogin() {
  const history = useHistory();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const createsingin = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((e) => alert(e.message));
  };

  return (
    <div className="createlogin">
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
            <button
              className="login__sign"
              onClick={createsingin}
              type="submit"
            >
              Sign up
            </button>
          </form>

          <Link to="/login">
            <button className="createlogin__register">Back to Signin</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Createlogin;
