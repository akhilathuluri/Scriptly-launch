# App Verification API Guide

This document explains how to use the Convex HTTP API to:

1. Get the full `app` table content
2. Verify an app identity + version
3. Reject app access when verification fails

## Overview

The following HTTP endpoints are now available in Convex via `convex/http.ts`:

- `GET /api/health`
- `GET /api/app-table`
- `GET /api/developer-notifications`
- `POST /api/verify-app`
- `GET /api/verify-app` (query-string based, browser-friendly)

Base URL:

- Development (recommended from this app): `http://localhost:8080`
- Direct Convex URL (bypassing Vite): `https://<your-convex-deployment>.convex.site`
- You can find this in `.env.local` as `VITE_CONVEX_SITE_URL`

Example full endpoint:

- `http://localhost:8080/api/verify-app`

## Localhost Behavior

In development, `vite.config.ts` proxies `/api/*` from `http://localhost:8080` to `VITE_CONVEX_SITE_URL`.

So these requests work exactly as requested:

- `http://localhost:8080/api/health`
- `http://localhost:8080/api/app-table`
- `http://localhost:8080/api/developer-notifications`
- `http://localhost:8080/api/verify-app`

No Convex domain is needed in your client code while running locally.

## Production (Vercel) Behavior

In production, Vercel serves a catch-all API function at `api/[...path].js` that forwards `/api/*` requests to your Convex HTTP API.

Required Vercel environment variable:

- `CONVEX_SITE_URL=https://<your-convex-deployment>.convex.site`

Example:

- `https://usespark.vercel.app/api/health` forwards to `https://<your-convex-deployment>.convex.site/api/health`

## Data Model

Table name: `app`

Example row:

```json
{
  "_creationTime": 1773952598493.8281,
  "_id": "j573c8jvfzmwjmt6nner1r49kh836vmc",
  "app_id": "Spark",
  "app_name": "Spark",
  "created_at": 1710000000,
  "download_url": "https://yourapp.com/download",
  "latest_version": "1.0.0",
  "minimum_version": "1.0.0",
  "release_notes": "Initial release with text transformation features, improved performance, and bug fixes.",
  "updated_at": 1710000000
}
```

## Endpoint 1: Health Check

### Request

```http
GET /api/health
```

### Response

```json
{
  "ok": true,
  "service": "app-verification",
  "timestamp": 1773953000000
}
```

## Endpoint 2: Get Entire App Table

### Request

```http
GET /api/app-table
```

### Response

```json
{
  "count": 1,
  "data": [
    {
      "_id": "j573c8jvfzmwjmt6nner1r49kh836vmc",
      "_creationTime": 1773952598493.8281,
      "app_id": "Spark",
      "app_name": "Spark",
      "latest_version": "1.0.0",
      "minimum_version": "1.0.0",
      "download_url": "https://yourapp.com/download",
      "release_notes": "Initial release with text transformation features, improved performance, and bug fixes.",
      "created_at": 1710000000,
      "updated_at": 1710000000
    }
  ]
}
```

## Endpoint 3: Verify App Access

### Request

```http
POST /api/verify-app
Content-Type: application/json

{
  "app_id": "Spark",
  "app_name": "Spark",
  "current_version": "1.0.0"
}
```

### Browser/GET Request

```http
GET /api/verify-app?app_id=Spark&app_name=Spark&current_version=1.0.0
```

If you call `/api/verify-app` without query params, it returns `400 invalid_request`.

## Endpoint 4: Developer Notifications

### Request

```http
GET /api/developer-notifications
```

Optional query parameter:

- `include_inactive=true` to return active + inactive notifications.

### Response

```json
{
  "count": 2,
  "data": [
    {
      "_id": "...",
      "title": "Maintenance Window",
      "message": "Scheduled maintenance on Friday 10:00 PM UTC.",
      "type": "warning",
      "priority": "high",
      "isActive": true,
      "createdAt": 1710000000,
      "updatedAt": 1710000000
    }
  ]
}
```

### Success Response (`200`)

```json
{
  "verified": true,
  "reason": "ok",
  "message": "App verified successfully.",
  "app": {
    "_id": "j573c8jvfzmwjmt6nner1r49kh836vmc",
    "_creationTime": 1773952598493.8281,
    "app_id": "Spark",
    "app_name": "Spark",
    "latest_version": "1.0.0",
    "minimum_version": "1.0.0",
    "download_url": "https://yourapp.com/download",
    "release_notes": "Initial release with text transformation features, improved performance, and bug fixes.",
    "created_at": 1710000000,
    "updated_at": 1710000000
  }
}
```

### Reject Response (`403`) - app not found

```json
{
  "verified": false,
  "reason": "app_not_found",
  "message": "App is not registered."
}
```

### Reject Response (`403`) - app name mismatch

```json
{
  "verified": false,
  "reason": "app_name_mismatch",
  "message": "App name does not match registered app.",
  "expected_app_name": "Spark"
}
```

### Reject Response (`403`) - version below minimum

```json
{
  "verified": false,
  "reason": "version_below_minimum",
  "message": "Current version is below minimum required version.",
  "current_version": "0.8.0",
  "minimum_version": "1.0.0",
  "latest_version": "1.1.0",
  "download_url": "https://yourapp.com/download",
  "release_notes": "Upgrade required for security and compatibility updates."
}
```

### Bad Request (`400`)

```json
{
  "verified": false,
  "reason": "invalid_request",
  "message": "app_id and current_version are required."
}
```

## cURL Examples

### Verify app

```bash
curl -X POST "http://localhost:8080/api/verify-app" \
  -H "Content-Type: application/json" \
  -d '{
    "app_id": "Spark",
    "app_name": "Spark",
    "current_version": "1.0.0"
  }'
```

### Verify app with GET

```bash
curl "http://localhost:8080/api/verify-app?app_id=Spark&app_name=Spark&current_version=1.0.0"
```

### Get full app table

```bash
curl "http://localhost:8080/api/app-table"
```

### Get developer notifications

```bash
curl "http://localhost:8080/api/developer-notifications"
```

### Get all notifications including inactive

```bash
curl "http://localhost:8080/api/developer-notifications?include_inactive=true"
```

## Client Integration (Reject on Fail)

Use this flow in the other app:

1. Call `/api/verify-app` at startup.
2. If `verified !== true`, stop app usage and show upgrade/rejection message.
3. If `verified === true`, continue app initialization.

Example TypeScript:

```ts
type VerifyResponse = {
  verified: boolean;
  reason: string;
  message: string;
  app?: {
    latest_version: string;
    minimum_version: string;
    download_url: string;
    release_notes: string;
  };
  download_url?: string;
  minimum_version?: string;
  latest_version?: string;
  release_notes?: string;
};

export async function verifyBeforeStart() {
  const res = await fetch("http://localhost:8080/api/verify-app", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      app_id: "Spark",
      app_name: "Spark",
      current_version: "1.0.0",
    }),
  });

  const data = (await res.json()) as VerifyResponse;

  if (!res.ok || !data.verified) {
    const downloadUrl = data.download_url ?? data.app?.download_url;
    const message = `${data.message}${downloadUrl ? `\nUpdate: ${downloadUrl}` : ""}`;
    throw new Error(message);
  }

  return data;
}
```

## Deployment Notes

After updating `convex/http.ts` or `convex/app.ts`:

```bash
npx convex dev
# or
npx convex deploy
```

## Security Recommendation

For production, add request authentication to HTTP routes:

- Shared secret header (for example `x-api-key`)
- HMAC signature over payload
- Rate limiting via gateway/proxy

Current implementation focuses on functional verification + rejection behavior as requested.
