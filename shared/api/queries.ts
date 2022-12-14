import { config } from "../config";

export const postType = `*[_type == "post"]`;
const postTypeToEqualSlug = `*[_type == "post" && slug.current == $postSlug]`;
export const sortCreatedDescending = `order(_createdAt desc)`;

const imageFieldData = `{"url": mainImage.asset->url, "dimensions": mainImage.asset -> metadata.dimensions, "slug": mainImage.slug }`;
const authorFieldData = `{name, slug, email, title, "imageUrl": image.asset->url }`;
const categoriesFieldData = `{title, slug, "id": _id }`;

const postData = `{
    title,
    author->${authorFieldData},
    body,
    ingress,
    slug,
    "image":${imageFieldData},
    likeReactions,
    dislikeReactions,
    "id": _id,
    "createdAt": _createdAt,
    "updatedAt": _updatedAt,
    categories[]->${categoriesFieldData},
    "sumComments": count(*[_type == "comment" && postId._ref == ^._id]),
    "sumReactions": likeReactions + dislikeReactions
}`;

const singlePostData = `{
    title,
    ingress,
    author->${authorFieldData},
    body,
    "image": ${imageFieldData},
    youtubeVideo,
    categories[]->${categoriesFieldData},
    "id": _id,
    "createdAt": _createdAt,
    "updatedAt": _updatedAt,
    likeReactions,
    dislikeReactions
  }`;

const comments =
  '*[_type == "comment" && postId._ref == $postId && approved == true] | order(_createdAt asc) {postId, author, "postedDate": _createdAt, approved, body, _id, _createdAt, _updatedAt}';

export const allPostsGROQ = `${postType} | ${sortCreatedDescending} ${postData}`;
export const singlePostGROQ = `${postTypeToEqualSlug} | ${sortCreatedDescending} ${singlePostData}`;
export const paginatedPostsGROQ = `${postType} | ${sortCreatedDescending} [0...${config.postsPerPage}] ${postData}`;
export const postsWithCategoriesGROQ = `*[_type == "post" && count((categories[]->slug.current)[@ in [$currentCategories]]) > 0 ] | ${sortCreatedDescending} ${postData}`;
