import { GetStaticPaths, GetStaticProps } from "next";
import { sanityClient } from "shared/api/sanityClient";
import { config } from "shared/config";
import { SingleBlogPost } from "shared/types";
import {
  singlePostGROQ,
  sortCreatedDescending,
  postType,
} from "shared/api/queries";
import { Comment } from "shared/types";
import PostPage from "./PostPage";
import { format } from "date-fns";
import { defaultDateFormat } from "shared/dateHelpers";

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `${postType} | ${sortCreatedDescending} {slug}`;
  const posts: Pick<SingleBlogPost, "slug">[] = await sanityClient.fetch(query);

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post?.slug?.current },
  }));

  // fallback -> router.isFallback if 404
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const loadPost = async (postSlug: string) => {
    const query = singlePostGROQ;

    const posts: SingleBlogPost[] = (await sanityClient.fetch(query, {
      postSlug,
    })) as SingleBlogPost[];
    if (posts?.length !== 1) {
      return null;
    }
    const post = posts?.[0];

    return post;
  };
  const loadComments = async (postId: string) => {
    const query = `*[_type == "comment" && postId._ref == $postId && approved == true] | ${sortCreatedDescending} {postId, author, "postedDate": _createdAt, approved, body, _id, _createdAt, _updatedAt}`;

    const comments: Comment[] = (await sanityClient.fetch(query, {
      postId,
    })) as Comment[];

    return comments.map((comment) => ({
      ...comment,
      postedDate: format(new Date(comment._createdAt), defaultDateFormat),
    }));
  };

  if (Array.isArray(context.params?.id)) {
    throw new Error("Post not found");
  }

  const post = await loadPost(context.params?.id ?? "-1");
  post &&
    (post.updatedAt = format(new Date(post?.updatedAt), defaultDateFormat));
  const comments = await loadComments(post?.id ?? "-1");
  const notFound = post === null;

  return {
    props: { post, comments, notFound },
    revalidate: config.defaultRevalidateTime,
  };
};

export default PostPage;
