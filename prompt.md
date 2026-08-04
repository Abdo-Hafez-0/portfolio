I want to redesign the project cards in the **Featured** and **University** sections to closely match the attached reference design while keeping the existing design language of the portfolio.

Before writing any code, analyze the current implementation and reuse as much of the existing styling, animations, and components as possible.

## Overall Goal

Transform each project card into a **wide terminal session** instead of a tall information card.

The card should feel like an opened project inspection window inside a futuristic operating system.

Do **not** make it look like a classic Linux terminal or a hacker UI. It must remain elegant, premium, minimal, and consistent with the current portfolio.

---

# Layout

The current card is too tall.

Redesign it into a much wider horizontal layout.

Use approximately:

- Left side: 35–40%
- Right side: 60–65%

The left side should contain:

- Large project banner
- Actual project title
- Role
- Tech stack
- Repository button

The right side should contain:

- Description
- Systems Implemented
- Problems Solved

The entire card should be visible without requiring excessive vertical scrolling.

---

# Terminal Header

Keep the existing terminal window style.

Example:

● ● ●     ABDO@PORTFOLIO:~/PROJECTS/TRIBEUP                  [ COMPLETE ]

Keep the current typography, colors, spacing and border style.

---

# ASCII / FIGlet Banner

The banner should become the visual centerpiece of the left side.

However:

- Do NOT wrap long project names onto multiple lines.
- Do NOT split words.
- Do NOT misspell project names.

Instead:

Generate a **short banner version** of the project name.

Examples:

TribeUp
→ Banner:

TRIBEUP

Honey E-Commerce
→ Banner:

HONEY

E-Learning Platform
→ Banner:

ELEARN

Game Gear Store
→ Banner:

GAMEGEAR

The **actual project title** should always appear underneath the banner using normal typography.

Example:

██████...

TribeUp

Backend Developer (Team Project)

This keeps the banner compact while preserving the correct project name.

---

# Banner Style

The banner should NOT be pure white.

Instead, make it follow the existing portfolio color system.

Use a subtle horizontal gradient.

Example:

Left side:

White (#FFFFFF)

Transition into:

Current cyan accent

or

Current blue accent

matching the existing project theme.

Do NOT introduce new colors.

The banner should feel integrated into the current UI.

Add a very subtle glow using the accent color.

The banner should remain crisp and readable.

---

# Information Layout

The right side should contain:

> Description

> Systems Implemented

> Problems Solved

Arrange these in a clean layout similar to the reference image.

The description should occupy the top.

The lower area can be divided into two columns:

Left

- Systems Implemented

Right

- Problems Solved

This creates a balanced layout and significantly reduces the card height.

---

# Tech Stack

Keep the technology tags underneath the title.

Wrap only if necessary.

Spacing should remain compact.

---

# Repository Button

Keep the terminal style button.

Position it at the bottom-left under the technology tags.

---

# Animations

I do NOT want interaction-triggered animations.

Instead, use **lazy loading animations**.

Behavior:

- When the card enters the viewport for the first time, play the animation once.
- Never replay the animation unless the page is refreshed.

Animation sequence:

1. Fade + slight upward motion of the terminal window.

2. Simulate terminal output:

```
$ open tribeup

Opening project...

Generating banner...
```

3. Render the ASCII banner with a left-to-right scan/typing effect.

4. After the banner finishes:

Reveal the project title.

Reveal the role.

Reveal the tech stack.

5. Then reveal the right-side content sequentially:

- Description
- Systems Implemented
- Problems Solved

Each section should appear with a subtle fade or slide.

The entire sequence should feel smooth, premium, and restrained.

Do NOT require:

- Hover
- Click
- Key press
- Expansion
- User interaction

Everything should happen automatically when the card becomes visible.

---

# Profile Picture

Inside the left section of the card, reserve a place for my profile image.

Use the existing asset:

```
profile-picture.png
```

Position it naturally within the layout so it complements the terminal aesthetic without dominating the project content.

Style:

- Circular image
- Soft border using the current accent color
- Very subtle glow
- Match the overall visual language of the portfolio

Do not replace it with placeholders.

Use the provided asset.

---

# Visual Consistency

Preserve:

- Existing typography
- Existing spacing
- Existing color palette
- Existing background grid
- Existing borders
- Existing animations
- Existing design language

This should feel like an evolution of the current portfolio rather than a redesign.

The final result should closely resemble the attached reference image while remaining fully responsive, clean, modern, and consistent with the current retro-futuristic operating system aesthetic.