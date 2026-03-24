# Hero Section Enhancement - UI/UX Guide

## Visual Layout

### Desktop View (3-Column Layout)
```
┌─────────────────────────────────────────────────────────────────┐
│                     "AI Text. Anywhere."                        │
│            + Download Button + Watch Demo Button               │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  │  Input Text     │  │     Actions     │  │     Result      │
│  │   [NEW CARD]    │  │   [EXISTING]    │  │   [EXISTING]    │
│  │                 │  │                 │  │                 │
│  │ ┌─────────────┐ │  │ • Explain       │  │ [Animated Text] │
│  │ │             │ │  │ • Rewrite       │  │                 │
│  │ │  Textarea   │ │  │ • Fix Grammar   │  │ [Apply Button]  │
│  │ │  Paste text │ │  │ • Ask AI        │  │ [Copy Button]   │
│  │ │   here...   │ │  │ • Summarize     │  │                 │
│  │ │             │ │  │ • Translate     │  │                 │
│  │ └─────────────┘ │  │                 │  │                 │
│  │                 │  │ [G] to select   │  │                 │
│  │ 0 words, 0 ch   │  │                 │  │                 │
│  │                 │  │                 │  │                 │
│  │ [Paste] [Copy]  │  │                 │  │                 │
│  │  [Clear]        │  │                 │  │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘
│
└──────────────────────────────────────────────────────────────────────┘
```

### Mobile View (Stacked Layout)
```
┌──────────────────────┐
│  "AI Text. Anywhere" │
│  [Download] [Demo]   │
├──────────────────────┤
│                      │
│   Input Text Card    │
│   [Textarea...]      │
│   [Paste][Copy]      │
│                      │
├──────────────────────┤
│                      │
│  Actions Card        │
│  • Explain Code      │
│  • Rewrite           │
│  • ...               │
│                      │
├──────────────────────┤
│                      │
│  Result Card         │
│  [Output...]         │
│  [Apply Button]      │
│                      │
└──────────────────────┘
```

---

## User Interaction Flow

### Basic Flow (As Designed)
```
Step 1: Paste or Type Text
┌─────────────────────────────────────┐
│  Input Text Card                    │
│  ┌─────────────────────────────────┐│
│  │ [Paste] [Copy] [Clear]          ││
│  │                                 ││
│  │ Lorem ipsum dolor sit amet...   ││
│  │                                 ││
│  │ 5 words, 24 characters          ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
          ↓ (state updates)
          
Step 2: Select an Action
┌─────────────────────────────────────┐
│  Actions Card                       │
│  • [Explain Code]      Hotkey: C    │
│  • [Rewrite]           Hotkey: R    │
│  • [Fix Grammar] ✓      Hotkey: G   │ ← Selected
│  • [Ask AI]            Hotkey: Q    │
│  • [Summarize]         Hotkey: S    │
│  • [Translate]         Hotkey: T    │
└─────────────────────────────────────┘
          ↓ (selectedActionId updates)
          
Step 3: View Result
┌─────────────────────────────────────┐
│  Result Card                        │
│  Fix Grammar                        │
│  ┌─────────────────────────────────┐│
│  │ Lorem Ipsum dolor sit amet...   ││
│  │ [typing animation]▌              ││
│  │                                 ││
│  │ [Expand] [Regenerate]           ││
│  │              [Copy] [Replace]   ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

---

## Component Features

### TextSelectionDataCard Features
```
✅ Text Input
   - Textarea with focus styling
   - Placeholder: "Paste or type your text here..."
   - Automatic height adjustment (200px mobile, 240px desktop)
   - Disabled during loading

✅ Statistics Display
   - Word count (space-separated)
   - Character count (total)
   - Shown above action buttons

✅ Action Buttons
   - [Paste] - Read from clipboard
   - [Copy] - Write to clipboard
   - [Clear] - Reset textarea
   - Disabled when text empty or loading

✅ Visual Feedback
   - Focus state with CSS border color change
   - Button hover effects
   - Loading state disable
   - Floating character count in top-right

✅ Responsive
   - Mobile: 280px width
   - Desktop: 320px width
   - Textarea: 200px (mobile) → 240px (desktop)
```

---

## Styling Details

### Color Scheme
```
Background:     #0d1020 (dark blue-black)
Border:         #2a2f57 (muted blue)
Active:         #4a4e78 (bright blue)
Text Primary:   #c9c9ea (light lavender)
Text Secondary: #7f84bf (muted lavender)
Accent:         #544cff (purple/primary)
Focus Border:   #544cff (purple with 20% shadow)
```

### Typography
```
Card Header:    text-lg font-semibold
Stats:          text-[11px]
Button Text:    text-xs font-medium
Placeholder:    text-[#6b70a8]
Result Text:    text-sm leading-relaxed
```

### Animations
```
Card Entrance:  0.6s with x-translation (left card from -30px)
Stagger Delay:  delay: 0.2s for text card
Hover Effect:   y: -4px (lift on hover)
Focus:          Instant border color change + shadow
Typing:         Custom effect in ResultWindowCard (~12ms per char)
```

---

## Responsive Breakpoints

```
Mobile (< 768px):
- Flex direction: column (stacked)
- Card width: 280px
- Gap: 1.5rem (6 units)
- Textarea height: 200px

Tablet (768px - 1024px):
- Flex direction: row
- Card width: 320px
- Gap: 2rem (8 units)
- Textarea height: 240px

Desktop (> 1024px):
- Flex direction: row
- Card width: 320px
- 3-column layout: text + actions + result
- Grid gap: 1.5rem-2rem
```

---

## Keyboard Support

### Current Implementation
- Tab navigation: Cycle through elements
- Focus styling: Clear visual indicator

### Existing Hotkeys (ActionPanelCard)
```
C - Explain Code
R - Rewrite
G - Fix Grammar
Q - Ask AI
S - Summarize
T - Translate
```

### Navigation Tip
```
"1. navigate - . select - esc close"
```

---

## State Management

### HeroSection Provider
```typescript
const [selectedActionId, setSelectedActionId] = useState(actionItems[0].id);
const [selectedText, setSelectedText] = useState("");
```

### Data Flow
```
TextSelectionDataCard
   ↓ onTextChange
   ↓ setSelectedText
   ↓
HeroSection State: selectedText
   ↓ (can be passed to other components)
   ↓

ActionPanelCard
   ↓ onSelectAction
   ↓ setSelectedActionId
   ↓
HeroSection State: selectedActionId
   ↓ derived selectedAction
   ↓
ResultWindowCard (displays action.result)
```

---

## Browser Compatibility

✅ Clipboard API (Paste/Copy buttons)
- Chrome 66+
- Firefox 63+
- Safari 13.1+
- Edge 79+

✅ CSS Features Used
- CSS Variables (Custom Properties)
- Gradient (background-gradient-to-b)
- Blur (backdrop filters)
- CSS Grid/Flex
- Animations (Framer Motion)

---

## Performance Considerations

### Optimizations In Place
1. **Textarea**: Controlled component (React manages state)
2. **Character Count**: Calculated on every change (lightweight)
3. **Word Count**: Simple `split().filter()` (O(n) but text is small)
4. **Animations**: GPU-accelerated via Framer Motion
5. **No Infinite Loops**: useEffect properly managed

### Potential Bottlenecks
- Very large text (>10,000 chars): May slow textarea scrolling
- Rapid paste: Character count recalculates each keystroke
- Many animations: Framer Motion handles efficiently

---

## Accessibility Features

✅ Implemented
- Semantic HTML (textarea, button elements)
- ARIA attributes (aria-pressed on active buttons)
- Keyboard navigation (Tab/Shift+Tab)
- Focus styling (visible on all interactive elements)
- Color contrast compliant (WCAG AA+)
- Tooltips for icon-only buttons

✅ Recommended Future Additions
- ARIA labels for icon buttons
- Screen reader announcements for results
- Keyboard hotkey guide overlay
- High contrast mode support

---

## Error Handling

### Clipboard Operations
```typescript
try {
  const text = await navigator.clipboard.readText();
  // Success
} catch {
  console.warn("Failed to read clipboard");
  // Silent fail - clipboard API may be unavailable in some contexts
}
```

### Graceful Degradation
- Paste button: Fails silently if clipboard unavailable
- Copy button: Disabled if text empty
- Clear button: No-op if text already empty

---

## Future Enhancement Hooks

```typescript
// Ready to add:
// 1. File drop support
onDrop={(e) => { ... }}

// 2. Text history persistence
localStorage.getItem('lastText')

// 3. AI Processing Integration
const { result, loading } = useAI(selectedText, selectedActionId)

// 4. Keyboard Shortcuts
useEffect(() => {
  window.addEventListener('keydown', handleHotkey)
}, [])

// 5. Result Export
exportAs('pdf' | 'docx' | 'txt')
```

---

## Testing Checklist

- [ ] Type text → appears in textarea
- [ ] Paste button → clipboard text inserted
- [ ] Character count → updates correctly
- [ ] Word count → updates correctly
- [ ] Copy button → works when text exists
- [ ] Clear button → resets textarea
- [ ] All buttons disabled during loading
- [ ] Focus styling visible on keyboard navigation
- [ ] Action selection still changes result
- [ ] Result typing animation works
- [ ] Mobile layout stacks correctly
- [ ] Desktop layout shows 3 columns
- [ ] Animations smooth at 60fps
- [ ] No console errors
- [ ] TypeScript types correct
