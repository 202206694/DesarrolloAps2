'use client';
import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import styles from './search.module.css'; 
import Link from 'next/link';
import { useRouter } from 'next/router';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const query = router.query.query || '';
    setSearchTerm(query);

    const fetchProducts = async () => {
      if (!query || query.length < 2) {
        setFilteredProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true); // aseguramos que loading se activa al empezar

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/subastas/?search=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error('No se pudo cargar los productos');
        }
        const data = await response.json();

        const results = data.results.filter((product) =>
          product.title?.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredProducts(results);
      } catch (error) {
        console.error('Error cargando productos desde Django:', error);
        setFilteredProducts([]);
      } finally {
        setLoading(false); // loading se desactiva al terminar
      }
    };

    fetchProducts();
  }, [router.query.query]);

  return (
    <>
      <Header/>

      <div className={styles.productsContainer}>
        {loading ? (
          <p className={styles.loadingText}>Cargando productos...</p>
        ) : !searchTerm ? (
          <p className={styles.noResults}>Introduce un término de búsqueda.</p>
        ) : filteredProducts.length === 0 ? (
          <p className={styles.noResults}>
            No se encontraron productos para: "{searchTerm}"
          </p>
        ) : (
          <div className={styles.productosGrid}>
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/productDetail?id=${product.id}`}>
                <div className={styles.producto}>
                  <img
                    src={product.thumbnail || '/images/default.jpg'}
                    alt={product.title}
                    className={styles.productoImg}
                  />
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <p>Precio: {product.price}€</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <footer className={styles.customFooter}>
        <p>
          ¿No encontraste lo que buscas?{' '}
          <span onClick={() => (window.location.href = '/')}>Volver atrás</span>
        </p>
      </footer>
    </>
  );
};

export default SearchPage;
