const { books, authors } = require('./data');

// Helper function to find an author by ID
const getAuthorById = (authorId) => {
  return authors.find(author => author.id === authorId);
};

// Helper function to find an author by name
const getAuthorByName = (authorName) => {
  return authors.find(author => author.name === authorName);
};

// Helper function to find books by author ID
const getBooksByAuthorId = (authorId) => {
  return books.filter(book => book.authorId === authorId);
};

// Helper function to create a new author
const createAuthor = (authorName) => {
  const newAuthor = {
    id: String(authors.length + 1),
    name: authorName
  };
  authors.push(newAuthor);
  return newAuthor;
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
      // Check if author already exists, create if not
      let author = getAuthorByName(args.author);
      if (!author) {
        author = createAuthor(args.author);
      }
      
      const newBook = {
        id: String(books.length + 1),
        title: args.title,
        authorId: author.id,
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
      
      // If author name is provided, find or create the author
      let authorId = books[bookIndex].authorId;
      if (args.author) {
        let author = getAuthorByName(args.author);
        if (!author) {
          author = createAuthor(args.author);
        }
        authorId = author.id;
      }
      
      const updatedBook = {
        ...books[bookIndex],
        title: args.title || books[bookIndex].title,
        authorId: authorId,
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