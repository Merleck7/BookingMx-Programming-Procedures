import { validateReservation, calculateTotalPrice } from "./reservationService.js";
import { renderReservationResult } from "./domHandler.js";

/**
 * Handles a simulated form submission.
 * Demonstrates validation + price calculation flow.
 */
export function handleFormSubmit() {
  try {
    // Normally extracted from a real HTML form
    const data = {
      name: "Luis",
      nights: 2,
      price: 1200,
      roomType: "double",
    };

    // Validate fields before processing
    validateReservation(data);

    // Compute final cost
    const total = calculateTotalPrice(data.nights, data.price);

    // Report to the UI
    renderReservationResult(`Total cost: $${total}`);
  } catch (err) {
    // Display error message instead of crashing the UI
    renderReservationResult("Error: Invalid data");
  }
}
