import React from "react";
import "./Login.css";
import { loginUrl } from "../Spotify Config/SpotifyConfig.js";
import Logo from "../Login/MusiCal_Logo.png";

console.log("Login URL:", loginUrl);

console.log("test")

function Login() {

  console.log("this is the login url")

  return (
    <div className="login">
      <img src={Logo} alt="Spotify logo" />
      <a href={loginUrl}>Login with Spotify</a>
    </div>
  );
}

export default Login;
