import { validateReservation, calculateTotalPrice } from "./reservationService.js";
import { renderReservationResult } from "./domHandler.js";

export function handleFormSubmit() {
  try {
    const data = {
      name: "Luis",
      nights: 2,
      price: 1200,
      roomType: "double",
    };

    validateReservation(data);
    const total = calculateTotalPrice(data.nights, data.price);

    renderReservationResult(`Total cost: $${total}`);
  } catch (err) {
    renderReservationResult("Error: Invalid data");
  }
}

