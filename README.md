# 🏨 BookingMx

BookingMx is a full-stack hotel reservation management system built with **Spring Boot** (Backend) and **Vanilla JavaScript + Jest** (Frontend).  
Users can create, validate, and visualize reservations through a simple and responsive interface.

The project focuses on:
- Clean project architecture  
- RESTful API consumption  
- Frontend unit testing with Jest  
- Backend unit testing with JUnit  
- Reproducible documentation  

---

## 📁 Project Structure (updated)

```
BOOKINGMX/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   └── java/...
│   │   └── test/
│   │       └── java/
│   │           └── com/
│   │               └── bookingmx/
│   │                   └── ReservationServiceTest.java
│   ├── pom.xml
│   └── TESTING_NOTES.md
│
├── frontend/
│   ├── js/
│   │   ├── api.js
│   │   ├── graph.js
│   │   ├── domHandler.js
│   │   ├── formHandler.js
│   │   └── reservationService.js
│   │
│   ├── js/__tests__/
│   │   ├── graph.test.js
│   │   ├── domHandler.test.js
│   │   ├── formHandler.test.js
│   │   └── reservationService.test.js
│   │
│   ├── screenshots/
│   ├── index.html
│   ├── styles.css
│   ├── jest.config.js
│   ├── package.json
│   ├── package-lock.json
│   └── TESTING_NOTES.md
│
└── README.md
```

> Note: `backend/src/test/...` contains the JUnit test(s) for the reservations service.  
> `frontend/js/__tests__/` contains all Jest test files for frontend modules.

---

## ⚙️ Running the Backend

### Install & run
```bash
cd backend
mvn spring-boot:run
```

Backend URL: **http://localhost:8080**

---

## 💻 Running the Frontend

### Install dependencies
```bash
cd frontend
npm install
```

### Start development server
Use your preferred local server (Live Server, Vite, or similar). Example with Live Server for VSCode:
```
Right click index.html → "Open with Live Server"
```

Frontend example URL: **http://localhost:5500**

---

## 🧪 Tests — Files & Commands

### Backend (JUnit)
**Test files**
```
backend/src/test/java/com/bookingmx/ReservationServiceTest.java
```

**Run**
```bash
cd backend
mvn clean test
```

### Frontend (Jest)
**Test files**
```
frontend/js/__tests__/
  ├─ graph.test.js
  ├─ domHandler.test.js
  ├─ formHandler.test.js
  └─ reservationService.test.js
```

**Run**
```bash
cd frontend
npm test -- --coverage
```

Coverage report will be generated in:
```
frontend/coverage/
```

---

## 📸 Screenshots (Evidence)

Place your screenshots in:

```
frontend/screenshots/
```

Suggested filenames:
- `test-results.png` — full Jest output and coverage summary
- `coverage-report.png` — coverage/lcov-report/index.html screenshot
- `form-success.png` — reservation success UI
- `form-error.png` — reservation validation error UI

---

## 📦 Technologies Used

**Backend**
- Java 21
- Spring Boot
- Maven
- JUnit
- JaCoCo (coverage)

**Frontend**
- Vanilla JavaScript (ES6+)
- HTML5 / CSS3
- Jest + JSDOM (testing)

---

## 🧩 Key Features

- Create, update, cancel reservations via REST endpoints
- Reservation validation and price calculation
- Frontend modules separated by responsibility (API, UI, logic)
- Graph module for nearby cities (data + basic visualization)
- Unit tests for core logic and DOM behavior

---

## 📘 Author

Developed by **Luis Mendoza (MerlecK7)**  
GitHub: https://github.com/Merleck7  
LinkedIn: https://www.linkedin.com/in/luismendoza2007/
