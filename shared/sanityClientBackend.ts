import sanityClientLib from "@sanity/client";

// ONLY use in API(backend) folder
export const sanityClientBackend = sanityClientLib({
  projectId: "6hy93v4b",
  dataset: "production",
  token: process.env.SANITY_BACKEND_TOKEN || "",
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!
  useCdn: false, // `false` if you want to ensure fresh data
});
