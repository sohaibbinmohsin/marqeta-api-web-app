import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Loading from './Loading';
import InitObject from './InitObjects';

const Activate = ({open, data, onClose}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [created, setCreated] = useState(false);
    if(!open) return null;
    let token, address, city, state, country, postal_code = '';
    if(data.token){token = data.token;}
    if(data.address1){address = data.address1;}
    if(data.city){city = data.city;}
    if(data.state){state = data.state;}
    if(data.country){country = data.country;}
    if(data.postal_code){postal_code = data.postal_code;}

    const activatePhysicalVirtualCard = async (event) => {
        event.preventDefault()
        if(!created){
            setLoading(true)
            const endpointUrl = 'https://sandbox-api.marqeta.com/v3/cards';
            const bodyParameters = JSON.stringify({
                "user_token": token, 
                "card_product_token": InitObject.card_product_token,
                "fulfillment": {
                    "card_personalization": {
                        "text": {
                            "name_line_1": {
                                "value": ""
                            }
                        }
                    },
                    "shipping": {
                        "recipient_address": {
                            "address1": event.target[0].value,
                            "city": event.target[1].value,
                            "state": event.target[2].value,
                            "postal_code": event.target[4].value,
                            "country": event.target[3].value,
                        }
                    },   
                },
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
                const endpointUrl2 = 'https://sandbox-api.marqeta.com/v3/cardtransitions';
                const bodyParameters2 = JSON.stringify({
                    "card_token": content.token, 
                    "state": "ACTIVE",
                    "channel": "API",
                });
                const options2 = {
                    method: "POST",
                    headers: InitObject.headerParameters,
                    body: bodyParameters2
                };
                const response2 = await fetch(endpointUrl2, options2);
                const content2 = await response2.json();

                if(content2.hasOwnProperty("error_code")){
                    setError(content2['error_message'])
                }
                else{
                    setError(<text style={{color: 'green'}}>Your EduPay Physical Debit Card is successfully created!</text>)
                }
            }
            setLoading(false);
            setCreated(true);
        }else{
            setError(`Your Edupay Physical Debit Card is already created!`)
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
                <text style={{display: 'flex', justifyContent: 'center', fontSize: '22px', fontWeight: 'bold', color: '#48464a'}}>Activate EduPay Physical Debit Card</text>
                <text style={{display: 'flex', justifyContent: 'center', fontSize: '15px', color: '#a9b3d5', textAlign: 'center'}}>Please enter your current address to receive your EduPay Physical Debit Card</text>
                <form onSubmit={activatePhysicalVirtualCard} style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <text style={{color: '#a9b3d5', fontWeight: 'bold'}}>Address</text>
                        <input className='name' style={{width: '100%'}} placeholder="Address" name="address" defaultValue={address} required/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', margin: '20px 0px', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <text style={{color: '#a9b3d5', fontWeight: 'bold'}}>City</text>
                            <input type ='text' className='name' style={{width: '100%'}} placeholder="City" name="city" defaultValue={city} required/>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
                            <text style={{color: '#a9b3d5', fontWeight: 'bold'}}>State</text>
                            <input type ='text' className='name' style={{width: '100%'}} placeholder='State' name="state" defaultValue={state} required/>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <text style={{color: '#a9b3d5', fontWeight: 'bold'}}>Country</text>
                            <input type ='text' className='name' style={{width: '100%'}} placeholder="Country" name="country" defaultValue={country} required/>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
                            <text style={{color: '#a9b3d5', fontWeight: 'bold'}}>Postal Code</text>
                            <input type ='text' className='name' style={{width: '100%'}} placeholder='Postal code' name="postal-code" defaultValue={postal_code} required/>
                        </div>
                    </div>
                    <button style={{color: 'white', backgroundColor: '#3444fc', padding: '15px', borderRadius: '20px', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', cursor: 'pointer', marginTop: '25px', border: '0px'}} type='submit'>Activate</button>
                </form>
                <text style={{margin: '20px 0px', marginBottom: '0', fontSize: '14px', color: 'red'}}>{error}</text>
            </div>
            <Loading open={loading} />
        </>,
        document.getElementById('portal')
    )
}

export default Activate
