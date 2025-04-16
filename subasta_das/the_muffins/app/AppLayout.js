import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from './page.module.css';

const AppLayout = ({ children }) => {
 return (
     <>
       <Head>
         <title>Día de San Valentín</title>
         <meta name="description" content="Regalos de conexión tan especiales como su amor." />
       </Head>
       <div className={styles.layout}>
         <Header />
         <main>{children}</main>
         <Footer />
       </div>
     </>
 );
};

export default AppLayout;
