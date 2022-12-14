import { format } from "date-fns";
import { GetStaticProps } from "next";
import { config } from "shared/config";
import { defaultDateFormat } from "shared/dateHelpers";
import { sanityClient } from "shared/api/sanityClient";
import { BlogPost, Category } from "shared/types";
import { allPostsGROQ } from "shared/api/queries";
import { PostListPage } from "./PostListPage";

export const getStaticProps: GetStaticProps = async () => {
  const query = allPostsGROQ;

  const posts: BlogPost[] = (
    (await sanityClient.fetch(query)) as BlogPost[]
  ).map((current) => ({
    ...current,
    postedDate: format(new Date(current.createdAt), defaultDateFormat),
  }));

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
    props: {
      posts,
      categories,
    },
    revalidate: config.defaultRevalidateTime,
  };
};

export default PostListPage;
