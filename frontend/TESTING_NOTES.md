# TESTING NOTES

This document summarizes the testing strategy, tools used, and the reasoning behind the test coverage implemented in the BookingMx frontend project.

---

## ✔ Testing Tools Used

- **Jest** – Main testing framework.
- **JSDOM** – Simulates a DOM environment for testing UI-related logic.
- **Coverage Reports** – Used to measure how much of the codebase is tested.

---

## ✔ What Was Tested

### **1. Reservation Service (`reservationService.js`)**
- Tested the price calculation logic.
- Ensured correct handling of invalid input.
- Verified behavior for different numbers of guests.
- Achieved **high coverage** because functions are pure and easy to test.

### **2. Form Handler (`formHandler.js`)**
- Checked validation logic.
- Ensured correct detection of empty fields.
- Verified successful validation flow.
- This module achieved **100% coverage**.

### **3. DOM Handler (`domHandler.js`)**
- Tested dynamic DOM updates using JSDOM.
- Verified rendering of error/success messages.
- Coverage is good but not 100% because DOM listeners and visual behaviors are harder to fully test.

### **4. Graph Functions (`graph.js`)**
- Tested data transformation logic.
- Verified correct handling of datasets.
- Some parts are not tested due to:
  - Chart rendering depending on external libraries.
  - Canvas context mocking complexity.

### **5. API Module (`api.js`)**
- Currently **0% coverage** because:
  - Real API integration requires mocking `fetch`.
  - This was postponed due to project priorities.
  - Can be improved in future iterations.

---

## ✔ Overall Coverage Summary

- **All tests passed successfully.**
- **Coverage average: ~35%**, but the important business logic modules reached high coverage.
- Critical functions (validation, pricing, DOM updates) are tested.
- Remaining untested code relates mainly to external API calls and chart rendering.

---

## ✔ Future Improvements

- Add mocks for `fetch` to test the API module.
- Improve test coverage for graph rendering using canvas mocks.
- Add integration tests simulating a full reservation flow.

---

## ✔ Conclusion

The essential, high-risk parts of the system are fully tested.  
The project is stable, testable, and ready for further expansion.
