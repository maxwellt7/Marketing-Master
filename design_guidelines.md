# Design Guidelines: Minimalistic Dark Chatbot with Neon Vector Styling

## Design Approach
**Aesthetic Direction**: Cyberpunk-inspired minimal chatbot with neon accent vectors
**Justification**: User specified dark theme with neon vectors - creating a futuristic, tech-forward aesthetic while maintaining minimalistic principles and chat functionality

---

## Core Design Elements

### A. Color Palette

**Dark Mode Foundation**:
- Background Primary: 260 15% 8% (deep dark purple-black)
- Background Secondary: 260 12% 12% (elevated surfaces)
- Background Tertiary: 260 10% 16% (chat bubbles, cards)

**Neon Accents**:
- Primary Neon: 170 100% 50% (electric cyan - main brand)
- Secondary Neon: 280 100% 65% (vibrant purple - highlights)
- Accent Neon: 330 100% 60% (neon pink - CTAs)

**Text Colors**:
- Primary Text: 0 0% 95% (near white)
- Secondary Text: 0 0% 70% (muted gray)
- Disabled Text: 0 0% 45% (dark gray)

**Functional Colors**:
- Success: 140 100% 50% (neon green)
- Error: 0 100% 60% (neon red)
- Warning: 45 100% 55% (neon orange)

### B. Typography

**Font Stack**:
- Primary: 'Inter', 'SF Pro Display', -apple-system, sans-serif (clean, modern)
- Monospace: 'JetBrains Mono', 'Fira Code', monospace (for code/technical elements)

**Type Scale**:
- Heading (Chat Title): 24px, weight 600, letter-spacing -0.02em
- Subheading: 18px, weight 500
- Body (Messages): 15px, weight 400, line-height 1.6
- Small (Timestamps): 12px, weight 400, opacity 0.7
- Input Text: 15px, weight 400

### C. Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16
- Micro spacing (2): Icon padding, small gaps
- Standard spacing (4, 6): Message padding, element gaps
- Section spacing (8, 12): Component separation
- Large spacing (16): Major layout blocks

**Chat Window Dimensions**:
- Desktop: 400px width × 600px height (fixed)
- Mobile: Full viewport width × 100vh
- Toggle Button: 64px × 64px (floating)

**Message Layout**:
- Max message width: 280px (prevents overly wide text blocks)
- Message spacing: 12px vertical gap between messages
- Chat padding: 16px horizontal, 20px vertical

### D. Component Library

**Chat Window Container**:
- Rounded corners: 16px (desktop only)
- Backdrop: Subtle blur effect (backdrop-filter: blur(8px))
- Border: 1px solid neon cyan at 20% opacity
- Shadow: Neon glow effect (box-shadow with cyan at 10% opacity, 0 0 40px)

**Chat Toggle Button**:
- Circular shape with neon gradient background (cyan to purple)
- Pulsing neon ring animation (subtle, 2s interval)
- Chat icon in white
- Position: Fixed bottom-right, 24px margin

**Message Bubbles**:
- Bot Messages: Background tertiary with subtle cyan left border (3px)
- User Messages: Neon gradient background (cyan to purple, 120deg)
- Border radius: 12px with sharp corner on sender side
- Padding: 12px horizontal, 10px vertical

**Input Field**:
- Background: Transparent with 1px neon cyan border
- Focused state: Border glows (increase opacity to 60%)
- Placeholder: Secondary text color
- Height: 48px minimum
- Border radius: 24px (pill-shaped)

**Header Section**:
- Background: Background secondary
- Height: 72px
- Bottom border: 1px neon gradient line (cyan to purple)
- Contains: Title, subtitle, close button
- Padding: 16px

**Typing Indicator**:
- Three animated dots in neon cyan
- Subtle bounce animation (staggered timing)
- Container: Same as bot message bubble

**Neon Vector Elements**:
- Geometric line accents in corners (SVG paths)
- Circuit-board inspired patterns as background texture (very subtle, 5% opacity)
- Glowing divider lines between sections
- Minimal animated vector shapes on load/transitions

**Scrollbar**:
- Track: Transparent
- Thumb: Neon cyan at 30% opacity, 4px width
- Thumb hover: Increase to 50% opacity
- Hidden on mobile, always visible on desktop

### E. Interaction & Animation

**Message Animations**:
- New messages: Slide up with fade-in (200ms ease-out)
- No hover effects on messages (maintain minimalism)

**Button States**:
- Default: Neon gradient with subtle glow
- Hover: Increase glow intensity by 30%
- Active: Slight scale down (0.98)
- Disabled: Grayscale with 40% opacity

**Loading States**:
- Skeleton screens with subtle shimmer in neon cyan
- Streaming messages: Typewriter effect with blinking cursor

**Micro-interactions**:
- Send button: Brief neon pulse on click
- Toggle button: Rotate 180deg on open/close
- Minimize: Scale down with fade (300ms)

---

## Special Considerations

**Accessibility**:
- Maintain 4.5:1 contrast ratio despite dark theme (use lighter neon shades for text)
- Focus indicators: 2px neon cyan outline with offset
- Keyboard navigation: Visible focus states throughout

**Neon Vector Styling**:
- Use CSS filters for glow effects (drop-shadow, blur)
- SVG geometric patterns as decorative background elements
- Thin lines (1-2px) for circuit-board aesthetic
- Apply neon colors at varying opacities (10-100%) for depth

**Performance**:
- Limit glow effects to static elements
- Use CSS animations over JavaScript where possible
- Lazy load vector decorations

**Responsive Behavior**:
- Desktop: Floating chat window with toggle
- Mobile: Full-screen takeover when opened
- Adjust spacing: 16px → 12px on mobile
- Simplify vector decorations on smaller screens

---

## Images
No images required - pure UI chatbot interface with vector graphics only.