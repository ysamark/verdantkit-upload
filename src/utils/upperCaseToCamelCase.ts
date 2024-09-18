import { capitalize } from "@verdantkit/utils";

export const upperCaseToCamelCase = (upperCaseString: string) => {
  const underlineRe = /([_]+)/g;

  const upperCaseStringSlices = upperCaseString
    .split(underlineRe)
    .filter((slice) => !underlineRe.test(slice));

  const capitalizedUpperCaseStringSlices = upperCaseStringSlices.map(
    (slice) => {
      const upperCaseRe = /^([A-Z]+)$/;

      if (upperCaseRe.test(slice)) {
        return capitalize(slice.toLowerCase());
      }

      return capitalize(slice);
    }
  );

  const rewrittenUpperCaseString = capitalizedUpperCaseStringSlices.join("");

  return rewrittenUpperCaseString
    .charAt(0)
    .toLowerCase()
    .concat(rewrittenUpperCaseString.slice(1));
};
