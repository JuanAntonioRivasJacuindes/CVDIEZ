import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { LoginPage } from "./pages/Auth/LoginPage";
const isAuthenticated = () => {
    if (localStorage.getItem("AuthToken")) {
        return true;
    } else {
        return false;
    }
};
const login = () => {
    if (isAuthenticated()) {
        return <App></App>;
    } else {
        return <LoginPage></LoginPage>;
    }
};
ReactDOM.render(
    <BrowserRouter>
        <ScrollToTop>{login()}</ScrollToTop>
    </BrowserRouter>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
