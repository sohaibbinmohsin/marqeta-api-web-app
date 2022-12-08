import React from 'react';
import InitObject from './InitObjects';
import useFetch from '../hooks/useFetch';
import Loading from './Loading2';
import logo from '../images/edupay-logo-purple.png';
import '../css/signup.css';
import '../css/wallet.css';

const Transactions = () => {
    const params = new URLSearchParams(window.location.search);
    const endpointUrl = `https://sandbox-api.marqeta.com/v3/users/${params.get('token')}`;
    const endpointUrl2 = `https://sandbox-api.marqeta.com/v3/transactions?user_token=${params.get('token')}`;
    
    const options = JSON.stringify({
        method: "GET",
        headers: InitObject.headerParameters
    });
    const {data,responseStatus} = useFetch(endpointUrl, options);
    const {data:data2,responseStatus:responseStatus2} = useFetch(endpointUrl2, options);

    if(data !== null && responseStatus === 200 && data2 !== null && responseStatus2 === 200){
        return (
            <div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
                <div style={{width: '18%', height: '100vh', background: '#f0f2f4', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{display: 'flex', flexDirection: 'row', margin: '15px 25px'}}>
                            <img src={logo} alt={"logo1"} width={70} height={70}/>
                            <text style={{color: '#8986ac', fontSize: '25px', fontWeight: 'bold', marginTop: '23px'}}>EduPay</text>
                        </div>
                        <hr style={{border: '1px solid #e2e6ee', margin: '0px 15px'}}/>
                        <a className='nav-button' href={`/wallet?token=${params.get('token')}`}>
                            <i className='fa fa-credit-card' style={{fontSize: '24px', marginRight: '10px'}}/>
                            <text>My Wallet</text>
                        </a>
                        <a className='nav-button active' href={`/transactions?token=${params.get('token')}`}>
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
                        <text style={{color: '#48464a', fontWeight: '600', fontSize: '25px', padding: '12px 0px'}}>Transactions</text>
                        <a href={`/profile/info?token=${params.get('token')}`} style={{backgroundColor: '#f0f2f4', padding: '5px', paddingRight: '15px', marginTop: '6px', borderRadius: '30px'}}>
                            <i className='fa fa-user' style={{fontSize: '24px', marginRight: '10px', color: '#3444fc', backgroundColor: '#bdc4d1', padding: '10px', borderRadius: '30px'}}/>
                            <text  style={{color: '#48464a', fontWeight: '600', justifyContent: 'center'}}>{data.first_name}</text>
                        </a>
                    </div>
                    <div>
                        <div style={{width: '100%', height: '100%', marginTop: '25px', display: 'flex', flexDirection: 'column'}}>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: '20px', fontSize: '18px', fontWeight: 'bold', color: '#8986ac'}}>
                                <text style={{width: '270px', textAlign: 'center'}}>Name/Business</text>
                                <text style={{width: '250px', textAlign: 'center'}}>Date</text>
                                <text style={{width: '200px', textAlign: 'center'}}>Invoice ID</text>
                                <text style={{width: '200px', textAlign: 'center'}}>Amount</text>
                                <text style={{width: '200px', textAlign: 'center'}}>Status</text>
                            </div>
                            <hr style={{border: '1px solid #e2e6ee', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}/>
                            <div style={{overflowY:'scroll', height: '90vh'}} >
                            {
                                data2.data.map((t, key) => {
                                    let p = '';
                                    let name = '';
                                    let date = new Date(t.created_time);
                                    let day = date.getDate();
                                    let month = date.getMonth() + 1;
                                    let year = date.getFullYear()
                                    let invoice = t.token.substring(0, 8).toUpperCase();
                                    let amount = '';
                                    let status = '';
                                    if(t.type === 'authorization'){
                                        name = 'Marqeta';
                                        p = 'M';
                                        amount = '-' + t.amount;
                                        status = <text style={{color: 'khaki'}}>{t.state}</text>
                                    }else if(t.type === 'gpa.credit'){
                                        name = 'Educative Inc.';
                                        p = 'E';
                                        amount = '+' + t.amount;
                                        status = <text style={{color: 'green'}}>{t.state}</text>
                                    }
                                    return(
                                        <div key={key}>
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: '20px', fontSize: '18px', color: '#48464a', margin: '0px 0px'}}>
                                                <span style={{width: '300px'}}>
                                                    <span style={{backgroundColor: '#6969fd', width: '55px', height: '55px', padding: '15px 0px', borderRadius: '50%', marginRight: '20px', display: 'inline-flex', justifyContent: 'center', fontSize: '18px', color: 'white'}}>{p}</span>
                                                    <text style={{fontWeight: 'bold', color: '#48464a'}}>{name}</text>
                                                </span>
                                                <text style={{padding: '15px 0px', width: '200px', textAlign: 'center', color: '#48464a'}}>{year + "-" + month + "-" + day}</text>
                                                <text style={{padding: '15px 0px', width: '200px', textAlign: 'center', color: '#48464a'}}>{invoice}</text>
                                                <text style={{padding: '15px 0px', width: '200px', textAlign: 'center', fontWeight: 'bold', color: '#48464a', fontSize: '23px'}}>{amount}</text>
                                                <text style={{padding: '15px 0px', width: '200px', textAlign: 'center', fontWeight: 'bold'}}>{status}</text>
                                            </div>
                                            <hr style={{border: '1px solid #e2e6ee', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}/>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return(<Loading />)
    }
}

export default Transactions
