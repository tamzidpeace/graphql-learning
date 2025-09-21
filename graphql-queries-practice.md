# Practicing Basic GraphQL Queries

Now that we have a working GraphQL server, let's practice writing basic GraphQL queries. This will help you understand how to fetch data from a GraphQL API.

## Understanding GraphQL Queries

A GraphQL query is a request to fetch specific data from a GraphQL server. Unlike REST APIs where you call different endpoints to get different data, in GraphQL you send a query to a single endpoint and specify exactly what data you want.

## Our Schema Structure

Let's first review the schema we've created for our books and authors:

```graphql
type Book {
  id: ID!
  title: String!
  author: Author!
  publishedYear: Int
}

type Author {
  id: ID!
  name: String!
  books: [Book!]!
}

type Query {
  books: [Book!]!
  book(id: ID!): Book
  authors: [Author!]!
  author(id: ID!): Author
}
```

## Basic Query Examples

### 1. Fetching All Books

To fetch all books with their titles and authors:

```graphql
query GetAllBooks {
  books {
    id
    title
    author {
      id
      name
    }
    publishedYear
  }
}
```

### 2. Fetching All Authors

To fetch all authors with their names and book titles:

```graphql
query GetAllAuthors {
  authors {
    id
    name
    books {
      id
      title
    }
 }
}
```

### 3. Fetching a Specific Book by ID

To fetch a specific book by its ID:

```graphql
query GetBookById {
  book(id: "1") {
    id
    title
    author {
      id
      name
    }
    publishedYear
  }
}
```

### 4. Fetching a Specific Author by ID

To fetch a specific author by their ID:

```graphql
query GetAuthorById {
  author(id: "1") {
    id
    name
    books {
      id
      title
      publishedYear
    }
  }
}
```

## Query Structure Explanation

1. **Operation Type**: `query` indicates we're fetching data (as opposed to `mutation` for modifying data)
2. **Operation Name**: `GetAllBooks` is an optional but recommended name for your query
3. **Field Selection**: Inside the query, we specify which fields we want to fetch
4. **Nested Selection**: For related data (like author within book), we can select fields from the related object

## Practice Exercises

Try running these queries in your GraphQL Playground:

1. Fetch only the titles of all books (without any other fields)
2. Fetch all authors but only their names (without their books)
3. Fetch a specific book by ID but only get its title and published year
4. Fetch all books and sort them by published year in your head (GraphQL doesn't have built-in sorting)

## Key Points to Remember

- In GraphQL, you specify exactly what data you want, avoiding over-fetching or under-fetching
- You can fetch multiple related resources in a single request
- GraphQL validates your queries against the schema, providing clear error messages for invalid queries
- Queries are structured like the data you expect to receive

Try these queries in your GraphQL Playground and observe the results. This hands-on practice will help you understand how GraphQL queries work.