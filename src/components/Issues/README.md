# Issues Components

This directory contains modular, reusable components for the issues feature.

## Components

### IssueForm.tsx
Form component for creating new issues.

**Features**:
- Full form validation with zod + React Hook Form
- Issue type selector (bug, feature-request, improvement, other)
- Severity level selector (critical, high, medium, low)
- Email input with validation
- Character counter for title and description
- Privacy notice banner
- Loading state with spinner
- Toast notifications for success/error

**Props**:
```typescript
interface IssueFormProps {
  onSuccess?: () => void;  // Callback when issue is submitted
}
```

**Usage**:
```tsx
import { IssueForm } from "@/components/Issues";

export default function IssuesPage() {
  return <IssueForm onSuccess={() => console.log("Issue created!")} />;
}
```

### IssueCard.tsx
Display card for individual issues.

**Features**:
- Issue title, description preview
- Type badge with emoji
- Severity badge with color coding
- Status badge with color coding
- User email and relative time
- Hover animations
- Scroll-triggered reveal

**Props**:
```typescript
interface IssueCardProps {
  issue: Issue;
  index: number;  // For stagger animation
}
```

**Usage**:
```tsx
import { IssueCard } from "@/components/Issues";

const issue = {
  _id: "123",
  title: "Cannot select text",
  description: "...",
  type: "bug",
  severity: "high",
  email: "user@example.com",
  status: "open",
  createdAt: 1234567890,
  updatedAt: 1234567890,
};

export default function Component() {
  return <IssueCard issue={issue} index={0} />;
}
```

### IssuesList.tsx
Display list of issues with filtering.

**Features**:
- Real-time issue synchronization
- Filter by status (All, Open, In Progress, Resolved, Closed)
- Loading state
- Empty state
- Responsive grid (1 col mobile, 2 cols desktop)
- Scroll-triggered stagger animation

**Props**:
```typescript
interface IssuesListProps {
  refreshTrigger?: number;  // When changed, refetches issues
}
```

**Usage**:
```tsx
import { IssuesList } from "@/components/Issues";

export default function IssuesPage() {
  const [refresh, setRefresh] = useState(0);
  
  return (
    <>
      <IssuesList refreshTrigger={refresh} />
      <button onClick={() => setRefresh(r => r + 1)}>
        Refresh
      </button>
    </>
  );
}
```

## Index Export

The `index.ts` barrel file exports all components for clean imports:

```tsx
import { IssueForm, IssuesList, IssueCard } from "@/components/Issues";
```

## Styling

All components use:
- Tailwind CSS for styling
- Space Grotesk font (global)
- Design tokens from tailwind.config.ts
- Custom Framer Motion animations

## Animation Presets

### ViewPort Animations
```typescript
initial={{ opacity: 0, y: 12 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-50px" }}
transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
```

### Stagger
Cards stagger with delay:
```typescript
delay: index * 0.08  // 80ms per card
```

### Hover Effects
- Cards: background color shift
- Buttons: scale 1.02 (hover), 0.98 (click)

## Type Safety

All components are fully typed with TypeScript. The `Issue` interface is imported from `@/../convex/_generated/api`.

## State Management

- **Form State**: React Hook Form (local)
- **Filter State**: useState (local)
- **Data State**: Convex useQuery (real-time sync)
- **Loading State**: Convex query undefined state

## Performance

- Memoization through Framer Motion's optimization
- Lazy rendering with whileInView
- Efficient list with proper key props
- Real-time updates through Convex (automatic batching)

## Accessibility

- Form labels with proper associations
- ARIA attributes on interactive elements
- Keyboard navigation (Tab, Enter, etc.)
- Color contrast meets WCAG AA
- Loading states clearly indicated

## Testing

Each component can be tested independently:

```tsx
// IssueCard.spec.tsx
import { IssueCard } from "@/components/Issues";

describe("IssueCard", () => {
  test("renders issue title", () => {
    const issue = { /* mock data */ };
    render(<IssueCard issue={issue} index={0} />);
    expect(screen.getByText("Issue Title")).toBeInTheDocument();
  });
});
```

## Common Issues & Solutions

### Form not validating
- Check Zod schema matches field names
- Verify form field names match schema keys
- Check form reset is called on success

### Issues not appearing after submit
- Verify Convex deployment is working (`convex status`)
- Check browser console for errors
- Ensure VITE_CONVEX_URL is set correctly

### Animations not playing
- Check Framer Motion is imported
- Verify component renders inside viewport (not hidden)
- Check z-index doesn't stack incorrectly

## Future Enhancements

- Issue editing
- Comment threads
- Issue upvoting
- File attachments
- Issue templates
- Email notifications
- Admin dashboard

## Related Files

- `convex/issues.ts` - Backend queries and mutations
- `src/pages/Issues.tsx` - Page component combining all
- `src/lib/convex.ts` - Utilities and helpers
- `CONVEX_SETUP.md` - Setup instructions
- `ISSUES_FEATURE_GUIDE.md` - Complete guide
