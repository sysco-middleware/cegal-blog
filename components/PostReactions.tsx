import { useState } from "react";
import { ThumbUp, ThumbDown } from "@cegal/ui-icons";
import { Button } from "@cegal/ui-components";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { httpClient } from "../shared/api/httpClient";
import { Reaction, SingleBlogPost, ReactionName } from "shared/types";

type PostReactionsProps = {
  post: SingleBlogPost;
};

export function PostReactions({ post }: PostReactionsProps) {
  const reactions: Reaction[] = [
    {
      emoji: <ThumbUp size={25} />,
      emojiName: ReactionName.Like,
      count: post?.likeReactions ?? 0,
    },
    {
      emoji: <ThumbDown size={25} />,
      emojiName: ReactionName.Dislike,
      count: post?.dislikeReactions ?? 0,
    },
  ];
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [lastVotedEmoji, setLastVotedEmoji] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const addReaction = async (emoji: string) => {
    const submitReaction = async (
      emoji: string,
      postId: string,
      change: 1 | -1
    ) => {
      if (!executeRecaptcha) {
        console.error("Execute recaptcha not yet available");
        return;
      }
      const recaptchaToken = await executeRecaptcha("reaction");

      await httpClient.post("/api/reaction", {
        emoji,
        postId: postId,
        change,
        recaptchaToken: recaptchaToken,
      });
    };

    // save selection to local storage? TODO
    // how to limit 1 time pr article? TODO Do we need this?
    if (selectedEmoji === emoji) {
      setSelectedEmoji("");
      setLastVotedEmoji("");
      await submitReaction(emoji, post.id, -1);
      return;
    }
    setSelectedEmoji(emoji);
    setLastVotedEmoji(emoji);
    if (lastVotedEmoji.length == 2) {
      await submitReaction(lastVotedEmoji, post.id, -1);
    }
    await submitReaction(emoji, post.id, 1);
  };

  return (
    <div className="flex space-x-2">
      {reactions.map((reaction) => (
        <div key={reaction.emojiName} className="">
          <Button
            className={`flex flex-row items-baseline justify-center rounded-3xl p-4 text-2xl `}
            icon={reaction.emoji}
            iconPosition="left"
            variant="tertiary"
            onClick={() => addReaction(reaction.emojiName)}
          >
            <span className="ml-2">
              {reaction.count + (reaction.emojiName === selectedEmoji ? 1 : 0)}
            </span>
          </Button>
        </div>
      ))}
    </div>
  );
}
