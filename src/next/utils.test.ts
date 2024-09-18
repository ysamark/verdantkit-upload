import { describe, expect, it } from "vitest";

import {
  readRoutePathParams,
  routePathHasParameters,
  routePathMatches,
} from "./utils";

describe("Test routePathHasParameters next util", () => {
  it("should be truthy if the given route path has parameter declaration", () => {
    const routePath = "GET:foo/bar/[id]/baz";

    expect(routePathHasParameters(routePath)).toBeTruthy();
  });

  it("should be falsy if the given route path has not parameter declaration", () => {
    const routePath = "GET:foo/bar/baz";

    expect(routePathHasParameters(routePath)).toBeFalsy();
  });
});

describe("Test routePathMatches next util", () => {
  it("should match two corresponding routes", () => {
    const routePath = "GET:foo/bar/[id]/baz";
    const requestRoutePath = "/foo/bar/700000/baz";

    expect(routePathMatches(routePath, requestRoutePath)).toBeTruthy();
  });

  it("should match two corresponding routes with no parameters", () => {
    const routePath = "GET:foo/bar/baz";
    const requestRoutePath = "/foo/bar/baz";

    expect(routePathMatches(routePath, requestRoutePath)).toBeTruthy();
  });

  it("should match two corresponding routes with multiple parameters declarations", () => {
    const routePath = "GET:doo/car/[id]/daz/[name]";
    const requestRoutePath = "/doo/car/700000/daz/ban";

    expect(routePathMatches(routePath, requestRoutePath)).toBeTruthy();
  });

  it("should match two corresponding routes with multiple parameters declarations #3", () => {
    const routePath = "GET:doo/car/[id]/daz/[name]/make-[action]";
    const requestRoutePath = "/doo/car/700000/daz/ban/make-cake";

    expect(routePathMatches(routePath, requestRoutePath)).toBeTruthy();
  });

  it("should not match a request route path if not corresponding routes", () => {
    const routePath = "GET:foo/bar/[id]/baz";
    const requestRoutePath = "/foo/bar/baz";

    expect(routePathMatches(routePath, requestRoutePath)).toBeFalsy();
  });
});

describe("Test readRoutePathParams next util", () => {
  it("should read all the sent parameters in the request route", () => {
    const routePath = "GET:foo/[id]/bar/baz";
    const requestRoutePath = "/foo/222000/bar/baz";

    expect(readRoutePathParams(routePath, requestRoutePath)).toMatchObject({
      id: 222000,
    });
  });

  it("should return an empty parameters object if given a request route that does not match to the route path", () => {
    const routePath = "GET:foo/[id]/bar/baz/xak";
    const requestRoutePath = "/foo/222000/bar/baz";

    expect(readRoutePathParams(routePath, requestRoutePath)).toMatchObject({});
  });

  it("should read all the sent parameters in the request route with multiple parameters", () => {
    const routePath = "GET:doo/[id]/ban/bak/[name]";
    const requestRoutePath = "/doo/222000/ban/bak/john";

    expect(readRoutePathParams(routePath, requestRoutePath)).toMatchObject({
      id: 222000,
      name: "john",
    });
  });

  it("should read all the sent parameters in the request route with multiple parameters #1", () => {
    const routePath = "GET:doo/[id]/ban/bak/[name]/make-[action]";
    const requestRoutePath = "/doo/222000/ban/bak/john/make-cake";

    expect(readRoutePathParams(routePath, requestRoutePath)).toMatchObject({
      id: 222000,
      name: "john",
      action: "cake",
    });
  });

  it("should read all the sent parameters in the request route with multiple parameters #2", () => {
    const routePath = "GET:too/[id]/tan/xak/[name]/make-[action]/nax";
    const requestRoutePath = "/too/222000/tan/xak/peter/make-card/nax";

    expect(readRoutePathParams(routePath, requestRoutePath)).toMatchObject({
      id: 222000,
      name: "peter",
      action: "card",
    });
  });
});
