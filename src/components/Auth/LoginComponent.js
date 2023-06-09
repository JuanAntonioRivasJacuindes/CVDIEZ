import React, { useState } from 'react';

import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { AuthService } from '../../service/AuthService'
import { InputText } from 'primereact/inputtext';
import { useHistory } from "react-router-dom";

export const LoginComponent = () => {
    const history=new useHistory()
    const authService = new AuthService();
    
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
  
    const [email, setEmail] = useState('');


    const login=()=>{
        authService.getLogin(email,password)
        .then(function (response) {
            if(response.data.token){
                console.log(response.data.token)
                localStorage.setItem('AuthToken',response.data.token)
                window.location.reload();
            }else{

                console.log("error al iniciar sesion");
            }
          })
        ;
    }
    return (
        <div >
            <div className="flex flex-column align-items-center justify-content-center">
                
                <div >
                    <div className="w-full surface-card py-4 px-5 " style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                           
                            <div className="text-900 text-3xl font-medium mb-3">Welcome</div>
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div>

                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText inputid="email1" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email address" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password inputid="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                    <Checkbox inputid="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">Remember me</label>
                                </div>
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" >
                                    Forgot password?
                                </a>
                            </div>
                            <Button label="Sign In" className="w-full p-3 text-xl" onClick={() => login()}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

