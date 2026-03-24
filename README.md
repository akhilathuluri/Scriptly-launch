# Spark
A native Windows desktop app that transforms selected text with AI — from any application, without breaking your flow.
Select text anywhere → press the hotkey → choose an action → get the result in seconds.

---

## How It Works

1. Select any text in any application (VS Code, Chrome, Notepad, Word, etc.)
2. Press the global hotkey (`Ctrl+Shift+Space` by default)
3. A floating action panel appears near your cursor
4. Pick an action (keyboard or mouse)
5. The AI result appears in a result window
6. Click **Replace** to swap the original text in-place, or **Copy** to grab it

Spark lives entirely in the system tray — no taskbar entry, no open windows when idle.

---

## Features

- **Global hotkey** — works while any app is in focus
- **Smart action ordering** — detects whether you selected code, an email, a long paragraph, or a short sentence and reorders actions accordingly
- **12 built-in actions** — Fix Grammar, Summarize, Translate, Expand, Shorten, Change Tone, Rewrite, Explain, Bullet Points, Casual Tone, Improve Writing, Explain Code
- **Custom actions** — create your own actions with a name, icon, description, and a prompt using `{text}` as the placeholder
- **Two AI providers** — OpenRouter (access to hundreds of models) or Groq (fast inference)
- **In-place Replace** — sends Ctrl+V back to the source app to replace the original selection
- **Keyboard navigation** — ↑/↓ arrows to browse actions, Enter to execute, Escape to dismiss
- **GPU-accelerated animations** — smooth open/close transitions on the floating panels
- **Per-monitor DPI aware** — sharp on any display scaling

---
