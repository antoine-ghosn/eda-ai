# EDA API - Spring Boot Backend

This is the Spring Boot backend microservice for the EDA Personal Assistant application.

## Features

- In-memory H2 database
- Pre-populated with mock data
- RESTful API endpoints
- CORS enabled for frontend integration

## Prerequisites

- Java 17 or higher
- Maven 3.6+

## Running the Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build and run the application:
```bash
mvn spring-boot:run
```

The API will start on `http://localhost:8080`

## API Endpoints

### Users
- `POST /api/users/login` - Login with username/password
- `POST /api/users/register` - Register new user
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user profile

### Topics
- `GET /api/topics/user/{userId}` - Get all topics for a user
- `POST /api/topics` - Create new topic
- `DELETE /api/topics/{id}` - Delete topic

### Tasks
- `GET /api/tasks/user/{userId}` - Get all tasks for a user
- `GET /api/tasks/user/{userId}/active` - Get active tasks
- `GET /api/tasks/user/{userId}/completed` - Get completed tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

### Feed
- `GET /api/feed/user/{userId}` - Get feed items for a user
- `POST /api/feed` - Create new feed item
- `DELETE /api/feed/{id}` - Delete feed item

## Mock Data

The application starts with the following demo users:

1. **Personal Account**
   - Username: `demo`
   - Password: `demo123`
   - Full Name: Alex Doe
   - Email: alex.doe@example.com

2. **Professional Account**
   - Username: `professional`
   - Password: `pro123`
   - Full Name: Sarah Smith
   - Email: sarah.smith@company.com

3. **Enterprise Account**
   - Username: `enterprise`
   - Password: `ent123`
   - Full Name: John Enterprise
   - Email: john@enterprise.com

Each user has pre-populated:
- Topics (Health, Travel, Food, Design, AI)
- Tasks (active and completed)
- Feed items

## H2 Console

Access the H2 database console at: `http://localhost:8080/h2-console`

- JDBC URL: `jdbc:h2:mem:edadb`
- Username: `sa`
- Password: (leave empty)

## Technologies

- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database
- Lombok
- Maven
