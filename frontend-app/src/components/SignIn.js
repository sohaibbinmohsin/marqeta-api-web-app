import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import InitObject from './InitObjects';
import Loading from './Loading';
import signup from '../images/signup.png';
import logo from '../images/edupay-logo-purple.png';
import '../css/signup.css';

const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const signInUser = async(event) => {
        event.preventDefault()
        setLoading(true)
        const endpointUrl = new URL('https://sandbox-api.marqeta.com/v3/users/auth/login');

        const bodyParameters = JSON.stringify({
            "email": event.target[0].value,
            "password": event.target[1].value
        });

        const options = {
            method: "POST",
            headers: InitObject.headerParameters,
            body: bodyParameters
        };
        
        const response = await fetch(endpointUrl, options);
        const content = await response.json();

        if(content.hasOwnProperty("error_code")){
            setLoading(false)
            setError(content['error_message'])
        }
        else{
            setLoading(false)
            InitObject.user_token = content.user.token;
            InitObject.access_token = content.access_token.token;
            Object.freeze(InitObject)
            navigate(`/wallet?token=${content.user.token}`)
        }
    }
    return (
        <div style={{padding: '30px', display: 'flex', flexDirection: 'row'}}>
            <div style={{backgroundColor: 'white', width: '60%', height: '93vh', display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <img src={logo} alt={"logo1"} width={90} height={90}/>
                    <text className='logo' style={{color: '#3444fc'}}>EduPay</text>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: 'auto'}}>
                <text className='sign-up-heading'>Sign in to EduPay</text>
                <text className='sign-up-under'>Send, spend and save smarter</text>
                <form id="form1" style={{display: 'flex', flexDirection: 'column', margin: '0px auto'}} onSubmit={signInUser}>
                    <input type ='email' className='name email' placeholder='Email' name="email" />
                    <input type ='password' className='name email' placeholder='Password' name="password" />
                    <text style={{width: '378px', margin: '15px auto', marginBottom: '0', fontSize: '14px', padding: '0px 5px', color: 'red'}}>{error}</text>
                    <button class='sign-up-button' type="submit" value="Submit">Sign In</button>
                </form>
                <text style={{textAlign: 'center', width: '378px', margin: '15px auto', color: '#48464a'}}>Don't have an account? <a href='/signup' style={{fontWeight: 'bold', color: 'black', textDecoration: 'None'}}>Sign Up</a></text>
                </div>
            </div>
            <div style={{backgroundColor: '#3444fc', width: '40%', height: '93vh' , display: 'flex', flexDirection: 'column', borderRadius: '10px'}}>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: 'auto'}}>
                    <img src={signup} alt={"logo"} width={492} height={424} style={{margin: '0 auto'}}/>
                    <text style={{color: 'white', fontSize: '40px', fontWeight: '900', margin: 'auto', marginTop: '30px', marginBottom: '0px'}}>Get better with money</text>
                    <text style={{color: 'white', fontSize: '15px', fontWeight: '100', padding: '20px', textAlign: 'center', marginTop: '5px', marginBottom: '0px'}}>
                        EduPay helps you set saving goals, earn cash back offers. Go to disclaimer for more details and get paychecks up to two days early.
                    </text>
                    <hr style={{height: '6px', width: '30px', borderRadius: '99px', background: 'white', margin: '0 auto'}}/>
                </div>
            </div>
            <Loading open={loading}/>
        </div>
    )
}

export default SignIn