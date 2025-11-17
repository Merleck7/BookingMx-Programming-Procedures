/**
 * Graph Module Unit Tests
 * ------------------------
 * This suite verifies:
 *  - Distance calculation between cities
 *  - Edge cases such as empty lists and invalid data
 *  - Graph rendering safety (ensures no crashes occur)
 *
 * CanvasRenderingContext2D is mocked because JSDOM does not implement it.
 */

import { drawGraph, findNearbyCities } from "../graph.js";

// Provide a canvas context mock before tests run
beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = () => ({
    clearRect: jest.fn(),
    beginPath: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
  });
});

describe("Graph Visualization Module", () => {

  test("should correctly find nearby cities and distances", () => {
    const cities = [
      { name: "A", x: 0, y: 0 },
      { name: "B", x: 3, y: 4 } // 5 units away (3-4-5 triangle)
    ];

    const result = findNearbyCities(cities[0], cities);
    expect(result[0].distance).toBe(5);
  });

  test("should handle empty city lists", () => {
    const result = findNearbyCities({ name: "A", x: 0, y: 0 }, []);
    expect(result).toEqual([]);
  });

  test("should throw error if city data is invalid", () => {
    expect(() => findNearbyCities(null, null)).toThrow();
  });

  test("drawGraph should not crash with valid data", () => {
    document.body.innerHTML = '<canvas id="graph"></canvas>';
    const canvas = document.getElementById("graph");

    // drawGraph should safely execute
    expect(() => drawGraph(canvas, [])).not.toThrow();
  });
});
