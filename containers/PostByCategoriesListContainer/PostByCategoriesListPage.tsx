import { format } from "date-fns";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { BlogPostCard } from "components/BlogPostCard";
import { LoadingNewPage } from "components/LoadingNewPage";
import { config } from "shared/config";
import { defaultDateFormat } from "shared/dateHelpers";
import { sanityClient } from "shared/api/sanityClient";
import { BlogPost, Category } from "shared/types";
import { postsWithCategoriesGROQ } from "shared/api/queries";
import {
  PostListPage,
  PostListPageProps,
} from "containers/PostListContainer/PostListPage";

interface PostByCategoriesListPageProps extends PostListPageProps {
  activeCategory: Category;
  notFound: boolean;
}

const PostByCategoriesListPage: NextPage<PostByCategoriesListPageProps> = (
  props
) => {
  const router = useRouter();

  if (props.notFound) {
    return <h1 className="text-center text-4xl">Category not found</h1>;
  }

  if (router.isFallback) {
    return <LoadingNewPage />;
  }

  return (
    <>
      <Head>
        <title>{`${props.activeCategory.title} - ${config.metaTags.title}`}</title>
        <meta name="description" content={config.metaTags.mainDescription} />
      </Head>
      <h1 className="my-8 text-center text-2xl">
        All posts with category:{" "}
        <span className="font-bold">{props.activeCategory.title}</span>
      </h1>
      <PostListPage posts={props.posts} />
    </>
  );
};

export default PostByCategoriesListPage;
