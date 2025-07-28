import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "1k8147nt",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
});
