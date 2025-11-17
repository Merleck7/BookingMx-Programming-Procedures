# BOOKINGMX — Full-Stack Reservation System

Proyecto full-stack compuesto por:

- **Backend en Spring Boot** para gestionar reservas, validación, DTOs, excepciones y API REST.
- **Frontend en JavaScript modular**, con servicios, algoritmo de gráficas y manejo de formularios.
- **Pruebas automatizadas**: JUnit 5 (backend) y Jest (frontend).
- **Documentación completa** requerida para el Sprint 3.

---

# 📌 1. General Project Description

**BOOKINGMX** es una aplicación educativa que simula un sistema de reservas de hotel.  
Incluye lógica de negocio, validaciones, manejo de errores, comunicación HTTP y pruebas unitarias.

### ✅ Backend (Spring Boot)
- Crear, actualizar, listar y cancelar reservas.
- Validación mediante DTOs y excepciones personalizadas.
- Repositorio en memoria (sin base de datos).
- API REST en `/api/reservations`.

### ✅ Frontend (JavaScript)
- Validación de formularios.
- Cálculo del precio total.
- Renderizado del DOM.
- Comunicación con backend mediante fetch.
- Implementación de un **grafo** para ciudades relacionadas.
- Totalmente testeable con Jest.

### ✅ Testing
- **JUnit 5** para lógica del backend.
- **Jest** para módulos del frontend:
  - graph.js  
  - formHandler.js  
  - domHandler.js  
  - reservationService.js  

---

# 📁 2. Project Structure

```
BOOKINGMX
├── backend/
│   ├── src/
│   │   ├── main/java/com/bookingmx/reservations/
│   │   │   ├── controller/ReservationController.java
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
│   │   │   ├── repo/ReservationRepository.java
│   │   │   └── service/ReservationService.java
│   │   └── resources/application.properties
│   ├── test/java/com/bookingmx/ReservationServiceTest.java
│   ├── pom.xml
│   └── TESTING_NOTES.md
│
├── frontend/
│   ├── js/
│   │   ├── __tests__/
│   │   │   ├── domHandler.test.js
│   │   │   ├── formHandler.test.js
│   │   │   ├── graph.test.js
│   │   │   └── reservationService.test.js
│   │   ├── api.js
│   │   ├── domHandler.js
│   │   ├── formHandler.js
│   │   ├── graph.js
│   │   └── reservationService.js
│   ├── coverage/
│   ├── screenshots/
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   ├── jest.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .babelrc
│   ├── TESTING_NOTES.md
│   └── .gitignore
│
└── README.md
```

---

# ⚙️ 3. Installation & Setup

## ▶ Backend Setup (Spring Boot)

```
cd backend
mvn clean install
mvn spring-boot:run
```

API Base URL:

```
http://localhost:8080/api/reservations
```

---

## ▶ Frontend Setup (JavaScript + Jest)

```
cd frontend
npm install
```

### Opción 1 → Abrir directamente:
```
frontend/index.html
```

### Opción 2 → Servidor local:
```
npx http-server .
```

### Ejecutar tests:
```
npm test
```

### Cobertura:
```
npm run test:coverage
```

---

# 🧪 4. Tests Description (Sprint 3)

## ✔ Backend Tests (JUnit 5)

Ubicación:
```
backend/test/java/com/bookingmx/ReservationServiceTest.java
```

Cubre:
- Creación de reservas  
- Validaciones  
- Cancelación  
- Actualización  
- Búsqueda por nombre  

Run:
```
mvn test
```

---

## ✔ Frontend Tests (Jest)

Ubicación:
```
frontend/js/__tests__/
```

Archivos testeados:

| Test file                     | Qué valida                                        |
|------------------------------|---------------------------------------------------|
| graph.test.js                | Algoritmos de grafo y utilidades geométricas     |
| reservationService.test.js   | Lógica de precios y validación                    |
| formHandler.test.js          | Flujo de envío de formulario                      |
| domHandler.test.js           | Renderizado del DOM                               |

---

# 🎨 5. Frontend Modules Overview

### api.js  
Cliente REST (GET, POST, DELETE, PUT).

### reservationService.js  
Lógica de precios + validaciones.

### formHandler.js  
Orquestación del envío + errores + mensajes.

### domHandler.js  
Inserción de texto, alertas y estructuras.

### graph.js  
Grafo no dirigido, utilidades geométricas y dibujo básico.

---

# 🚀 6. How to Run the Full System

### 1. Arrancar backend
```
cd backend
mvn spring-boot:run
```

### 2. Abrir frontend
```
frontend/index.html
```
o
```
npx http-server .
```

### 3. Enviar una reserva
El frontend hará un POST automático a:
```
http://localhost:8080/api/reservations
```

---

# 🏁 7. Sprint 3 Deliverables Checklist

| Requisito                                | Estado |
|-------------------------------------------|--------|
| Pruebas backend (JUnit)                  | ✔      |
| Pruebas frontend (Jest)                  | ✔      |
| Documentación de pruebas                 | ✔      |
| Capturas o reportes                      | ✔      |
| README completo                          | ✔      |
| Estructura del proyecto                  | ✔      |
| Explicación de módulos                   | ✔      |
| Validación completa del sistema          | ✔      |

---

# 📚 License
Proyecto educativo. Uso libre para prácticas e investigaciones.

---

# 🙌 Author
**Luis Mendoza**  
BOOKINGMX — Full-Stack Developer (Backend + Frontend + Testing)
