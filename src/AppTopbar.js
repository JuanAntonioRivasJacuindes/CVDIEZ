import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { AuthService } from './service/AuthService';
import { Button } from 'primereact/button';
import { useHistory } from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import { LoginComponent } from './components/Auth/LoginComponent';
export const AppTopbar = (props) => {
    const auth = new AuthService();
    const [visible,setVisible]=useState(false)
    console.log(props.isAuthenticated())
    const history = new useHistory()
    const logout = () => {
     
        if (localStorage.getItem('AuthToken')) {
            
            auth.getLogout(localStorage.getItem('AuthToken'))
            .then((res)=>{
                localStorage.removeItem('AuthToken')
                window.location.reload();
                console.log(res)
            })

        }
    }
    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logo-dark.svg' : 'assets/layout/images/logo-white.svg'} alt="logo" />


            </Link>
            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>


            {props.isAuthenticated() &&
                <ul className={classNames("layout-topbar-menu lg:flex origin-top", { 'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
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
            }
            {!props.isAuthenticated() &&
                <ul className={classNames("layout-topbar-menu lg:flex origin-top", { 'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                    <li>
                    <Button label="Sing In" onClick={() => setVisible(true)} />
                        
                    </li>
                    <li>
                        <Button label="Register" raised />

                    </li>
                </ul>
            }
        <Dialog visible={visible} onHide={() => setVisible(false)}>
        <LoginComponent></LoginComponent>
        </Dialog>

        </div>
        
    );
}
