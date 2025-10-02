# Quiz Backend (Spring Boot + MySQL)

## What this contains
- Spring Boot REST API that:
  - responds to login requests (`POST /api/auth/login`)
  - lists quiz topics (`GET /api/quiz/topics`) — protected
  - returns N random questions for a topic & difficulty (`GET /api/quiz/random?topic=...&difficulty=...&count=10`) — protected

Authentication is a simple token-based demo: login returns a UUID token which you must send as:
`Authorization: Bearer <token>`

**This demo stores plaintext passwords in DB** — for production, always hash (bcrypt) and use proper JWT or OAuth.

## Running locally
1. Install MySQL and create database `quizdb`:
   ```sql
   CREATE DATABASE quizdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
2. Update `src/main/resources/application.properties` with your DB username & password.
3. Build & run:
   ```bash
   mvn -f /path/to/quiz-backend/pom.xml clean package
   java -jar target/quiz-backend-0.0.1-SNAPSHOT.jar
   ```
4. Sample user: `alice` / `password123`

## Endpoints
- `POST /api/auth/login`  
  Body: `{ "username": "alice", "password": "password123" }`  
  Returns: `{ "token": "..." }`

- `GET /api/quiz/topics`  
  Header: `Authorization: Bearer <token>`

- `GET /api/quiz/random?topic=<topic>&difficulty=<easy|medium|hard>&count=10`  
  Header: `Authorization: Bearer <token>`

## Notes & Next steps
- Add password hashing, registration endpoint, and role-based access.
- Add admin endpoints to create/update quizzes/questions.
- Replace token implementation with JWT for stateless auth.
