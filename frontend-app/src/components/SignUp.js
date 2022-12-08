import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import InitObject from './InitObjects';
import Loading from './Loading';
import signup from '../images/signup.png';
import logo from '../images/edupay-logo-white.png';
import '../css/signup.css';

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const signUpUser = async(event) => {
        event.preventDefault()
        setLoading(true)
        const endpointUrl = new URL('https://sandbox-api.marqeta.com/v3/users');

        const bodyParameters = JSON.stringify({
            "first_name": event.target[0].value, 
            "last_name" : event.target[1].value,
            "email": event.target[2].value,
            "password": event.target[3].value
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
            const endpointUrl2 = new URL('https://sandbox-api.marqeta.com/v3/gpaorders');
            const bodyParameters2 = JSON.stringify({
                "amount": "100",
                "currency_code": "USD",
                "funding_source_token": "sandbox_program_funding",
                "user_token": content.token
            });
            const options2 = {
                method: "POST",
                headers: InitObject.headerParameters,
                body: bodyParameters2
            };
            
            await fetch(endpointUrl2, options2);
            setLoading(false)
            InitObject.user_token = content.token;
            navigate(`/wallet?token=${content['token']}`)
        }
    }
    
    return (
        <div style={{padding: '30px', display: 'flex', flexDirection: 'row'}}>
            <div style={{backgroundColor: '#3444fc', width: '40%', height: '93vh' , display: 'flex', flexDirection: 'column', borderRadius: '10px'}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <img src={logo} alt={"logo1"} width={90} height={90}/>
                    <text className='logo' style={{color: 'white'}}>EduPay</text>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: 'auto'}}>
                    <img src={signup} alt={"logo"} width={492} height={424} style={{margin: '0 auto'}}/>
                    <text style={{color: 'white', fontSize: '40px', fontWeight: '900', margin: 'auto', marginTop: '20px', marginBottom: '0px'}}>Speady, Easy and Fast</text>
                    <text style={{color: 'white', fontSize: '15px', fontWeight: '100', padding: '20px', textAlign: 'center', marginTop: '5px', marginBottom: '0px'}}>
                        EduPay helps you set saving goals, earn cash back offers. Go to disclaimer for more details and get paychecks up to two days early.
                    </text>
                    <hr style={{height: '6px', width: '30px', borderRadius: '99px', background: 'white', margin: '0 auto'}}/>
                </div>
            </div>
            <div style={{backgroundColor: 'white', width: '60%', height: '93vh', display: 'flex', flexDirection: 'column', margin: 'auto', justifyContent: 'center'}}>
                <text className='sign-up-heading'>Sign up for an account</text>
                <text className='sign-up-under'>Send, spend and save smarter</text>
                <form id="form1" style={{display: 'flex', flexDirection: 'column', margin: '0px auto'}} onSubmit={signUpUser}>
                    <span style={{display: 'flex', flexDirection: 'row'}}>
                        <input type ='text' className='name' placeholder='First Name' id="fname" style={{marginRight: '15px'}} required/>
                        <input type ='text' className='name' placeholder='Last Name' id="lname" required/>
                    </span>
                    <input type ='email' className='name email' placeholder='Email' id="email" required/>
                    <input type ='password' className='name email' placeholder='Password' id="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*-\]\[]).{8,}" title="Must contain at least one  number, one uppercase, one lowercase letter, and one special characters" required/>
                    <text style={{width: '378px', margin: '15px auto', marginBottom: '0', fontSize: '14px', padding: '0px 5px', color: '#bdc4d1'}}>By creating an account, you are agreeing to our <span style={{color: '#48464a'}}>Privacy Policy</span>, and <span style={{color: '#48464a'}}>Electronics Communication Policy</span>.</text>
                    <text style={{width: '378px', margin: '15px auto', marginBottom: '0', fontSize: '14px', padding: '0px 5px', color: 'red'}}>{error}</text>
                    <button className='sign-up-button' value="Submit" type='submit'>Sign Up</button>
                </form>
                <text style={{textAlign: 'center', width: '378px', margin: '15px auto', color: '#48464a'}}>Already have an account? <a href='/signin' style={{fontWeight: 'bold', color: 'black', textDecoration: 'None'}}>Sign In</a></text>
            </div>
            <Loading open={loading}/>
        </div>
    )
}

export default SignUp