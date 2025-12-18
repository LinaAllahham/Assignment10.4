const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
// add necessary imports below: Morgan and endPointNotFound
const morgan = require('morgan'); // 1. Import Morgan
const { endPointNotFound } = require('./utils/middlewares'); // 2. Import the custom middleware
// Make sequelize available for tests




// NEW: Import Sequelize and models
const sequelize = require('./config/db');
const Author = require('./models/Author');    
const Book = require('./models/Book');
 

// Enable CORS for all routes and methods
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());
/**
 * TODO: apply Morgan middleware (dev): https://expressjs.com/en/resources/middleware/morgan.html
 */
app.use(morgan('dev')); // 3. Apply Morgan with the 'dev' format
/* TODO: End */


const index = require('./routes/index');
/**
 * TODO: include books and authors route
 */
const booksRouter = require('./routes/books'); // We'll create these variables
const authorsRouter = require('./routes/authors'); // now for the next step.
/* TODO: End */

app.use('/', index)
/**
 * TODO: use books and authors route
 */
app.use('/books', booksRouter); // Tell Express to use the booksRouter for all routes starting with '/books'
app.use('/authors', authorsRouter); // Tell Express to use the authorsRouter for all routes starting with '/authors'
/* TODO: End */


/**
 * TODO: apply unknown endpoints (endPointNotFound) middleware
 */
app.use(endPointNotFound); // 4. Apply the custom middleware for unknown routes. This should be LAST.
/* TODO: End */



// Exporting  the app for testing puporses
module.exports = app;

// const sequelize = require('./config/db');

async function init() { // async for future additions below

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  // } catch (error) {
  //   console.error('Unable to connect to the database:', error);

  // Second: Sync models (only if connection is successful)
    // await sequelize.sync({ force: true });
    // console.log('All models were synchronized successfully.');
    

  // Only sync models if not running tests
    if (process.env.TESTING !== 'true') {
      await sequelize.sync({ force: true });
      console.log('All models were synchronized successfully.');
    } 

  } catch (error) {
    // This catch block handles errors from BOTH authenticate() AND sync()
    console.error('Unable to connect to the database:', error);
  }
    


  if (require.main === module) {
    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  }


}

init();


