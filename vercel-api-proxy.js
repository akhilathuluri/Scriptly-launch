const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "content-length",
  "host",
]);

function getConvexSiteUrl() {
  const url =
    process.env.CONVEX_SITE_URL ||
    process.env.VITE_CONVEX_SITE_URL ||
    process.env.CONVEX_HTTP_URL;

  if (!url) return null;

  try {
    return new URL(url);
  } catch {
    return null;
  }
}

function buildTargetUrl(baseUrl, segments, query, excludeKeys = []) {
  const cleanSegments = segments.filter(Boolean).map((s) => String(s).trim()).filter(Boolean);
  const target = new URL(`/api/${cleanSegments.join("/")}`, baseUrl);

  for (const [key, value] of Object.entries(query ?? {})) {
    if (excludeKeys.includes(key)) continue;

    if (Array.isArray(value)) {
      for (const item of value) {
        target.searchParams.append(key, String(item));
      }
      continue;
    }

    if (typeof value === "string") {
      target.searchParams.set(key, value);
    }
  }

  return target;
}

function copyRequestHeaders(req) {
  const headers = {};

  for (const [key, value] of Object.entries(req.headers ?? {})) {
    const lower = key.toLowerCase();
    if (HOP_BY_HOP_HEADERS.has(lower)) continue;
    if (value === undefined) continue;

    headers[key] = Array.isArray(value) ? value.join(", ") : value;
  }

  return headers;
}

function normalizeBody(req, headers) {
  if (req.method === "GET" || req.method === "HEAD") return undefined;
  if (req.body == null) return undefined;

  if (
    typeof req.body === "string" ||
    Buffer.isBuffer(req.body) ||
    req.body instanceof Uint8Array
  ) {
    return req.body;
  }

  if (!headers["content-type"] && !headers["Content-Type"]) {
    headers["content-type"] = "application/json";
  }

  return JSON.stringify(req.body);
}

function copyResponseHeaders(upstreamResponse, res) {
  for (const [key, value] of upstreamResponse.headers.entries()) {
    if (HOP_BY_HOP_HEADERS.has(key.toLowerCase())) continue;
    res.setHeader(key, value);
  }
}

export async function proxyToConvex(req, res, options) {
  const convexSiteUrl = getConvexSiteUrl();

  if (!convexSiteUrl) {
    res.status(500).json({
      ok: false,
      error: "missing_convex_site_url",
      message:
        "Set CONVEX_SITE_URL (or VITE_CONVEX_SITE_URL) in Vercel environment variables.",
    });
    return;
  }

  const { segments = [], excludeQueryKeys = [] } = options ?? {};
  const targetUrl = buildTargetUrl(convexSiteUrl, segments, req.query, excludeQueryKeys);
  const headers = copyRequestHeaders(req);
  const body = normalizeBody(req, headers);

  try {
    const upstreamResponse = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
      redirect: "manual",
    });

    copyResponseHeaders(upstreamResponse, res);
    const responseText = await upstreamResponse.text();
    res.status(upstreamResponse.status).send(responseText);
  } catch (error) {
    res.status(502).json({
      ok: false,
      error: "upstream_unreachable",
      message: "Failed to reach Convex HTTP API.",
      detail: error instanceof Error ? error.message : String(error),
      target: targetUrl.toString(),
    });
  }
}
