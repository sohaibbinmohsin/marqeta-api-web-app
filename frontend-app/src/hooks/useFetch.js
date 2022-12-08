import { useState, useEffect } from "react"

const useFetch = (url,optionsStr) => {

    const [data,setData] = useState(null);
    const [responseStatus, setStatus] = useState(0);
    
    useEffect(() => {
        let success = true;

        const fetchData = async () => {

            try {
                const options = JSON.parse(optionsStr);

                const proxyOptions = {
                method: options.method,
                };
                const proxyParams = new URLSearchParams({
                apiURL: url,
                apiOptions: optionsStr,
                });
                const proxyUrl = `http://localhost:3000/?${proxyParams}`;
                const response = await fetch(proxyUrl, proxyOptions);

                setStatus(response.status);
                const content = await response.json();
                if (!response.ok) {
                    throw new Error(
                        `${content.error_code} ${content.error_message}`
                    );
                }

                if(success){
                    setData(content);
                }   
            }
            catch(err) {
                setData(err);
                console.log('Error: ', err)
            }
          };
      
        fetchData();
       
        return () => {
            success = false;
            console.log('unmount');
        };
    
      }, [url, optionsStr]);

    return {data,responseStatus};
    
};

export default useFetch;