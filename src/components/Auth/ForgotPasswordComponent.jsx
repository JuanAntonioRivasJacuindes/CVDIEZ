import React, { useState,useRef } from "react";

import { Button } from "primereact/button";

import { AuthService } from "../../service/AuthService";
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';

import validator from "validator";
import { Divider } from "primereact/divider";


export const ForgotPasswordComponent = () => {
const toast = useRef(null);
const authService = new AuthService();
    const [inputsDisable, setInputsdisable] = useState(false);


    const [email, setEmail] = useState("");
    const [loginButton, setLoginButton] = useState(false);

    const login = () => {
        if (validator.isEmail(email)) {
            setLoginButton(true);
            setInputsdisable(true);
            authService.getForgotPassword(email).then(function (response) {
                if (response.data) {
                    console.log(response.data);
            
                } else {
                    console.log("error fatal");
                }
                
                if (response.data.status === "passwords.sent") {
                    
                    toast.current.show({ severity: 'success', summary: 'Éxito', detail: response.data.message });
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: response.data.message });
                    
                }
          
                setLoginButton(false);
                setInputsdisable(false);
            });
        } else {
            console.log("esta madre no es un correo");
        }
    };
    return (
        <div>
             <Toast ref={toast} />
            <div className="flex flex-column align-items-center justify-content-center">
                <div>
                    <div className="w-full surface-card py-4 px-5 " style={{ borderRadius: "10px" }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Restablecer Contraseña</div>
                            <span className="text-600 font-medium">Introduce tu correo electronico</span>
                        </div>

                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText disabled={inputsDisable} inputid="email1" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" className="w-full md:w-30rem mb-5" style={{ padding: "1rem" }} />

                           
           
                            
                            <Button loading={loginButton} label="Iniciar Sesión" className="w-full p-3 text-xl my-1 " onClick={() => login()}></Button>
                        </div>
                        <div>
                            <Divider className="hidden md:flex" />

                            {/* <Button label="Continuar con Facebook" icon="pi pi-facebook" className='w-full my-1 bg-blue-500' severity="info" /> */}
                            {/* <Button label="Continuar con Google" icon="pi pi-google" className='w-full my-1 custom-color #FF0000' severity="info" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

