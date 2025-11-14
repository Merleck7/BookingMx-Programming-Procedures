import { calculateTotalPrice, validateReservation } from "../reservationService.js";

describe("Reservation Service", () => {

  test("calculateTotalPrice returns correct cost", () => {
    expect(calculateTotalPrice(3, 1200)).toBe(3600);
    expect(calculateTotalPrice(1, 500)).toBe(500);
  });

  test("calculateTotalPrice handles invalid inputs", () => {
    expect(() => calculateTotalPrice(0, 1200)).toThrow();
    expect(() => calculateTotalPrice(-1, 1200)).toThrow();
    expect(() => calculateTotalPrice(3, -200)).toThrow();
  });

  test("validateReservation accepts valid data", () => {
    const valid = {
      name: "Luis",
      nights: 2,
      pricePerNight: 1000,
      roomType: "double",
    };
    expect(validateReservation(valid)).toBe(true);
  });

  test("validateReservation rejects invalid data", () => {
    expect(() => validateReservation({})).toThrow();
    expect(() => validateReservation({ name: "", nights: 1 })).toThrow();
    expect(() => validateReservation({ name: "Luis", nights: -3 })).toThrow();
  });
});
