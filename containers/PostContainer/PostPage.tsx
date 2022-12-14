import { useEffect, useMemo, useRef, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { toPlainText } from "@portabletext/react";
import { CommentList } from "components/CommentList";
import { LoadingNewPage } from "components/LoadingNewPage";
import { NewComment } from "components/NewComment";
import { PortableTextComponent } from "components/portable-text/PortableTextComponent";
import { PostAuthor } from "components/PostAuthor";
import { PostCategoriesList } from "components/PostCategoriesList";
import { PostReactions } from "components/PostReactions";
import { YoutubeVideo } from "components/YoutubeVideo";
import { DateTimeToRead } from "components/DateTimeToRead";
import { config } from "shared/config";
import { SingleBlogPost, Comment } from "shared/types";
import { format, parseISO } from "date-fns";
import { defaultDateFormat } from "shared/dateHelpers";

const PostPage: NextPage<{
  post: SingleBlogPost;
  comments: Comment[];
  notFound: boolean;
}> = (props) => {
  const [myUserName, setMyUserName] = useState("");
  const isFirstRun = useRef(true);
  const datePosted = props.post?.updatedAt;

  const router = useRouter();

  const loadLastUserName = () => {
    const storedValue =
      localStorage.getItem(config.localStorageKeys.myUserName) || "";
    setMyUserName(storedValue);
  };

  useEffect(() => {
    if (isFirstRun.current) {
      loadLastUserName();
      isFirstRun.current = false;
      return;
    }
    localStorage.setItem(config.localStorageKeys.myUserName, myUserName);
  }, [myUserName]);

  if (props.notFound) {
    return <h1 className="text-center text-4xl">Post not found</h1>;
  }

  if (router.isFallback) {
    return <LoadingNewPage />;
  }

  return (
    <>
      <Head>
        {/* Meta and open graph meta tags (FB for example) */}
        <title>{`${props.post.title} - ${config.metaTags.title}`}</title>
        <meta
          name="description"
          content={`${props.post.ingress} written by ${props.post.author.name}`}
        />
        <meta
          property="og:title"
          content={`${props.post.title} - ${config.metaTags.title}`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:description"
          content={`${props.post.ingress} written by ${props.post.author.name}`}
        />
      </Head>
      <div>
        <div className="relative mb-8 h-28">
          <Image
            className="mb-4 h-9"
            src={props.post.image.url}
            alt={`main-image-for-post-${props.post.slug?.current}`}
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
        <div className="flex justify-between">
          <PostAuthor author={props.post.author} />
          <PostReactions post={props.post} />
        </div>

        <h1 className="mb-2 text-left text-4xl">{props.post.title}</h1>
        <div className="pb-4 text-secondary-text-color">
          <DateTimeToRead postedDate={datePosted} body={props.post.body} />
        </div>
        <div className="my-2 flex overflow-auto whitespace-nowrap scrollbar-hide">
          <PostCategoriesList categories={props.post.categories} />
        </div>
        <p className="break-all py-6 text-lg">{props.post.ingress}</p>
        <div className="break-all">
          <PortableTextComponent content={props.post.body} />
        </div>

        {props.post.youtubeVideo && (
          <YoutubeVideo id={props.post.youtubeVideo} />
        )}

        <CommentList
          myUserName={myUserName}
          postId={props.post.id}
          comments={props.comments}
        />
        <NewComment
          postId={props.post.id}
          myUserName={myUserName}
          setMyUserName={setMyUserName}
        />
      </div>
    </>
  );
};

export default PostPage;
