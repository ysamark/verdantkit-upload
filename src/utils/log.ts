import { getObjectProp, PathInternal } from "@verdantkit/utils";
import * as messages from "~/config/messages";
import { DotsPathInternal } from "~types/eager";
import { generateLogMessage } from "./generateLogMessage";

type LogType = "error" | "warning" | "success";

type LogKey = DotsPathInternal<typeof messages>;

export const log = (key: LogKey, type?: LogType): void => {
  const logMessageBody = getObjectProp(
    key as PathInternal<typeof messages>,
    messages
  );

  if (typeof logMessageBody !== "string") {
    throw new TypeError("log:Error - key must be a valid string property");
  }

  const logMessageContent = generateLogMessage(key, logMessageBody);

  switch (type) {
    case "error":
      console.error(logMessageContent);
      break;

    case "warning":
      console.warn(logMessageBody);
      break;

    default:
      console.log(logMessageContent);
      break;
  }
};
