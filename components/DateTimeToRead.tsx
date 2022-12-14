import { BlogPost } from "shared/types";
import { getMinToRead } from "utils/blog";

type DateTimeToReadProps = {
  body: BlogPost["body"];
  postedDate: string;
};

export const DateTimeToRead = ({ body, postedDate }: DateTimeToReadProps) => {
  const readTime = getMinToRead(body);

  return (
    <span className="whitespace-nowrap">
      {postedDate}
      {typeof readTime === "number" && (
        <>
          <span className="px-1">{"-"}</span>
          <span>{readTime} min read</span>
        </>
      )}
    </span>
  );
};
