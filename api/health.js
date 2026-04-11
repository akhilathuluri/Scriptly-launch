import { proxyToConvex } from "../vercel-api-proxy.js";

export default async function handler(req, res) {
  return proxyToConvex(req, res, { segments: ["health"] });
}
