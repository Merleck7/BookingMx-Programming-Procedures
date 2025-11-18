/**
 * -----------------------------------------------------------------------
 * Frontend controller for:
 *   - Nearby Cities Graph search
 *   - Reservation management (list, create, cancel)
 * 
 * Uses:
 *   graph.js → graphData, getNearbyCities
 *   api.js   → listReservations, createReservation, cancelReservation
 * -----------------------------------------------------------------------
 */

import { graphData, getNearbyCities, validateGraphData, buildGraph } from "./js/graph.js";
import { listReservations, createReservation, cancelReservation } from "./js/api.js";

/* ---------------------------------------------------------------------
   NEARBY CITIES GRAPH UI
------------------------------------------------------------------------*/

// DOM references
const form = document.getElementById("graph-form");
const destinationEl = document.getElementById("destination");
const maxDistanceEl = document.getElementById("maxDistance");
const nearbyList = document.getElementById("nearby-list");

// -------------------------------------------------------------
// Validate/build graph (kept for compatibility with earlier Sprints)
// -------------------------------------------------------------
const validation = validateGraphData(graphData);
const graph = validation.ok ? buildGraph() : null;

/**
 * Handles "Find Nearby" search.
 * Reads user input and displays cities reachable within maxDistance km.
 */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const dest = destinationEl.value.trim();
  const maxD = Number(maxDistanceEl.value);

  const results = getNearbyCities(dest, maxD);

  nearbyList.innerHTML = "";
  if (results.length === 0) {
    nearbyList.innerHTML = `<li>No nearby cities found. Check destination or adjust distance.</li>`;
    return;
  }

  results.forEach(r => {
    const li = document.createElement("li");
    li.textContent = `${r.city} — ${r.distance} km`;
    nearbyList.appendChild(li);
  });
});

/* ---------------------------------------------------------------------
   RESERVATION SYSTEM UI
------------------------------------------------------------------------*/

const resForm = document.getElementById("reservation-form");
const refreshBtn = document.getElementById("refresh");
const listEl = document.getElementById("reservation-list");

/**
 * Fetches reservation list from backend and renders it.
 */
async function refreshReservations() {
  listEl.innerHTML = "<li>Loading...</li>";

  try {
    const items = await listReservations();
    listEl.innerHTML = "";

    items.forEach(r => {
      const li = document.createElement("li");

      li.innerHTML = `
        <strong>#${r.id}</strong> ${r.guestName} @ ${r.hotelName}
        (${r.checkIn} → ${r.checkOut}) [${r.status}]
        <button data-id="${r.id}" class="cancel">Cancel</button>
      `;
      listEl.appendChild(li);
    });
  } catch (e) {
    listEl.innerHTML = `<li>Error: ${e.message}</li>`;
  }
}

/**
 * Creates a new reservation using backend API.
 */
resForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    guestName: document.getElementById("guestName").value.trim(),
    hotelName: document.getElementById("hotelName").value.trim(),
    checkIn: document.getElementById("checkIn").value,
    checkOut: document.getElementById("checkOut").value
  };

  try {
    await createReservation(payload);
    await refreshReservations();
    resForm.reset();
  } catch (err) {
    alert(err.message);
  }
});

/**
 * Handles reservation cancellation.
 */
listEl.addEventListener("click", async (e) => {
  const btn = e.target.closest(".cancel");
  if (!btn) return;

  const id = btn.getAttribute("data-id");

  try {
    await cancelReservation(id);
    await refreshReservations();
  } catch (err) {
    alert(err.message);
  }
});

// Initial load
refreshBtn.addEventListener("click", refreshReservations);
refreshReservations();
