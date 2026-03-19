# Convex Setup & Configuration Guide

## Overview
This project uses Convex.dev for backend database and real-time synchronization of issues.

## Setup Instructions

### 1. Install Convex CLI
```bash
npm install -g convex
```

### 2. Create Convex Account & Project
- Visit https://www.convex.dev
- Sign up for a free account
- Create a new project

### 3. Authenticate & Deploy
```bash
# From your project root directory
convex auth
convex deploy
```

### 4. Get Your Deployment URL
After deployment, you'll get a deployment URL like: `https://your-unique-id.convex.cloud`

### 5. Configure Environment Variables
Copy `.env.example` to `.env.local` and add your deployment URL:
```
VITE_CONVEX_URL=https://your-unique-id.convex.cloud
```

### 6. Run Development Server
```bash
npm run dev
```

## Project Structure

### Convex Backend
- `convex/schema.ts` - Database schema for issues table
- `convex/issues.ts` - Query and mutation functions for issues

### Issues Feature
- `src/pages/Issues.tsx` - Main issues page
- `src/components/Issues/IssueForm.tsx` - Form to create issues
- `src/components/Issues/IssueCard.tsx` - Display issue card
- `src/components/Issues/IssuesList.tsx` - List all issues

## Database Schema

### Issues Table
```typescript
{
  title: string,
  description: string,
  type: "bug" | "feature-request" | "improvement" | "other",
  severity: "critical" | "high" | "medium" | "low",
  email: string,
  userAgent?: string,
  status: "open" | "in-progress" | "resolved" | "closed",
  createdAt: number (timestamp),
  updatedAt: number (timestamp),
}
```

## Available Queries
- `listIssues(status?)` - Get all issues, optionally filtered by status
- `getIssue(id)` - Get a single issue
- `getIssuesCount(status?)` - Get count of issues

## Available Mutations
- `createIssue(...)` - Create a new issue
- `updateIssueStatus(id, status)` - Update issue status

## Real-time Updates
All components using `useQuery()` from Convex react automatically sync in real-time. When one user submits an issue, all other clients see it immediately.

## Development Tips

### Local Development
- Run `convex dev` in a separate terminal to sync code changes
- Hot reload works automatically

### Testing
- Use the Convex Dashboard (available at your deployment URL) to view/manage issues
- Test forms with different inputs
- Filter issues by status

### Debugging
- Check browser console for errors
- Use Convex Dashboard for backend logs
- Environment variable issues? Restart dev server after updating `.env.local`

## Deployment

### Frontend Deployment
The frontend (Vite build) can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static host

### Backend Deployment
Convex automatically handles backend deployment:
- Just run `convex deploy`
- No need to manage servers
- Auto-scaling and security included

## Adding More Features

To extend the issues system:

1. **Add new fields to schema**: Update `convex/schema.ts`
2. **Add new queries/mutations**: Add to `convex/issues.ts`
3. **Create UI components**: Add to `src/components/Issues/`
4. **Add routes**: Update `src/App.tsx`

Example:
```typescript
// In convex/issues.ts
export const deleteIssue = mutation({
  args: { id: v.id("issues") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});
```

## Troubleshooting

### "Cannot read property 'convex' of undefined"
- Check that `VITE_CONVEX_URL` is set in `.env.local`
- Ensure the URL is correct (https, not http)

### Issues not appearing
- Check browser console for errors
- Verify Convex deployment was successful: `convex status`
- Check Convex dashboard for data

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Clear node_modules: `rm -rf node_modules && npm install`

## Resources

- Convex Documentation: https://docs.convex.dev
- Convex React Hooks: https://docs.convex.dev/client/react
- Zod Validation: https://zod.dev
