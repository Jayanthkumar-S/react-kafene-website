import React from 'react';
import {useState} from 'react'
import './Login.css'
import axios from 'axios';
import { setAuth } from '../Authentication/Auth'
import { login_url } from '../Assets/APIEndpoints'

const Login = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsernameChange = e => setUsername(e.target.value)
    const handlePasswordChange = e => setPassword(e.target.value)

    const loginTrigger = (e) => {
        e.preventDefault()
        if(username!==password){
            alert('Please enter valid credentials')
            return;
        }
        else{
            axios.post(login_url, {
                username: username,
                password: password
            })
            .then((response)  =>{
                setAuth(true)
                alert('Login Successful')
                props.history.push('/')
                return;
            }).catch((err) =>{
                setAuth(true)
                alert('Api call failed...still redirecting to landing page')
                props.history.push('/')
                return;
            })
        }
    }
    return ( 
        <>
            <main>
                <form className="login-form">
                    <h1>Sign In</h1>
                    <input type="text" placeholder="Enter Username" className="input-field" value = {username} onChange = {handleUsernameChange} required/>
                    <input type="password" placeholder = "Enter Password" className="input-field" value={password} onChange = {handlePasswordChange} required/>
                    <input type="submit" value="Login" className="submit-btn" onClick  = {loginTrigger}/>
                </form>
            </main>
        </>
     );
}
 
export default Login;