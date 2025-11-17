# City Reservation System – Full Project Documentation (Backend + Frontend)

## 📌 General Project Description
This project is a **City Reservation System** that allows users to create reservations between cities represented as a **graph**.  
The backend provides a REST API built with **Spring Boot**, while the frontend is a simple **JavaScript interface** for interacting with the API.

### ✅ Main Functionalities
- Register and manage **cities**.
- Create and validate **reservations** between cities.
- Represent connections using an internal **graph structure**.
- Perform unit testing at the service level (JUnit + JaCoCo).
- Fully documented frontend and backend for Sprint 3.


```md
# BOOKINGMX — Full-Stack Reservation System  
A multi-module project that includes:

- A **Spring Boot backend** handling hotel reservations, validation, DTO mapping, and REST APIs.
- A **vanilla JavaScript frontend** implementing form handling, graph utilities, DOM rendering, and API communication.
- **Automated testing** using JUnit 5 (backend) and Jest (frontend), with coverage reports.

This document summarizes the project, installation steps, architecture, and test execution, as required for Sprint 3.

---

# 📌 1. General Project Description

**BOOKINGMX** is a learning-oriented full-stack application that simulates a hotel reservation management system. It includes:

### ✅ **Backend (Java + Spring Boot)**  
- Create, update, list, and cancel reservations.  
- Input validation using DTOs and custom exceptions.  
- In-memory repository (no database required).  
- REST endpoints exposed at `/api/reservations`.

### ✅ **Frontend (JavaScript)**  
- Reservation form validation.  
- Total price calculation service.  
- DOM renderer for UI feedback.  
- Graph utilities to calculate nearby cities (graph algorithms).  
- Fully testable with Jest.

### ✅ **Testing**  
Includes two layers of tests:

- **JUnit 5** for backend service logic.
- **Jest** for frontend modules, including:
  - graph utilities  
  - form handler  
  - DOM renderer  
  - reservation service logic  

---

# 📁 2. Project Structure

```

BOOKINGMX
├── backend/
│   ├── src/
│   │   ├── main/java/com/bookingmx/reservations/
│   │   │   ├── controller/
│   │   │   │   └── ReservationController.java
│   │   │   ├── dto/
│   │   │   │   ├── ReservationRequest.java
│   │   │   │   └── ReservationResponse.java
│   │   │   ├── exception/
│   │   │   │   ├── ApiExceptionHandler.java
│   │   │   │   ├── BadRequestException.java
│   │   │   │   └── NotFoundException.java
│   │   │   ├── model/
│   │   │   │   ├── Reservation.java
│   │   │   │   └── ReservationStatus.java
│   │   │   ├── repo/
│   │   │   │   └── ReservationRepository.java
│   │   │   ├── service/
│   │   │   │   ├── ReservationService.java
│   │   │   │   └── BookingMxApplication.java
│   │   └── resources/
│   │       └── application.properties
│   ├── test/java/com/bookingmx/
│   │   └── ReservationServiceTest.java
│   ├── pom.xml
│   └── TESTING_NOTES.md
│
├── frontend/
│   ├── coverage/
│   ├── js/
│   │   ├── **tests**/
│   │   │   ├── domHandler.test.js
│   │   │   ├── formHandler.test.js
│   │   │   ├── graph.test.js
│   │   │   └── reservationService.test.js
│   │   ├── api.js
│   │   ├── domHandler.js
│   │   ├── formHandler.js
│   │   ├── graph.js
│   │   └── reservationService.js
│   ├── screenshots/
│   ├── .babelrc
│   ├── app.js
│   ├── index.html
│   ├── jest.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── styles.css
│   ├── TESTING_NOTES.md
│   └── .gitignore
│
└── README.md

````

---

# ⚙️ 3. Installation & Setup

## ▶ Backend Setup (Spring Boot)

### **1. Navigate to the backend folder**
```bash
cd backend
````

### **2. Build the project**

```bash
mvn clean install
```

### **3. Run the server**

```bash
mvn spring-boot:run
```

### **4. API Base URL**

```
http://localhost:8080/api/reservations
```

---

## ▶ Frontend Setup (JavaScript + Jest)

### **1. Navigate to the frontend folder**

```bash
cd frontend
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Run the local server (optional)**

Most students simply open `index.html`,
but you can also run an HTTP server:

```bash
npx http-server .
```

### **4. Run Jest tests**

```bash
npm test
```

### **5. Generate coverage report**

```bash
npm run test:coverage
```

Results appear in:

```
frontend/coverage/
```

---

# 🧪 4. Tests Description (Sprint 3 requirement)

BOOKINGMX includes **backend unit tests** and **frontend unit tests**.

---

## ✔ Backend Tests (JUnit 5)

Location:

```
backend/test/java/com/bookingmx/ReservationServiceTest.java
```

Covers:

* Creating reservations
* Validations for missing/invalid data
* Updating status
* Canceling reservations
* Finding by guest name

### Example: running backend tests

```bash
mvn test
```

🎯 Expected result (snippet):

```
[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0
```

---

## ✔ Frontend Tests (Jest)

Located in:

```
frontend/js/__tests__/
```

### Includes tests for:

| File                           | Purpose                                               |
| ------------------------------ | ----------------------------------------------------- |
| **reservationService.test.js** | Validates price calculations and field validation     |
| **formHandler.test.js**        | Simulates form submission logic                       |
| **domHandler.test.js**         | Tests DOM rendering behavior                          |
| **graph.test.js**              | Graph algorithms, city validation, geometry utilities |

### Run tests:

```bash
npm test
```

Expected output (snippet):

```
PASS js/__tests__/graph.test.js
PASS js/__tests__/reservationService.test.js
PASS js/__tests__/formHandler.test.js
PASS js/__tests__/domHandler.test.js
```

### Coverage:

```bash
npm run test:coverage
```

You will find an HTML report in:

```
frontend/coverage/lcov-report/index.html
```

---

# 🎨 5. Frontend Overview

The frontend is modular and testable:

### **api.js**

* Simple REST client for the backend.
* Supports: list, create, update, delete.

### **reservationService.js**

* Contains calculation logic.
* Validates reservation fields.

### **formHandler.js**

* Orchestrates submission + validation.
* Generates UI result messages.

### **domHandler.js**

* DOM manipulation layer.

### **graph.js**

* Undirected graph implementation.
* Nearby city calculator.
* Geometry-based utility for Jest tests.
* Minimal canvas drawing function.

All modules follow **pure function design** to increase testability.

---

# 🚀 6. How to Run the Full System

### **1. Start backend**

```bash
cd backend
mvn spring-boot:run
```

### **2. Start frontend**

Open:

```
frontend/index.html
```

OR run:

```bash
npx http-server .
```

### **3. Create a reservation**

The frontend will call:

```
POST /api/reservations
```

---

# 🏁 7. Sprint 3 Deliverables Checklist

| Requirement                         | Status            |
| ----------------------------------- | ----------------- |
| Backend unit tests                  | ✔ Completed       |
| Frontend unit tests (Jest)          | ✔ Completed       |
| Documentation of tests              | ✔ Included        |
| Example execution & expected output | ✔ Included        |
| Frontend module documentation       | ✔ Added           |
| Complete README.md                  | ✔ Delivered       |
| Project structure                   | ✔ Fully described |

---

# 📚 8. License

Educational use — open for academic work, assignments, and practice.

---

# 🙌 Author

Developed by **Luis Mendoza**
Backend + Frontend + Testing Integration
BOOKINGMX — Software Engineering Learning Project

```

---