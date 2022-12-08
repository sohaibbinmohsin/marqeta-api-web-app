import React, { useState} from 'react';
import useFetch from '../hooks/useFetch';
import Loading2 from './Loading2';
import Loading from './Loading';
import { useParams } from 'react-router-dom';
import InitObject from './InitObjects';
import logo from '../images/edupay-logo-purple.png';

const Profile = () => {
    const params = new URLSearchParams(window.location.search);
    let colorI1 = 'transparent';
    let colorI2 = '#48464a';
    let colorI3 = '';
    let colorS1 = 'transparent';
    let colorS2 = '#48464a';
    let colorS3 = '';
    let profileDiv = '';

    let fname = '';
    let lname = '';
    let db = '';
    let phone = '';
    let address = '';
    let city = '';
    let state = '';
    let country = '';
    let postal_code = '';
    let email = '';
    
    const [check, setCheck] = useState(true);
    const [edit, setEdit] = useState('Edit Details');
    const [passwordButtonText, setPasswordButtonText] = useState('Change Password');
    const [changePasswordDiv, setChangePasswordDiv] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const endpointUrl = `https://sandbox-api.marqeta.com/v3/users/${params.get('token')}`;
    const options = JSON.stringify({
        method: "GET",
        headers: InitObject.headerParameters
    });
    const {data,responseStatus} = useFetch(endpointUrl, options);

    const { id } = useParams();
    const editDetails = async(event) => {
        event.preventDefault()
        if(check){
            setCheck(false);
            setEdit('Save');
            setError('')
        }
        else{
            const bodyParameters = JSON.stringify({
                "first_name": event.target[1].value,
                "last_name": event.target[2].value,
                "birth_date": event.target[3].value,
                "phone": event.target[4].value,
                "address1": event.target[5].value,
                "city": event.target[6].value,
                "state": event.target[7].value,
                "country": event.target[8].value,
                "postal_code": event.target[9].value,
            });

            const options2 = {
                method: "PUT",
                headers: InitObject.headerParameters,
                body: bodyParameters
            };
            
            const response = await fetch(endpointUrl, options2);
            const content = await response.json();

            if(content.hasOwnProperty("error_code")){
                setLoading(false)
                setError(content['error_message'])
            }
            else{
                setLoading(false)
                setError(<text style={{color: 'green'}}>Your information is successfully updated!</text>)
            }
            setCheck(true);
            setEdit('Edit Details');
        }
    }
    const changePassword = async(event) => {
        event.preventDefault()
        if(changePasswordDiv === ''){
            setError('')
            setPasswordButtonText("Confirm")
            setChangePasswordDiv(
            <div>
                <div style={{display: 'flex', flexDirection: 'column', margin: '20px 0px'}}>
                    <text style={{color: '#a9b3d5', fontWeight: 'bold'}}>Enter current password</text>
                    <input type ='password' className='name email' placeholder='Current password' name="currpass"/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <text style={{color: '#a9b3d5', fontWeight: 'bold'}}>Enter new password</text>
                    <input type ='password' className='name email' placeholder='New password' name="newpass"/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                    <text style={{color: '#a9b3d5', fontWeight: 'bold'}}>Re enter new password</text>
                    <input type ='password' className='name email' placeholder='Repeat password' name="repass"/>
                </div>
            </div>)
        }
        else{
            setLoading(true)
            if(event.target[1].value === event.target[2].value){
                const endpointUrl = new URL(`https://sandbox-api.marqeta.com/v3/users/auth/changepassword`);
                const bodyParameters = JSON.stringify({
                    "current_password": event.target[0].value,
                    "new_password": event.target[1].value,
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
                    setError(<text style={{color: 'green'}}>Your password is successfully changed!</text>)
                }
            }
            else{
                setError(<text style={{color: 'red'}}>New and repeat password don't match!</text>)
            }
            setLoading(false)
            setPasswordButtonText("Change Password")
            setChangePasswordDiv('')
        }
    }
    
    if(data !== null && responseStatus === 200){
        if(data.first_name){fname = data.first_name;}
        if(data.last_name){lname = data.last_name;}
        if(data.birth_date){db = data.birth_date;}
        if(data.phone){phone = data.phone;}
        if(data.address1){address = data.address1;}
        if(data.city){city = data.city;}
        if(data.state){state = data.state;}
        if(data.country){country = data.country;}
        if(data.postal_code){postal_code = data.postal_code;}
        if(data.email){email = data.email}

        if(id === 'info'){
            colorI1 = '#f0f2f4';
            colorI2 = '#3444fc';
            colorI3 = '3px solid #3444fc';
            profileDiv = 
            <div style={{display: 'flex', flexDirection: 'column', margin: '0px 20px'}}>
                <text style={{color: '#48464a', fontWeight: 'bold', fontSize: '22px'}}>Personal Information</text>
                <form id="form1" onSubmit={editDetails}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <div style={{margin: '25px 0px', backgroundColor: '#f0f2f4', border: '2px solid #3444fc', borderRadius:'100%', width: '100px', height: '100px', display: 'inline-flex'}}>
                        <i className='fa fa-user' style={{fontSize: '60px', color: '#3444fc', padding: '19px', paddingLeft: '26px'}}/>
                    </div>
                    <button type='submit' style={{padding: '8px 15px', fontSize: '14px', fontWeight: 'bold', height: '45px', width: '140px', marginTop: '50px', borderRadius: '10px', backgroundColor: '#3444fc', color: 'white', border: '0px'}}>{edit}</button>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <text style={{color: '#a9b3d5', fontWeight: 'bold'}}>Full legal first name</text>
                        <input type ='text' className='name profile' placeholder='First name' name="fname" defaultValue={fname} readOnly={check}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
                        <text style={{color: '#a9b3d5', fontWeight: 'bold'}}>Full legal last name</text>
                        <input type ='text' className='name profile' placeholder='Last name' name="lname" defaultValue={lname} readOnly={check}/>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', margin: '20px 0px'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <text style={{color: '#a9b3d5', fontWeight: 'bold'}}>Date of birth</text>
                        <input type ='text' className='name profile' placeholder="yyyy-mm-dd" name="dbirth" defaultValue={db} readOnly={check}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
                        <text style={{color: '#a9b3d5', fontWeight: 'bold'}}>Phone number</text>
                        <input type='text' id='number' className='name profile' placeholder='+92311111111' defaultValue={phone} readOnly={check}/>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <text style={{color: '#a9b3d5', fontWeight: 'bold'}}>Address</text>
                    <input className='name profile address' placeholder="Address" name="address" defaultValue={address} readOnly={check}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', margin: '20px 0px'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <text style={{color: '#a9b3d5', fontWeight: 'bold'}}>City</text>
                        <input type ='text' className='name profile' placeholder="City" name="city" defaultValue={city} readOnly={check}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
                        <text style={{color: '#a9b3d5', fontWeight: 'bold'}}>State</text>
                        <input type ='text' className='name profile' placeholder='State' name="state" defaultValue={state} readOnly={check}/>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <text style={{color: '#a9b3d5', fontWeight: 'bold'}}>Country</text>
                        <input type ='text' className='name profile' placeholder="Country" name="country" defaultValue={country} readOnly={check}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
                        <text style={{color: '#a9b3d5', fontWeight: 'bold'}}>Postal Code</text>
                        <input type ='text' className='name profile' placeholder='Postal code' name="postal-code" defaultValue={postal_code} readOnly={check}/>
                    </div>
                </div>
                </form>
                <text style={{width: '620px', margin: '20px 0px', marginBottom: '0', fontSize: '14px', color: 'red'}}>{error}</text>
                <Loading open={loading}/>
            </div>
        }
        else if(id === 'settings'){
            colorS1 = '#f0f2f4';
            colorS2 = '#3444fc';
            colorS3 = '3px solid #3444fc';
            profileDiv = 
            <div style={{display: 'flex', flexDirection: 'column', margin: '0px 20px'}}>
                <text style={{color: '#48464a', fontWeight: 'bold', fontSize: '22px'}}>Account Settings</text>
                <div style={{display: 'flex', flexDirection: 'column', margin: '20px 0px'}}>
                    <text style={{color: '#a9b3d5', fontWeight: 'bold', fontSize: '19px'}}>Email Address</text>
                    <input type ='email' className='name email' placeholder='Email address' name="email" value={email} readOnly/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <text style={{color: '#a9b3d5', fontWeight: 'bold', fontSize: '19px'}}>Change Password</text>
                    <form onSubmit={changePassword}>
                        {changePasswordDiv}
                        <button type='submit' style={{padding: '8px 15px', fontSize: '14px', fontWeight: 'bold', margin: '20px 0px', height: '45px', width: '180px', borderRadius: '10px', backgroundColor: '#3444fc', color: 'white', border: '0px'}}>{passwordButtonText}</button>
                    </form>
                </div>
                <text style={{width: '620px', marginBottom: '0', fontSize: '14px', color: 'red'}}>{error}</text>
                <Loading open={loading}/>
            </div>
        }

        return (
            <div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
                <div style={{width: '18%', background: '#f0f2f4', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: '1'}}>
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
                        <text style={{color: '#48464a', fontWeight: '600', fontSize: '25px', padding: '12px 0px'}}>Account Details</text>
                        <a href={`/profile/info?token=${params.get('token')}`} style={{backgroundColor: '#f0f2f4', padding: '5px', paddingRight: '15px', marginTop: '6px', borderRadius: '30px'}}>
                            <i className='fa fa-user' style={{fontSize: '24px', marginRight: '10px', color: '#3444fc', backgroundColor: '#bdc4d1', padding: '10px', borderRadius: '30px'}}/>
                            <text  style={{color: '#48464a', fontWeight: '600', justifyContent: 'center'}}>{data.first_name}</text>
                        </a>
                    </div>
                    <div>
                        <hr style={{border: '1px solid #e2e6ee', margin: '15px 0px'}}/>
                        <div style={{display: 'flex', flexDirection: 'row', height: '100%'}}>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <a href={`/profile/info?token=${params.get('token')}`} style={{padding: '20px', color: '#48464a', backgroundColor: colorI1, borderLeft: colorI3}}>
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <i className='fa fa-user-o' style={{fontSize: '24px', marginRight: '10px', color: colorI2}}/>
                                        <span  style={{display: 'flex', flexDirection: 'column'}}>
                                            <text style={{color: '#48464a', fontSize: '15px', fontWeight: 'bold'}}>Personal Information</text>
                                            <text style={{color: '#a9b3d5', fontSize: '12px'}}>View your details for receiving money</text>
                                        </span>
                                    </div>
                                </a>
                                <a href={`/profile/settings?token=${params.get('token')}`} style={{padding: '20px', color: '#48464a', backgroundColor: colorS1, borderLeft: colorS3}}>
                                    <div  style={{display: 'flex', flexDirection: 'row'}}>
                                        <i className='fa fa-gear' style={{fontSize: '24px', marginRight: '10px', color: colorS2}}/>
                                        <span style={{display: 'flex', flexDirection: 'column'}}>
                                            <text style={{color: '#48464a', fontSize: '15px', fontWeight: 'bold'}}>Account Settings</text>
                                            <text style={{color: '#a9b3d5', fontSize: '12px'}}>View your email and change your password</text>
                                        </span>
                                    </div>
                                </a>
                            </div>
                            <hr style={{border: '1px solid #e2e6ee'}}/>
                            <div>
                                {profileDiv}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return(<Loading2 />)
    }
}

export default Profile
