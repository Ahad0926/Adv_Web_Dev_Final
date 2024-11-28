# Event Management System Project

### Group Members
- Ahad Abdul (100787992)
- Razeen Meera Ameer (100846286)
---

## Overview
This Event Management System project is designed to facilitate event creation, user authentication, and event viewing through a Flask backend and Angular frontend. While the project remains incomplete, significant progress has been made, especially in the core functionalities such as user management, event creation, and integration of the frontend with the backend.

### To run the project:
1. Navigate to `/Event-manager` and execute `ng serve` for the Angular frontend.
2. Navigate to `/Backend` and execute `flask run` for the Flask backend.

---

## Completed Features

### **API Design and Integration**
- **Clear API Endpoints**:
  - `/api/auth/signup`: Handles user registration.
  - `/api/auth/login`: Manages user authentication and JWT token generation.
  - `/api/auth/logout`: Manages user logout and session clearing.
  - `/api/events`: Handles event creation and retrieval.
- **HTTP Methods**:
  - `POST` for creating users and events.
  - `GET` for fetching events and user details.

---

### **Architectural Design**
- **Monolithic Architecture**: A monolithic structure was implemented, with Flask managing the backend API and Angular managing the frontend.
- **Separation of Concerns**: Backend handles API logic, authentication, and database interactions. The frontend is focused on user experience.

---

### **Authentication and Security**
- **User Authentication**:
  - JWT is used for secure session handling.
  - Sensitive routes, such as event creation and user profile access, are protected with `@jwt_required`.
- **Frontend Authorization**: Angular's AuthGuard ensures unauthorized users are redirected to the login page when accessing protected routes.

---

### **Database Design and ORM**
- **Database Schema**:
  - `Users`, `Events`, and `Tickets` models were implemented.
  - Relationships between users and events (`organized_events`) and users and tickets (`tickets`) were designed.
- **ORM Usage**: SQLAlchemy ORM was used for database interactions.
- **CRUD Operations**:
  - Creating and retrieving events.
  - Creating users and managing authentication.


---

### **Version Control and Collaboration**
- **Git and GitHub**:
  - The project was version-controlled using Git.
  - Commits were made regularly with clear messages describing changes.


---

## Key Features

### **User Management**
- Secure user registration, login, and logout functionalities with JWT-based authentication.

### **Event Management**
- Users can create events with details such as title, date, location, and tickets.
- Events can be viewed on a public list or detailed page.

### **Frontend Integration**
- Angular was used to create a responsive and user-friendly interface for event viewing and management.
- Protected routes for creating events and viewing profiles ensure secure access.
