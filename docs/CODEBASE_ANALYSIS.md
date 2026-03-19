# Scriptly Launch - Comprehensive Codebase Analysis

## 1. Project Overview

**Project Name:** Scriptly Launch (vite_react_shadcn_ts)  
**Version:** 0.0.0  
**Type:** React + TypeScript Landing Page / Marketing Website  
**Build Tool:** Vite  
**UI Framework:** React 18.3.1  
**Styling:** Tailwind CSS 3.x  
**Component Library:** shadcn/ui (Radix UI primitives)  
**Status:** Active Development

### Purpose
Scriptly is a **native Windows desktop application** landing page that showcases:
- System-wide AI-powered text transformation tool
- Keyboard shortcut-based AI actions (Explain, Rewrite, Fix Grammar, Summarize, Translate, etc.)
- Works across all desktop applications without context switching
- Privacy-first approach with local API key encryption (Windows DPAPI)
- AI Provider: Groq (with plans for more providers)

---

## 2. Project Architecture

### Tech Stack

#### Core Dependencies
- **React** (v18.3.1): UI library
- **TypeScript**: Type-safe development
- **Vite** (v5+): Fast build tool and dev server
- **React Router DOM** (v6.30.1): Client-side routing
- **TanStack React Query** (v5.83.0): Server state management
- **Framer Motion** (v12.38.0): Advanced animations and transitions
- **Tailwind CSS** (v3.x): Utility-first CSS framework
- **shadcn/ui**: Pre-built accessible React components using Radix UI

#### UI Component Libraries (Radix UI)
- @radix-ui/react-accordion: Collapsible content sections
- @radix-ui/react-alert-dialog: Modal alerts
- @radix-ui/react-dialog: Accessible modal dialogs
- @radix-ui/react-dropdown-menu: Dropdown menus
- @radix-ui/react-popover: Floating popovers
- @radix-ui/react-select: Custom select dropdowns
- @radix-ui/react-tabs: Tabbed interfaces
- @radix-ui/react-tooltip: Hover tooltips
- @radix-ui/react-navigation-menu: Complex navigation
- Plus 20+ additional Radix components

#### Form Management
- **React Hook Form** (v7.61.1): Efficient form handling
- **@hookform/resolvers** (v3.10.0): Schema validation adapters
- **Zod** (v3.25.76): TypeScript-first schema validation

#### Animation & Interaction
- **Framer Motion** (v12.38.0): Smooth animations, gestures, layout transitions
- **Embla Carousel React** (v8.6.0): Carousel/slider component
- **React Resizable Panels** (v2.1.9): Draggable panel resizing
- **Vaul** (v0.9.9): Drawer component

#### Utilities & Data
- **Date-fns** (v3.6.0): Date manipulation
- **Recharts** (v2.15.4): React charting library
- **Lucide React** (v0.462.0): 462+ SVG icons
- **Sonner** (v1.7.4): Toast notifications
- **cmdk** (v1.1.1): Command palette component
- **Input OTP** (v1.4.2): OTP input fields

#### Utility Libraries
- **Tailwind Merge** (v2.6.0): Merge Tailwind classes without conflicts
- **clsx** (v2.1.1): Conditional className utility
- **Class Variance Authority** (v0.7.1): Type-safe component variants
- **next-themes** (v0.3.0): Dark mode management

#### Development & Testing
- **ESLint** (v9.32.0): Code linting with React/Hooks plugins
- **TypeScript ESLint** (v7+): Type-aware linting
- **Vitest** (latest): Unit test framework with jsdom
- **@testing-library/react** (v16.0.0): Component testing
- **@playwright/test** (v1.57.0): E2E testing
- **Tailwind CSS Typography** (v0.5.16): Typography plugin
- **Autoprefixer** (v10.4.21): CSS vendor prefix automation

#### Build & Config
- **@vitejs/plugin-react** (v6.0.0): Vite React plugin with SWC
- **PostCSS** (v8+): CSS transformation with Tailwind
- **Tailwindcss-animate** (v1.0.7): Animation utilities

---

## 3. Folder & File Structure

```
scriptly-launch/
├── public/                          # Static assets
│   └── robots.txt                   # Search engine crawler instructions
│
├── src/                             # Source code directory
│   ├── App.tsx                      # Main application component
│   ├── App.css                      # Legacy/placeholder CSS
│   ├── index.css                    # Global styles (Tailwind directives)
│   ├── main.tsx                     # React app entry point
│   ├── vite-env.d.ts               # Vite environment type definitions
│   │
│   ├── assets/                      # Static images/media
│   │   ├── scriptly-action-panel.png     # Demo UI screenshot
│   │   └── scriptly-result-window.png    # Result panel screenshot
│   │
│   ├── components/                  # React components
│   │   ├── CustomCursor.tsx         # Custom cursor implementation
│   │   ├── FAQSection.tsx           # FAQ section with accordion
│   │   ├── FeaturesSection.tsx      # Features grid (6 feature cards)
│   │   ├── Footer.tsx               # Footer with links/info
│   │   ├── HeroSection.tsx          # Hero with action panel demo
│   │   ├── Navbar.tsx               # Navigation bar (fixed top)
│   │   ├── NavLink.tsx              # Router-compatible NavLink wrapper
│   │   ├── ProductExperience.tsx    # "How it works" 4-step flow
│   │   │
│   │   └── ui/                      # shadcn/ui components (pre-built)
│   │       ├── accordion.tsx         # Collapsible sections
│   │       ├── alert-dialog.tsx      # Alert dialogs
│   │       ├── alert.tsx             # Alert boxes
│   │       ├── avatar.tsx            # User avatars
│   │       ├── badge.tsx             # Labels/badges
│   │       ├── button.tsx            # Button component (multiple variants)
│   │       ├── card.tsx              # Card container
│   │       ├── checkbox.tsx          # Checkbox input
│   │       ├── command.tsx           # Command palette
│   │       ├── dialog.tsx            # Modal dialog
│   │       ├── drawer.tsx            # Drawer sidebar
│   │       ├── dropdown-menu.tsx     # Dropdown menu
│   │       ├── form.tsx              # Form wrapper (React Hook Form)
│   │       ├── hover-card.tsx        # Hover popover
│   │       ├── input.tsx             # Text input
│   │       ├── input-otp.tsx         # OTP input fields
│   │       ├── label.tsx             # Form label
│   │       ├── popover.tsx           # Floating popover
│   │       ├── progress.tsx          # Progress bar
│   │       ├── radio-group.tsx       # Radio buttons
│   │       ├── select.tsx            # Dropdown select
│   │       ├── separator.tsx         # Visual divider
│   │       ├── sheet.tsx             # Bottom drawer
│   │       ├── skeleton.tsx          # Loading placeholder
│   │       ├── tabs.tsx              # Tabbed interface
│   │       ├── textarea.tsx          # Multi-line text input
│   │       ├── toggle.tsx            # Toggle switch
│   │       ├── toggle-group.tsx      # Group of toggles
│   │       ├── tooltip.tsx           # Hover tooltip
│   │       ├── sonner.tsx            # Toast notifications
│   │       ├── toaster.tsx           # Toast container
│   │       ├── use-toast.ts          # Toast hook
│   │       ├── chart.tsx             # Recharts wrapper
│   │       ├── calendar.tsx          # Date picker calendar
│   │       ├── carousel.tsx          # Embla carousel
│   │       ├── collapsible.tsx       # Collapsible content
│   │       ├── context-menu.tsx      # Right-click menu
│   │       ├── menubar.tsx           # Top menu bar
│   │       ├── navigation-menu.tsx   # Complex navigation
│   │       ├── pagination.tsx        # Page navigation
│   │       ├── resizable.tsx         # Draggable panels
│   │       ├── scroll-area.tsx       # Custom scrollbar
│   │       ├── sidebar.tsx           # Sidebar navigation
│   │       ├── slider.tsx            # Range slider
│   │       └── use-toast.ts          # Custom hook
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── use-mobile.tsx           # Responsive mobile breakpoint hook
│   │   └── use-toast.ts             # Toast notification hook
│   │
│   ├── lib/                         # Utility functions
│   │   └── utils.ts                 # Tailwind class merger (cn function)
│   │
│   ├── pages/                       # Page components (routes)
│   │   ├── Index.tsx                # Home page (7 sections)
│   │   ├── NotFound.tsx             # 404 error page
│   │   └── PrivacyPolicy.tsx        # Privacy policy page
│   │
│   └── test/                        # Test configuration
│       ├── setup.ts                 # Vitest setup (jsdom, mocks)
│       └── example.test.ts          # Example test file
│
├── Config Files (Root)
│   ├── index.html                   # HTML entry point
│   ├── package.json                 # Project metadata & dependencies
│   ├── tsconfig.json                # Main TypeScript config
│   ├── tsconfig.app.json            # App-specific TypeScript settings
│   ├── tsconfig.node.json           # Node.js TypeScript settings
│   ├── vite.config.ts               # Vite build configuration
│   ├── vitest.config.ts             # Testing framework config
│   ├── tailwind.config.ts           # Tailwind CSS theme & plugins
│   ├── postcss.config.js            # PostCSS plugins (Tailwind, Autoprefixer)
│   ├── eslint.config.js             # ESLint rules and settings
│   ├── playwright.config.ts         # E2E testing configuration
│   ├── playwright-fixture.ts        # Playwright test fixtures
│   ├── components.json              # (metadata file)
│   └── README.md                    # Project documentation (template)
```

---

## 4. Detailed Component Architecture

### Page Structure

#### A. **Index.tsx** (Home Page)
The main landing page composed of sequential sections:

```
Index (/)
├── Navbar
├── HeroSection
├── FeaturesSection
├── ProductExperience
├── FAQSection
└── Footer
```

---

### Core Components

#### 1. **Navbar.tsx** - Navigation Bar
- **Type:** Fixed header with scroll detection
- **Features:**
  - Animated entrance on page load
  - Glass-morphism effect when scrolled (backdrop-blur, semi-transparent)
  - Logo with hover animation (S → ArrowLeft icon swap using AnimatePresence)
  - Links: "FAQs" (scroll to #faq), "Download" button
  - Responsive: Hides some elements on mobile
- **Libraries Used:** Framer Motion, Lucide icons
- **Styling:** Tailwind CSS with custom hover states

#### 2. **HeroSection.tsx** - Hero + Interactive Demo
- **Type:** Full-screen hero section with interactive product demo
- **Features:**
  - Large headline: "AI Text. Anywhere."
  - Subtitle explaining the product
  - Two CTAs: "Download for Windows" + "Watch Demo"
  - **Interactive dual-panel demo:**
    - ActionPanelCard: Shows 6 AI actions (Explain Code, Rewrite, Fix Grammar, Ask AI, Summarize, Translate)
    - ResultWindowCard: Displays real-time typing effect of action results
  - Click on action → see result in real-time with animated text
- **Data:** 6 action items with icons, hotkeys, descriptions, and sample outputs
- **Animations:** Staggered entrance, hover lift effects on panels
- **Key Component:** ActionPanelCard + ResultWindowCard

#### 3. **FeaturesSection.tsx** - Feature Cards Grid
- **Type:** 6-card grid showcasing product capabilities
- **Features:**
  1. Instant Actions - Single shortcut transforms text
  2. Works Everywhere - Any application
  3. Smart Context - AI understands content
  4. Custom Actions - Define your own prompts
  5. In-place Replace - No copy-paste needed
  6. Lightning Fast - Native Windows app
  
- **Design:** Cards have hover effects (bg shift + shadow)
- **Special:** "Lightning Fast" card has animated SVG underline (scroll-triggered)
- **Animations:** Scroll-triggered reveal with stagger delay per card

#### 4. **ProductExperience.tsx** - "How It Works" Section
- **Type:** 4-step process visualization
- **Steps:**
  1. **Select** - Text selection visualization (highlighted text in box)
  2. **Trigger** - Keyboard shortcut display (Ctrl + Shift + Space)
  3. **Choose** - Action list preview (4 sample actions with hotkeys)
  4. **Result** - Transformed text with Copy/Replace buttons
  
- **Visual Design:** Each step has an icon + descriptive text + visual mockup
- **Animations:** Scroll-triggered stagger animation

#### 5. **FAQSection.tsx** - FAQ Accordion
- **Type:** Collapsible FAQ using shadcn/ui Accordion
- **Questions:** 8 FAQs covering:
  - What is Scriptly?
  - How does it work?
  - Which AI providers are supported? (Groq)
  - Is my data secure? (Yes - Windows DPAPI encryption)
  - Can I create custom actions?
  - Does it work in every application? (System-wide)
  - Is Scriptly free?
  - System requirements? (Windows 10+)
  
- **Design:** Glass-surface styling with smooth transitions
- **Interaction:** Single collapsible accordion (only one open at a time)

#### 6. **Footer.tsx** - Footer Section
- **Content:**
  - Logo + App name + Version (v1.0.0)
  - Social links: GitHub icon, Privacy Policy link, Email icon
  - Copyright notice: "© YEAR Scriptly. System-wide AI text."
- **Responsive:** Flex layout that stacks on mobile

#### 7. **PrivacyPolicy.tsx** - Privacy Policy Page
- **Type:** Informational page with styled sections
- **Sections:**
  1. Information We Process - Data collection scope
  2. How Your Data Is Used - Usage principles
  3. Storage and Security - Encryption & safety
  4. Contact - Privacy contact info
  
- **Last Updated:** March 18, 2026
- **Design:** Card-based layout with icons for each section

#### 8. **NotFound.tsx** - 404 Page
- **Type:** Error page
- **Content:** "404" heading + "Oops! Page not found" message + Home link
- **Features:** Logs 404 errors to console
- **Styling:** Centered content on muted background

---

### UI Component Library (shadcn/ui Components)

All components are pre-built Radix UI wrappers with Tailwind styling:

**Core Components:**
- `button.tsx` - Button with multiple variants (hero, nav, etc.)
- `card.tsx` - Card container with customizable layout
- `input.tsx` - Text input field
- `textarea.tsx` - Multi-line text input
- `form.tsx` - React Hook Form integration wrapper
- `label.tsx` - Form label

**Disclosure Components:**
- `accordion.tsx` - Collapsible sections (used in FAQ)
- `collapsible.tsx` - Expandable content
- `dialog.tsx` - Modal dialog
- `alert-dialog.tsx` - Alert dialog with actions

**Navigation Components:**
- `tabs.tsx` - Tabbed interface
- `navigation-menu.tsx` - Complex navigation structure
- `breadcrumb.tsx` - Breadcrumb navigation
- `pagination.tsx` - Page navigation

**Popover Components:**
- `popover.tsx` - Floating popover
- `hover-card.tsx` - Hover-triggered card
- `tooltip.tsx` - Hover tooltip
- `dropdown-menu.tsx` - Dropdown menu
- `context-menu.tsx` - Right-click menu

**Input Components:**
- `checkbox.tsx` - Checkbox with label
- `radio-group.tsx` - Radio button group
- `select.tsx` - Custom dropdown select
- `toggle.tsx` - Toggle button
- `toggle-group.tsx` - Group of toggles
- `switch.tsx` - Toggle switch
- `slider.tsx` - Range slider
- `input-otp.tsx` - OTP input (6 digits)

**Layout Components:**
- `sheet.tsx` - Bottom drawer/sheet
- `drawer.tsx` - Side drawer navigation
- `scroll-area.tsx` - Custom scrollbar area
- `resizable.tsx` - React Resizable Panels integration
- `separator.tsx` - Visual divider
- `sidebar.tsx` - Sidebar component

**Data Display:**
- `table.tsx` - Data table
- `progress.tsx` - Progress bar
- `chart.tsx` - Recharts wrapper
- `carousel.tsx` - Embla carousel
- `avatar.tsx` - User avatar
- `badge.tsx` - Label/tag badge
- `skeleton.tsx` - Loading placeholder

**Notification:**
- `toast.tsx` - Toast notification (shadcn wrapper)
- `toaster.tsx` - Toast container
- `use-toast.ts` - useToast hook
- `sonner.tsx` - Sonner toast wrapper

**Other:**
- `command.tsx` - Command palette
- `aspect-ratio.tsx` - Fixed aspect ratio container
- `alert.tsx` - Alert box
- `calendar.tsx` - Calendar date picker

---

### Custom Components

#### **CustomCursor.tsx**
- **Purpose:** Custom animated cursor for enhanced UX
- **Features:**
  - Animated dot (follows cursor exactly)
  - Animated ring (trails cursor with physics)
  - Changes state on hover:
    - **text**: Over input/textarea/contenteditable
    - **interactive**: Over buttons/links
    - **default**: Normal cursor
  - Only enabled on devices with fine pointer (touchscreen-aware)
- **Implementation:** Uses requestAnimationFrame for smooth 60fps animation
- **CSS:** Sets CSS custom properties (--x, --y) for dot/ring positioning

#### **NavLink.tsx**
- **Purpose:** React Router NavLink wrapper with Tailwind class support
- **Features:** Supports active/pending classNames
- **Use Case:** Custom styling for active navigation links

---

## 5. Styling System

### Tailwind CSS Configuration

**Theme Colors (HSL Format):**
```
Primary Color:      hsl(255 50% 45%) - Purple
Secondary:          hsl(32 15% 92%) - Light beige
Muted:              hsl(32 15% 94%) - Very light beige
Accent:             hsl(32 15% 90%) - Light beige
Destructive:        hsl(0 84.2% 60.2%) - Red
Background:         hsl(32 20% 98%) - Near white
Foreground:         hsl(240 10% 12%) - Near black
Card:               hsl(0 0% 100%) - White
```

**Custom Tokens:**
```
--shadow-card:   0 0 0 1px rgba(0,0,0,.03), 0 2px 4px rgba(0,0,0,.02), 0 12px 24px -12px rgba(0,0,0,.08)
--shadow-float:  0 20px 50px -12px rgba(0,0,0,0.15)
--radius:        0.75rem (border-radius base unit)
```

**Font:**
- Primary: Space Grotesk (Google Fonts, weights 300-700)
- Fallback: system-ui, sans-serif

**Custom CSS Classes:**
- `.glass-surface` - Glass-morphism effect (used in cards)
- `.text-gradient` - Gradient text effect
- `.shadow-card` - Subtle card shadow
- `.shadow-float` - Floating shadow
- `.custom-cursor` - Custom cursor styling

---

## 6. Routing Structure

**React Router v6 Configuration:**

```
/                    → Index.tsx (Home page with 7 sections)
/privacy-policy      → PrivacyPolicy.tsx (Privacy policy page)
*                    → NotFound.tsx (Catch-all 404)
```

**Navigation:**
- Navbar: Internal scroll link (#faq) + Download button
- FAQSection: Scroll to #faq ID
- Footer: GitHub, Privacy Policy link, Email contact
- 404 Page: "Return to Home" link back to "/"

---

## 7. State Management & Hooks

### React Query (TanStack React Query)
- **Purpose:** Server state management
- **Implementation:** QueryClient initialized in App.tsx with QueryClientProvider
- **Usage:** Ready for API data fetching (not currently used in demo)

### Custom Hooks

#### **useIsMobile()** (use-mobile.tsx)
- Returns boolean if viewport width < 768px
- Uses matchMedia API with eventListener
- Responsive design trigger for mobile state

#### **useToast()** (use-toast.ts)
- Manages toast notifications (shadcn/ui + Sonner)
- Returns { toast } function to trigger toasts
- Used for notifications across app

---

## 8. Forms & Validation

### React Hook Form + Zod
- **Setup:** @hookform/resolvers with Zod schema validation
- **Components:** Form wrapper in ui/form.tsx
- **Not Used in Current Version:** Landing page doesn't have forms yet
- **Ready For:** Future contact forms, settings, etc.

---

## 9. Animations & Transitions

### Framer Motion
- **HeroSection:** Staggered entrance animations, typing effect
- **Navbar:** Slide-in on mount, smooth scroll transitions
- **FeaturesSection:** Scroll-triggered card entrance with stagger
- **ProductExperience:** Step-by-step scroll animations
- **CustomCursor:** RequestAnimationFrame for smooth 60fps cursor animation

**Key Animation Patterns:**
- `initial={{ opacity: 0, y: 12 }}` - Start state
- `animate={{ opacity: 1, y: 0 }}` - Target state
- `whileInView={{ opacity: 1, y: 0 }}` - Scroll trigger
- `whileHover={{ y: -4 }}` - Hover effect
- `transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}` - Easing curve

---

## 10. Development & Build Configuration

### Vite Config (vite.config.ts)
```typescript
- Server Port: 8080
- Host: :: (IPv6)
- HMR Overlay: Disabled
- React Plugin: Enabled
- Path Alias: @/ → ./src/
```

### TypeScript Config (tsconfig.json)
```
- Path Mapping: @/* → ./src/*
- allowJs: true
- strictNullChecks: false
- skipLibCheck: true
- noUnusedLocals/Parameters: false
```

### PostCSS Config
```
- Tailwind CSS
- Autoprefixer (vendor prefixes)
```

### ESLint Config (eslint.config.js)
```
- ESLint + TypeScript ESLint
- React Hooks Rules
- React Refresh (warnings for exports)
- Ignores: dist/
```

---

## 11. Testing Setup

### Vitest Configuration
- **Environment:** jsdom (browser simulation)
- **Setup Files:** src/test/setup.ts
- **Test Files:** src/**/*.{test,spec}.{ts,tsx}
- **Globals:** true (no imports needed)

### Testing Library
- @testing-library/react for component testing
- @testing-library/jest-dom for matchers
- Window.matchMedia mock for custom hooks testing

### Playwright
- E2E testing configuration ready
- playwright-fixture.ts for fixtures
- playwright.config.ts for configuration

---

## 12. Build & Deployment

### NPM Scripts
```bash
npm run dev            # Start Vite dev server (port 8080)
npm run build          # Production build (vite build)
npm run build:dev      # Development build
npm run preview        # Preview production build
npm run lint           # Run ESLint checks
npm run test           # Run Vitest once
npm run test:watch     # Run Vitest in watch mode
```

### Build Output
- **Output Directory:** dist/
- **Entry:** index.html + compiled JavaScript
- **Optimizations:** Code splitting, tree-shaking, minification

---

## 13. Data Flow & Key Features

### Application Flow
1. **App.tsx** initializes:
   - QueryClient for data fetching
   - React Router with routes
   - Toast providers (Sonner + shadcn toast)
   - Tooltip provider for hover tooltips
   - Custom cursor component

2. **Index.tsx** renders:
   - Navbar (fixed header)
   - 6 full-section components (hero, features, etc.)
   - Footer

3. **Interactive Components:**
   - HeroSection: Click action → Update selected action state → ResultWindowCard types out response
   - ProductExperience: Visual step flow
   - FAQSection: Click question → Accordion expands

### Key Features Demonstrated
- **Keyboard Shortcuts:** Ctrl+Shift+Space demo
- **AI Actions:** 6 predefined actions + custom action support
- **Security:** Windows DPAPI encryption mentioned
- **Provider:** Groq AI integration
- **Platform:** Windows 10+ native app

---

## 14. Assets & Media

**Static Images:**
- `scriptly-action-panel.png` - Demo action panel UI
- `scriptly-result-window.png` - Demo result window UI

**Icons Library:**
- Lucide React (462+ icons) - Used throughout components
- Export icons: Download, Copy, Sparkles, MessageCircle, etc.

---

## 15. File Responsibilities Summary

| File/Folder | Responsibility |
|---|---|
| App.tsx | Root component with providers |
| main.tsx | React app entry point |
| index.css | Global Tailwind directives |
| components/ | All page/UI building blocks |
| pages/ | Route components |
| hooks/ | Custom React hooks |
| lib/ | Utility functions |
| ui/ | shadcn prebuilt components |
| vite.config.ts | Build tool config |
| tailwind.config.ts | Theme & styling config |
| tsconfig.json | Type checking rules |
| package.json | Dependencies & scripts |

---

## 16. Key Workflows

### Responsive Design
- **Breakpoints:** Tailwind defaults (sm: 640px, md: 768px, lg: 1024px, etc.)
- **Mobile Hook:** useIsMobile() for dynamic behavior
- **Responsive Classes:** md:, lg:, sm: prefixes throughout components

### Custom Styling Pattern
```tsx
className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === "primary" && "primary-classes"
)}
```

### Animation Pattern
```tsx
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

---

## 17. External Dependencies Highlights

**UI & Animations:**
- Embla Carousel: Advanced carousel/slider
- React Resizable Panels: Draggable layout panels
- Vaul: Drawer/sheet component
- Recharts: Data visualizations

**Dates & Time:**
- Date-fns: Date manipulation library
- React Day Picker: Calendar component

**Forms:**
- cmdk: Command palette
- Input OTP: OTP input component

**Utilities:**
- clsx: Class name merging
- Tailwind Merge: Smart Tailwind class merging

---

## 18. Product Information

### Scriptly Features (From Codebase)
- **6 Built-in Actions:**
  1. Explain Code
  2. Rewrite
  3. Fix Grammar
  4. Ask AI
  5. Summarize
  6. Translate

- **Security:**
  - Windows DPAPI for local API key encryption
  - No data stored on external servers
  - Direct transmission to AI provider

- **Supported Provider:** Groq (extensible for more)
- **System Requirements:** Windows 10 or later
- **Price Model:** Free to download, users provide API key (pay only for AI usage)
- **Launch Date:** v1.0.0 (Planning/Pre-Release)

---

## 19. TODO/Future Development

Based on codebase markers:
- [ ] Complete README.md documentation
- [ ] Set HTML document title
- [ ] Implement actual Demo video link
- [ ] Add Download button functionality
- [ ] Implement contact form on privacy page
- [ ] Create settings/configuration page
- [ ] Add more AI providers beyond Groq
- [ ] Build native Windows app implementation
- [ ] E2E tests with Playwright
- [ ] Analytics integration

---

## 20. Summary

**Scriptly Launch** is a **modern, production-ready landing page** for a Windows desktop AI application. It showcases:

✅ **Modern Tech Stack** - React 18, TypeScript, Vite, Tailwind CSS  
✅ **Polished UI** - 40+ shadcn/ui components, smooth animations  
✅ **Responsive Design** - Mobile-first approach  
✅ **Interactive Demo** - Live action/result panels  
✅ **Comprehensive Documentation** - Sections for FAQ, privacy, how it works  
✅ **Professional Styling** - Glass-morphism, gradients, custom cursor  
✅ **Testing Ready** - Vitest + Playwright setup  

The codebase is well-structured, maintainable, and follows React best practices with proper separation of concerns across pages, components, hooks, and utilities.
