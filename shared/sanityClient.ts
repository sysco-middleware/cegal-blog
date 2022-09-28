import sanityClientLib from "@sanity/client";

export const sanityClient = sanityClientLib({
  projectId: "6hy93v4b",
  dataset: "production",
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!
  token: "", // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
});
