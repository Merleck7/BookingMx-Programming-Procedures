/**
 * @jest-environment jsdom
 */

import { renderReservationResult } from "../domHandler.js";

describe("DOM Handler", () => {

  beforeEach(() => {
    document.body.innerHTML = `<div id="result"></div>`;
  });

  test("renders correct result message", () => {
    renderReservationResult("Success!");
    expect(document.getElementById("result").textContent).toBe("Success!");
  });

  test("clears previous content before rendering", () => {
    document.getElementById("result").textContent = "Old content";
    renderReservationResult("New content");
    expect(document.getElementById("result").textContent).toBe("New content");
  });
});
