# HABILIS BOOKS API

## INSTALLATION 
- Clone this project at https://github.com/zikriakmal/habilis-books-api 
- Copy .env.example to .env (fill the all the secret and config value into .env)
- npm install

 install with node package manager
```
git clone https://github.com/zikriakmal/habilis-books-api
cd habilis-books-api
npm install

```

## RUN THIS PROJECT
to run start this project npm run 
```
npm run start
```
or
npm run start:dev to listen every changes in project
```
npm run start:dev
```

## RUN THIS PROJECT WITH DOCKER
to this project in docker need to install docker 
```
docker-compose up -d --build
```

## .env value explanation
- ADMIN_USERNAME : admin username (for admin role)
- ADMIN_PASSWORD : admin password (for admin role)
- USER_USERNAME : user username (for user role)
- USER_PASSWORD : user password (for user role)
- JWT_SECRET: jwt secret key (for authentication and authorization)
- PORT : running application port

## in memory data explanation

### User Data
- initialize data is in users service to login through auth service 
- there are 2 user data which admin and user (the configuration should be in .env)

### Books Data
- initialize empty array in books service (every application start or restart data should be empty or need to create through create book endpoint)


-------

## Project requirements

1. Create a NestJS application that manages a collection of books.
2. Define a Book entity with the following properties:
- id: number
- title: string
- author: string
- publishedDate: string
3. Implement CRUD operations:
- Create a new book
- Read all books
- Read a single book by ID
- Update a book by ID
- Delete a book by ID
4. Use DTOs (Data Transfer Objects) for input validation.
5. Implement basic error handling for cases like book not found.
6. Use an in-memory array to store books (no need for a database).
7. Implement Role-Based Access Control (RBAC):
- Define roles: Admin and User.
- Only Admin can create, update, and delete books.
- Both Admin and User can read books.
8. Implement authentication:
- Create a simple authentication mechanism for Admin and User.
- Use JWT (JSON Web Token) for authentication.
9. Create a custom middleware:
- The middleware should log the details of each incoming request (method,
URL, timestamp).
- The middleware should also validate the JWT.
10. Create API documentation:
- Document the API endpoints using Postman.
