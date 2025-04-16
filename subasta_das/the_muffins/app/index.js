// pages/index.js

import styles from './index.module.css';

export default function Home() {
  return (
      <main>
        <section className={styles.hero}>
          <div className={styles.overlay}>
            <h1>Día de San Valentín</h1>
            <p>Regalos de conexión tan especiales como su amor: celebre los vínculos más importantes de su vida.</p>
          </div>
        </section>
        <section className={styles.gallery}>
          <div className={styles.galleryText}>
            <h2>Joyas que cuentan historias</h2>
            <p>Descubre nuestros artículos exclusivos</p>
          </div>
          <img src="/images/reloj.png" alt="Reloj elegante" />
          <img src="/images/collar.png" alt="Collar de lujo" />
        </section>
      </main>
  );
}

