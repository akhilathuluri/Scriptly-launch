import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

const baseHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,x-app-id,x-app-name,x-app-version",
  "Cache-Control": "no-store",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: baseHeaders,
  });

const noContent = () =>
  new Response(null, {
    status: 204,
    headers: baseHeaders,
  });

const docsHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Spark API Docs</title>
    <style>
      :root {
        color-scheme: light;
      }
      body {
        margin: 0;
        font-family: "Segoe UI", "Space Grotesk", system-ui, -apple-system, sans-serif;
        background: #faf8f5;
        color: #1f1e25;
      }
      .container {
        max-width: 900px;
        margin: 0 auto;
        padding: 28px 20px 42px;
      }
      .card {
        background: #ffffffcc;
        border: 1px solid #ece8e3;
        border-radius: 16px;
        box-shadow: 0 12px 36px -28px rgba(0, 0, 0, 0.35);
        padding: 20px;
      }
      h1 {
        margin: 0 0 8px;
        font-size: 2rem;
      }
      h2 {
        margin: 18px 0 10px;
        font-size: 1.1rem;
      }
      p {
        margin: 0 0 10px;
        color: #5b5566;
      }
      ul {
        margin: 8px 0 0;
        padding-left: 20px;
      }
      li {
        margin: 8px 0;
      }
      code {
        background: #f2effa;
        border: 1px solid #e4def5;
        border-radius: 8px;
        padding: 2px 6px;
        font-family: Consolas, "Cascadia Code", monospace;
        font-size: 0.9rem;
      }
      pre {
        background: #16141d;
        color: #f8f6ff;
        border-radius: 12px;
        padding: 12px;
        overflow: auto;
      }
      .muted {
        color: #6f6a79;
        font-size: 0.92rem;
      }
    </style>
  </head>
  <body>
    <main class="container">
      <section class="card">
        <h1>Spark API Docs</h1>
        <p>HTTP actions for app verification and app table discovery.</p>
        <p class="muted">Local development base URL: <code>http://localhost:8080</code> (or your current Vite port)</p>

        <h2>Endpoints</h2>
        <ul>
          <li><code>GET /api/health</code> - Health status.</li>
          <li><code>GET /api/app-table</code> - Returns entire <code>app</code> table.</li>
          <li><code>POST /api/verify-app</code> - Verify app identity and version.</li>
          <li><code>GET /api/verify-app?app_id=...&current_version=...&app_name=...</code> - Browser-friendly verification.</li>
          <li><code>GET /api/docs</code> - This page.</li>
        </ul>

        <h2>Verify (POST) Example</h2>
        <pre>curl -X POST "http://localhost:8080/api/verify-app" \\
  -H "Content-Type: application/json" \\
  -d '{"app_id":"Spark","app_name":"Spark","current_version":"1.0.0"}'</pre>

        <h2>Verify (GET) Example</h2>
        <pre>http://localhost:8080/api/verify-app?app_id=Spark&app_name=Spark&current_version=1.0.0</pre>

        <h2>Reference</h2>
        <p>See <code>APP_VERIFICATION_API_GUIDE.md</code> for detailed request/response payloads.</p>
      </section>
    </main>
  </body>
</html>`;

http.route({
  path: "/api/health",
  method: "GET",
  handler: httpAction(async () => {
    return json({ ok: true, service: "app-verification", timestamp: Date.now() });
  }),
});

http.route({
  path: "/api/docs",
  method: "GET",
  handler: httpAction(async () => {
    return new Response(docsHtml, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }),
});

http.route({
  path: "/api/docs",
  method: "OPTIONS",
  handler: httpAction(async () => noContent()),
});

http.route({
  path: "/api/health",
  method: "OPTIONS",
  handler: httpAction(async () => noContent()),
});

// Returns full app table content.
http.route({
  path: "/api/app-table",
  method: "GET",
  handler: httpAction(async (ctx) => {
    const table = await ctx.runQuery(api.app.getAppTableContent, {});
    return json({ count: table.length, data: table });
  }),
});

http.route({
  path: "/api/app-table",
  method: "OPTIONS",
  handler: httpAction(async () => noContent()),
});

// Verifies app identity/version and returns an allow/reject decision.
http.route({
  path: "/api/verify-app",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url);
    const app_id = url.searchParams.get("app_id")?.trim() ?? "";
    const app_name = url.searchParams.get("app_name")?.trim() ?? undefined;
    const current_version =
      url.searchParams.get("current_version")?.trim() ?? "";

    if (!app_id || !current_version) {
      return json(
        {
          verified: false,
          reason: "invalid_request",
          message:
            "app_id and current_version are required query parameters.",
        },
        400
      );
    }

    const result = await ctx.runQuery(api.app.verifyAppAccess, {
      app_id,
      app_name,
      current_version,
    });

    return json(result, result.verified ? 200 : 403);
  }),
});

http.route({
  path: "/api/verify-app",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    let body: {
      app_id?: string;
      app_name?: string;
      current_version?: string;
    } = {};

    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const app_id = body.app_id?.trim();
    const app_name = body.app_name?.trim();
    const current_version = body.current_version?.trim();

    if (!app_id || !current_version) {
      return json(
        {
          verified: false,
          reason: "invalid_request",
          message: "app_id and current_version are required.",
        },
        400
      );
    }

    const result = await ctx.runQuery(api.app.verifyAppAccess, {
      app_id,
      app_name,
      current_version,
    });

    return json(result, result.verified ? 200 : 403);
  }),
});

http.route({
  path: "/api/verify-app",
  method: "OPTIONS",
  handler: httpAction(async () => noContent()),
});

export default http;
