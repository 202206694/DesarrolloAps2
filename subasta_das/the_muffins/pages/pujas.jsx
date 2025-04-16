import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Pujas = () => {
    const router = useRouter();
    const { id } = router.query;
    const [pujas, setPujas] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPujas = async () => {
            try {
                const response = await fetch(`https://backend-the-muffins.onrender.com/api/subastas/${id}/pujas/`);
                if (!response.ok) throw new Error('Error al obtener las pujas');
                const data = await response.json();
                setPujas(data.results); // 👈 AQUI estaba el fallo
            } catch (error) {
                setError(error.message);
                console.error(error);
            }
        };
        if (id) fetchPujas();
    }, [id]);

    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Pujas de la subasta con ID: {id}</h1>
            {pujas.length > 0 ? (
                <ul>
                    {pujas.map((puja) => (
                        <li key={puja.id}>
                            {puja.bidder}: {puja.amount}€ (Fecha: {new Date(puja.timestamp).toLocaleString()})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay pujas aún.</p>
            )}
        </div>
    );
};

export default Pujas;
