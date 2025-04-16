'use client';
import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from './createAuction.module.css'; // ✅ Cambiado
import { useRouter } from 'next/navigation';

const CreateAuction = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        closing_date: '',
        price: '',
        rating: '',
        stock: '',
        brand: '',
        thumbnail: '',
        category: '',
    });

    const [categories, setCategories] = useState([]);
    const [categoryMap, setCategoryMap] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('http://127.0.0.1:8000/api/subastas/categorias/');
                const data = await res.json();
                setCategories(data.results);
                const map = {};
                data.results.forEach(cat => {
                    map[cat.name] = cat.id;
                });
                setCategoryMap(map);
            } catch (err) {
                setError('Error al cargar categorías');
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formattedDate = new Date(formData.closing_date).toISOString();
    
        const updatedFormData = {
            title: formData.title,
            description: formData.description,
            closing_date: formattedDate,
            price: parseFloat(formData.price),
            rating: parseFloat(formData.rating),
            stock: parseInt(formData.stock),
            brand: formData.brand,
            thumbnail: formData.thumbnail,
            category: categoryMap[formData.category],
        };
    
        if (!updatedFormData.category) {
            setError('Categoría no válida. Por favor selecciona una de la lista.');
            return;
        }
    
        try {
            const res = await fetch('http://127.0.0.1:8000/api/subastas/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedFormData),
            });
    
            if (!res.ok) {
                const errorData = await res.json(); // Obtener el mensaje de error del backend
                if (errorData.closing_date) {
                    // Manejar el error de validación de la fecha de cierre
                    setError(errorData.closing_date[0]); // Usamos el primer mensaje de error
                } else {
                    setError('Error desconocido');
                }
                return;
            }
    
            setSuccess('¡Subasta creada con éxito!');
            setFormData({
                title: '', description: '', closing_date: '', price: '',
                rating: '', stock: '', brand: '', thumbnail: '', category: '',
            });
            setError('');
            setTimeout(() => {
                router.push(`/products?categoria=${formData.category}`);
            }, 1300);
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };
    

    return (
        <div>
            <Header />
            <main className={styles.pageContainer}>
                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <h2>Crear Nueva Subasta</h2>

                    {error && <p className={styles.error}>{error}</p>}
                    {success && <p className={styles.success}>{success}</p>}

                    <input className={styles.input} type="text" name="title" placeholder="Título" value={formData.title} onChange={handleChange} required />
                    <textarea className={styles.input} name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} required />
                    
                    <label className={styles.label}>Fecha de cierre</label>
                    <input className={styles.input} type="datetime-local" name="closing_date" value={formData.closing_date} onChange={handleChange} required />
                    
                    <input className={styles.input} type="number" name="price" placeholder="Precio (€)" value={formData.price} onChange={handleChange} required />
                    <input className={styles.input} type="number" name="rating" placeholder="Valoración (1-5)" value={formData.rating} onChange={handleChange} required />
                    <input className={styles.input} type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
                    <input className={styles.input} type="text" name="brand" placeholder="Marca" value={formData.brand} onChange={handleChange} required />
                    <input className={styles.input} type="text" name="thumbnail" placeholder="URL de imagen" value={formData.thumbnail} onChange={handleChange} required />

                    <label className={styles.label}>Categoría</label>
                    <select className={styles.input} name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Selecciona una categoría</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>

                    <button type="submit" className={styles.button}>Crear Subasta</button>
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default CreateAuction;
