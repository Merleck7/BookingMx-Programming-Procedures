// Minimal API client for the backend reservations module.
// Designed to stay lightweight and easy to mock in Jest tests.

const BASE_URL = "http://localhost:8080/api/reservations";

/**
 * Fetches the full list of reservations from the backend.
 * Throws if the network request fails.
 */
export async function listReservations() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch reservations");
  return res.json();
}

/**
 * Sends a POST request to create a new reservation.
 * @param {Object} payload - Reservation data (guest, dates, hotel, etc.)
 */
export async function createReservation(payload) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  // Extract error detail when possible
  if (!res.ok) throw new Error((await res.json()).message || "Create failed");
  return res.json();
}

/**
 * Updates an existing reservation via PUT.
 */
export async function updateReservation(id, payload) {
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error((await res.json()).message || "Update failed");
  return res.json();
}

/**
 * Cancels a reservation via DELETE.
 */
export async function cancelReservation(id) {
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`, {
    method: "DELETE"
  });

  if (!res.ok) throw new Error((await res.json()).message || "Cancel failed");
  return res.json();
}
