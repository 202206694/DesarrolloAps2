'use client';
import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from './products.module.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const Products = () => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // 🔹 Estado para control de carga

    const searchParams = useSearchParams();
    const categoria = searchParams.get("categoria");

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/subastas/categorias/');
                if (!response.ok) throw new Error('Error al obtener las categorías');
                const data = await response.json();
                setCategorias(data.results);
            } catch (e) {
                setError('Error al cargar las categorías desde el backend');
                console.error(e);
            }
        };

        fetchCategorias();
    }, []);

    useEffect(() => {
        const fetchAllPages = async () => {
            setLoading(true); // 🔹 Comienza la carga

            try {
                let categoriaId = null;

                if (categoria && categorias.length > 0) {
                    const categoriaEncontrada = categorias.find(cat =>
                        cat.name.toLowerCase() === categoria.toLowerCase()
                    );
                    categoriaId = categoriaEncontrada?.id;
                }

                const baseUrl = typeof categoriaId === 'number'
                    ? `http://127.0.0.1:8000/api/subastas/?categoria=${categoriaId}`
                    : `http://127.0.0.1:8000/api/subastas/`;

                let allResults = [];
                let nextUrl = baseUrl;

                while (nextUrl) {
                    const response = await fetch(nextUrl);
                    if (!response.ok) throw new Error("Error al conectar con el backend");

                    const data = await response.json();
                    allResults = [...allResults, ...data.results];
                    nextUrl = data.next;
                }

                setProductos(allResults);
            } catch (e) {
                setError('Error al cargar las subastas desde el backend');
                console.error(e);
            } finally {
                setLoading(false); // 🔹 Finaliza la carga (éxito o error)
            }
        };

        if (categorias.length > 0) {
            fetchAllPages();
        }
    }, [categoria, categorias]);

    return (
        <div>
            <Header />
            <main>
                {loading ? (
                    <p className={styles.loadingMessage}>Cargando productos...</p>
                ) : (
                    <div className={styles.productosGrid}>
                        {error ? (
                            <p>{error}</p>
                        ) : (
                            productos.map((producto) => (
                                <Link key={producto.id} href={`/productDetail?id=${producto.id}`} passHref>
                                    <div className={styles.productoCard}>
                                        <img src={producto.thumbnail} alt={producto.title} />
                                        <p className={styles.productoNombre}>{producto.title}</p>
                                        <p>Precio actual: {producto.price} €</p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Products;
