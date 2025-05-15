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
    const [mensajeVacio, setMensajeVacio] = useState('');
    const [fetchRangos, setFetchRangos] = useState('');
    const searchParams = useSearchParams();
    const categoria = searchParams.get("categoria");
    const priceRange = searchParams.get("price_range");

    useEffect(() => {
        if (priceRange === 'under_100') {
            setFetchRangos('?price_min=1&price_max=100');
        } else if (priceRange === 'between_100_1000') {
            setFetchRangos('?price_min=101&price_max=1000');
        } else if (priceRange === 'over_1000') {
            setFetchRangos('?price_min=1001&price_max=9999');
        } else {
            setFetchRangos('');
        }
    }, [priceRange]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/subastas/categorias/');
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
        const fetchProductos = async () => {
            try {
                let categoriaId = null;

                if (categoria && categorias.length > 0) {
                    const categoriaEncontrada = categorias.find(cat => 
                        cat.name.toLowerCase() === categoria.toLowerCase()
                    );
                    categoriaId = categoriaEncontrada?.id;
                }

                let queryParams = [];
                if (typeof categoriaId === 'number') queryParams.push(`category=${categoriaId}`);
                if (fetchRangos) queryParams.push(fetchRangos.replace('?', ''));

                const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
                const baseUrl = `http://127.0.0.1:8000/subastas/${queryString}`;

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
                setMensajeVacio(allResults.length === 0 ? 'No hay productos con los filtros seleccionados.' : '');
            } catch (e) {
                setError('Error al cargar las subastas desde el backend');
                console.error(e);
            }
        };

        if (categorias.length > 0) {
            fetchProductos();
        }
    }, [categoria, categorias, fetchRangos]);

    return (
        <div>
            <Header />
            <main>
                <div className={styles.productosGrid}>
                    {error ? (
                        <p>{error}</p>
                    ) : mensajeVacio ? (
                        <p>{mensajeVacio}</p>
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
            </main>
            <Footer />
        </div>
    );
};

export default Products;