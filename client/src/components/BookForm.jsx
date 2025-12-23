// import { useState, useEffect } from 'react';
// import { createBook, updateBook } from '../services/bookService'; // <-- You'll implement these
// import styles from '../styles/Form.module.css';

// export default function BookForm({ selected, onSuccess }) {
//     const [form, setForm] = useState({ name: '', price: '', author_id: '' });

//     useEffect(() => {
//         if (!selected) return;
//         setForm(selected);
//     }, [selected]);

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!form.name || !form.price) return;

//         // TODO:
//         // if selected?.id => call updateBook(selected.id, form)
//         // else => call createBook(form)
//         // Then clear form and call onSuccess() to refresh the page
//     };

//     return (
//         <form className={styles.form} onSubmit={handleSubmit}>
//             <h2>{selected ? 'Edit Book' : 'New Book'}</h2>
//             <input name="name" placeholder="Book Name" value={form.name} onChange={handleChange} required />
//             <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
//             <input name="author_id" placeholder="Author ID" value={form.author_id} onChange={handleChange} />
//             <button type="submit">Save</button>
//         </form>
//     );
// }


import { useState, useEffect } from 'react';
import { createBook, updateBook } from '../services/bookService';
import styles from '../styles/Form.module.css';

export default function BookForm({ selected, onSuccess }) {
    const [form, setForm] = useState({ name: '', price: '', author_id: '' });

    useEffect(() => {
        if (!selected) return;
        setForm(selected);
    }, [selected]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.price) return;

        if (selected?.id) {
            await updateBook(selected.id, form);
        } else {
            await createBook(form);
        }
        
        setForm({ name: '', price: '', author_id: '' });
        onSuccess?.();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>{selected ? 'Edit Book' : 'New Book'}</h2>
            <input 
                name="name" 
                placeholder="Book Name" 
                value={form.name} 
                onChange={handleChange} 
                required 
            />
            <input 
                name="price" 
                type="number" 
                placeholder="Price" 
                value={form.price} 
                onChange={handleChange} 
                required 
            />
            <input 
                name="author_id" 
                placeholder="Author ID" 
                value={form.author_id} 
                onChange={handleChange} 
            />
            <button type="submit">Save</button>
        </form>
    );
}