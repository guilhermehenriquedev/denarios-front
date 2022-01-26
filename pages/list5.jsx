import React, { useState, useEffect } from 'react';
import api from '../config/api.jsx'


export default function Crypto() {

    const [cryptos, setCrypto] = useState([]);

    useEffect(() => {
        async function loadCryptos(){   
            try {
                const response = await api.get('/api/exchanges/list/')
                setCrypto(response.data);   
                console.log(cryptos)   
            } catch(err) {
                console.error(err);
            }   
        };        
        loadCryptos();  
      }, []);

  return (
    <div>
        <h3>teste</h3>
    </div>
  );
}