'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/header';
import styles from './productDetail.module.css';

const ProductDetail = () => {
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState('');
    const [pujas, setPujas] = useState([]);
    const [precioPuja, setPrecioPuja] = useState('');
    const [pujaError, setPujaError] = useState('');
    const [accessToken, setAccessToken] = useState(null);
    const router = useRouter();
    const { id, pujas: showPujas } = router.query;
    const [userRating, setUserRating] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) setAccessToken(token);

        if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/subastas/${id}/`);
                    if (!response.ok) throw new Error("Producto no encontrado");

                    const data = await response.json();
                    setProducto(data);
                } catch (error) {
                    setError(error.message);
                    console.error(error);
                }
            };
            fetchProduct();
        }
    }, [id]);

    useEffect(() => {
        if (id && showPujas) {
            const fetchPujas = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/subastas/${id}/pujas/`);
                    if (!response.ok) throw new Error("No se encontraron pujas");

                    const data = await response.json();
                    setPujas(data.results);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchPujas();
        }
    }, [id, showPujas]);

    const handleSubmitPuja = async (e) => {
        e.preventDefault();
        setPujaError('');

        if (!accessToken) {
            setPujaError("⚠️ Debes iniciar sesión para hacer una puja.");
            return;
        }

        const precioNumerico = parseFloat(precioPuja);
        const ultimaPuja = pujas.length > 0
            ? Math.max(...pujas.map(p => p.amount))
            : producto.price;

        if (isNaN(precioNumerico)) {
            setPujaError("Por favor, introduce un número válido.");
            return;
        }

        if (precioNumerico <= ultimaPuja) {
            setPujaError(`La puja debe ser superior a ${ultimaPuja}€`);
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/subastas/${id}/pujas/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    auction: id,
                    amount: precioNumerico
                }),
            });

            if (response.ok) {
                const newPuja = await response.json();
                setPrecioPuja('');
                setPujas(prev => [...prev, newPuja]);
            } else {
                const errorData = await response.json();
                setPujaError(errorData.detail || "Error al hacer la puja");
            }
        } catch (error) {
            setPujaError("Error de red o del servidor");
            console.error("Error al realizar la puja:", error);
        }
    };
    useEffect(() => {
        const fetchUserRating = async () => {
            if (accessToken && id) {
                const response = await fetch(`http://127.0.0.1:8000/subastas/${id}/rating/`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserRating(data.score);
                }
            }
        };
        fetchUserRating();
    }, [accessToken, id]);
    
    const handleRatingChange = async (e) => {
        const newRating = parseInt(e.target.value);
        if (accessToken) {
            await fetch(`http://127.0.0.1:8000/subastas/${id}/rating/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ score: newRating })
            });
            setUserRating(newRating);
            router.reload(); // recargar para ver la media actualizada
        }
    };
    
    const handleDeleteRating = async () => {
        await fetch(`http://127.0.0.1:8000/subastas/${id}/rating/`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        setUserRating(null);
        router.reload();
    };

    if (error) return <p>{error}</p>;
    if (!producto) return <p>Cargando producto...</p>;

    const ultimaPuja = pujas.length > 0
        ? Math.max(...pujas.map(p => p.amount))
        : producto.price;

    return (
        <div>
            <Header />
            <main>
                <div className={styles.detalleContainer}>
                    {showPujas ? (
                        <div className={styles.pujasContainer}>
                            <h2>Pujas en esta subasta</h2>
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

                            {pujaError && <p style={{ color: 'red' }}>{pujaError}</p>}

                            {accessToken && (
                                <form onSubmit={handleSubmitPuja}>
                                    <label htmlFor="amount">Monto de la puja:</label>
                                    <input
                                        id="amount"
                                        type="number"
                                        value={precioPuja}
                                        onChange={(e) => setPrecioPuja(e.target.value)}
                                        placeholder={`Mínimo: ${ultimaPuja + 1}€`}
                                        required
                                    />
                                    <button type="submit">Hacer puja</button>
                                </form>
                            )}

                            {!accessToken && (
                                <p style={{ color: 'orange' }}>⚠️ Debes iniciar sesión para hacer una puja.</p>
                            )}

                            <button onClick={() => router.push(`/productDetail?id=${id}`)}>Volver a detalles</button>
                        </div>
                    ) : (
                        <div>
                            <div className={styles.productoImagenContainer}>
                                <img src={producto.thumbnail} alt={producto.title} />
                            </div>
                            <div className={styles.detalleInfo}>
                                <h1>{producto.title}</h1>
                                <p>{producto.description}</p>
                                <p><strong>Precio inicial:</strong> {producto.price} €</p>
                                <p><strong>Fecha de creación:</strong> {new Date(producto.creation_date).toLocaleDateString()}</p>
                                <p><strong>Finaliza:</strong> {new Date(producto.closing_date).toLocaleDateString()}</p>
                                <p><strong>Stock:</strong> {producto.stock}</p>
                                <p><strong>Marca:</strong> {producto.brand}</p>
                                <p><strong>Categoría ID:</strong> {producto.category}</p>


                                <p><strong>Valoración media:</strong> {producto.average_rating}</p>

                                {accessToken && (
                                    <div>
                                        <label>Tu puntuación:</label>
                                        <select value={userRating || ''} onChange={handleRatingChange}>
                                            <option value="">Selecciona</option>
                                            {[1, 2, 3, 4, 5].map(n => (
                                                <option key={n} value={n}>{n}</option>
                                            ))}
                                        </select>
                                        {userRating && (
                                            <button onClick={handleDeleteRating}>
                                                Eliminar puntuación
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            <button
                                className={styles.pujarBtn}
                                onClick={() => router.push(`/productDetail?id=${id}&pujas=true`)}
                            >
                                Ver pujas
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProductDetail;
