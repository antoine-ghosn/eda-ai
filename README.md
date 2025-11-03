# EDA Personal Assistant

A full-stack AI productivity assistant application with a React frontend and Spring Boot backend microservice.

## Architecture

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Spring Boot 3.2.0 microservice
- **Database**: H2 in-memory database with pre-populated mock data

## Project Structure

```
project/
├── backend/                 # Spring Boot API
│   ├── src/
│   │   └── main/
│   │       ├── java/com/eda/api/
│   │       │   ├── entity/          # JPA entities
│   │       │   ├── repository/      # Spring Data repositories
│   │       │   ├── controller/      # REST controllers
│   │       │   └── config/          # Configuration & data init
│   │       └── resources/
│   └── pom.xml
├── src/                     # React frontend
│   ├── components/          # React components
│   ├── services/            # API service layer
│   └── types/               # TypeScript types
└── README.md
```

## Features

### User Authentication
- Login with username/password
- Sign up with 3 account types: Personal, Professional, Enterprise
- Profile management with linked social accounts (Instagram, TikTok, WhatsApp)

### Topics
- Visual topic cards with gradient colors
- Item count tracking
- Favorite topics

### To-Do Lists
- Active and completed tasks
- Priority levels (high, medium, low)
- Due dates with smart formatting
- Task categories
- Task thumbnails

### Feed
- Social media-style feed
- Image cards with sources
- Action buttons (Save, Task, Share)

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Run the Spring Boot application:
```bash
mvn spring-boot:run
```

The API will start on `http://localhost:8080`

### Frontend Setup

1. From the project root directory, install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Demo Accounts

Three pre-configured users are available:

### Personal Account
- **Username**: `demo`
- **Password**: `demo123`
- User: Alex Doe (alex.doe@example.com)

### Professional Account
- **Username**: `professional`
- **Password**: `pro123`
- User: Sarah Smith (sarah.smith@company.com)

### Enterprise Account
- **Username**: `enterprise`
- **Password**: `ent123`
- User: John Enterprise (john@enterprise.com)

## Mock Data

Each user account includes:
- 5 Topics (Health, Travel, Food, Design, AI)
- 4 Tasks (3 active, 1 completed)
- 3 Feed Items with images

## API Documentation

### Base URL
`http://localhost:8080/api`

### Endpoints

#### Authentication
- `POST /users/login` - Login
- `POST /users/register` - Register new user

#### Topics
- `GET /topics/user/{userId}` - Get user topics
- `POST /topics` - Create topic

#### Tasks
- `GET /tasks/user/{userId}/active` - Get active tasks
- `GET /tasks/user/{userId}/completed` - Get completed tasks
- `POST /tasks` - Create task
- `PUT /tasks/{id}` - Update task

#### Feed
- `GET /feed/user/{userId}` - Get feed items
- `POST /feed` - Create feed item

## Development

### Build Frontend
```bash
npm run build
```

### Build Backend
```bash
cd backend
mvn clean package
```

### H2 Database Console
Access at: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:edadb`
- Username: `sa`
- Password: (empty)

## Technologies

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React Icons

### Backend
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database
- Lombok
- Maven

## Notes

- The H2 database is in-memory, so data resets on each restart
- CORS is enabled for local development
- The frontend calls the backend API at `http://localhost:8080/api`
