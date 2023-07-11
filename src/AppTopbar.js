import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { AuthService } from "./service/AuthService";
import { Button } from "primereact/button";

export const AppTopbar = (props) => {
    const auth = new AuthService();
    const [visible, setVisible] = useState(false);
    const [visibleRegister, setVisibleRegister] = useState(false);

    const location = useLocation();
    useEffect(() => {
        const path = location.pathname;
        const parts = path.split("/");
        const lastPart = parts[parts.length - 1];
        console.log(lastPart);
        if (lastPart === "login") {
            setVisible(true);
        }
        if (lastPart === "register") {
            setVisibleRegister(true);
        }
    }, []);
    const logout = () => {
        if (localStorage.getItem("AuthToken")) {
            auth.getLogout(localStorage.getItem("AuthToken")).then((res) => {
                console.log(res);
            });
        }
        localStorage.removeItem("AuthToken");
        window.location.reload();
    };
    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                {/* <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logo-dark.svg' : 'assets/layout/images/logo-white.svg'} alt="logo" /> */}

                <span>CVDIEZ</span>
            </Link>
            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>
                <li>
                    <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                        <i className="pi pi-cog" />
                        <span>Settings</span>
                    </button>
                </li>
                <li>
                    <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                        <i className="pi pi-user" />
                        <span>Profile</span>
                    </button>
                    <button className="p-link layout-topbar-button" onClick={logout}>
                        <i className="pi pi-sign-out" />
                        <span>Logout</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};
