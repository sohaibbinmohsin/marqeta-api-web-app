import React, { useEffect, useState } from 'react';

const Loading = () => {
    const [displayText, setDisplayText] = useState('');
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    useEffect(() =>{
        const type = async() => {
            let display = '...';
            for(let j = 0; j < display.length; j++){
                setDisplayText(display.substring(0, j+1))
                await sleep(500);
            }
            setDisplayText('')
            type()
        }
        type()
    }, [])
    return(
        <>
            <div style={{position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: '1000'}} />
            <div style={{position: 'fixed', top: '50%', left: '50%', transform:'translate(-50%, -50%)', backgroundColor: 'transparent', padding: '20px', zIndex: '1000', borderRadius: '10px', display: 'flex', flexDirection: 'column'}}>
                <text style={{color: 'white', fontSize: '40px', fontWeight: 'bold'}}>Loading{displayText}</text>
            </div>
            
        </>
    )
}

export default Loading
