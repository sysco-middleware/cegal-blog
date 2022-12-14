import NextLink from "next/link";
import { Category } from "shared/types";

type PostCategoriesListProps = {
  categories: Category[];
};

export function PostCategoriesList(props: PostCategoriesListProps) {
  return (
    <>
      {props.categories &&
        props.categories.map(({ slug, title, id }) => (
          <span
            key={id}
            className="mr-4 rounded-full border border-cegal-green px-4 text-cegal-green opacity-60  hover:opacity-100"
          >
            <NextLink href={"/category/" + slug.current} passHref>
              {title}
            </NextLink>
          </span>
        ))}
    </>
  );
}
