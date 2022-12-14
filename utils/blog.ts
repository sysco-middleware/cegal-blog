import { toPlainText } from "@portabletext/react";
import { config } from "../shared/config";
import { BlogPost } from "../shared/types";

export const getMinToRead = (body?: BlogPost["body"]) => {
  if (!body) {
    return 0;
  }
  const wordsInText = toPlainText(body).split(" ").length;
  return Math.ceil(wordsInText / config.readSpeedWPM);
};
