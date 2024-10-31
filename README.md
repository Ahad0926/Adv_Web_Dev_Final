# Advanced Web Dev Final Project

## Project Overview
This project is an **Event Management System** enabling users to organize, manage, and attend events like concerts and conferences. The application supports ticket sales, attendee management, and calendar integration. The primary goals are to implement a modern, secure, and responsive web application, adhering to best practices in API design, authentication, deployment, and performance optimization.

### Group Members
- Ahad Abdul (100787992)
- Razeen Meera Ameer (100846286)
---

## Technology Stack

### 1. **Backend Framework: Flask (Python)**
   - **Purpose**: The Flask backend handles core business logic, including user authentication, API routes, and database management.
   - **Libraries & Tools**:
     - **Flask-OAuth**: Provides secure user authentication and authorization.
     - **SQLAlchemy**: ORM for database interactions and managing data relationships.

### 2. **Frontend Framework: Angular**
   - **Purpose**: Angular is used to create a responsive, interactive UI, allowing users to manage and view events easily.
   - **Tools & Libraries**:
     - **Angular CLI**: For project scaffolding and build management.
     - **Angular Router**: Enables Single Page Application (SPA) functionality.

### 3. **Database: SQLite**
   - **Purpose**: SQLite is used to store user data, events, and ticket details in a simple, relational structure, ideal for a project of this scale.

### 4. **Deployment & DevOps**

   - **Platform**: **Heroku**
     - Heroku manages deployment, providing scalable server environments and built-in HTTPS support.

   - **Containerization**: **Docker**
     - Docker is used to containerize both the Flask backend and Angular frontend, ensuring consistency between development and production environments.

   - **Version Control**: **GitHub**
     - GitHub manages source code, collaboration, and CI/CD workflows, with commits and branches used for team development and progress tracking.
