# 🏨 BookingMx

BookingMx is a full-stack reservation management system built with Spring Boot and Vanilla JavaScript.
It allows users to create, view, and manage hotel bookings through a simple and responsive interface.
The project focuses on RESTful API integration, clean architecture, and unit testing to simulate a real-world booking platform.

---

## 🚀 Project Structure

```
BOOKINGMX/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── bookingmx/
│   │       │           └── reservations/
│   │       │               ├── controller/
│   │       │               │   └── ReservationController.java
│   │       │               ├── dto/
│   │       │               │   ├── ReservationRequest.java
│   │       │               │   └── ReservationResponse.java
│   │       │               ├── exception/
│   │       │               │   ├── ApiExceptionHandler.java
│   │       │               │   ├── BadRequestException.java
│   │       │               │   └── NotFoundException.java
│   │       │               ├── model/
│   │       │               │   ├── Reservation.java
│   │       │               │   └── ReservationStatus.java
│   │       │               ├── repo/
│   │       │               │   └── ReservationRepository.java
│   │       │               ├── service/
│   │       │               │   └── ReservationService.java
│   │       │               └── BookingMxApplication.java
│   │       └── resources/
│   │           └──  application.properties
│   ├── target/
│   ├── pom.xml
│   └── TESTING_NOTES.md
│
├── frontend/
│   ├── js/
│   │   ├── api.js
│   │   ├── graph.js
│   │   └── app.js
│   ├── node_modules/
│   ├── index.html
│   ├── styles.css
│   ├── jest.config.js
│   ├── package.json
│   ├── package-lock.json
│   └── TESTING_NOTES.md
│
└── README.md
```

---

## ⚙️ Run the Backend

```bash
cd backend
mvn spring-boot:run
```

The backend will run at:

👉 `http://localhost:8080`

---

## 💻 Run the Frontend

```bash
cd frontend
npm install
npm run serve
```

The frontend will be available at:

👉 `http://localhost:5173`

---

## 🧪 Testing

Run backend unit tests:

```bash
cd backend
mvn clean test
```

Run frontend tests (if using Jest):

```bash
cd frontend
npm test
```

---

## 📦 Main Technologies

- **Backend:** Java 21, Spring Boot, Maven, JUnit, Jacoco  
- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3  
- **Testing:** Jest (frontend) and JUnit (backend)

---

## 📘 Author

Developed by **Luis Mendoza (MerlecK7)**  
🔗 [GitHub](https://github.com/Merleck7)  
🔗 [LinkedIn](https://www.linkedin.com/in/luismendoza2007/)
