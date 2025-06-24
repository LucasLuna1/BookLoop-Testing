const { expect } = require('chai');
const sinon = require('sinon');

// Simulación de operaciones de base de datos
const db = {
  books: [
    { id: 1, title: 'El Quijote', author: 'Cervantes', price: 15.99 },
    { id: 2, title: 'Cien años de soledad', author: 'García Márquez', price: 20.50 }
  ],

  findBookById: (id) => {
    return db.books.find(book => book.id === id);
  },

  findBooksByAuthor: (author) => {
    return db.books.filter(book => 
      book.author.toLowerCase().includes(author.toLowerCase())
    );
  },

  addBook: (book) => {
    const newBook = { ...book, id: db.books.length + 1 };
    db.books.push(newBook);
    return newBook;
  },

  updateBook: (id, updates) => {
    const bookIndex = db.books.findIndex(book => book.id === id);
    if (bookIndex === -1) return null;
    db.books[bookIndex] = { ...db.books[bookIndex], ...updates };
    return db.books[bookIndex];
  },

  deleteBook: (id) => {
    const bookIndex = db.books.findIndex(book => book.id === id);
    if (bookIndex === -1) return false;
    db.books.splice(bookIndex, 1);
    return true;
  }
};

describe('Database Tests with Mocha', () => {

  beforeEach(() => {
    // Restaurar datos originales antes de cada test
    db.books = [
      { id: 1, title: 'El Quijote', author: 'Cervantes', price: 15.99 },
      { id: 2, title: 'Cien años de soledad', author: 'García Márquez', price: 20.50 }
    ];
  });

  describe('findBookById', () => {
    it('should find book by existing ID', () => {
      const book = db.findBookById(1);
      expect(book).to.not.be.undefined;
      expect(book.title).to.equal('El Quijote');
    });

    it('should return undefined for non-existent ID', () => {
      const book = db.findBookById(999);
      expect(book).to.be.undefined;
    });
  });

  describe('findBooksByAuthor', () => {
    it('should find books by author name', () => {
      const books = db.findBooksByAuthor('García');
      expect(books).to.have.length(1);
      expect(books[0].title).to.equal('Cien años de soledad');
    });

    it('should return empty array for non-existent author', () => {
      const books = db.findBooksByAuthor('Autor Inexistente');
      expect(books).to.have.length(0);
    });
  });

  describe('addBook', () => {
    it('should add new book successfully', () => {
      const newBook = {
        title: 'El Principito',
        author: 'Saint-Exupéry',
        price: 12.99
      };

      const addedBook = db.addBook(newBook);
      expect(addedBook).to.have.property('id');
      expect(addedBook.title).to.equal('El Principito');
      expect(db.books).to.have.length(3);
    });
  });

  describe('updateBook', () => {
    it('should update existing book', () => {
      const updates = { price: 18.99 };
      const updatedBook = db.updateBook(1, updates);
      
      expect(updatedBook).to.not.be.null;
      expect(updatedBook.price).to.equal(18.99);
      expect(updatedBook.title).to.equal('El Quijote');
    });

    it('should return null for non-existent book', () => {
      const updates = { price: 18.99 };
      const result = db.updateBook(999, updates);
      
      expect(result).to.be.null;
    });
  });

  describe('deleteBook', () => {
    it('should delete existing book', () => {
      const result = db.deleteBook(1);
      
      expect(result).to.be.true;
      expect(db.books).to.have.length(1);
      expect(db.findBookById(1)).to.be.undefined;
    });

    it('should return false for non-existent book', () => {
      const result = db.deleteBook(999);
      
      expect(result).to.be.false;
      expect(db.books).to.have.length(2);
    });
  });

}); 