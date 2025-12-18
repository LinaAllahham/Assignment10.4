// const express = require('express');
// const router = express.Router();

// // access to authors array
// const { authors } = require('../data/data');

// /**
//  * TODO: Use router to define all CRUD operations: 1- get all, 2- get by id, 3- post a new author, 4- update an author, and 5- delete an author.
//  *       Make sure to follow best practices as much as you can: use try-catch, use status codes efficiently, 
//  *       and use console.log or console.error to print errors.
//  *       Make sure to cover the cases of getting, deleting and updating an item that doesn't exist in the array, which should return: not found code (404)
//  * 
//  *       Follow the same rules of status codes and logic described in books routes. 
//  *          
//  *       Notice that post request now is a little simpler here. There is no checking of validity of "author_id" value here.
//  */




// // GET /authors - Get all authors
// router.get('/', (req, res) => {
//   try {
//     res.status(200).json(authors);
//   } catch (error) {
//     console.error('Error getting authors:', error);
//     res.sendStatus(500);
//   }
// });



// // GET /authors/:id - Get one author by ID
// router.get('/:id', (req, res) => {
//   try {
//     const authorId = parseInt(req.params.id);
//     const foundAuthor = authors.find(author => author.id === authorId);

//     if (!foundAuthor) {
//       return res.status(404).json({ error: 'Author not found' });
//     }

//     res.status(200).json(foundAuthor);
//   } catch (error) {
//     console.error('Error getting author by ID:', error);
//     res.sendStatus(500);
//   }
// });



// // POST /authors - Add a new author
// router.post('/', (req, res) => {
//   try {
//     const { name } = req.body;

//     // Check if name is provided
//     if (!name) {
//       return res.status(400).json({ error: 'Name is required' });
//     }

//     // Generate new ID (find the highest current ID and add 1)
//     const newId = Math.max(...authors.map(author => author.id), 0) + 1;

//     // Create the new author object
//     const newAuthor = {
//       id: newId,
//       name
//     };

//     // Add the new author to the array
//     authors.push(newAuthor);

//     // Return the newly created author with status 201
//     res.status(201).json(newAuthor);
//   } catch (error) {
//     console.error('Error creating author:', error);
//     res.sendStatus(500);
//   }
// });



// // PUT /authors/:id - Update an author by ID
// router.put('/:id', (req, res) => {
//   try {
//     const authorId = parseInt(req.params.id);
//     const { name } = req.body;
    
//     // Find the author index in the array
//     const authorIndex = authors.findIndex(author => author.id === authorId);
    
//     if (authorIndex === -1) {
//       return res.status(404).json({ error: 'Author not found' });
//     }

//     // Update the author name if provided
//     if (name !== undefined) {
//       authors[authorIndex].name = name;
//     }

//     // Return the updated author
//     res.status(200).json(authors[authorIndex]);
//   } catch (error) {
//     console.error('Error updating author:', error);
//     res.sendStatus(500);
//   }
// });




// // DELETE /authors/:id - Delete an author by ID
// router.delete('/:id', (req, res) => {
//   try {
//     const authorId = parseInt(req.params.id);
    
//     // Find the author index in the array
//     const authorIndex = authors.findIndex(author => author.id === authorId);
    
//     if (authorIndex === -1) {
//       return res.status(404).json({ error: 'Author not found' });
//     }

//     // Remove the author from the array
//     authors.splice(authorIndex, 1);

//     // Return success with no content (204)
//     res.sendStatus(204);
//   } catch (error) {
//     console.error('Error deleting author:', error);
//     res.sendStatus(500);
//   }
// });







// /* TODO: End */
// module.exports = router;






const express = require('express');
const router = express.Router();
const Author = require('../models/Author');

// GET all authors
router.get('/', async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.status(200).json(authors);
  } catch (error) {
    console.error('Error getting authors:', error);
    res.sendStatus(500);
  }
});

// GET one author by ID
router.get('/:id', async (req, res) => {
  try {
    const authorId = parseInt(req.params.id);
    const author = await Author.findByPk(authorId);

    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.status(200).json(author);
  } catch (error) {
    console.error('Error getting author by ID:', error);
    res.sendStatus(500);
  }
});

// POST a new author
router.post('/', async (req, res) => {
  try {
    const { name, id } = req.body;

    // Check if name is provided
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Create new author
    const newAuthor = await Author.create({
      id: id, // Allow custom ID for anonymous author
      name
    });

    res.status(201).json(newAuthor);
  } catch (error) {
    console.error('Error creating author:', error);
    res.sendStatus(500);
  }
});

// PUT update an author by ID
router.put('/:id', async (req, res) => {
  try {
    const authorId = parseInt(req.params.id);
    const { name } = req.body;

    const author = await Author.findByPk(authorId);
    
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }

    // Update author name
    if (name !== undefined) {
      author.name = name;
    }

    await author.save();

    res.status(200).json(author);
  } catch (error) {
    console.error('Error updating author:', error);
    res.sendStatus(500);
  }
});

// DELETE an author by ID
router.delete('/:id', async (req, res) => {
  try {
    const authorId = parseInt(req.params.id);
    
    const author = await Author.findByPk(authorId);
    
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }

    await author.destroy();

    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting author:', error);
    res.sendStatus(500);
  }
});

module.exports = router;