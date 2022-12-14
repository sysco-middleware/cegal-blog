import { useCallback, useState, PropsWithChildren, forwardRef } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { toPlainText } from "@portabletext/react";
import { VirtuosoGrid } from "react-virtuoso";
import { BlogPostCard } from "components/BlogPostCard";
import { LoadingNewPage } from "components/LoadingNewPage";
import { config } from "shared/config";
import { BlogPost } from "shared/types";
import { PostListFilter, FilterValue } from "components/PostListFilter";

export type PostListPageProps = {
  posts: BlogPost[];
  categories?: BlogPost["categories"];
};

const PostListContainer = forwardRef<HTMLDivElement, PropsWithChildren<{}>>(
  ({ children, ...rest }, ref) => (
    <div {...rest} ref={ref} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {children}
    </div>
  )
);

PostListContainer.displayName = "PostListContainer";

const filterPosts = (posts: BlogPost[], filterValue: FilterValue) => {
  let filteredPosts = [...posts];

  if (filterValue.categories.length) {
    const categoryIds =
      filterValue?.categories?.map(
        (value: { label: string; value: string }) => value.value
      ) || [];
    filteredPosts = filteredPosts.filter((post) => {
      const postCategoryIds =
        post.categories?.map((category) => category.id) || [];

      return categoryIds.every((id: string) => postCategoryIds.includes(id));
    });
  }

  if (filterValue.search) {
    filteredPosts = filteredPosts.filter((post) => {
      const bodyText = toPlainText(post.body)?.toLowerCase();
      const ingressText = post.ingress.toLowerCase();
      const authorText = post.author.name.toLowerCase();
      const titleText = post.title.toLowerCase();
      const searchText = filterValue.search.toLowerCase();

      return (
        bodyText.includes(searchText) ||
        ingressText.includes(searchText) ||
        authorText.includes(searchText) ||
        titleText.includes(searchText)
      );
    });
  }

  return filteredPosts;
};

export const PostListPage: NextPage<PostListPageProps> = ({
  posts,
  categories,
}) => {
  const router = useRouter();
  const [filterValue, setFilterValue] = useState<FilterValue>({
    search: "",
    categories: [],
  });
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleFilterChange = useCallback(
    (value: FilterValue) => {
      setFilterValue(value);
      setFilteredPosts(filterPosts(posts, value));
    },
    [posts]
  );

  if (router.isFallback) {
    return <LoadingNewPage />;
  }

  return (
    <>
      <Head>
        <title>{config.metaTags.title}</title>
        <meta name="description" content={config.metaTags.mainDescription} />
      </Head>

      <PostListFilter
        categories={categories}
        onFilterChange={handleFilterChange}
        filterValue={filterValue}
      />
      <section>
        <VirtuosoGrid
          useWindowScroll
          data={filteredPosts}
          totalCount={filteredPosts.length}
          overscan={20}
          components={{
            List: PostListContainer,
          }}
          itemContent={(_, item) => (
            <BlogPostCard
              title={item.title}
              slug={item.slug}
              imageUrl={item.image.url}
              categories={item.categories}
              postedDate={item.postedDate}
              ingress={item.ingress}
              sumReactions={item.sumReactions}
              sumComments={item.sumComments}
              author={item.author}
              body={item.body}
              createdAt={item.createdAt}
            />
          )}
        />
      </section>
    </>
  );
};
