# Issues Feature - Modular Implementation Guide

## Overview
The Issues feature is implemented as a modular, self-contained system that allows users to report bugs, request features, and provide feedback about Spark. It uses Convex.dev for real-time database synchronization.

## Architecture

### File Structure
```
src/
├── components/
│   └── Issues/
│       ├── index.ts              # Barrel export
│       ├── IssueForm.tsx          # Form component for creating issues
│       ├── IssueCard.tsx          # Card component for displaying issues
│       └── IssuesList.tsx         # List component for browsing issues
│
├── pages/
│   └── Issues.tsx                 # Main issues page
│
├── types/
│   └── convex.ts                  # TypeScript types for Convex
│
└── lib/
    └── convex.ts                  # Convex utilities and helpers

convex/
├── schema.ts                       # Database schema definition
├── issues.ts                       # Query and mutation functions
└── _generated.ts                   # Auto-generated Convex files
```

## Component Breakdown

### IssueForm.tsx
**Purpose**: Form to create new issues
**Features**:
- Type-safe form validation with React Hook Form + Zod
- Issue type selection (Bug, Feature Request, Improvement, Other)
- Severity level selection (Critical, High, Medium, Low)
- Email validation
- Character counter for title and description
- Privacy notice
- Loading state with spinner
- Success/error toast notifications

**State Management**:
- Local form state via React Hook Form
- Submitting state for button disabled state

**Dependencies**:
- react-hook-form, zod, @hookform/resolvers
- Framer Motion for animations
- Convex for mutations

### IssueCard.tsx
**Purpose**: Display individual issue information
**Features**:
- Issue title and preview description
- Type, Severity, and Status badges with color coding
- User email and creation time (relative)
- Hover animations
- Responsive layout
- Scroll-triggered reveal animation

**Props**:
```typescript
interface IssueCardProps {
  issue: Issue;
  index: number;  // For stagger animation
}
```

### IssuesList.tsx
**Purpose**: Display all issues with filtering
**Features**:
- Real-time issue list from Convex
- Filter by status (All, Open, In Progress, Resolved, Closed)
- Loading state with spinner
- Empty state with helpful message
- Grid layout (responsive: 1 col on mobile, 2 cols on desktop)
- Scroll-triggered animations

**State Management**:
- Filter status via useState
- Real-time data via Convex useQuery

### Issues.tsx (Page)
**Purpose**: Main page combining form and list
**Features**:
- Two-column layout (form on left, list on right)
- Sync between form submission and list updates
- Same navbar and footer as other pages
- Background gradient matching design system
- Responsive layout (stacks on mobile)

**Layout**:
```
Header (centered title + description)
├── Form Section (left column on desktop)
└── List Section (right column on desktop)
```

## Database Schema (convex/schema.ts)

```typescript
issues: {
  title: string
  description: string
  type: "bug" | "feature-request" | "improvement" | "other"
  severity: "critical" | "high" | "medium" | "low"
  email: string
  userAgent?: string
  status: "open" | "in-progress" | "resolved" | "closed"
  createdAt: number (Date.now())
  updatedAt: number (Date.now())
}
```

**Indexes**:
- by_status: For efficient filtering by status

## API Functions (convex/issues.ts)

### Mutations
1. **createIssue(title, description, type, severity, email, userAgent)**
   - Creates new issue with default "open" status
   - Returns issue ID

2. **updateIssueStatus(id, status)**
   - Updates issue status
   - Used for admin/moderation (future implementation)

### Queries
1. **listIssues(status?)**
   - Returns all issues, optionally filtered by status
   - Returns last 100 issues sorted by recency

2. **getIssue(id)**
   - Returns single issue by ID

3. **getIssuesCount(status?)**
   - Returns count of issues

## Styling & Design

### Color System
Uses Tailwind CSS with custom color schemes:
- **Severity levels**: Red (critical), Orange (high), Yellow (medium), Green (low)
- **Status levels**: Blue (open), Purple (in-progress), Green (resolved), Gray (closed)
- **Type badges**: Subtle neutral styling

### Typography
- Headline: Space Grotesk Bold 24px
- Body: Space Grotesk Regular 14px
- Labels: Space Grotesk Semibold 12px

### Spacing
- Card padding: 20px (md:24px)
- Section spacing: 24px (md:32px)
- Gap between columns: 48px

### Animations
- Entrance: Framer Motion opacity + y-axis slide (300ms)
- Stagger: 80ms delay per card (smooth cascade)
- Hover: Subtle background color shift
- Loading: Spinning loader icon

## Modular Structure Benefits

1. **Reusability**:
   - IssueCard can be used in other contexts (dashboard, etc.)
   - IssueForm can be repurposed for editing issues
   - Components don't depend on page structure

2. **Maintainability**:
   - Each component has single responsibility
   - Barrel export (index.ts) simplifies imports
   - Clear separation of concerns

3. **Scalability**:
   - Easy to add related features (issue comments, attachments)
   - Can create admin dashboard for issue management
   - Modular structure supports future expansion

4. **Testing**:
   - Each component can be tested independently
   - Mock Convex hooks easily
   - Components accept both real and test data

## Future Enhancement Ideas

### Phase 1: Core Features (Current)
- ✅ Create issues
- ✅ View all issues
- ✅ Filter by status
- ✅ Real-time updates

### Phase 2: User Engagement
- Issue comments/discussions
- Upvote/downvote issues
- Issue templates
- Issue search and sorting

### Phase 3: Admin Features
- Dashboard for managing issues
- Bulk status updates
- Issue analytics
- Email notifications

### Phase 4: Integration
- GitHub issue sync
- Discord notifications
- Slack integration
- Email replies

## Development Workflow

### Adding a New Issue Field

1. **Update Schema** (convex/schema.ts):
```typescript
export default defineSchema({
  issues: defineTable({
    // ... existing fields
    newField: v.string(),
  }),
});
```

2. **Update API** (convex/issues.ts):
```typescript
export const createIssue = mutation({
  args: {
    // ... existing args
    newField: v.string(),
  },
  handler: async (ctx, args) => {
    // Include newField in insert
  },
});
```

3. **Update Form** (IssueForm.tsx):
```typescript
const issueFormSchema = z.object({
  // ... existing fields
  newField: z.string(),
});

// Add FormField in JSX
```

4. **Update Card** (IssueCard.tsx):
```typescript
// Display newField if relevant
```

## Environment Setup

Required environment variable:
```
VITE_CONVEX_URL=https://your-deployment.convex.cloud
```

See `CONVEX_SETUP.md` for detailed setup instructions.

## Performance Considerations

1. **Query Optimization**:
   - Uses indexes for status filtering
   - Limits results to 100 per query
   - Real-time updates via Convex (automatic optimization)

2. **Component Optimization**:
   - Memoization for animation stagger
   - Lazy loading with whileInView
   - Efficient list rendering with key props

3. **Network**:
   - Form validation before submission
   - Optimistic updates (Convex handles automatically)
   - Efficient real-time sync

## Accessibility

- Proper form labels with associations
- ARIA attributes on interactive elements
- Keyboard navigation support
- Color contrast meets WCAG AA standards
- Loading states clearly indicated

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Known Limitations

1. **No authentication** - Current implementation doesn't verify users
2. **No deletion** - Issues are permanent (by design)
3. **No editing** - Users can't edit submitted issues
4. **No attachments** - File uploads not supported yet

These can be added as needed in future phases.
