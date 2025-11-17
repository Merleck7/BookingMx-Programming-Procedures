/**
 * DOM Handler Unit Tests
 * -----------------------
 * These tests validate the behavior of the UI rendering helper functions.
 * The goal is to ensure consistent DOM updates when displaying reservation
 * results to the user interface.
 *
 * Test environment: JSDOM
 */

import { renderReservationResult } from "../domHandler.js";

describe("DOM Handler", () => {

  beforeEach(() => {
    // Prepare mock DOM structure before each test
    document.body.innerHTML = `<div id="result"></div>`;
  });

  test("renders correct result message", () => {
    // Should insert the desired message into the result container
    renderReservationResult("Success!");
    expect(document.getElementById("result").textContent).toBe("Success!");
  });

  test("clears previous content before rendering", () => {
    // Ensures old content is replaced with new output
    document.getElementById("result").textContent = "Old content";
    renderReservationResult("New content");
    expect(document.getElementById("result").textContent).toBe("New content");
  });
});
