# Issues Feature - Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          SCRIPTLY APPLICATION                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                        App.tsx (Root)                            │    │
│  │  ┌──────────────────────────────────────────────────────────┐  │    │
│  │  │ ConvexProvider  │  QueryClientProvider  │  TooltipProvider  │    │
│  │  └──────────────────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│         ├─────────────────┬─────────────────┬──────────────────┐        │
│         ▼                 ▼                 ▼                  ▼        │
│    ┌─────────┐        ┌────────────┐   ┌──────────┐      ┌────────┐   │
│    │   /     │        │   /issues  │   │ /privacy │      │ /404   │   │
│    │ (Home)  │        │ (NEW PAGE) │   │  -policy │      │        │   │
│    └─────────┘        └────────────┘   └──────────┘      └────────┘   │
│                             │                                           │
│                             ┌──────┬──────────┐                        │
│                             ▼      ▼          ▼                        │
│                         IssueForm  Navbar  IssuesList                  │
│                             │               │                         │
│                    ┌────────┴───────┐       │                         │
│                    ▼                ▼       ▼                         │
│              Form Components    IssueCard  Filter                     │
│                                 Grid      Status                      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
         │                                          │
         │                                          │
         └──────────────┬───────────────────────────┘
                        │
                        │ (Convex React Hooks)
                        │
         ┌──────────────▼───────────────────────────┐
         │                                            │
         │      CONVEX BACKEND (Cloud)                │
         │                                            │
         │  ┌──────────────────────────────────────┐ │
         │  │  Database: issues table              │ │
         │  │  - Indexes: by_status                │ │
         │  │  - Real-time sync enabled            │ │
         │  └──────────────────────────────────────┘ │
         │                                            │
         │  ┌──────────────────────────────────────┐ │
         │  │  API Functions                       │ │
         │  │  ├─ createIssue (mutation)           │ │
         │  │  ├─ listIssues (query)               │ │
         │  │  ├─ getIssue (query)                 │ │
         │  │  ├─ updateIssueStatus (mutation)     │ │
         │  │  └─ getIssuesCount (query)           │ │
         │  └──────────────────────────────────────┘ │
         │                                            │
         └────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
Issues (Page)
│
├── Navbar (existing)
│   └── Links: Home, FAQs, Issues, Download
│
├── Main Section (grid: 1 col mobile, 2 cols desktop)
│   │
│   ├── Left Column (Desktop) / Top (Mobile)
│   │   └── IssueForm
│   │       ├── Title Input (validation: 5-100 chars)
│   │       ├── Description Textarea (validation: 20-2000 chars)
│   │       ├── Type Select (bug | feature | improvement | other)
│   │       ├── Severity Select (critical | high | medium | low)
│   │       ├── Email Input (validation: valid email)
│   │       ├── Privacy Notice Banner
│   │       └── Submit Button (with loading state)
│   │
│   └── Right Column (Desktop) / Bottom (Mobile)
│       └── IssuesList
│           ├── Header (title, count)
│           ├── Filter Dropdown (status selector)
│           ├── Loading State (spinner)
│           ├── Empty State (no issues)
│           └── Grid of IssueCards
│               └── IssueCard (repeated)
│                   ├── Badge Group
│                   │   ├─ Type Badge (bug | feature | etc)
│                   │   ├─ Severity Badge (colored)
│                   │   └─ Status Badge (colored)
│                   ├── Content
│                   │   ├─ Title
│                   │   └─ Description Preview
│                   └── Metadata
│                       ├─ Email
│                       └─ Time (relative)
│
└── Footer (existing)
    └── Links: GitHub, Privacy Policy, Email
```

---

## Data Flow Diagram

### Creating an Issue

```
User Input Form
     │
     ▼
React Hook Form (client-side)
     │
     ├─ Validate with Zod schema
     │ (title, description, type, severity, email)
     │
     └─ If valid:
        │
        ▼
   Submit Mutation
        │
        ▼
   Convex createIssue()
        │
        ├─ Generate ID
        ├─ Append timestamps
        ├─ Set status: "open"
        │
        └─ Insert into database
           │
           ▼
   Real-time Subscription Notified
           │
           ▼
   All IssuesList Queries Updated
           │
           ▼
   UI Re-renders with New Issue
           │
           ▼
   Toast Notification: Success
```

### Viewing Issues

```
Component Mounts
     │
     ▼
IssuesList Component
     │
     ├─ Call Convex useQuery(listIssues)
     │
     └─ Subscribe to Real-time Updates
        │
        ├─ Initial data loads
        │ (queries database)
        │
        ├─ State: loading
        │ (show spinner)
        │
        └─ When data arrives
           │
           ├─ Map over issues array
           │ (create IssueCard for each)
           │
           ├─ Apply animations
           │ (stagger entrance)
           │
           ├─ Listen for updates
           │ (new issues from mutations)
           │
           └─ Re-render automatically
              (no page refresh needed)
```

### Filtering Issues

```
User Selects Filter
     │
     ▼
Status State Changes
     │
     ▼
IssuesList Query Re-runs
     │
     ├─ New query parameter: status
     │
     ├─ Convex listIssues(status) called
     │ (uses index for efficiency)
     │
     ├─ Filtered results returned
     │
     └─ UI Updates
        │
        ├─ Old cards fade out
        ├─ New cards fade in
        │ (animation)
        │
        └─ Filtered list displayed
```

---

## Module Dependencies

```
src/pages/Issues.tsx
├── React
├── React Router
├── Framer Motion
├── src/components/Issues
│   ├── IssueForm
│   │   ├── react-hook-form
│   │   ├── zod
│   │   ├── @hookform/resolvers
│   │   ├── convex/react (useMutation)
│   │   ├── src/lib/convex (utilities)
│   │   ├── src/components/ui/*
│   │   └── lucide-react
│   └── IssuesList
│       ├── convex/react (useQuery)
│       ├── src/components/Issues/IssueCard
│       │   ├── lucide-react
│       │   ├── date-fns
│       │   └── src/components/ui/badge
│       └── src/components/ui/*
├── src/components/Navbar
├── src/components/Footer
└── Styling: Tailwind CSS
```

---

## State Management Flow

```
Global State (ConvexProvider)
│
├─ Real-time Database Subscriptions
│  └─ Issues table (auto-synced)
│
└─ Query Cache (React Query)
   └─ Issue data caching

Component State (Local)
│
├─ IssueForm
│  ├─ Form values (React Hook Form)
│  ├─ isSubmitting boolean
│  └─ Validation errors (Zod)
│
└─ IssuesList
   ├─ filterStatus (useState)
   ├─ refreshTrigger (parent prop)
   └─ Query state (loading, data, error)
```

---

## API Interaction Pattern

```
Frontend Component
        │
        ├─ useMutation(api.issues.createIssue)
        │  or
        └─ useQuery(api.issues.listIssues)
             │
             ▼
        Convex RPC Client
        (ConvexReactClient)
             │
             ├─ Auto serialization
             ├─ Network transmission (wss://)
             ├─ Request queuing
             └─ Error handling
                  │
                  ▼
             Convex Backend
             (Serverless)
                  │
                  ├─ Authentication (implicit)
                  ├─ Authorization rules
                  ├─ Database transaction
                  ├─ Real-time event publishing
                  │
                  └─ Response back to client
                       │
                       ▼
             ConvexReactClient
                  │
                  ├─ Auto deserialization
                  ├─ State update (React store)
                  ├─ Component re-render
                  │
                  └─ UI updated
```

---

## Real-time Synchronization

```
Client A                    Database              Client B
   │                           │                     │
   ├─ Submit Issue ──1──────────►│                   │
   │                             │                   │
   │                             ├─ Parse & Store    │
   │                             │                   │
   │                        ┌────────────┐            │
   │                        │  Broadcast │            │
   │                        └────────────┘            │
   │                             │                   │
   │                             ├─ 2 ────────────────►
   │                             │                   │
   │   (Real-time Update)         │    (Real-time Update)
   │◄──3─────────────────────────┤                   │
   │                             │    4 ────────────►│
   │                             │                   │
   │   UI Re-render              │    UI Re-render   │
   ├─ New issue appears          │   ├─ New issue appears
   │   (without page refresh)    │   │  (without page refresh)
```

---

## Error Handling Flow

```
User Action
    │
    ├─ Client Validation (Zod)
    │  ├─ Validation passes ──► Continue
    │  └─ Validation fails ───► Show error message
    │
    ├─ Network Request
    │  ├─ Success ──────────────► Mutation executed
    │  ├─ Network error ────────► Toast: "Network error"
    │  └─ Timeout ──────────────► Toast: "Request timeout"
    │
    ├─ Mutation Execution
    │  ├─ Success ──────────────► Toast: "Success!"
    │  │                           Query updated
    │  │                           Form reset
    │  │
    │  └─ Server error ─────────► Toast: "Error occurred"
    │                               Check console logs
    │
    └─ Query Error
       └─ Convex error ────────► Empty state or error message
```

---

## Performance Optimization Strategy

```
Component Rendering
    │
    ├─ Lazy Loading (whileInView)
    │  └─ Cards render as they enter viewport
    │     └─ Reduces initial render load
    │
    ├─ Memoization (Framer Motion)
    │  └─ Animations pre-calculated
    │     └─ 60fps animations
    │
    ├─ Code Splitting
    │  └─ Issues component lazy loaded
    │     └─ Only downloaded when needed
    │
    └─ Query Optimization
       ├─ Indexes on status field
       ├─ Limit results to 100
       ├─ Real-time batching
       └─ Auto caching
```

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Developer Workflow                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Local Development                                          │
│  ├─ npm run dev (Vite server on :8080)                      │
│  ├─ convex dev (Convex local dev server)                    │
│  └─ Hot Module Reload (auto refresh)                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
              │
              │ convex deploy
              │
┌─────────────────────────────────────────────────────────────┐
│              Convex Production Backend                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Cloud Functions (Serverless)                               │
│  ├─ Auto-scaling                                            │
│  ├─ Real-time WebSocket                                     │
│  ├─ Database snapshots                                      │
│  └─ Automatic backups                                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
              │
              │ npm run build
              │
┌─────────────────────────────────────────────────────────────┐
│         Frontend Static Deployment                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  CDN (Vercel, Netlify, etc.)                                │
│  ├─ dist/ folder (production build)                         │
│  ├─ index.html entry point                                  │
│  ├─ JavaScript bundles (code split)                         │
│  └─ Assets (CSS, images)                                    │
│                                                              │
│  Environment: VITE_CONVEX_URL                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
              │
              │
    ┌─────────┴─────────┐
    ▼                   ▼
User Browser       Another Browser
(Real-time sync via Convex)
```

---

## File Communication Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      React Component                         │
│                      (Issues.tsx)                            │
└──┬────────────────────────────────────────────────────────┬─┘
   │                                                        │
   ▼                                                        ▼
IssueForm.tsx ◄─────┐                          IssuesList.tsx
   │                │                              │
   ├─ Hook Form     │ convex/api                  ├─ useQuery
   ├─ Zod           │ mutations                   ├─ Filter state
   ├─ Form State    │ & queries                   └─ Grid layout
   ├─ Validation    │                                │
   └─ Mutation Call────────────────►               │
                                    │              │
                        ┌───────────┴──────────────┘
                        ▼
                 convex/issues.ts
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
    Mutations        Queries         Handlers
    (Create)      (List, Get)       (DB ops)
        │               │               │
        └───────────────┼───────────────┘
                        ▼
                 convex/schema.ts
                        │
                        ▼
                    Database
                   (Issues Table)
```

---

## Request Timeline (ms)

```
0ms    ── Form Submission
       │
5ms    ── Client Validation (Zod)
       │
50ms   ── Network Request to Convex
       │
150ms  ── Server Processing
       │  └─ Database Insert
       │
200ms  ── Response Sent Back
       │
250ms  ── Client Receives Response
       │
300ms  ── UI Updates
       │  ├─ Toast Notification
       │  ├─ Form Reset
       │  └─ IssuesList Re-Query
       │
400ms  ── Real-time Sync Notification
       │
500ms  ── All Clients Updated
       │
       ▼ (Total time: ~500ms for full sync)
```

---

This architecture ensures:
✅ Scalability - Convex handles growth automatically
✅ Real-time - WebSocket connections for instant updates  
✅ Performance - Optimized queries and rendering
✅ Maintainability - Clear separation of concerns
✅ Security - Type-safe and validated
✅ Reliability - Automatic backups and recovery
