'use client';
import React, { useState } from 'react';
import styles from './login.module.css';
import Link from 'next/link';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const login = async (username, password) => {
        setLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('refreshToken', data.refresh);
                localStorage.setItem('username', data.username);

                alert('✅ Has entrado a tu cuenta correctamente.');
                window.location.href = '/perfilUsuario';
            } else {
                throw new Error(data.detail || 'Credenciales incorrectas');
            }
        } catch (error) {
            alert('❌ Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        login(username, password);
    };

    return (
        <>
            <header className={styles.header}>
                <nav className={styles.navCenter}>
                    <img 
                        src="/images/logo2.png" 
                        alt="Logo de la joyería" 
                        className={styles.logo} 
                        onClick={() => (window.location.href = '/')}
                    />
                </nav>
            </header>

            <div className={styles.pageContainer}>
                <div className={styles.loginContainer}>
                    <h2>Iniciar sesión en Jewelbay</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="usuario">Usuario</label>
                        <input 
                            type="text" 
                            id="usuario" 
                            name="usuario" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="Introduce tu usuario" 
                            required 
                            className={styles.input} 
                        />

                        <label htmlFor="contrasena">Contraseña</label>
                        <input 
                            type="password" 
                            id="contrasena" 
                            name="contrasena" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Introduce tu contraseña" 
                            required 
                            className={styles.input} 
                        />

                        <button type="submit" className={styles.btnPrimary} disabled={loading}>
                            {loading ? 'Cargando...' : 'Iniciar sesión'}
                        </button>
                    </form>

                    <p className={styles.divider}>o continúa con</p>
                    <div className={styles.socialLogin}>
                        <button className={`${styles.btnSocial} ${styles.google}`}>🔍 Google</button>
                        <button className={`${styles.btnSocial} ${styles.facebook}`}>📘 Facebook</button>
                        <button className={`${styles.btnSocial} ${styles.apple}`}>🍏 Apple</button>
                    </div>

                    <button className={styles.btnBack} onClick={() => (window.location.href = '/')}>
                        ⬅ Volver atrás
                    </button>
                </div>
            </div>

            <footer className={styles.customFooter}>
                <p>¿No tienes cuenta? <Link href="/registro"><span>Registrarse</span></Link></p>
            </footer>
        </>
    );
};

export default Login;
