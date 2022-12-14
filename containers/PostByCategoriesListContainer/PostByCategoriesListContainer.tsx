import { format } from "date-fns";
import { GetStaticPaths, GetStaticProps } from "next";
import { config } from "shared/config";
import { defaultDateFormat } from "shared/dateHelpers";
import { sanityClient } from "shared/api/sanityClient";
import { BlogPost, Category } from "shared/types";
import { postsWithCategoriesGROQ } from "shared/api/queries";
import PostByCategoriesListPage from "./PostByCategoriesListPage";

export const getStaticPaths: GetStaticPaths = async () => {
  const query = '*[_type == "category"] {slug}';

  const posts: Category[] = await sanityClient.fetch(query);

  const paths = posts.map((post) => ({
    params: { id: post.slug.current },
  }));

  return { paths, fallback: true };
};

//[count((categories[]->slug.current)[@ in ["design-system"]]) > 0
// categories[]->slug.current == "design-system"
export const getStaticProps: GetStaticProps = async (context) => {
  const query = postsWithCategoriesGROQ;

  const posts: BlogPost[] = (
    (await sanityClient.fetch(query, {
      currentCategories: context.params?.id,
    })) as BlogPost[]
  ).map((current) => ({
    ...current,
    postedDate: format(new Date(current.updatedAt), defaultDateFormat),
    sumReactions: current.likeReactions + current.dislikeReactions,
  }));

  const getActiveCategory = (posts: BlogPost[]) => {
    if (posts.length === 0) {
      return null;
    }
    return posts[0]?.categories.find(
      (current) => current.slug.current === context.params?.id
    );
  };

  const activeCategory = getActiveCategory(posts);
  const notFound = activeCategory === null;

  const categories = posts
    .flatMap(({ categories }) => categories)
    .reduce<Category[]>((agg, current) => {
      if (!current) {
        return agg;
      }

      if (!agg?.some((item) => item?.id === current?.id || !agg.length)) {
        agg.push(current);
      }

      return agg;
    }, []);

  return {
    props: { posts, activeCategory, notFound, categories },
    revalidate: config.defaultRevalidateTime,
  };
};

export default PostByCategoriesListPage;
