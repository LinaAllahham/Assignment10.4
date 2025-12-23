// const BASE = import.meta.env.VITE_API_URL + '/books';

// /**
//  * TODO: Implement each function below using fetch().
//  * You are connecting to the Express backend you built.
//  */

// // GET /books
// export const getBooks = async () => {
//     // Example: return fetch(BASE).then(res => res.json());
// };

// // POST /books
// export const createBook = async (data) => {
//     // Send a POST request with JSON body
// };

// // PUT /books/:id
// export const updateBook = async (id, data) => {
//     // Update a book by ID
// };

// // DELETE /books/:id
// export const deleteBook = async (id) => {
//     // Delete a book by ID
// };



const BASE = import.meta.env.VITE_API_URL + 'books';

/**
 * TODO: Implement each function below using fetch().
 * You are connecting to the Express backend you built.
 */

// GET /books
export const getBooks = async () => {
    return fetch(BASE).then(res => res.json());
};

// POST /books
export const createBook = async (data) => {
    return fetch(BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json());
};

// PUT /books/:id
export const updateBook = async (id, data) => {
    return fetch(`${BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json());
};

// DELETE /books/:id
export const deleteBook = async (id) => {
    return fetch(`${BASE}/${id}`, { method: 'DELETE' });
};