# GraphQL Schema Definition Language (SDL) Explained

The GraphQL Schema Definition Language (SDL) is a human-readable, domain-specific language for defining GraphQL schemas. It's used to describe the structure of your data, including the types of data, relationships between types, and available operations.

## What is GraphQL SDL?

SDL allows you to define:
- Types and their fields
- Queries and mutations available to clients
- Input types for mutations
- Enums, interfaces, and unions
- Directives for modifying execution

## Our Existing Schema

Let's look at our existing schema and break down its components:

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

type Mutation {
  addBook(title: String!, author: String!, publishedYear: Int): Book!
  updateBook(id: ID!, title: String, author: String, publishedYear: Int): Book
  deleteBook(id: ID!): Boolean!
}
```

## SDL Syntax Components

### 1. Object Types

Object types represent objects you can fetch from your service and their fields:

```graphql
type Book {
  id: ID!
  title: String!
  author: Author!
  publishedYear: Int
}
```

- `type Book` defines a new object type called "Book"
- Curly braces `{}` contain the fields of this type
- Each field has a name and a type

### 2. Field Types

Fields can have different types:

- **Scalar types**: `String`, `Int`, `Boolean`, `ID`, `Float`
- **Object types**: `Author`, `Book`
- **Lists**: `[Book!]!` (a non-null list of non-null Books)
- **NonNull**: `String!` (a non-null String)

### 3. Non-Null Modifiers

- `String` - nullable string
- `String!` - non-null string
- `[String]` - nullable list of nullable strings
- `[String!]` - nullable list of non-null strings
- `[String]!` - non-null list of nullable strings
- `[String!]!` - non-null list of non-null strings

### 4. Query Type

The Query type defines the entry points for read operations:

```graphql
type Query {
  books: [Book!]!
  book(id: ID!): Book
  authors: [Author!]!
  author(id: ID!): Author
}
```

- `books` returns a non-null list of non-null Books
- `book(id: ID!)` takes a required ID argument and returns a Book (nullable)

### 5. Mutation Type

The Mutation type defines the entry points for write operations:

```graphql
type Mutation {
  addBook(title: String!, author: String!, publishedYear: Int): Book!
  updateBook(id: ID!, title: String, author: String, publishedYear: Int): Book
  deleteBook(id: ID!): Boolean!
}
```

- Mutations can take arguments, just like queries
- Arguments can be required (with `!`) or optional
- Mutations return the affected data, allowing clients to fetch updated data in the same request

### 6. Arguments

Fields can accept arguments:

```graphql
book(id: ID!): Book
```

- `id: ID!` is a required argument of type ID
- Arguments are defined inside parentheses after the field name
- Arguments can have default values

## Selecting Subfields

When querying fields that have object types (like `author` in our `Book` type), you must select subfields. This is true for both queries and mutations.

For example, this query is **incorrect** because `author` is an object type:
```graphql
query GetBook {
  book(id: "1") {
    id
    title
    author  # This is incorrect!
    publishedYear
  }
}
```

The correct query should select subfields of the `author` object:
```graphql
query GetBook {
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

The same rule applies to mutations:
```graphql
mutation AddBook {
  addBook(title: "New Book", author: "New Author", publishedYear: 2023) {
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

## Key Concepts

### Schema Definition

A GraphQL schema defines:
1. What data is available (types)
2. How to fetch that data (queries)
3. How to modify that data (mutations)

### Type System

GraphQL is strongly typed, meaning:
- Every field has a specific type
- The schema validates all queries and mutations
- Clients know exactly what data they can request

### Introspection

GraphQL schemas are self-documenting through introspection, allowing tools like GraphQL Playground to provide auto-completion and documentation.

## Practice Exercise

Look at our schema and identify:
1. All scalar types used
2. All object types defined
3. Which fields are required vs optional
4. Which queries take arguments
5. Which mutations return which types

Understanding SDL is fundamental to working with GraphQL, as it defines the contract between your server and clients.
