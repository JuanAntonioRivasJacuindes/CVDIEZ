import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Route, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { AppTopbar } from "./AppTopbar";
import { AppFooter } from "./AppFooter";
import { AppMenu } from "./AppMenu";

import { Dashboard } from "./components/Dashboard";
import CategoryTable from "./components/CategoryCrudComponent";
import PrimeReact from "primereact/api";
import { LoginPage } from "./pages/Auth/LoginPage";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import "./layout/flags/flags.css";
import "./layout/layout.scss";
import "./App.scss";
import BreadCrumbBar from "./components/Partia/BreadCrumbBar";
import { ButtonDemo } from "./components/ButtonDemo";
import { MiscDemo } from "./components/MiscDemo";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import UserCrudComponent from "./components/UserCrud";
import RoleTable from "./components/RoleCrud";

const App = () => {
    const [hiddenLayout, setHiddenLayout] = useState(false);
    const [layoutMode, setLayoutMode] = useState("static");
    const [layoutColorMode, setLayoutColorMode] = useState("light");
    const [inputStyle, setInputStyle] = useState("outlined");
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    const location = new useLocation();
    const voidLocations = ["/forgot-password", "/not-found", "/reset-password"];

    useEffect(() => {
        if (voidLocations.indexOf("/" + location.pathname.split("/")[1]) !== -1) {
            setHiddenLayout(true);
        }
    }, []);
    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    };

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === "overlay") {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            } else if (layoutMode === "static") {
                setStaticMenuInactive((prevState) => !prevState);
            }
        } else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    };

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    };

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    };
    const isDesktop = () => {
        return window.innerWidth >= 992;
    };

    const menu = [
        {
            label: "Home",
            items: [
                {
                    label: "Dashboard",
                    icon: "pi pi-fw pi-home",
                    to: "/",
                },
            ],
        },
        {
            label: "Usuarios",
            items: [
                {
                    label: "Usuarios",
                    icon: "pi pi-fw pi-home",
                    to: "/users",
                },
            ],
        },
    ];

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };

    const wrapperClass = classNames("layout-wrapper", {
        "layout-overlay": layoutMode === "overlay",
        "layout-static": layoutMode === "static",
        "layout-static-sidebar-inactive": staticMenuInactive && layoutMode === "static",
        "layout-overlay-sidebar-active": overlayMenuActive && layoutMode === "overlay",
        "layout-mobile-sidebar-active": mobileMenuActive,
        "p-input-filled": inputStyle === "filled",
        "p-ripple-disabled": ripple === false,
        "layout-theme-light": layoutColorMode === "light",
    });

    const layout = () => {
        if (!hiddenLayout) {
            return (
                <div>
                    <div className="layout-sidebar" onClick={onSidebarClick}>
                        <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
                    </div>
                    <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode} mobileTopbarMenuActive={mobileTopbarMenuActive} isAuthenticated={true} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />
                    <BreadCrumbBar></BreadCrumbBar>
                </div>
            );
        } else {
            return <div></div>;
        }
    };
    const footer = () => {
        if (!hiddenLayout) {
            return <AppFooter layoutColorMode={layoutColorMode} />;
        } else {
            return <div></div>;
        }
    };

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            {layout()}
            <div className="layout-main-container">
                <div className="layout-main">
                    <Route path="/login" exact component={LoginPage} />
                    <Route path="/users" exact component={UserCrudComponent} />
                    <Route path="/roles" exact component={RoleTable} />
                    <Route path="/categories" exact component={CategoryTable} />

                    <Route path="/" exact component={Dashboard} />
                    {/* <Route path="/crud" exact component={CategoryCrudComponent} /> */}
                </div>
            </div>
            {footer()}
            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>
        </div>
    );
};

export default App;
