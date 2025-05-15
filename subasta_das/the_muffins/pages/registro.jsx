'use client'
import React, { useState } from 'react';
import styles from './registro.module.css';
import Link from 'next/link';

const Registro = () => {
    const [dni, setDni] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formError, setFormError] = useState('');
    const [comunidad, setComunidad] = useState(''); 
    const [ciudad, setCiudad] = useState('');

    const comunidades = {
        "Andalucía": ["Sevilla", "Málaga"],
        "Cataluña": ["Barcelona", "Tarragona"],
        "Madrid": ["Madrid", "Alcalá de Henares"],
  
    };

    const handleComunidadChange = (e) => {
        setComunidad(e.target.value);
        setCiudad(comunidades[e.target.value][0]); 
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        validatePasswords(password, e.target.value);
    };

    const validatePasswords = (pass1, pass2) => {
        if (pass1 && pass2 && pass1 !== pass2) {
            setPasswordError("Las contraseñas no coinciden.");
        } else {
            setPasswordError('');
        }
    };

    const validateForm = () => {
        if (!dni || !name || !surname || !birthdate || !email || !username || !password || !confirmPassword || !comunidad || !ciudad) {
            setFormError('Por favor, completa todos los campos.');
            return false;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            setFormError('El correo electrónico no es válido.');
            return false;
        }

        if (password.length < 8) {
            setFormError('La contraseña debe tener al menos 8 caracteres.');
            return false;
        }

        if (password !== confirmPassword) {
            setFormError('Las contraseñas no coinciden.');
            return false;
        }

        setFormError('');
        return true;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
            return;
        }
    
        const userData = {
            username,
            first_name: name,
            last_name: surname,
            email,
            birth_date: birthdate,
            municipality: ciudad,
            locality: comunidad,
            password
        };
    
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
    
            const data = await response.json();
            console.log("Respuesta del servidor:", data);
    
            if (response.ok) {
                // Guardar los tokens en localStorage
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('refreshToken', data.refresh);
                localStorage.setItem('user', JSON.stringify(data.user));
    
                // Redirigir al usuario o mostrar mensaje de éxito
                window.location.href = '/products'; // o la ruta que prefieras
            } else {
                setFormError('Error al registrar usuario: ' + JSON.stringify(data));
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            setFormError('Hubo un problema al intentar registrar el usuario.');
        }
    };
    

    return (
        <div>
            <header>
                <nav>
                    <div className={styles.navCenter}>
                        <img src="/images/logo2.png" alt="Logo de la joyería" className={styles.logo} onClick={() => window.location.href = '/'}/>
                    </div>
                </nav>
            </header>
            <div className={styles.formContainer}>
                <main>
                    <form onSubmit={handleRegister}>
                        <h2>Crear Cuenta</h2>
                        {formError && <div className={styles.error}>{formError}</div>}

                        <label htmlFor="dni">DNI:</label>
                        <input type="text" id="dni" name="dni" placeholder="12345678X" required pattern="[0-9]{8}[A-Za-z]{1}" title="Debe ser un DNI válido con 8 números y una letra" className={styles.customInput} onChange={e => setDni(e.target.value)} />

                        <label htmlFor="name">Nombre:</label>
                        <input type="text" id="name" name="name" placeholder="Nombre" required className={styles.customInput} onChange={e => setName(e.target.value)} />

                        <label htmlFor="surname">Apellidos:</label>
                        <input type="text" id="surname" name="surname" placeholder="Apellidos" required className={styles.customInput} onChange={e => setSurname(e.target.value)} />

                        <label htmlFor="birthdate">Fecha de nacimiento:</label>
                        <input type="date" id="birthdate" name="birthdate" required className={styles.customInput} onChange={e => setBirthdate(e.target.value)} />

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="Email" required className={styles.customInput} onChange={e => setEmail(e.target.value)} />

                        <label htmlFor="username">Nombre de usuario:</label>
                        <input type="text" id="username" name="username" placeholder="Usuario" required className={styles.customInput} onChange={e => setUsername(e.target.value)} />

                        <label htmlFor="comunidad">Comunidad Autónoma:</label>
                        <select id="comunidad" value={comunidad} onChange={handleComunidadChange} className={styles.customSelect}>
                            <option value="">Selecciona una comunidad</option>
                            {Object.keys(comunidades).map(key => (
                                <option key={key} value={key}>{key}</option>
                            ))}
                        </select>

                        <label htmlFor="ciudad">Ciudad:</label>
                        <select id="ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} className={styles.customSelect}>
                            <option value="">Selecciona una ciudad</option>
                            {comunidad ? comunidades[comunidad].map(city => (
                                <option key={city} value={city}>{city}</option>
                            )) : null}
                        </select>

                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" name="password" placeholder="Contraseña" minLength="8" required className={styles.customInput} onChange={e => setPassword(e.target.value)} />

                        <label htmlFor="confirm_password">Confirmar contraseña:</label>
                        <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirmar contraseña" required className={styles.customInput} onChange={handleConfirmPasswordChange} />
                        {passwordError && <div className={styles.error}>{passwordError}</div>}

                        <button type="submit" className={styles.customButton}>Crear cuenta</button>
                        <button type="reset" className={styles.customButton}>Reset</button>
                        <button className={styles.btnBack} onClick={() => window.history.back()}>⬅ Volver atrás</button>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default Registro;
