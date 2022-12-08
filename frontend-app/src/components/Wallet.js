import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import InitObject from './InitObjects';
import Loading from './Loading2';
import Send from './Send';
import Activate from './Activate';
import Receive from './Receive';
import logo from '../images/edupay-logo-purple.png';
import logo1 from '../images/edupay-logo-white.png';
import '../css/signup.css';
import '../css/wallet.css';

const Wallet = () => {
    const params = new URLSearchParams(window.location.search);
    const [send, setSend] = useState(false);
    const [deposit, setDeposit] = useState(false);
    const [receive, setReceive] = useState(false)
    const [activate, setActivate] = useState(false);
    const [data2, setData2] = useState(null);
    const [data5, setData5] = useState(null);
    let cardDiv = '';
    let token = '';
        
    const endpointUrl = `https://sandbox-api.marqeta.com/v3/users/${params.get('token')}`;
    const options = JSON.stringify({
        method: "GET",
        headers: InitObject.headerParameters
    });
    const {data,responseStatus} = useFetch(endpointUrl, options);

    const endpointUrl2 = `https://sandbox-api.marqeta.com/v3/cards/user/${params.get('token')}?count=1&fields=['token']`;
    const endpointUrl5 = `https://sandbox-api.marqeta.com/v3/balances/${params.get('token')}`;
    useEffect(() => {
        const fetchCards = async() => {
            const options2 = {
                method: "GET",
                headers: InitObject.headerParameters
            };
            const response = await fetch(endpointUrl2, options2);
            const content = await response.json();
            if(content.count === 1){
                let endpointUrl3 = new URL(`https://sandbox-api.marqeta.com/v3/cards/${content.data[0].token}/showpan`);
                const queryParameters = new URLSearchParams({
                    'show_cvv_number': true,
                });
                endpointUrl3.search = queryParameters;
                let response3 = await fetch(endpointUrl3, options2);
                let content3 = await response3.json();
                setData2({
                    'count': 1,
                    'data': [content3]
                })
            }else{
                setData2({
                    'count': 0
                })
            }
            const response5 = await fetch(endpointUrl5, options2);
            const content5 = await response5.json();
            setData5(content5)
        }
        fetchCards()
    }, [endpointUrl2, endpointUrl5, activate, send, deposit, receive])

    if(data2 !== null && data !== null){
        if(data2.count === 1){
            token = data2.data[0].token;
            cardDiv = 
            <>
                {data2.data.map((card, key) => {
                return( 
                    <div className="card" key={key}>
                        <div className="card__front card__part">
                            <text className="card__front-square card__square">EduPay</text>
                            <img className="card__front-logo card__logo" alt='' src="https://www.seekpng.com/png/full/212-2128294_visa-logo-png-image-visa-logo-white-png.png"/>
                            <p className="card_number">{card.pan.substring(0,4) + " " + card.pan.substring(4,8) + " " + card.pan.substring(8,12) + " " + card.pan.substring(12,16)}</p>
                            <div className="card__space-75">
                                <span className="card__label">Card holder</span>
                                <p className="card__info">{data.first_name + " " + data.last_name}</p>
                            </div>
                            <div className="card__space-25">
                                <span className="card__label">Expires</span>
                                <p className="card__info">{card.expiration.substring(0,2) + "/" + card.expiration.substring(2,4)}</p>
                            </div>
                        </div>
                        
                        <div className="card__back card__part">
                            <div className="card__black-line"></div>
                            <div className="card__back-content">
                            <div className="card__secret">
                                <p className="card__secret--last">{card.cvv_number}</p>
                            </div>
                            <img className="card__back-square card__square" alt='' src={logo1}/>
                            <img className="card__back-logo card__logo" alt='' src="https://www.seekpng.com/png/full/212-2128294_visa-logo-png-image-visa-logo-white-png.png"/>
                            </div>
                        </div>
                    </div>)
                })}
            </>
        }
        if(data2.count === 0){
            cardDiv = <>
                <div onClick={() => setActivate(true)} className='activate-card'>
                    <text>Activate Physical Card</text>
                </div>
            </>
        }
    }

    if(data !== null && data2 !== null && cardDiv !== '' && data5 !== null && responseStatus === 200){
        return (
            <div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
                <div style={{width: '18%', background: '#f0f2f4', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{display: 'flex', flexDirection: 'row', margin: '15px 25px'}}>
                            <img src={logo} alt={"logo1"} width={70} height={70}/>
                            <text style={{color: '#8986ac', fontSize: '25px', fontWeight: 'bold', marginTop: '23px'}}>EduPay</text>
                        </div>
                        <hr style={{border: '1px solid #e2e6ee', margin: '0px 15px'}}/>
                        <a className='nav-button active' href={`/wallet?token=${params.get('token')}`}>
                            <i className='fa fa-credit-card' style={{fontSize: '24px', marginRight: '10px'}}/>
                            <text>My Wallet</text>
                        </a>
                        <a className='nav-button' href={`/transactions?token=${params.get('token')}`}>
                            <i className='fa fa-money' style={{fontSize: '24px', marginRight: '10px'}}/>
                            <text>Transactions</text>
                        </a>
                    </div>
                    <a className='nav-button' style={{marginBottom: '10px', color: '#4b5fd0'}} href='/'>
                        <i className='fa fa-sign-out' style={{fontSize: '24px', marginRight: '10px'}}/>
                        <text>Sign Out</text>
                    </a>
                </div>
                <div style={{width: '82%', background: 'white', display: 'flex', flexDirection: 'column', padding: '25px'}}>
                    <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <text style={{color: '#48464a', fontWeight: '600', fontSize: '25px', padding: '12px 0px'}}>My Wallet</text>
                        <a href={`/profile/info?token=${params.get('token')}`} style={{backgroundColor: '#f0f2f4', padding: '5px', paddingRight: '15px', marginTop: '6px', borderRadius: '30px'}}>
                            <i className='fa fa-user' style={{fontSize: '24px', marginRight: '10px', color: '#3444fc', backgroundColor: '#bdc4d1', padding: '10px', borderRadius: '30px'}}/>
                            <text  style={{color: '#48464a', fontWeight: '600'}}>{data.first_name}</text>
                        </a>
                    </div>
                    <div style={{margin: '0px auto'}}>
                        <div style={{marginTop: '25px', display: 'flex', justifyContent: 'row'}}>
                            <div className='flashcard' style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                <text style={{color: '#8986ac'}}>Total Balance</text>
                                <span style={{marginTop: '20px'}}>
                                    <i className="fa fa-dollar" style={{fontSize: '40px', marginRight: '5px', color:'#48464a'}} />
                                    <text style={{fontSize:'40px', fontWeight: '600', marginRight: '5px', color:'#48464a'}}>{data5.gpa.available_balance.toFixed(2)}</text>
                                    <text style={{color: '#8986ac',  fontWeight: '600', fontSize:'20px'}}>USD</text>
                                </span>
                            </div>
                            <div className='flashcard quick' style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                                <text style={{color: '#8986ac'}}>Quick Links</text>
                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                    <div onClick={() => setDeposit(true)}   className='flashcard quick link'>
                                        <i className="fa fa-bank" style={{fontSize: '25px', color:'#3444fc', margin: '5px', marginLeft: '13px'}} />
                                        <text style={{color:'#48464a', marginTop: '5px'}}>Deposit</text>
                                    </div>
                                    <div onClick={() => setSend(true)}  className='flashcard quick link'>
                                        <i className="fa fa-send-o" style={{fontSize: '25px', color:'#3444fc', margin: '5px', marginLeft: '13px'}} />
                                        <text style={{color:'#48464a', marginTop: '5px', textAlign: 'center'}}>Send</text>
                                    </div>
                                    <div onClick={() => setReceive(true)}  className='flashcard quick link'>
                                        <i className="fa fa-gift" style={{fontSize: '25px', color:'#3444fc', margin: '5px', marginLeft: '13px'}} />
                                        <text style={{color:'#48464a', marginTop: '5px'}}>Receive</text>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', marginTop: '25px'}}>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <text style={{fontSize: '20px', padding: '10px 0px', fontWeight:'bold', color: '#48464a'}}>Card Lists</text>
                                {cardDiv}
                                <text style={{fontSize: '20px', padding: '10px 0px', fontWeight:'bold', color: '#48464a'}}>Wallet Details</text>
                                <div className='flashcard currency' style={{margin: '0px', color: '#48464a'}}>
                                    <span style={{display: 'flex', flexDirection: 'row'}}>
                                        <text style={{fontWeight: 'bold', marginRight: '5px'}}>Ledger Balance:</text>
                                        <text>{data5.gpa.ledger_balance}</text>
                                        <text style={{marginLeft: '5px'}}>USD</text>
                                    </span>
                                    <span style={{display: 'flex', flexDirection: 'row'}}>
                                        <text style={{fontWeight: 'bold', marginRight: '5px'}}>Available Balance:</text>
                                        <text>{data5.gpa.available_balance}</text>
                                        <text style={{marginLeft: '5px'}}>USD</text>
                                    </span>
                                    <span style={{display: 'flex', flexDirection: 'row'}}>
                                        <text style={{fontWeight: 'bold', marginRight: '5px'}}>Credit Balance:</text>
                                        <text>{data5.gpa.credit_balance}</text>
                                        <text style={{marginLeft: '5px'}}>USD</text>
                                    </span>
                                    <span style={{display: 'flex', flexDirection: 'row'}}>
                                        <text style={{fontWeight: 'bold', marginRight: '5px'}}>Pending Credits:</text>
                                        <text>{data5.gpa.pending_credits}</text>
                                        <text style={{marginLeft: '5px'}}>USD</text>
                                    </span>
                                </div>
                            </div>
                            <div style={{marginTop: '10px', display: 'flex', flexDirection: 'row'}}>
                                <div>
                                    <text style={{fontSize: '20px', marginLeft:'45px', fontWeight:'bold', color: '#48464a'}}>Currency</text>
                                    <div className='flashcard currency'>
                                        <span style={{display: 'flex', flexDirection: 'row', marginTop: '5px'}}>
                                            <span className="fi fi-us fis" style={{borderRadius:'50%', fontSize: '40px', marginRight: '20px', display: 'inline-flex', width: '35px', height: '35px', padding: '15px'}}/>
                                            <span style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                                <text style={{fontSize: '20px', fontWeight: 'bold', color: '#48464a'}}>USD</text>
                                                <text style={{fontSize: '20px', fontWeight: 'bold', color: '#48464a'}}>{data5.gpa.available_balance.toFixed(2)}<span style={{fontSize: '20px', fontWeight: '100',  color: '#bdc4d1', marginLeft: '3px'}}>USD</span></text>
                                            </span>
                                        </span>
                                        <span style={{display: 'flex', flexDirection: 'row', marginTop: '5px'}}>
                                            <span className="fi fi-eu fis" style={{borderRadius:'50%', fontSize: '40px', marginRight: '20px', display: 'inline-flex', width: '35px', height: '35px', padding: '15px'}}/>
                                            <span style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                                <text style={{fontSize: '20px', fontWeight: 'bold', color: '#48464a'}}>EUR</text>
                                                <text style={{fontSize: '20px', fontWeight: 'bold', color: '#48464a'}}>{(data5.gpa.available_balance*0.97).toFixed(2)}<span style={{fontSize: '20px', fontWeight: '100',  color: '#bdc4d1', marginLeft: '3px'}}>EUR</span></text>
                                            </span>
                                        </span>
                                        <span style={{display: 'flex', flexDirection: 'row', marginTop: '5px'}}>
                                            <span className="fi fi-gb fis" style={{borderRadius:'50%', fontSize: '40px', marginRight: '20px', display: 'inline-flex', width: '35px', height: '35px', padding: '15px'}}/>
                                            <span style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                                <text style={{fontSize: '20px', fontWeight: 'bold', color: '#48464a'}}>GBP</text>
                                                <text style={{fontSize: '20px', fontWeight: 'bold', color: '#48464a'}}>{(data5.gpa.available_balance*0.85).toFixed(2)}<span style={{fontSize: '20px', fontWeight: '100',  color: '#bdc4d1', marginLeft: '3px'}}>GBP</span></text>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Send open={send} text={'Send'} data={data5} token={token} onClose={() => setSend(false)} />
                <Send open={deposit} text={'Deposit'} data={data5} token={token} onClose={() => setDeposit(false)} />
                <Activate open={activate} data={data} onClose={() => setActivate(false)} />
                <Receive open={receive} data={data} onClose={() => setReceive(false)} />
            </div>
        )
    }
    else{
        return(<Loading />)
    }
}

export default Wallet
