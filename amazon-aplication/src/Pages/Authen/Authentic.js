import React, { useState, useContext } from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";
import classes from "../Authen/Auth.module.css";
import { authentication } from "../../Utility/Firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { BeatLoader } from "react-spinners";


export default function Authentic() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false
  })

  const [{ user }, dispatch] = useContext(DataContext);
 
  const navigate = useNavigate()
  const Location = useLocation();

  const authHandler = async (e) => {
    e.preventDefault();
    
    if (e.target.name === "Signin") {
           setLoading({ ...loading, signIn: true });

      signInWithEmailAndPassword(authentication, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
           setLoading({ ...loading, signIn: false });
           navigate(Location?.state?.relead || "/")
           console.log(userInfo.user.email)
        })
        .catch((error) => {
          console.log(error);
          setError(error.message)
           setLoading({ ...loading, signIn: false });
        });
    } else {
       setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(authentication, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
           setLoading({ ...loading, signUp: false });
           navigate(Location?.state?.relead || "/");
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
           setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to="/">
        <img
          src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
          alt="Amazon Logo"
        />
      </Link>
      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {Location?.state?.message &&(
          <small style={{padding : "5px",
            textAlign: "center",
            color: "red",
            fontWeight: "bold"
          }}>
            {Location.state.message}
          </small>
        )}
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            className={classes.login_button}
            name="Signin"
          >
            {loading.signIn ? <BeatLoader color="green" size={20} /> : "Login"}
          </button>
        </form>
        {/* agreement */}
        <p>
          By continuing, you agree to Amazon's clone fake Conditions of Use and
          Privacy Notice.
        </p>
        {/* create account button */}
        <button
          type="submit"
          onClick={authHandler}
          className={classes.Signup_button}
          name="Signup"
        >
          {loading.signUp ? (
            <BeatLoader color="green" size={20} />
          ) : (
            " Create your Amazon account"
          )}
        </button>
        {error && (
          <small style={{ padding: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}
