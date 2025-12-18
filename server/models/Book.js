const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Author = require('./Author'); 

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,

     get() {
      // Convert DECIMAL to number when accessing
      const value = this.getDataValue('price');
      return value !== null ? parseFloat(value) : null;
    }


  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'authors', // Reference to authors table
      key: 'id'
    }
  }
}, {
  tableName: 'books',
  timestamps: false 
});

// Define association
Book.belongsTo(Author, { foreignKey: 'author_id' });
Author.hasMany(Book, { foreignKey: 'author_id' });

module.exports = Book;