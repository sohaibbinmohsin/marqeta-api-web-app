import React, { useEffect, useState } from 'react';
import logo from '../images/edupay-logo-white.png';
import landing from '../images/landing-page-pic.png';

const Landing = () => {
    const [displayText, setDisplayText] = useState('');
    
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(()=>{
        const text = ['SMS fees.', 'long hold time.', 'paper forms.', 'ATM fees.', 'transfer fees.', 'annual fees.', 'waiting in lines.']
        const type = async() => {
            for(let i = 0; i < text.length; i++){
                let display = text[i];
                for(let j = 0; j < display.length; j++){
                    setDisplayText(display.substring(0, j+1))
                    await sleep(300);
                }
                for(let j = display.length; j > 0; j-=1){
                    setDisplayText(display.substring(0, j-1))
                    await sleep(300);
                }
            }
            type()
        }
        type()
    }, [])
    
    return (
        <div style={{width: '100%', height: '100vh', background: '#3444fc', display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <img src={logo} alt={"logo1"} width={90} height={90}/>
                        <text className='logo' style={{color: 'white'}}>EduPay</text>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <a href='/signin' style={{display: 'flex', justifyContent: 'center', padding: '30px 20px', fontSize: '18px', color: 'white', fontWeight: 'bold'}}>Sign In</a>
                    <a href='/signup' style={{display: 'flex', justifyContent: 'center', padding: '10px 10px', margin: '20px 20px', marginBottom: '35px', fontSize: '18px', background: 'white', color: '#3444fc', width: '150px', borderRadius: '10px', fontWeight: 'bold', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>Sign Up</a>
                </div>
            </div>
            <div style={{display: 'flex', flex: '1'}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flex: '1'}}>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '100px', marginLeft: '100px'}}>
                        <text style={{fontSize: '60px', color: 'white', fontWeight: 'bold'}}>Say goodbye to</text>
                        <text style={{fontSize: '60px', color: 'white', fontWeight: 'bold'}}><u>{displayText}</u>|</text>
                        <text style={{color: '#bdc4d1', margin: '20px 0px', fontWeight: 'bold', fontSize: '18px'}}>Sign up now for your <mark style={{color: '#3444fc', background: 'white'}}> free $100, a Visa debit card, and a digital wallet</mark>. Spend, send and withdraw cash without fees.</text>
                        <a href='/signup' style={{display: 'flex', justifyContent: 'center', padding: '10px 10px', margin: '20px 0px', marginBottom: '35px', fontSize: '18px', background: 'white', color: '#3444fc', width: '150px', borderRadius: '10px', fontWeight: 'bold', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>Sign Up</a>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '100px', marginRight: '20px'}}>
                        <img src={landing} alt={"logo1"} width={500} height={500}/>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Landing
