'use client';
import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from './perfilUsuario.module.css';

const PerfilUsuario = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [subastas, setSubastas] = useState([]);
    const [pujas, setPujas] = useState([]);
    const [mensajeSubastas, setMensajeSubastas] = useState('');
    const [mensajePujas, setMensajePujas] = useState('');

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');

        if (!storedAccessToken || !storedRefreshToken) {
            setError('⚠ Debes iniciar sesión para ver tu perfil.');
            return;
        }

        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);

        const fetchProfile = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/users/profile/', {
                    headers: { 'Authorization': `Bearer ${storedAccessToken}` }
                });
                const data = await response.json();

                if (response.ok) {
                    setProfile(data);
                } else {
                    throw new Error(data.message || 'Error al obtener el perfil');
                }
            } catch (error) {
                setError('⚠ Error al cargar el perfil.');
                console.error(error);
            }
        };

        fetchProfile();
    }, []);

    const handleVerSubastas = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/users/misSubastas/', {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            const data = await res.json();

            if (res.ok && data.length > 0) {
                setSubastas(data);
                setMensajeSubastas('');
            } else {
                setSubastas([]);
                setMensajeSubastas('Todavía no has realizado ninguna subasta.');
            }
        } catch (err) {
            console.error(err);
            setMensajeSubastas('Error al cargar tus subastas.');
        }
    };

    const handleVerPujas = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/users/misPujas/', {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            const data = await res.json();

            if (res.ok && data.length > 0) {
                setPujas(data);
                setMensajePujas('');
            } else {
                setPujas([]);
                setMensajePujas('Todavía no has realizado ninguna puja.');
            }
        } catch (err) {
            console.error(err);
            setMensajePujas('Error al cargar tus pujas.');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/log-out/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}` // 🔥 este es el que faltaba
                },
                body: JSON.stringify({ refresh: refreshToken })
            });
    
            if (response.ok || response.status === 205) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
                window.location.href = '/login';
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'Error al cerrar sesión.');
            }
        } catch (err) {
            console.error(err);
            setError('Error al cerrar sesión.');
        }
    };
    

    return (
        <>
            <Header />
            <div className={styles.container}>
                {error ? (
                    <p className={styles.error}>{error}</p>
                ) : profile ? (
                    <>
                        <h1 className={styles.title}>{profile.first_name} {profile.last_name}</h1>
                        <p className={styles.info}>Email: {profile.email}</p>
                        <p className={styles.info}>Localidad: {profile.locality}</p>
                        <p className={styles.info}>Municipio: {profile.municipality}</p>

                        <div className={styles.buttonGroup}>
                            <button className={styles.customButton} onClick={handleVerSubastas}>Ver mis subastas</button>
                            <button className={styles.customButton} onClick={handleVerPujas}>Ver mis pujas</button>
                            <button className={styles.logoutButton} onClick={handleLogout}>Cerrar sesión</button>
                        </div>

                        {mensajeSubastas && <p>{mensajeSubastas}</p>}
                        {subastas.length > 0 && (
                            <div>
                                <h3>Mis subastas:</h3>
                                <ul>
                                    {subastas.map((subasta) => (
                                        <li key={subasta.id}>{subasta.title} - {subasta.price}€</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {mensajePujas && <p>{mensajePujas}</p>}
                        {pujas.length > 0 && (
                            <div>
                                <h3>Mis pujas:</h3>
                                <ul>
                                    {pujas.map((puja) => (
                                        <li key={puja.id}>Pujado: {puja.amount}€ en subasta ID {puja.auction}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                ) : (
                    <p className={styles.loading}>Cargando perfil...</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default PerfilUsuario;
