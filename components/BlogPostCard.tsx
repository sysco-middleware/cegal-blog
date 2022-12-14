import Image from "next/image";
import Link from "next/link";
import { BlogPost, SanitySlug } from "shared/types";
import { getMinToRead } from "utils/blog";
import { PostAuthor } from "./PostAuthor";
import { PostCategoriesList } from "./PostCategoriesList";
import { DateTimeToRead } from "./DateTimeToRead";

type BlogPostCardProps = Pick<
  BlogPost,
  "author" | "categories" | "body" | "createdAt"
> & {
  title: string;
  slug: SanitySlug;
  postedDate: string;
  imageUrl: string;
  ingress: string;
  sumReactions: number;
  sumComments: number;
};

export function BlogPostCard({
  title,
  author,
  slug,
  categories,
  postedDate,
  imageUrl,
  ingress,
  sumReactions,
  sumComments,
  body,
}: BlogPostCardProps) {
  const readTime = getMinToRead(body);

  return (
    <div className="flex h-[420px] min-w-[280px] flex-1 flex-col  rounded border border-contrast-dark shadow-md hover:border-cegal-green">
      <div className="relative h-20" style={{ position: "relative" }}>
        <Image
          alt={`main-image-for-post-${slug?.current}`}
          className="rounded-t"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={imageUrl}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-grow flex-col items-stretch justify-between px-6 py-4">
        <div>
          <PostAuthor author={author} />
          <div className="my-2 flex overflow-auto whitespace-nowrap scrollbar-hide">
            <PostCategoriesList categories={categories} />
          </div>

          <Link key={title} href={"/blog/post/" + slug.current}>
            <span className="flex flex-col items-baseline py-4 pr-4 text-sm font-normal text-secondary-text-color">
              <h5 className="overflow-hidden text-ellipsis pr-2 text-xl font-bold tracking-tight text-white line-clamp-1">
                {title}
              </h5>

              <DateTimeToRead body={body} postedDate={postedDate} />
            </span>
            <div className="mb-3 flex-grow  overflow-hidden text-ellipsis font-normal text-gray-400 line-clamp-3">
              {ingress}
            </div>
          </Link>
        </div>
        <div className="justify-self-bottom flex flex-row  space-x-4 ">
          <div>{sumReactions} reactions</div>
          <div>{sumComments} comments</div>
        </div>
      </div>
    </div>
  );
}
