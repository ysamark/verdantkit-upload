import { NextRequest } from "next/server";

export type DefaultNextApiParams = {
  [key: string]: string;
};

export type NextApiProps<Params = DefaultNextApiParams> = {
  params: Params;
};

export type NextApiHandler<
  Params extends DefaultNextApiParams = DefaultNextApiParams
> = (request: NextRequest, props: NextApiProps<Params>) => unknown;

type DefaultRefugeNextRouteHandlerParams = {
  refuge: Array<string>;
};

export type NextRouteHandlers<
  Params extends DefaultNextApiParams = DefaultNextApiParams
> = {
  GET: NextApiHandler<Params & DefaultRefugeNextRouteHandlerParams>;
  POST: NextApiHandler<Params & DefaultRefugeNextRouteHandlerParams>;
  DELETE: NextApiHandler<Params & DefaultRefugeNextRouteHandlerParams>;
  PUT: NextApiHandler<Params & DefaultRefugeNextRouteHandlerParams>;
};

export type NextRouteHandlersMap<
  Params extends DefaultNextApiParams = DefaultNextApiParams
> = {
  [key: string]: NextApiHandler<Params & DefaultRefugeNextRouteHandlerParams>;
};
