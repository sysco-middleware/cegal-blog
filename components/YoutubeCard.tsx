/* eslint-disable @next/next/no-img-element */
import { Video } from "shared/types";

interface Props {
  video: Video;
}

export function YoutubeCard(props: Props) {
  return (
    <a
      href={"https://www.youtube.com/watch?v=" + props.video.id}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex justify-center">
        <div className="flex flex-col rounded-xl bg-white shadow-lg md:flex-row">
          {/* TODO fix on both mobile and desktop */}
          {/* <Image
            src={props.video.thumbnail}
            alt={props.video.title}
            width={props.video.thumbnailWidth}
            height={props.video.thumbnailHeight}
            className="w-full rounded-t-lg md:rounded-none md:rounded-l-lg"
            layout="responsive"
          ></Image> */}
          <img
            className="w-full rounded-t-lg  md:h-auto md:rounded-none md:rounded-l-lg"
            src={props.video.thumbnail}
            alt=""
          />
          <div className="flex flex-col justify-start p-6">
            <h5 className="mb-2 text-xl font-medium text-gray-900">
              {props.video.title}
            </h5>
            <p className="mb-4 text-base text-gray-700">
              {props.video.description}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}
