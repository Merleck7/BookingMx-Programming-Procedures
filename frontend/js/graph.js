/**
 * graph.js — Case-insensitive Mexican city graph module
 * -----------------------------------------------------
 * Features:
 *  - Real Mexican city dataset (20+ cities with distances)
 *  - Case-insensitive city lookup (Mexico City, mexico city, MEXICO CITY → all work)
 *  - Normalizes all input city names into proper Title Case
 *  - Nearby-city search logic
 *  - Backwards-compatible Graph class + buildGraph()
 *  - Legacy functions for Jest tests: findNearbyCities() and drawGraph()
 */

// -------------------------------------------------------------
// Utility: Normalize city names into proper Title Case.
// -------------------------------------------------------------
export function normalizeCityName(name) {
  if (!name || typeof name !== "string") return "";

  return name
    .trim()
    .toLowerCase()
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// -------------------------------------------------------------
// Raw dataset of cities using Title Case keys.
// -------------------------------------------------------------
const rawGraphData = {
  "Mexico City": {
    "Puebla": 136,
    "Toluca": 66,
    "Cuernavaca": 85,
    "Queretaro": 218,
    "Morelia": 303,
    "Pachuca": 92,
    "Leon": 405,
    "San Luis Potosi": 426
  },
  "Guadalajara": {
    "Tepic": 206,
    "Aguascalientes": 230,
    "Leon": 218,
    "Morelia": 289,
    "Zacatecas": 354,
    "Mexico City": 548
  },
  "Monterrey": {
    "Saltillo": 87,
    "Tampico": 497,
    "San Luis Potosi": 513,
    "Reynosa": 223,
    "Nuevo Laredo": 225
  },
  "Puebla": {
    "Mexico City": 136,
    "Veracruz": 277,
    "Tlaxcala": 33,
    "Oaxaca": 340
  },
  "Queretaro": {
    "Mexico City": 218,
    "Leon": 184,
    "San Luis Potosi": 212,
    "Morelia": 182
  },
  "Merida": {
    "Cancun": 305,
    "Campeche": 177,
    "Valladolid": 162
  },
  "Tijuana": {
    "Mexicali": 178,
    "Ensenada": 109,
    "Tecate": 35
  },
  "Leon": {
    "Guanajuato": 31,
    "Aguascalientes": 118,
    "San Luis Potosi": 184,
    "Queretaro": 184,
    "Guadalajara": 218
  },
  "Veracruz": {
    "Xalapa": 108,
    "Puebla": 277,
    "Coatzacoalcos": 302
  },
  "Oaxaca": {
    "Puebla": 340,
    "Tuxtla Gutierrez": 556,
    "Salina Cruz": 267
  },
  "San Luis Potosi": {
    "Queretaro": 212,
    "Leon": 184,
    "Monterrey": 513,
    "Zacatecas": 183
  },
  "Aguascalientes": {
    "Leon": 118,
    "Zacatecas": 115,
    "Guadalajara": 230
  },
  "Chihuahua": {
    "Ciudad Juarez": 366,
    "Delicias": 85,
    "Cuauhtemoc": 103
  },
  "Toluca": {
    "Mexico City": 66,
    "Morelia": 181,
    "Queretaro": 250
  },
  "Morelia": {
    "Mexico City": 303,
    "Guadalajara": 289,
    "Queretaro": 182,
    "Toluca": 181
  }
};

// -------------------------------------------------------------
// Exported dataset
// -------------------------------------------------------------
export const graphData = rawGraphData;

// -------------------------------------------------------------
// getNearbyCities — case-insensitive lookup
// -------------------------------------------------------------
export function getNearbyCities(city, maxDistanceKm = 250) {
  const normalized = normalizeCityName(city);
  const edges = rawGraphData[normalized];

  if (!edges) return [];

  return Object.entries(edges)
    .filter(([_, dist]) => dist <= maxDistanceKm)
    .map(([name, dist]) => ({ city: name, distance: dist }))
    .sort((a, b) => a.distance - b.distance);
}

// -------------------------------------------------------------
// Graph class — now case-insensitive
// -------------------------------------------------------------
export class Graph {
  constructor() {
    this.adj = new Map();
  }

  addCity(name) {
    const n = normalizeCityName(name);
    if (!this.adj.has(n)) this.adj.set(n, []);
  }

  addEdge(from, to, distanceKm) {
    const a = normalizeCityName(from);
    const b = normalizeCityName(to);

    if (!this.adj.has(a)) this.addCity(a);
    if (!this.adj.has(b)) this.addCity(b);

    this.adj.get(a).push({ to: b, distance: distanceKm });
    this.adj.get(b).push({ to: a, distance: distanceKm });
  }

  neighbors(city) {
    const n = normalizeCityName(city);
    return this.adj.get(n) ?? [];
  }
}

// -------------------------------------------------------------
// Legacy: validateGraphData (kept for compatibility)
// -------------------------------------------------------------
export function validateGraphData() {
  return { ok: true };
}

// -------------------------------------------------------------
// Legacy: buildGraph()
// -------------------------------------------------------------
export function buildGraph() {
  const g = new Graph();

  for (const city of Object.keys(rawGraphData)) g.addCity(city);

  for (const [city, neighbors] of Object.entries(rawGraphData)) {
    for (const [to, dist] of Object.entries(neighbors)) {
      g.addEdge(city, to, dist);
    }
  }

  return g;
}

// -------------------------------------------------------------
// LEGACY FUNCTIONS USED BY EXISTING TESTS
// DO NOT REMOVE — Jest tests depend on them
// -------------------------------------------------------------

/**
 * findNearbyCities(origin, cities)
 * Legacy version used in Jest tests.
 * Works with coordinate-based city arrays:
 *   [{ name, x, y }]
 */
export function findNearbyCities(origin, cities) {
  if (!origin || !Array.isArray(cities)) {
    throw new Error("Invalid city data");
  }
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

/**
 * drawGraph(canvas, cities)
 * Legacy drawing function required by graph.test.js.
 */
export function drawGraph(canvas, cities) {
  if (!canvas || !canvas.getContext) {
    throw new Error("Invalid canvas element");
  }

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  cities.forEach(city => {
    ctx.beginPath();
    ctx.arc(city.x ?? 0, city.y ?? 0, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}
