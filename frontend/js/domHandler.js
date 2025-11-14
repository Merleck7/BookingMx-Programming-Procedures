export function renderReservationResult(msg) {
  const el = document.getElementById("result");
  if (!el) return;

  el.textContent = ""; // limpiar antes
  el.textContent = msg;
}

