import React, { useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { AuthService } from "../../service/AuthService";
import { InputText } from "primereact/inputtext";

import validator from "validator";
import { Divider } from "primereact/divider";

import { Toast } from "primereact/toast";

export const ResetPasswordComponent = () => {
    const { token } = useParams();
    const query = new URLSearchParams(useLocation().search);
    const email = query.get("email");
    const toast = useRef(null);

    const authService = new AuthService();
    const [inputsDisable, setInputsdisable] = useState(false);

    const [emailValid, setEmailValid] = useState();

    const [nameValid, setNameValid] = useState();

    const [password, setPassword] = useState("");
    const [passwordValid, setPasswordValid] = useState();
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loginButton, setLoginButton] = useState(false);

    const register = () => {
        setLoginButton(true);
        setInputsdisable(true);

        if (validator.equals(password, confirmPassword) && !validator.isEmpty(password)) {
            authService.getResetPassword(token, password, confirmPassword, email).then(function (response) {
                if (response.data) {
                    console.log(response.data);
                    if (response.data.status === "passwords.reset") {
                        toast.current.show({ severity: "success", summary: "Éxito", detail: response.data.message });
                    } else {
                        toast.current.show({ severity: "error", summary: "Error", detail: response.data.message });
                    }
                } else {
                    console.log("error al iniciar sesion");
                }

                setLoginButton(false);
                setInputsdisable(false);
            });
        } else {
            setPasswordValid(true);
        }

        if (emailValid && passwordValid && nameValid) {
            console.log("procedemos al login");
        }
        setLoginButton(false);
        setInputsdisable(false);
    };
    return (
        <div>
            <Toast ref={toast} />

            <div className="flex flex-column align-items-center justify-content-center">
                <div>
                    <div className="w-full surface-card py-4 px-5 ">
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Restablecer Contraseña</div>
                        </div>
                        <label>{email}</label>

                        <div>
                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Contraseña
                            </label>
                            <Password
                                disabled={inputsDisable}
                                inputid="password2"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                                className={passwordValid ? "w-full md:w-30rem mb-5" : "p-invalid w-full md:w-30rem mb-5"}
                                toggleMask
                                feedback={false}
                                inputClassName="w-full p-3 md:w-30rem"
                            ></Password>
                            <label htmlFor="password2" className="block text-900 font-medium text-xl mb-2">
                                Repetir Contraseña
                            </label>
                            <Password
                                disabled={inputsDisable}
                                inputid="password1"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Contraseña"
                                className={passwordValid ? "w-full md:w-30rem mb-5" : "p-invalid w-full md:w-30rem mb-5"}
                                toggleMask
                                feedback={false}
                                inputClassName="w-full p-3 md:w-30rem"
                            ></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5"></div>
                            <Button loading={loginButton} label="Iniciar Sesión" className="w-full p-3 text-xl my-1 " onClick={() => register()}></Button>
                        </div>
                        <div>
                            {/* <Divider className="hidden md:flex" /> */}

                            {/* <Button label="Continuar con Facebook" icon="pi pi-facebook" className='w-full my-1 bg-blue-500' severity="info" /> */}
                            {/* <Button label="Continuar con Google" icon="pi pi-google" className='w-full my-1 custom-color #FF0000' severity="info" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
