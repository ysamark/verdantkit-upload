import { capitalize, noEmpty, Nullish } from "@verdantkit/utils";

export const generateLogMessage = (
  logKey: string,
  messageBody?: Nullish<string>
): string => {
  const logKeySlices = logKey.split(".").filter((slice) => noEmpty(slice));

  const logType = logKeySlices[-1 + logKeySlices.length];
  const logTypeLabel =
    logKeySlices.length >= 2 ? `:${capitalize(logType)}` : "";
  const logContextIndexLimit =
    logKeySlices.length >= 2 ? -1 : logKeySlices.length;

  return logKeySlices
    .slice(0, logContextIndexLimit)
    .join(".")
    .concat(logTypeLabel)
    .concat(noEmpty(messageBody) ? ` - ${messageBody}` : "");
};
