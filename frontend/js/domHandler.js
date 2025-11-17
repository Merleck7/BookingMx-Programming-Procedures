/**
 * Displays a message in the result container.
 * Used by form handlers and UI interactions.
 */
export function renderReservationResult(msg) {
  const el = document.getElementById("result");
  if (!el) return;

  el.textContent = "";     // Clear previous output
  el.textContent = msg;    // Set new result
}
