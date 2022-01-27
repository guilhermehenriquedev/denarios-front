import React, { useState, useEffect } from "react";
import api from "@/config/api.jsx";


export default function Crypto() {
    const [cryptos, setCrypto] = useState([]);

    useEffect(() => {
        async function loadCryptos() {
            try {
                const response = await api.get("/exchanges/list/");
                setCrypto(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        loadCryptos();
    }, []);

    if (cryptos.length == 0) {
        return null;
    }

    return (
        <div>
            <div>
                {cryptos.data.map(item => (
                    <div key={item.no_cripto}>
                        <h2>{item.no_cripto}</h2>
                        <span>{item.vl_compra}</span>
                        <span>{item.vl_venda}</span>
                    </div>
                ))};
            </div>
        </div>
    );
}