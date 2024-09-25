import { createClient } from "@sanity/client";


export const client = createClient({
  projectId: "efwp5woh",
  dataset: "production",
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: "2022-03-07", // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN, // Only if you want to update content with the client
});