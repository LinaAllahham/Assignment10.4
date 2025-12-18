// const express = require('express');
// const router = express.Router();

// // access to books and authors arrays. You will need to use both here.
// const { books, authors } = require('../data/data');

// // The first get method is provided below.
// router.get('/', (req, res) => { // Get all books
//   try {
//     res.status(200).json(books);
//   } catch (error) {
//     res.sendStatus(500);
//   }
// });

// /**
//  * TODO: Use router to define the rest of CRUD operations: get by id, post a new book, update a book, and delete a book.
//  *       Make sure to follow best practices as much as you can: use try-catch, use status codes efficiently, 
//  *       and use console.log or console.error to print errors.
//  *       Make sure to cover the cases of getting, deleting and updating an item that doesn't exist in the array, which should return: not found code (404)
//  *       
//  *      
//  */

// /**
//  *  Should return 200 on successful get, 404 if book not found and 500 on error.
//  * 
//  */
// router.get('/:id', (req, res) => { // Get one book by ID
//   try {
//     // TODO..
    
    

//     const bookId = parseInt(req.params.id); // Convert the string ID from the URL to a number
//     const foundBook = books.find(book => book.id === bookId); // Look for the book in the array

//     if (!foundBook) {
//       // If no book was found, return 404
//       return res.status(404).json({ error: 'Book not found' });
//     }

//     // If book was found, return it with status 200
//     res.status(200).json(foundBook);






//   } catch (error) {
//     // TODO.. 


//     console.error('Error getting book by ID:', error);
//     res.sendStatus(500); // Internal Server Error



//   }
// });

// /**   When creating a new book, you need to assigne an auhtor to it through author_id. 
// *     You need to check if author_id provided in the request is valid, which means it is available in the authors array.
// *     If it doesn't exist in the array, or if it is missing from the request, you should give it a default value of 99, i.e. anonymous author.
// *     
// *     Important: ids of books should be incremental. In books array in data.js we have two books with ids 1 and 2 respectively.
// *     Next added book should have id 3, and the next should have id of 4 and so on.
// *      
// *     You should also return "Bad request (400)" if name or price are missing.
// *
// *     Should return 201 on successful post, and 500 on error.
// */
// router.post('/', (req, res) => {   //  Add a new book
//   try {
//     // TODO.. 



//     const { name, price, author_id } = req.body;

//     // Check if name or price are missing
//     if (!name || price === undefined) {
//       return res.status(400).json({ error: 'Name and price are required' });
//     }

//     // Check if author_id is provided and valid
//     let finalAuthorId = author_id;
//     if (author_id === undefined || !authors.find(author => author.id === author_id)) {
//       finalAuthorId = 99; // Assign anonymous author
//     }

//     // Generate new ID (find the highest current ID and add 1)
//     const newId = Math.max(...books.map(book => book.id), 0) + 1;

//     // Create the new book object
//     const newBook = {
//       id: newId,
//       name,
//       price: parseFloat(price), // Ensure it's a number
//       author_id: finalAuthorId
//     };

//     // Add the new book to the array
//     books.push(newBook);

//     // Return the newly created book with status 201 (Created)
//     res.status(201).json(newBook);




//   } catch (error) {
//     // TODO.. 



//      console.error('Error creating book:', error);
//     res.sendStatus(500); // Internal Server Error

//   }
// });

// /**
//  *    Make sure to cover the case of updating an item that doesn't exist in the array, which should return: not found code (404)
//  * 
//  *    Should return 200 on successful put, and 500 on error.
//  */
// router.put('/:id', (req, res) => { // Update a book by ID
//   try {
//     // TODO.. 


//     const bookId = parseInt(req.params.id);
//     const { name, price, author_id } = req.body;
    
//     // Find the book index in the array
//     const bookIndex = books.findIndex(book => book.id === bookId);
    
//     if (bookIndex === -1) {
//       return res.status(404).json({ error: 'Book not found' });
//     }

//     // Update the book properties if they are provided in the request
//     if (name !== undefined) books[bookIndex].name = name;
//     if (price !== undefined) books[bookIndex].price = parseFloat(price);
//     if (author_id !== undefined) {
//       // Optional: You could add validation here to check if author exists
//       books[bookIndex].author_id = author_id;
//     }

//     // Return the updated book
//     res.status(200).json(books[bookIndex]);

//   } catch (error) {
//     // TODO.. 

//     console.error('Error updating book:', error);
//     res.sendStatus(500); // Internal Server Error

//   }
// });

// /**
//  *    Make sure to cover the case of deleting an item that doesn't exist in the array, which should return: not found code (404)
//  *    
//  *    Should return 204 on successful delete, and 500 on error.
//  */
// router.delete('/:id', (req, res) => { // Delete a book by ID
//   try {
//     // TODO..
    
    
//      const bookId = parseInt(req.params.id);
    
//     // Find the book index in the array
//     const bookIndex = books.findIndex(book => book.id === bookId);
    
//     if (bookIndex === -1) {
//       return res.status(404).json({ error: 'Book not found' });
//     }

//     // Remove the book from the array
//     books.splice(bookIndex, 1);

//     // Return success with no content (204)
//     res.sendStatus(204);

//   } catch (error) {
//     // TODO.. 


//     console.error('Error deleting book:', error);
//     res.sendStatus(500); // Internal Server Error

//   }
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Author = require('../models/Author');

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error getting books:', error);
    res.sendStatus(500);
  }
});

// GET one book by ID
router.get('/:id', async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error('Error getting book by ID:', error);
    res.sendStatus(500);
  }
});

// POST a new book
router.post('/', async (req, res) => {
  try {
    const { name, price, author_id } = req.body;

    // Check if name or price are missing
    if (!name || price === undefined) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    // Check if author_id is valid or use default
    let finalAuthorId = author_id;
    if (author_id === undefined) {
      finalAuthorId = 999; // Anonymous author
    } else {
      const author = await Author.findByPk(author_id);
      if (!author) {
        finalAuthorId = 999; // Anonymous author if not found
      }
    }

    // Create new book
    const newBook = await Book.create({
      name,
      price: parseFloat(price),
      author_id: finalAuthorId
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error creating book:', error);
    res.sendStatus(500);
  }
});

// PUT update a book by ID
router.put('/:id', async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const { name, price, author_id } = req.body;

    const book = await Book.findByPk(bookId);
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Update book properties
    if (name !== undefined) book.name = name;
    if (price !== undefined) book.price = parseFloat(price);
    if (author_id !== undefined) {
      const author = await Author.findByPk(author_id);
      book.author_id = author ? author_id : 99; // Use anonymous if author not found
    }

    await book.save(); // Save changes to database

  //   res.status(200).json(book);
  // } catch (error) {
  //   console.error('Error updating book:', error);
  //   res.sendStatus(500);
  // }
// });


   // Convert price to number before sending response
const responseBook = {
  id: book.id,
  name: book.name,
  price: parseFloat(book.price), // Convert to number
  author_id: book.author_id
};
res.status(200).json(responseBook);
} catch (error) {
  console.error('Error updating book:', error);
  res.sendStatus(500);
}
});



// DELETE a book by ID
router.delete('/:id', async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    
    const book = await Book.findByPk(bookId);
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await book.destroy(); // Delete from database

    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting book:', error);
    res.sendStatus(500);
  }
});

module.exports = router;