const { books, authors } = require('./data');

// Helper function to find an author by ID
const getAuthorById = (authorId) => {
  return authors.find(author => author.id === authorId);
};

// Helper function to find books by author ID
const getBooksByAuthorId = (authorId) => {
  return books.filter(book => book.authorId === authorId);
};

// Resolvers
const resolvers = {
  // Field resolvers for relationships
  Author: {
    books: (author) => {
      return getBooksByAuthorId(author.id);
    }
  },
  
  Book: {
    author: (book) => {
      return getAuthorById(book.authorId);
    }
  },
  
  // Query resolvers
  Query: {
    books: () => {
      return books;
    },
    
    book: (parent, args) => {
      return books.find(book => book.id === args.id);
    },
    
    authors: () => {
      return authors;
    },
    
    author: (parent, args) => {
      return authors.find(author => author.id === args.id);
    }
  },
  
  // Mutation resolvers
 Mutation: {
    addBook: (parent, args) => {
      const newBook = {
        id: String(books.length + 1),
        title: args.title,
        authorId: args.author, // In a real app, we'd look up the author ID
        publishedYear: args.publishedYear
      };
      
      books.push(newBook);
      return newBook;
    },
    
    updateBook: (parent, args) => {
      const bookIndex = books.findIndex(book => book.id === args.id);
      
      if (bookIndex === -1) {
        return null;
      }
      
      const updatedBook = {
        ...books[bookIndex],
        title: args.title || books[bookIndex].title,
        authorId: args.author || books[bookIndex].authorId,
        publishedYear: args.publishedYear !== undefined ? args.publishedYear : books[bookIndex].publishedYear
      };
      
      books[bookIndex] = updatedBook;
      return updatedBook;
    },
    
    deleteBook: (parent, args) => {
      const bookIndex = books.findIndex(book => book.id === args.id);
      
      if (bookIndex === -1) {
        return false;
      }
      
      books.splice(bookIndex, 1);
      return true;
    }
  }
};

module.exports = resolvers;