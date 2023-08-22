import React from "react";
import { render } from "react-dom";
// import "./index.css";
import App from "./App";
import AuthPage from "./AuthPage";
import Footer from "./Footer";

const root = document.getElementById("root");

render(
  <React.StrictMode>
    <AuthPage />
    <Footer />  
  </React.StrictMode>,
  root
);
