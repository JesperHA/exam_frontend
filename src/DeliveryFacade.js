


const DeliveryFacade = () => {

   

    const setToken = (token) => {
        localStorage.setItem('jwtToken', token)
    };
    const getToken = () => {
        return localStorage.getItem('jwtToken')
    };
    
    const getDeliveries = () => {
        const url = 'https://lamseben.dk/exam-prep/api/deliveries/all'
        return fetch(url)
        .then(res=>{return res.json()})};


        const getTrucks = () => {
            const url = 'https://lamseben.dk/exam-prep/api/trucks/all'
            return fetch(url)
            .then(res=>{return res.json()})};
        
    
        const searchTrucks = (truckId) => {
            const options = makeOptions("GET", false)
            const url = 'https://lamseben.dk/exam-prep/api/trucks/search/'
            return fetch(url + truckId, options)
            .then(res=>{return res.json()})};
            
            
        const searchByDate = (date) => {
            const options = makeOptions("GET", false)
            const url = 'https://lamseben.dk/exam-prep/api/trucks/searchAvailableTrucks/'
            return fetch(url + date, options)
            .then(res=>{return res.json()})};
            
    
            
            const makeOptions = (method, addToken, body) => {
                var opts = {
                    method: method,
                    headers: {
                        "Content-type": "application/json",
                        'Accept': 'application/json',
                    }
                };

                if (body) {
                    opts.body = JSON.stringify(body);
                }
                return opts;
            }
        

  
    
            return {
                makeOptions,
                setToken,
                getToken,
                getDeliveries,
                getTrucks,
                searchTrucks,
                searchByDate
            }

}


export default DeliveryFacade();