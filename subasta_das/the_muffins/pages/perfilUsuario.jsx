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
    const [mostrarSubastas, setMostrarSubastas] = useState(false);
    const [mostrarPujas, setMostrarPujas] = useState(false);
    const [mensajeSubastas, setMensajeSubastas] = useState('');
    const [mensajePujas, setMensajePujas] = useState('');

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

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
                const res = await fetch('https://backend-the-muffins.onrender.com/api/users/profile/', {
                    headers: { Authorization: `Bearer ${storedAccessToken}` },
                });
                const data = await res.json();
                if (res.ok) {
                    setProfile(data);
                } else {
                    throw new Error(data.message || 'Error al obtener el perfil');
                }
            } catch (err) {
                setError('⚠ Error al cargar el perfil.');
                console.error(err);
            }
        };

        fetchProfile();
    }, []);

    const handleVerSubastas = async () => {
        if (mostrarSubastas) return setMostrarSubastas(false);

        try {
            const res = await fetch('https://backend-the-muffins.onrender.com/api/users/misSubastas/', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const data = await res.json();
            if (res.ok && data.length > 0) {
                setSubastas(data);
                setMensajeSubastas('');
            } else {
                setSubastas([]);
                setMensajeSubastas('Todavía no has realizado ninguna subasta.');
            }
            setMostrarSubastas(true);
            setMostrarPujas(false);
        } catch (err) {
            console.error(err);
            setMensajeSubastas('Error al cargar tus subastas.');
        }
    };

    const handleVerPujas = async () => {
        if (mostrarPujas) return setMostrarPujas(false);

        try {
            const res = await fetch('https://backend-the-muffins.onrender.com/api/users/misPujas/', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const data = await res.json();
            if (res.ok && data.length > 0) {
                setPujas(data);
                setMensajePujas('');
            } else {
                setPujas([]);
                setMensajePujas('Todavía no has realizado ninguna puja.');
            }
            setMostrarPujas(true);
            setMostrarSubastas(false);
        } catch (err) {
            console.error(err);
            setMensajePujas('Error al cargar tus pujas.');
        }
    };

    const editarSubasta = async (id, nuevosDatos) => {
        try {
            const res = await fetch(`https://backend-the-muffins.onrender.com/subastas/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(nuevosDatos),
            });
            if (!res.ok) throw new Error('Error al editar subasta');
            alert('✅ Subasta actualizada');
        } catch (err) {
            alert('❌ No se pudo actualizar la subasta');
            console.error(err);
        }
    };

    const eliminarSubasta = async (id) => {
        try {
            const res = await fetch(`https://backend-the-muffins.onrender.com/subastas/${id}/`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (res.ok) {
                setSubastas(prev => prev.filter(s => s.id !== id));
                alert('✅ Subasta eliminada');
            } else {
                throw new Error('Error al eliminar subasta');
            }
        } catch (err) {
            alert('❌ No se pudo eliminar la subasta');
            console.error(err);
        }
    };

    const editarPuja = async (auctionId, bidId, nuevoMonto) => {
        try {
            const res = await fetch(`https://backend-the-muffins.onrender.com/subastas/${auctionId}/pujas/${bidId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ amount: parseFloat(nuevoMonto) }), 
            });
            if (!res.ok) throw new Error('Error al editar puja');
            alert('✅ Puja actualizada');
        } catch (err) {
            alert('❌ No se pudo actualizar la puja');
            console.error(err);
        }
    };

    const eliminarPuja = async (auctionId, bidId) => {
        try {
            const res = await fetch(`https://backend-the-muffins.onrender.com/subastas/${auctionId}/pujas/${bidId}/`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (res.ok) {
                setPujas(prev => prev.filter(p => p.id !== bidId));
                alert('✅ Puja eliminada');
            } else {
                throw new Error('Error al eliminar puja');
            }
        } catch (err) {
            alert('❌ No se pudo eliminar la puja');
            console.error(err);
        }
    };

    const handleLogout = async () => {
        try {
            const res = await fetch('https://backend-the-muffins.onrender.com/api/users/log-out/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (res.ok || res.status === 205) {
                localStorage.clear();
                window.location.href = '/login';
            } else {
                const errorData = await res.json();
                setError(errorData.detail || 'Error al cerrar sesión.');
            }
        } catch (err) {
            console.error(err);
            setError('Error al cerrar sesión.');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            setPasswordError('Por favor, completa todos los campos de contraseña.');
            setPasswordSuccess('');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setPasswordError('Las nuevas contraseñas no coinciden.');
            setPasswordSuccess('');
            return;
        }

        try {
            const response = await fetch('https://backend-the-muffins.onrender.com/api/users/change-password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    old_password: oldPassword,
                    new_password: newPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setPasswordSuccess('✅ Contraseña actualizada correctamente.');
                setPasswordError('');
                setOldPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            } else {
                setPasswordError(data.detail || 'Error al cambiar la contraseña.');
                setPasswordSuccess('');
            }
        } catch (err) {
            console.error(err);
            setPasswordError('Error al cambiar la contraseña.');
            setPasswordSuccess('');
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

                        {mostrarSubastas && (
                            <div className={styles.listado}>
                                {mensajeSubastas ? (
                                    <p>{mensajeSubastas}</p>
                                ) : (
                                    <>
                                        <h3>Mis subastas:</h3>
                                        <ul className={styles.productList}>
                                            {subastas.map((s) => (
                                                <li key={s.id} className={styles.productItem}>
                                                    <img src={s.thumbnail} alt={s.title} className={styles.productImage} />
                                                    <div>
                                                        <strong>{s.title}</strong>
                                                        <p>{s.price} €</p>
                                                        <button onClick={() => editarSubasta(s.id, s)}>Editar</button>
                                                        <button onClick={() => eliminarSubasta(s.id)}>Eliminar</button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        )}

                        {mostrarPujas && (
                            <div className={styles.listado}>
                                {mensajePujas ? (
                                    <p>{mensajePujas}</p>
                                ) : (
                                    <>
                                        <h3>Mis pujas:</h3>
                                        <ul className={styles.productList}>
                                            {pujas.map((p) => (
                                                <li key={p.id} className={styles.productItem}>
                                                    <p><strong>{p.amount} €</strong> en subasta ID {p.auction}</p>
                                                    <span>{new Date(p.timestamp).toLocaleString()}</span>
                                                    <button onClick={() => editarPuja(p.auction, p.id, prompt("Nuevo monto:"))}>Editar puja</button>
                                                    <button onClick={() => eliminarPuja(p.auction, p.id)}>Eliminar puja</button>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        )}

                        <div className={styles.passwordSection}>
                            <h3>Cambiar contraseña</h3>
                            <form onSubmit={handleChangePassword} className={styles.passwordForm}>
                                <input type="password" placeholder="Contraseña actual" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                                <input type="password" placeholder="Nueva contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                                <input type="password" placeholder="Confirmar nueva contraseña" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required />
                                {passwordError && <p className={styles.error}>{passwordError}</p>}
                                {passwordSuccess && <p className={styles.success}>{passwordSuccess}</p>}
                                <button type="submit" className={styles.customButton}>Actualizar contraseña</button>
                            </form>
                        </div>
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
