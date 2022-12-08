import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Loading from './Loading';
import InitObject from './InitObjects';

const Send = ({open, text, data, token, onClose}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [money, setMoney] = useState(data.gpa.available_balance.toFixed(2))
    if(!open) return null;
    let t1 = '';
    let t2 = '';
    let t3 = '';
    if(text === 'Send'){
        t1 = 'user';
        t2 = 'to whom';
        t3 = 'send';
    }
    else{
        t1 = 'bank';
        t2 = 'where';
        t3 = 'deposit';
    }
    const sendMoney = async (event) => {
        event.preventDefault()
        if(parseInt(event.target[1].value) > money && parseInt(event.target[1].value) < 1){
            setError("Amount entered must be between 0 and " + money)
        }
        else{
            setError('')
            setLoading(true)
            const endpointUrl = 'https://sandbox-api.marqeta.com/v3/simulate/authorization';
            const bodyParameters = JSON.stringify({
                "amount": event.target[1].value, 
                "mid": event.target[0].value,
                "card_token": token
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
                setError(<text style={{color: 'green'}}>Your transactions has been successfully completed!</text>)
            }
            setMoney(content.transaction.gpa.available_balance.toFixed(2))
            setLoading(false);
        }
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
                <text style={{display: 'flex', justifyContent: 'center', fontSize: '22px', fontWeight: 'bold', color: '#48464a'}}>{text} Money</text>
                <text style={{display: 'flex', justifyContent: 'center', fontSize: '15px', color: '#a9b3d5', textAlign: 'center'}}>Please enter {t1} account information {t2} you want to {t3} money and enter an amount</text>
                <form onSubmit={sendMoney} style={{display: 'flex', flexDirection: 'column'}}>
                    <text style={{display: 'flex', fontWeight: 'bold', fontSize: '16px', color: '#48464a', margin: '10px 0px'}}>Account number</text>
                    <input type ='number' className='name email' style={{display: 'flex', width: '100%', margin: '0px'}} placeholder='Enter recepient account number' name="accnum" required />
                    <text style={{display: 'flex', fontWeight: 'bold', fontSize: '16px', color: '#48464a', margin: '10px 0px'}}>Choose method</text>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '45%', borderRadius: '10px', border: '1px solid #3444fc', padding: '20px 10px', height: '70px'}}>
                            <span style={{display: 'flex', flexDirection: 'row'}}>
                                <i className="fa fa-cc-visa" style={{fontSize: '30px', color: '#1434cb', marginRight: '10px'}}/>
                                <text style={{color: '#48464a', marginTop: '3px'}}>EduPay Visa</text>
                            </span>
                            <i className="fa fa-check-circle" style={{marginTop: '8px', color: '#3444fc', marginLeft: '10px'}} />
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', width: '50%'}}>
                            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', borderRadius: '10px', border: '1px solid #3444fc', padding: '10px', height: '150px', backgroundImage: 'linear-gradient(to right bottom, #6969fd, #6661fa, #5863f6, #505bf1, #4850ec)', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                                <text style={{color: 'white', fontSize: '20px', fontWeight: 'bold'}}>EduPay</text>
                                <text style={{color: 'white', fontSize: '30px', fontWeight: 'bold'}}>${money}</text>
                                <i className="fa fa-cc-visa" style={{fontSize: '40px', color: 'white',  display: 'flex', justifyContent: 'flex-end'}}/>
                            </div>
                            <div className='amount'>
                                <text style={{fontSize: '15px', color: '#a9b3d5', margin: '5px 10px'}}>Enter amount</text>
                                <span style={{display: 'flex', flexDirection: 'row'}}>
                                    <input type ='text' className='num' name="a" required/>
                                    <span className="fi fi-us fis" style={{borderRadius:'50%', fontSize: '40px', display: 'inline-flex', width: '35px', height: '35px'}}/>
                                </span>
                            </div>
                        </div>
                    </div>
                    <button style={{color: 'white', backgroundColor: '#3444fc', padding: '15px', borderRadius: '20px', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', cursor: 'pointer', marginTop: '25px', border: '0px'}} type='submit'>{text}</button>
                </form>
                <text style={{margin: '20px 0px', marginBottom: '0', fontSize: '14px', color: 'red'}}>{error}</text>
            </div>
            <Loading open={loading} />
        </>,
        document.getElementById('portal')
    )
}

export default Send
