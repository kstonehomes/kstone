/* eslint-disable @typescript-eslint/no-explicit-any */
const alwaysIncluded = new Set([
  "basementSqft",
  "bathrooms",
  "bedrooms",
  "garageSuiteSqft",
  "mainHouseSqft",
  "sqft",
]);

export function hasKeyFeature(data: Record<string, any>): boolean {
  return Object.entries(data).some(([key, value]) => {
    if (alwaysIncluded.has(key)) return false;
    return value !== null && value !== "N/A" && value !== "";
  });
}
