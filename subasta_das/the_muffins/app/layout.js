import Header from '../components/header';
import Footer from '../components/footer';
import styles from './page.module.css';

const Layout = ({ children }) => (
  <html lang="es">
    <body className={styles.layout}>
   
      {children}
  
    </body>
  </html>
);

export default Layout;