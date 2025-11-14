/**
 * @jest-environment jsdom
 */

import { handleFormSubmit } from "../formHandler.js";
import * as reservationService from "../reservationService.js";
import * as domHandler from "../domHandler.js";

describe("Form Handler", () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="bookingForm">
        <input id="name" value="Luis" />
        <input id="nights" value="2" />
        <input id="price" value="1200" />
        <select id="roomType">
          <option value="double" selected>Double</option>
        </select>
      </form>
      <div id="result"></div>
    `;
  });

  test("successful form submission renders result", () => {
    jest.spyOn(reservationService, "validateReservation").mockReturnValue(true);
    jest.spyOn(reservationService, "calculateTotalPrice").mockReturnValue(2400);
    jest.spyOn(domHandler, "renderReservationResult").mockImplementation(() => {});

    handleFormSubmit();

    expect(reservationService.validateReservation).toHaveBeenCalled();
    expect(reservationService.calculateTotalPrice).toHaveBeenCalled();
    expect(domHandler.renderReservationResult).toHaveBeenCalledWith(
      "Total cost: $2400"
    );
  });

  test("invalid reservation shows error message", () => {
    jest.spyOn(reservationService, "validateReservation").mockImplementation(() => {
      throw new Error("Invalid data");
    });
    jest.spyOn(domHandler, "renderReservationResult");

    handleFormSubmit();

    expect(domHandler.renderReservationResult).toHaveBeenCalledWith(
      "Error: Invalid data"
    );
  });
});
