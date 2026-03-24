# Hero Section Modular Architecture

## Overview
The HeroSection has been enhanced with a modular three-component layout:
1. **TextSelectionDataCard** - Input/text management panel (LEFT)
2. **ActionPanelCard** - Action selection panel (CENTER)
3. **ResultWindowCard** - Output/results panel (RIGHT)

## Components

### TextSelectionDataCard (`src/components/TextSelectionDataCard.tsx`)
**Purpose**: Manages user text input, display, and basic text operations

**Props**:
```typescript
type TextSelectionDataCardProps = {
  selectedText: string;          // Current text content
  onTextChange: (text: string) => void; // Text update callback
  isLoading?: boolean;           // Optional loading state
};
```

**Features**:
- Text input textarea with focus styling
- Character and word count
- Paste button (from clipboard)
- Copy button (to clipboard)
- Clear button (reset text)
- Auto-calculation of text stats
- Responsive design (mobile & desktop)

**Usage**:
```tsx
import TextSelectionDataCard from "@/components/TextSelectionDataCard";

<TextSelectionDataCard 
  selectedText={text}
  onTextChange={setText}
  isLoading={false}
/>
```

### ActionPanelCard (`src/components/HeroSection.tsx`)
**Purpose**: Displays available text transformation actions

**Features**:
- Action list with icons and hotkeys
- Selection state (active/inactive styling)
- Hover effects
- Hotkey shortcuts (C, R, G, Q, S, T)
- Keyboard navigation support

### ResultWindowCard (`src/components/HeroSection.tsx`)
**Purpose**: Shows the transformed text result

**Features**:
- Typing animation effect
- Result display area
- Copy result button
- Replace/Apply action buttons
- Expand and regenerate options

---

## Data Flow

```
User Input (TextSelectionDataCard)
    ↓
    ├─ selectedText state
    ├─ Pass to action context
    ↓
Select Action (ActionPanelCard)
    ↓
    ├─ selectedActionId state
    ├─ Select corresponding action
    ↓
Display Result (ResultWindowCard)
    ↓
    └─ Show transformed text with animation
```

---

## State Management

### HeroSection State
```typescript
const [selectedActionId, setSelectedActionId] = useState(actionItems[0].id);
const [selectedText, setSelectedText] = useState("");
```

**State Hierarchy**:
- `selectedText` - Input from TextSelectionDataCard
- `selectedActionId` - Selection from ActionPanelCard
- Both states are independent and can be extended

---

## Styling & Responsive Design

### Breakpoints Used
- Mobile: default (no prefix)
- Tablet: `md:` (768px)
- Desktop: `lg:` (1024px)

### Layout Structure
```
md: 2-column (ActionPanel + ResultWindow)
lg: 3-column (TextCard + ActionPanel + ResultWindow)
```

### Color Theme
- Background: `#0d1020` (dark blue)
- Borders: `#2a2f57` (muted blue)
- Active: `#4a4e78` (highlighted blue)
- Accent: `#544cff` (purple/primary)
- Text: `#c9c9ea`, `#d8daf5` (light text)

---

## Future Extension Points

### 1. Integration with Backend
```typescript
// TextSelectionDataCard could integrate with:
// - File upload/drop support
// - Copy from web clipboard
// - Save text history
```

### 2. Action System Enhancement
```typescript
// ActionPanelCard could be extended to:
// - Dynamically load actions from API
// - Custom action creation UI
// - Action categories/grouping
// - AI-powered action suggestions
```

### 3. Result Processing
```typescript
// ResultWindowCard could support:
// - Multiple results (tabs)
// - Result versioning/history
// - Comparison view (before/after)
// - Export results (PDF, .docx, etc.)
```

### 4. State Persistence
```typescript
// Add localStorage or IndexedDB:
// - Remember last used action
// - Save text history
// - Persist user preferences
```

### 5. Keyboard Shortcuts
```typescript
// Extend keyboard support:
// - Global hotkey listener
// - Keyboard navigation across cards
// - Action hotkey execution
```

---

## Component Isolation Benefits

### ✅ Modularity
- Each component has single responsibility
- Can be used independently
- Easy to test in isolation

### ✅ Maintainability
- Clear prop interfaces (TypeScript)
- Self-contained styling
- Minimal dependencies

### ✅ Scalability
- Easy to add new cards
- State can be moved to Context/Redux if needed
- Reusable patterns for similar features

### ✅ Performance
- Independent re-renders
- Framer Motion animations scoped per component
- No unnecessary prop drilling

---

## Migration/Refactoring Path (Future)

If you want to extract ActionPanelCard and ResultWindowCard into separate files:

1. Create `src/components/ActionPanelCard.tsx`
2. Create `src/components/ResultWindowCard.tsx`
3. Update `src/components/HeroComponents/index.ts`
4. Update `src/components/HeroSection.tsx` to import from new files
5. No changes needed for components using HeroSection

---

## Testing Considerations

### TextSelectionDataCard
- Test text input/change handler
- Test paste functionality (mock clipboard API)
- Test clear button functionality
- Test word/char count calculations
- Test disabled state during loading

### ActionPanelCard
- Test action selection
- Test active state styling
- Test hotkey display

### ResultWindowCard
- Test typing animation
- Test copy functionality
- Test result display

---

## Accessibility

### Current Implementation
- Semantic HTML (button, textarea)
- ARIA attributes (`aria-pressed`, `aria-live`)
- Proper focus management
- Color contrast compliant
- Keyboard navigation support

### Future Improvements
- Add ARIA labels for icon-only buttons
- Keyboard hotkey guide
- Screen reader feedback for animations
- Status announcements for results

---

## Notes for Developers

1. **Do not break the current layout** - Keep the three-card horizontal layout responsive
2. **Maintain animation consistency** - Use similar Framer Motion patterns
3. **Color consistency** - Follow the existing color scheme in Tailwind config
4. **Props are the contract** - Don't change TextSelectionDataCardProps without versioning
5. **Keep components pure** - No side effects in render, use useEffect for async
6. **Type safety first** - Always export TypeScript types alongside components
