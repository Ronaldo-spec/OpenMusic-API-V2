# OpenMusic API V2

A RESTful music catalog and playlist API built with **Node.js**, **Hapi.js**, **PostgreSQL**, and **JWT authentication**.

This project demonstrates backend development practices such as modular API structure, request validation, authentication, database migration, password hashing, playlist collaboration, and token-based access control.

---

## Project Overview

OpenMusic API V2 is a backend service for managing music-related resources such as users, authentications, albums, songs, playlists, playlist songs, and collaborations.

The project uses a plugin-based structure with separated services, validators, exception handling, and PostgreSQL persistence.

---

## Tech Stack

| Area | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Hapi.js |
| Database | PostgreSQL |
| Authentication | JWT / @hapi/jwt |
| Password Hashing | bcrypt |
| Validation | Joi |
| Migration | node-pg-migrate |
| Environment Config | dotenv |
| Code Quality | ESLint |

---

## Main Features

- User registration
- User authentication using access token and refresh token
- JWT-based protected routes
- Album management
- Song management
- Playlist management
- Add and remove songs from playlists
- Playlist collaboration
- PostgreSQL database integration
- Database migration support
- Centralized client error handling

---

## API Modules

The server registers several API modules:

| Module | Responsibility |
|---|---|
| `users` | User registration and user data handling |
| `authentications` | Login, refresh token, and logout flow |
| `albums` | Album resource management |
| `songs` | Song resource management |
| `playlists` | Playlist resource management |
| `playlistsongs` | Manage songs inside playlists |
| `collaborations` | Playlist collaboration feature |

---

## Installation

Clone this repository:

```bash
git clone https://github.com/Ronaldo-spec/OpenMusic-API-V2.git
cd OpenMusic-API-V2
```

Install dependencies:

```bash
npm install
```

Create `.env` file based on the required environment variables:

```env
HOST=localhost
PORT=3000
PGUSER=your_postgres_user
PGHOST=localhost
PGPASSWORD=your_postgres_password
PGDATABASE=openmusic
PGPORT=5432
ACCESS_TOKEN_KEY=your_access_token_key
REFRESH_TOKEN_KEY=your_refresh_token_key
ACCESS_TOKEN_AGE=1800
```

Run database migration:

```bash
npm run migrate
```

Run development server:

```bash
npm run start:dev
```

Run production server:

```bash
npm run start:prod
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run start:dev` | Run server with nodemon |
| `npm run start:prod` | Run server in production mode |
| `npm run lint` | Run ESLint checking |
| `npm run migrate` | Run database migration |

---

## Project Structure

```text
src/
|-- api/
|   |-- albums/
|   |-- authentications/
|   |-- collaborations/
|   |-- playlists/
|   |-- playlistsongs/
|   |-- songs/
|   |-- users/
|
|-- exceptions/
|-- services/
|   |-- postgres/
|
|-- tokenize/
|-- validator/
|-- server.js
```

---

## Portfolio Notes

This project is useful to demonstrate:

- Backend API development
- Authentication and authorization flow
- PostgreSQL integration
- Service-layer separation
- Plugin-based Hapi architecture
- Data validation and error handling
- REST API project structure

---

## Author

**Ronaldo Firmansyah**  
Programmer | Business Analyst | ERP/Application Support | SQL Reporting | Data Analyst

LinkedIn: [linkedin.com/in/ronaldofirmansyah](https://linkedin.com/in/ronaldofirmansyah)  
GitHub: [github.com/Ronaldo-spec](https://github.com/Ronaldo-spec)
