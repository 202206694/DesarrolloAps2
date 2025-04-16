'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      setIsAuthenticated(!!token);
    }
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSearchModal = () => setSearchModalOpen(!searchModalOpen);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(searchTerm)}`;
      setSearchModalOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <button className={styles.menuIcon} onClick={toggleMenu}>☰ Menú</button>
        </div>

        <div className={styles.navCenter}>
          <Link href="/" passHref>
            <img src="/images/logo2.png" alt="Logo de la joyería" className={styles.logo} />
          </Link>
        </div>

        <div className={styles.navRight}>
          <div className={styles.searchContainer}>
            <span className={styles.searchIcon} onClick={toggleSearchModal}>🔍</span>
            {searchModalOpen && (
              <div className={styles.searchModal}>
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <button type="submit" className={styles.searchBtn}>🔎</button>
                  <button type="button" className={styles.closeBtn} onClick={toggleSearchModal}>✕</button>
                </form>
              </div>
            )}
          </div>

          <div className={styles.navList}>
            {!isAuthenticated ? (
              <>
                <Link href="/login" passHref>
                  <button className={styles.navItem}>Iniciar Sesión</button>
                </Link>
                <Link href="/registro" passHref>
                  <button className={styles.navItem}>Registrarse</button>
                </Link>
              </>
            ) : (
              <Link href="/perfilUsuario" passHref>
                <button className={styles.navItem}>Mi Perfil</button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className={`${styles.sideMenu} ${menuOpen ? styles.open : ''}`}>
          <div className={styles.menuContent}>
            <button className={styles.closeBtn} onClick={toggleMenu}>✕</button>

            <h2>COLECCIONES</h2>
            <div>
              <Link href="/products"><button>Todo</button></Link>
              <Link href="/products?categoria=anillos"><button>Anillos</button></Link>
              <Link href="/products?categoria=collares"><button>Collares</button></Link>
              <Link href="/products?categoria=pulseras"><button>Pulseras</button></Link>
              <Link href="/products?categoria=pendientes"><button>Pendientes</button></Link>
              <Link href="/products?categoria=relojes"><button>Relojes</button></Link>
              <Link href="/createauction"><button className={styles.navItem}>Crear Subasta</button></Link>
            </div>

            <h2>FILTRAR POR PRECIO</h2>
            <div>
            <Link href="/products?price_range=under_100"><button>Menos de 100 €</button></Link>
            <Link href="/products?price_range=between_100_1000"><button>100 € - 1000 €</button></Link>
            <Link href="/products?price_range=over_1000"><button>Más de 1000 €</button></Link>

            </div>

          </div>
        </div>
      )}
    </header>
  );
}
