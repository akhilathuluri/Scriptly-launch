import { proxyToConvex } from "../vercel-api-proxy.js";

export default async function handler(req, res) {
  const pathParam = req.query.path;
  const pathSegments = Array.isArray(pathParam)
    ? pathParam
    : pathParam
      ? [pathParam]
      : [];

  return proxyToConvex(req, res, {
    segments: pathSegments,
    excludeQueryKeys: ["path"],
  });
}
