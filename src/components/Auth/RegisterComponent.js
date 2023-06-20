import React, { useState } from 'react';

import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { AuthService } from '../../service/AuthService'
import { InputText } from 'primereact/inputtext';

import validator from 'validator';
import { Divider } from 'primereact/divider';



export const RegisterComponent = () => {

    const authService = new AuthService();
    const [inputsDisable,setInputsdisable]=useState(false);
    const [checked, setChecked] = useState(false);
    
    const [emailValid,setEmailValid]=useState()
    const [email, setEmail] = useState('');
    
    const [name, setName] = useState('');
    const [nameValid, setNameValid] = useState();
    
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState();
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [loginButton, setLoginButton] = useState(false);

    const register = () => {
        setLoginButton(true)
        setInputsdisable(true)
        if (!validator.isEmail(email)) {
            setEmailValid(false)
        }else{
            setEmailValid(true)

        }
        if (!validator.equals(password,confirmPassword)|validator.isEmpty(password)) {
            setPasswordValid(false)
        }else{
            setPasswordValid(true)

        }
        if(validator.isEmpty(name)){
            setNameValid(false)
        }else{
            setNameValid(true)

        }


        if(emailValid&&passwordValid&&nameValid){
            console.log("procedemos al login")
        }
        setLoginButton(false)
        setInputsdisable(false)
    }
    return (
        <div >
            <div className="flex flex-column align-items-center justify-content-center">

                <div >
                    <div className="w-full surface-card py-4 px-5 " style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">

                            <div className="text-900 text-3xl font-medium mb-3">Registrarse</div>
                       
                        </div>

                        <div>
                            <label htmlFor="Name" className="block text-900 text-xl font-medium mb-2">
                                Nombre
                            </label>
                            <InputText disabled={inputsDisable} inputid="Name" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Nombre" className={nameValid?"w-full md:w-30rem mb-5":'p-invalid w-full md:w-30rem mb-5' }style={{ padding: '1rem' }} />
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText disabled={inputsDisable} inputid="email1" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" className={emailValid?"w-full md:w-30rem mb-5":'p-invalid w-full md:w-30rem mb-5' } style={{ padding: '1rem' }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Contraseña
                            </label>
                            <Password disabled={inputsDisable}  inputid="password2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña"  className={passwordValid?"w-full md:w-30rem mb-5":'p-invalid w-full md:w-30rem mb-5' } toggleMask feedback={false} inputClassName="w-full p-3 md:w-30rem"></Password>
                            <label htmlFor="password2" className="block text-900 font-medium text-xl mb-2">
                                Repetir Contraseña
                            </label>
                            <Password disabled={inputsDisable}  inputid="password1" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Contraseña"className={passwordValid?"w-full md:w-30rem mb-5":'p-invalid w-full md:w-30rem mb-5' }  toggleMask feedback={false}  inputClassName="w-full p-3 md:w-30rem"></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                
                            </div>
                            <Button loading={loginButton} label='Iniciar Sesión' className="w-full p-3 text-xl my-1 " onClick={() => register()}></Button>
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

