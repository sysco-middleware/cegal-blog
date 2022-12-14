import { sanityClient } from "./sanityClient";
import { SanitySlug } from "../types";

interface OnlySlug {
  slug: SanitySlug;
}

export const getPostSlug = async (postId: string) => {
  const query = '*[_type == "post" && _id == $postId] | {slug}';

  const posts: OnlySlug[] = (await sanityClient.fetch(query, {
    postId,
  })) as OnlySlug[];
  if (posts.length !== 1) {
    return null;
  }
  return posts[0];
};
