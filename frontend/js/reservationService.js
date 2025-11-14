export function calculateTotalPrice(nights, pricePerNight) {
  if (!Number.isFinite(nights) || nights <= 0) throw new Error("Invalid nights");
  if (!Number.isFinite(pricePerNight) || pricePerNight <= 0) throw new Error("Invalid price");

  return nights * pricePerNight;
}

export function validateReservation(data) {
  if (!data) throw new Error("Invalid data");
  if (!data.name || typeof data.name !== "string") throw new Error("Invalid name");
  if (!Number.isFinite(data.nights) || data.nights <= 0) throw new Error("Invalid nights");
  if (!data.roomType || typeof data.roomType !== "string") throw new Error("Invalid room type");

  return true; 
}
