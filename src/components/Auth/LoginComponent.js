import React, { useState } from "react";

import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { AuthService } from "../../service/AuthService";
import { InputText } from "primereact/inputtext";

import validator from "validator";
import { Divider } from "primereact/divider";

export const LoginComponent = () => {
    const authService = new AuthService();
    const [inputsDisable, setInputsdisable] = useState(false);
    const [password, setPassword] = useState("");

    const [checked, setChecked] = useState(false);
    const [email, setEmail] = useState("");
    const [loginButton, setLoginButton] = useState(false);

    const login = () => {
        if (validator.isEmail(email)) {
            setLoginButton(true);
            setInputsdisable(true);
            authService.getLogin(email, password).then(function (response) {
                if (response.data.token) {
                    console.log(response.data.token);
                    localStorage.setItem("AuthToken", response.data.token);
                    window.location.reload();
                } else {
                    console.log("error al iniciar sesion");
                }

                setLoginButton(false);
                setInputsdisable(false);
            });
        } else {
            console.log("error de validacion");
        }
    };
    return (
        <div className="w-full ">
            <div className="flex flex-column align-items-center justify-content-center">
                <div>
                    <div className="w-full surface-card py-4 px-5 ">
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Bienvenido</div>
                            <span className="text-600 font-medium">Inicia sesión para continuar</span>
                        </div>

                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText disabled={inputsDisable} inputid="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" className="w-full md:w-30rem mb-5" style={{ padding: "1rem" }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Contraseña
                            </label>
                            <Password
                                disabled={inputsDisable}
                                inputid="password1"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDownCapture={(e) => {
                                    if (e.key === "Enter") {
                                        login();
                                    }
                                }}
                                placeholder="Contraseña"
                                toggleMask
                                feedback={false}
                                className="w-full mb-5"
                                inputClassName="w-full p-3 md:w-30rem"
                            ></Password>

                            <Button loading={loginButton} label="Iniciar Sesión" className="w-full p-3 text-xl my-1 " onClick={() => login()}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
