import { noEmpty, Nullish } from "@verdantkit/utils";
import { DefaultNextApiParams } from "~/types/NextRouteHandlers";

const routeParameterRe = /(\[([a-zA-Z0-9_.)]+)\])/;
const slashRe = /(\/+)/;

const stripRoutePathPrefix = (routePath: string) => {
  return "/".concat(routePath.replace(/^(([^:]+):(\/)*)/, ""));
};

const replaceAll = (str: string, re: RegExp, replacement: string) => {
  const strLen = str.length;

  let i = -1;

  let newStr: string = "";

  while (re.test(str)) {
    i++;

    const strReMatch = str.match(re) as RegExpMatchArray;
    const strReMatchIndex = Number(strReMatch.index);

    newStr += str.slice(0, strReMatchIndex).concat(replacement);

    str = str
      .split("")
      .slice(strReMatchIndex + strReMatch[0].length)
      .join("");

    if (i > strLen * 2) {
      break;
    }
  }

  return newStr.concat(str);
};

const readRouteParameterValue = (routeParameterValue: Nullish<string>) => {
  const numberRe = /^-?(0|[1-9]\d{0,2}(_?\d{3})*)(\.\d+)?([eE][+-]?\d+)?$/;

  if (noEmpty(routeParameterValue) && numberRe.test(routeParameterValue)) {
    return Number(routeParameterValue);
  }

  return String(routeParameterValue);
};

const splitRoutePath = (routePath: string): Array<string> => {
  return routePath
    .split(slashRe)
    .filter((slice) => !slashRe.test(slice) && noEmpty(slice));
};

const rewriteRoutePathParametersDeclarations = (routePath: string) => {
  routePath = routePath.replace(/[.*+?^${}()|\\]/g, "\\$&");
  routePath = replaceAll(routePath, /(\/+)/, "\\/");
  routePath = replaceAll(routePath, routeParameterRe, "([^\\/]+)");

  return routePath;
};

export const routePathHasParameters = (routePath: string) => {
  return routePath.split(/(\/)/).some((slice) => routeParameterRe.test(slice));
};

export const routePathMatches = (
  routePath: string,
  params: Array<string> | string
): boolean => {
  const requestRoutePath = params instanceof Array ? params.join("/") : params;

  routePath = stripRoutePathPrefix(routePath);

  if (routePathHasParameters(routePath)) {
    routePath = rewriteRoutePathParametersDeclarations(routePath);

    try {
      const routePathRe = new RegExp(`^(${routePath})$`);

      return routePathRe.test(requestRoutePath);
    } catch (err) {
      return typeof err === "boolean";
    }
  }

  return routePath.toLowerCase() === requestRoutePath.toLowerCase();
};

export const readRoutePathParams = <
  RouteParamsDataObject extends DefaultNextApiParams = DefaultNextApiParams
>(
  routePath: string,
  params: Array<string> | string
): RouteParamsDataObject => {
  const routePathWithoutPathPrefix = stripRoutePathPrefix(routePath);
  const routeParams: RouteParamsDataObject = {} as RouteParamsDataObject;

  const requestRoutePathSlices =
    params instanceof Array ? params : splitRoutePath(params);
  const routePathSlices = splitRoutePath(routePathWithoutPathPrefix);

  if (!routePathMatches(routePath, params)) {
    return routeParams;
  }

  for (let i = 0; i < routePathSlices.length; i++) {
    const routePathSlice = routePathSlices[i];
    const routeParameterReMatch = routeParameterRe.exec(routePathSlice);

    if (routeParameterReMatch) {
      const [parameterName] = Array.from(routeParameterReMatch).slice(2);
      const routePathSliceRe = new RegExp(
        `^(${rewriteRoutePathParametersDeclarations(routePathSlice)})$`
      );
      const parameterValueMatch = routePathSliceRe.exec(
        requestRoutePathSlices[i]
      );
      const parameterValue = readRouteParameterValue(
        !parameterValueMatch
          ? requestRoutePathSlices[i]
          : parameterValueMatch[2]
      );

      Object.assign(routeParams, {
        [parameterName]: parameterValue,
      });
    }
  }

  return routeParams;
};
