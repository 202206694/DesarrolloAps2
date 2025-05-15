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
    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState({ title: '', body: '' });
    const [comentarioEditado, setComentarioEditado] = useState(null); 


    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) setAccessToken(token);

        if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await fetch(`https://backend-the-muffins.onrender.com/subastas/${id}/`);
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
                    const response = await fetch(`https://backend-the-muffins.onrender.com/subastas/${id}/pujas/`);
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
            const response = await fetch(`https://backend-the-muffins.onrender.com/subastas/${id}/pujas/`, {
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
                const response = await fetch(`https://backend-the-muffins.onrender.com/subastas/${id}/rating/`, {
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
            const response = await fetch(`https://backend-the-muffins.onrender.com/subastas/${id}/rating/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ score: newRating })
            });

            if (response.ok) {
                const data = await response.json();
                setUserRating(data.score);
                setProducto(prev => ({
                    ...prev,
                    average_rating: data.average_rating
                }));
            }
        }
    };

    
    const handleDeleteRating = async () => {
        await fetch(`https://backend-the-muffins.onrender.com/subastas/${id}/rating/`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        setUserRating(null);
        router.reload();
    };

    useEffect(() => {
        if (id) {
            const fetchComentarios = async () => {
                try {
                    const response = await fetch(`https://backend-the-muffins.onrender.com/subastas/${id}/comentarios/`);
                    if (response.ok) {
                        const data = await response.json();
                        setComentarios(Array.isArray(data) ? data : data.results || []);

                    }
                } catch (error) {
                    console.error("Error al cargar comentarios:", error);
                }
            };
            fetchComentarios();
        }
    }, [id]);
    
    const handleChangeComentario = (e) => {
        setNuevoComentario({ ...nuevoComentario, [e.target.name]: e.target.value });
    };
    
    const handleSubmitComentario = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://backend-the-muffins.onrender.com/subastas/${id}/comentarios/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(nuevoComentario)
            });
            if (response.ok) {
                setNuevoComentario({ title: '', body: '' });
                const nuevo = await response.json();
                setComentarios([nuevo, ...comentarios]);
            }
        } catch (error) {
            console.error("Error al enviar comentario:", error);
        }
    };
    
    const handleEditarComentario = (comentario) => {
        setComentarioEditado(comentario);
    };
    
    const handleGuardarEdicion = async () => {
        try {
            const response = await fetch(`https://backend-the-muffins.onrender.com/subastas/comentarios/${comentarioEditado.id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(comentarioEditado)
            });
            if (response.ok) {
                const actualizado = await response.json();
                setComentarios(comentarios.map(c => c.id === actualizado.id ? actualizado : c));
                setComentarioEditado(null);
            }
        } catch (error) {
            console.error("Error al editar comentario:", error);
        }
    };
    
    const handleEliminarComentario = async (idComentario) => {
        try {
            await fetch(`https://backend-the-muffins.onrender.com/comentarios/${idComentario}/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setComentarios(comentarios.filter(c => c.id !== idComentario));
        } catch (error) {
            console.error("Error al eliminar comentario:", error);
        }
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

                                 <p><strong>Valoración media:</strong> {producto.average_rating}</p>

                                {accessToken && (
                                    <div className={styles.ratingSection}>
                                        <p><strong>Tu puntuación:</strong></p>
                                        <div className={styles.ratingControls}>
                                            <select value={userRating || ''} onChange={handleRatingChange}>
                                                <option value="">Selecciona una puntuación</option>
                                                {[1, 2, 3, 4, 5].map(n => (
                                                    <option key={n} value={n}>{'⭐'.repeat(n)}</option>
                                                ))}
                                            </select>

                                            {userRating !== null && userRating !== undefined && (
                                                <button onClick={handleDeleteRating} className={styles.deleteRatingBtn}>
                                                    Eliminar puntuación
                                                </button>
                                            )}

                                        </div>
                                    </div>
                                )}

                            </div>

                            <button
                                className={styles.pujarBtn}
                                onClick={() => router.push(`/productDetail?id=${id}&pujas=true`)}
                            >
                                Ver pujas
                            </button>

                            <div className={styles.comentariosContainer}>
                            <h2>Comentarios</h2>

                            {comentarios.length === 0 && <p>No hay comentarios aún.</p>}

                            {comentarios.map(c => (
                                <div key={c.id} className={styles.comentarioBox}>
                                    {comentarioEditado?.id === c.id ? (
                                        <>
                                            <input
                                                type="text"
                                                value={comentarioEditado.title}
                                                onChange={(e) => setComentarioEditado({ ...comentarioEditado, title: e.target.value })}
                                            />
                                            <textarea
                                                value={comentarioEditado.body}
                                                onChange={(e) => setComentarioEditado({ ...comentarioEditado, body: e.target.value })}
                                            />
                                            <button onClick={handleGuardarEdicion}>Guardar</button>
                                            <button onClick={() => setComentarioEditado(null)}>Cancelar</button>
                                        </>
                                    ) : (
                                        <>
                                            <h4>{c.title}</h4>
                                            <p>{c.body}</p>
                                            <p><em>{c.user}</em> - {new Date(c.created_at).toLocaleString()}</p>
                                            {accessToken && c.user === localStorage.getItem("username") && (
                                                <>
                                                    <button onClick={() => handleEditarComentario(c)}>Editar</button>
                                                    <button onClick={() => handleEliminarComentario(c.id)}>Eliminar</button>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            ))}

                            {accessToken && (
                                <form onSubmit={handleSubmitComentario}>
                                    <h3>Escribir un comentario</h3>
                                    <input
                                        type="text"
                                        name="title"
                                        value={nuevoComentario.title}
                                        onChange={handleChangeComentario}
                                        placeholder="Título"
                                        required
                                    />
                                    <textarea
                                        name="body"
                                        value={nuevoComentario.body}
                                        onChange={handleChangeComentario}
                                        placeholder="Escribe tu comentario..."
                                        required
                                    />
                                    <button type="submit">Publicar comentario</button>
                                </form>
                            )}
                        </div>

                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProductDetail;
