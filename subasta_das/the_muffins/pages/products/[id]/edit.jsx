'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import styles from '../../products.module.css';

const EditAuction = () => {
    const params = useParams();
    const router = useRouter();
    const id = params?.id;

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

    useEffect(() => {
        if (id) {
            fetchAuctionData(id);
        }
    }, [id]);

    const fetchAuctionData = async (auctionId) => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/subastas/${auctionId}/`);
            const data = await res.json();
            setFormData({
                title: data.title,
                description: data.description,
                closing_date: new Date(data.closing_date).toISOString().slice(0, 16),
                price: data.price,
                rating: data.rating,
                stock: data.stock,
                brand: data.brand,
                thumbnail: data.thumbnail,
                category: Object.keys(categoryMap).find(key => categoryMap[key] === data.category),
            });
        } catch (err) {
            setError('Error al obtener los datos de la subasta');
        }
    };

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

        const updatedFormData = {};

        if (formData.title) updatedFormData.title = formData.title;
        if (formData.description) updatedFormData.description = formData.description;
        if (formData.closing_date) updatedFormData.closing_date = formattedDate;
        if (formData.price) updatedFormData.price = parseFloat(formData.price);
        if (formData.rating) updatedFormData.rating = parseFloat(formData.rating);
        if (formData.stock) updatedFormData.stock = parseInt(formData.stock);
        if (formData.brand) updatedFormData.brand = formData.brand;
        if (formData.thumbnail) updatedFormData.thumbnail = formData.thumbnail;
        if (formData.category) updatedFormData.category = categoryMap[formData.category];

        if (!updatedFormData.category) {
            setError('Categoría no válida. Por favor selecciona una de la lista.');
            return;
        }

        try {
            const res = await fetch(`http://127.0.0.1:8000/api/subastas/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFormData),
            });

            if (!res.ok) {
                throw new Error('Error al editar la subasta');
            }

            setSuccess('¡Subasta editada con éxito!');
            setFormData({
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

            setTimeout(() => {
                router.push(`/productDetail?id=${id}`);
            }, 2000);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <Header />
            <main className={styles.productosGrid}>
                <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h2>Editar Subasta</h2>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}

                    <input type="text" name="title" placeholder="Título" value={formData.title} onChange={handleChange} required />
                    <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} required />
                    <label>Fecha de cierre</label>
                    <input type="datetime-local" name="closing_date" value={formData.closing_date} onChange={handleChange} required />
                    <input type="number" name="price" placeholder="Precio (€)" value={formData.price} onChange={handleChange} required />
                    <input type="number" name="rating" placeholder="Valoración (1-5)" value={formData.rating} onChange={handleChange} required />
                    <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
                    <input type="text" name="brand" placeholder="Marca" value={formData.brand} onChange={handleChange} required />
                    <input type="text" name="thumbnail" placeholder="URL de imagen" value={formData.thumbnail} onChange={handleChange} required />

                    <label>Categoría</label>
                    <select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Selecciona una categoría</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>

                    <button type="submit">Guardar cambios</button>
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default EditAuction;
