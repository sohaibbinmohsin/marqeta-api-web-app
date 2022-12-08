import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Loading from './Loading';
import InitObject from './InitObjects';
import logo from '../images/edupay-logo-purple.png';

const Receive = ({open, data, onClose}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    if(!open) return null;
    const receiveMoney = async(event) => {
        event.preventDefault()
        setLoading(true);
        const endpointUrl = new URL('https://sandbox-api.marqeta.com/v3/gpaorders');
        const bodyParameters = JSON.stringify({
            "amount": event.target[0].value,
            "currency_code": "USD",
            "funding_source_token": "sandbox_program_funding",
            "user_token": data.token
        });
        const options = {
            method: "POST",
            headers: InitObject.headerParameters,
            body: bodyParameters
        };
        const response = await fetch(endpointUrl, options);
        const content = await response.json();

        if(content.hasOwnProperty("error_code")){
            setError(content['error_message'])
        }
        else{
            setError(<text style={{color: 'green'}}>Your EduPay Wallet is successfully updated!</text>)
        }
        setLoading(false);
    }
    const closeActivate = () => {
        setError('');
        onClose();
    }
    return ReactDOM.createPortal(
        <>
            <div style={{position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '1000'}} />
            <div style={{position: 'fixed', top: '50%', left: '50%', right: '8%', transform:'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: '1000', borderRadius: '10px', display: 'flex', flexDirection: 'column'}}>
                <i className="fa fa-close" style={{fontSize: '24px', display: 'flex', justifyContent: 'flex-end', color: '#3444fc'}} onClick={closeActivate}/>
                <text style={{display: 'flex', justifyContent: 'center', fontSize: '22px', fontWeight: 'bold', color: '#48464a'}}>Receive Money</text>
                <text style={{display: 'flex', justifyContent: 'center', fontSize: '15px', color: '#a9b3d5', textAlign: 'center'}}>Please enter the amount you want to receive from Educative</text>
                <form onSubmit={receiveMoney} style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex', flexDirection: 'row', width: '100%', borderRadius: '10px', border: '1px solid #3444fc',  height: '70px', marginTop: '25px'}}>
                        <img src={logo} alt='' width={70} height={70}/>
                        <text style={{color: '#48464a', marginTop: '3px', padding: '20px 10px'}}>Educative Parent Account</text>
                    </div>
                    <div className='amount'>
                        <text style={{fontSize: '19px', color: '#a9b3d5', margin: '5px 10px'}}>Enter amount</text>
                        <span style={{display: 'flex', flexDirection: 'row'}}>
                            <text style={{fontSize: '25px', fontWeight: 'bold', marginLeft: '10px', color: '#48464a'}}>USD</text>
                            <span style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: '1'}}>
                                <input type ='text' className='num' name="a" required/>
                                <span className="fi fi-us fis" style={{borderRadius:'50%', fontSize: '40px', display: 'inline-flex', width: '35px', height: '35px', marginRight: '8px'}}/>
                            </span>
                        </span>
                    </div>
                    <button style={{color: 'white', backgroundColor: '#3444fc', padding: '15px', borderRadius: '20px', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', cursor: 'pointer', marginTop: '25px', border: '0px'}} type='submit'>Receive</button>
                </form>
                <text style={{margin: '20px 0px', marginBottom: '0', fontSize: '14px', color: 'red'}}>{error}</text>
            </div>
            <Loading open={loading} />
        </>,
        document.getElementById('portal')
    )
}

export default Receive
