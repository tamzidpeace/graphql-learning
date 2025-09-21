// Mock data for books and authors
const authors = [
  { id: '1', name: 'J.K. Rowling' },
  { id: '2', name: 'George R.R. Martin' },
  { id: '3', name: 'J.R.R. Tolkien' },
  { id: '4', name: 'Stephen King' },
  { id: '5', name: 'Agatha Christie' }
];

const books = [
  { id: '1', title: 'Harry Potter and the Philosopher\'s Stone', authorId: '1', publishedYear: 1997 },
  { id: '2', title: 'Harry Potter and the Chamber of Secrets', authorId: '1', publishedYear: 1998 },
  { id: '3', title: 'A Game of Thrones', authorId: '2', publishedYear: 1996 },
  { id: '4', title: 'A Clash of Kings', authorId: '2', publishedYear: 1998 },
  { id: '5', title: 'The Hobbit', authorId: '3', publishedYear: 1937 },
  { id: '6', title: 'The Lord of the Rings', authorId: '3', publishedYear: 1954 },
  { id: '7', title: 'The Shining', authorId: '4', publishedYear: 1977 },
  { id: '8', title: 'It', authorId: '4', publishedYear: 1986 },
  { id: '9', title: 'Murder on the Orient Express', authorId: '5', publishedYear: 1934 },
  { id: '10', title: 'The Murder of Roger Ackroyd', authorId: '5', publishedYear: 1926 }
];

module.exports = {
  authors,
  books
};