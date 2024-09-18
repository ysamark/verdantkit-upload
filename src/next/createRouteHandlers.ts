import { NextResponse } from "next/server";
import { z } from "zod";

import {
  NextRouteHandlers,
  NextRouteHandlersMap,
} from "~/types/NextRouteHandlers";
import { UploadClient } from "~/UploadClient";
import { generateLogMessage } from "~/utils/generateLogMessage";

import { resolveNextServerConfig } from "./resolveNextServerConfig";
import { readRoutePathParams, routePathMatches } from "./utils";

export const createRouteHandlers = (
  uploadClient: UploadClient
): NextRouteHandlers => {
  const routeRequestHandlers: NextRouteHandlersMap = {
    "POST:files/upload": async (request) => {
      const formData = await request.formData();

      const uploadedFiles = await uploadClient.uploadFiles(null, {
        formData,
      });

      if (!uploadedFiles) {
        return NextResponse.json(
          {
            status: "error",
            error: generateLogMessage(
              "createRouteHandlers.uploadFile.error",
              "Could not upload file to Refuge server"
            ),
          },
          {
            status: 500,
            statusText: "Could not upload",
          }
        );
      }

      return NextResponse.json(uploadedFiles);
    },

    "GET:files/[fileId]": async () => {},
  };

  const nextServerConfig = resolveNextServerConfig();

  const nextAPIRouteHandlerFactory = <
    RouteMethod extends keyof NextRouteHandlers
  >(
    method: RouteMethod
  ): NextRouteHandlers[RouteMethod] => {
    const refugeRouteOptionsSchema = z.object({
      params: z.object({
        refuge: z.array(z.string().min(1)).min(1),
      }),
    });

    return async (request, options) => {
      const validatedOptions = refugeRouteOptionsSchema.safeParse(options);

      if (validatedOptions.error) {
        return NextResponse.json(
          {
            status: "error",
            error: generateLogMessage(
              "createRouteHandlers.route.params.error",
              "Invalid parameters list provided"
            ),
          },
          {
            status: 404,
          }
        );
      }

      const { params } = validatedOptions.data;

      const requestRoutePath = method.concat(":", params.refuge.join("/"));
      const routeRequestHandler = routeRequestHandlers[requestRoutePath];

      if (typeof routeRequestHandler === "function") {
        try {
          const response = await routeRequestHandler(request, options);
          return response;
        } catch (err) {
          console.error(
            "Something went wrong during response processing: ",
            err
          );
        }
      }

      for (const routePath in routeRequestHandlers) {
        const routeRequestHandler = routeRequestHandlers[routePath];

        if (routePathMatches(routePath, requestRoutePath)) {
          const routeParams = readRoutePathParams(routePath, requestRoutePath);

          try {
            const response = await routeRequestHandler(request, {
              ...options,
              params: {
                ...options.params,
                ...routeParams,
              },
            });
            return response;
          } catch (err) {
            console.error(
              "Something went wrong during response processing: ",
              err
            );
          }
        }
      }

      return NextResponse.json(
        {
          status: "error",
          error: generateLogMessage(
            "createRouteHandlers.route.error",
            "Route does not match a valid refuge path"
          ),
        },
        {
          status: 404,
        }
      );
    };
  };

  return {
    ...nextServerConfig,
    GET: nextAPIRouteHandlerFactory("GET"),
    POST: nextAPIRouteHandlerFactory("POST"),
    DELETE: nextAPIRouteHandlerFactory("DELETE"),
    PUT: nextAPIRouteHandlerFactory("PUT"),
  };
};
