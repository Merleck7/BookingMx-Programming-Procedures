// Graph data structures and algorithms for nearby-city operations.
// Functions are kept pure to ensure high testability with Jest.

// ---------------------------------------------------------------------------
// Sample dataset used by the frontend graph UI.
// This must be exported because app.js imports it.
// ---------------------------------------------------------------------------
export const sampleData = {
  cities: ["A", "B", "C", "D"],
  edges: [
    { from: "A", to: "B", distance: 120 },
    { from: "A", to: "C", distance: 300 },
    { from: "B", to: "D", distance: 200 },
    { from: "C", to: "D", distance: 150 }
  ]
};

/**
 * Represents an undirected weighted graph of cities.
 */
export class Graph {
  constructor() {
    this.adj = new Map(); // city -> Array<{to, distance}>
  }

  addCity(name) {
    if (!name || typeof name !== "string") throw new Error("Invalid city name");
    if (!this.adj.has(name)) this.adj.set(name, []);
  }

  addEdge(from, to, distanceKm) {
    if (!this.adj.has(from) || !this.adj.has(to)) throw new Error("Unknown city");
    if (!Number.isFinite(distanceKm) || distanceKm < 0) throw new Error("Invalid distance");

    this.adj.get(from).push({ to, distance: distanceKm });
    this.adj.get(to).push({ to: from, distance: distanceKm });
  }

  neighbors(city) {
    if (!this.adj.has(city)) throw new Error("Unknown city");
    return [...this.adj.get(city)];
  }
}

/**
 * Validates raw dataset before building a graph instance.
 */
export function validateGraphData({ cities, edges }) {
  if (!Array.isArray(cities) || !Array.isArray(edges))
    return { ok: false, reason: "cities/edges must be arrays" };

  const citySet = new Set(cities);
  if (citySet.size !== cities.length) return { ok: false, reason: "duplicate cities" };

  for (const c of cities)
    if (typeof c !== "string" || !c.trim()) return { ok: false, reason: "invalid city entry" };

  for (const e of edges) {
    const { from, to, distance } = e ?? {};
    if (!citySet.has(from) || !citySet.has(to))
      return { ok: false, reason: "edge references unknown city" };
    if (!Number.isFinite(distance) || distance < 0)
      return { ok: false, reason: "invalid distance" };
  }

  return { ok: true };
}

export function buildGraph(cities, edges) {
  const g = new Graph();
  for (const c of cities) g.addCity(c);
  for (const { from, to, distance } of edges) g.addEdge(from, to, distance);
  return g;
}

export function getNearbyCities(graph, destination, maxDistanceKm = 250) {
  if (!(graph instanceof Graph)) throw new Error("graph must be Graph");
  if (typeof destination !== "string" || !graph.adj.has(destination)) return [];

  const neighbors = graph.neighbors(destination);

  return neighbors
    .filter(n => n.distance <= maxDistanceKm)
    .sort((a, b) => a.distance - b.distance)
    .map(n => ({ city: n.to, distance: n.distance }));
}

export function findNearbyCities(origin, cities) {
  if (!origin || !Array.isArray(cities))
    throw new Error("Invalid city data");

  if (cities.length === 0) return [];

  return cities
    .filter(c => c.name !== origin.name)
    .map(c => {
      const dx = c.x - origin.x;
      const dy = c.y - origin.y;
      return { ...c, distance: Math.sqrt(dx * dx + dy * dy) };
    })
    .sort((a, b) => a.distance - b.distance);
}

export function drawGraph(canvas, cities) {
  if (!canvas || !canvas.getContext)
    throw new Error("Invalid canvas element");

  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  cities.forEach(city => {
    ctx.beginPath();
    ctx.arc(city.x ?? 0, city.y ?? 0, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}
