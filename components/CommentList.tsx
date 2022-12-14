import { format } from "date-fns";
import { Comment } from "shared/types";
import { defaultDateFormat } from "shared/dateHelpers";

export function CommentList(props: {
  postId: string;
  comments: Comment[];
  myUserName: string;
}) {
  // TODO format comment date (new component)
  const getComment = (comment: Comment) => {
    const datePosted = comment.postedDate;
    return (
      <div
        className="my-2 flex flex-col rounded border border-solid border-contrast-dark p-1 hover:border-cegal-green"
        key={comment._id}
      >
        <div className="p-1 pr-3">
          <span className="text-xl text-cegal-green">{comment.author}</span>
          <span className="text-secondary-text-color">
            {" • "}
            {datePosted}
          </span>
        </div>
        <div className="bg-chat-blue w-max max-w-fit whitespace-pre rounded p-3 py-2">
          {comment.body}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold">Comments</h1>
      {props.comments.length === 0 && (
        <h2 className="text-center text-xl">No comments yet</h2>
      )}
      <div className="">{props.comments.map(getComment)}</div>
    </div>
  );
}
