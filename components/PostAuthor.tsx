import Image from "next/image";
import { Author } from "shared/types";

type PostAuthorProps = {
  author: Author;
};

export function PostAuthor({ author }: PostAuthorProps) {
  return (
    <div className="flex items-center pb-4">
      <div className="relative mr-2 h-14 w-14" style={{ position: "relative" }}>
        <Image
          alt={author?.slug?.current || "avatar-missing"}
          className="rounded-full"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={author?.imageUrl || "/avatar-missing.png"}
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </div>

      <div className="flex flex-col justify-center">{author?.name}</div>
    </div>
  );
}
