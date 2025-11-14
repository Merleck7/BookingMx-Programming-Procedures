import { drawGraph, findNearbyCities } from "../graph.js";

beforeAll(() => {
  // Mock CanvasRenderingContext2D
  HTMLCanvasElement.prototype.getContext = () => {
    return {
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
    };
  };
});

describe("Graph Visualization Module", () => {
  test("should correctly find nearby cities and distances", () => {
    const cities = [
      { name: "A", x: 0, y: 0 },
      { name: "B", x: 3, y: 4 }
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
    expect(() => drawGraph(canvas, [])).not.toThrow();
  });
});
