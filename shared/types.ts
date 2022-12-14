import { PortableTextBlock } from "@portabletext/types";

export type SanitySlug = {
  _type: string;
  current: string;
};

export type BlogPost = {
  author: Author;
  title: string;
  body: PortableTextBlock[];
  ingress: string;
  postedDate: string;
  categories: Category[];
  image: BlogPostImage;
  likeReactions: number;
  dislikeReactions: number;
  sumReactions: number;
  sumComments: number;
  slug: SanitySlug;
  id: string;
  createdAt: string;
  updatedAt: string;
};

type BlogPostImage = {
  url: string;
  dimensions: {
    _type: string;
    aspectRatio: number;
    height: number;
    width: number;
  };
};

export type SingleBlogPost = BlogPost & {
  youtubeVideo: string;
};

export type Author = {
  email: string;
  imageUrl: string;
  name: string;
  slug: SanitySlug;
  title: string;
};

export interface Category {
  title: string;
  slug: SanitySlug;
  id: string;
}

export interface Comment {
  body: string;
  author: string;
  _createdAt: string;
  postedDate: string;
  _id: string;
}

export interface Reaction {
  emoji: React.ReactNode;
  emojiName: ReactionName;
  count: number;
}

export enum ReactionName {
  Like = "likeReactions",
  Dislike = "dislikeReactions",
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
}
