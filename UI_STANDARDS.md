# free-app UI/UX Standards

**Last Updated**: 2026-03-07

All components, animations, and interactions must adhere to these standards for consistency and polish.

---

## 1. Animation & Interaction Standards

### Transition Timing (CRITICAL FOR SAFARI)
- **Navigation & UI Transitions**: `1s ease-in-out` (not 0.3s)
- **Easing function**: `ease-in-out` (smooth acceleration/deceleration)
- **Rationale**: Fixes "choppy" behavior observed on Safari; 1s duration feels smooth on all devices
- **Applied to**:
  - Icon fades (nav interactions)
  - Page transitions
  - Button state changes
  - Modal/panel appearances

### Staggered Entrance Animations
- **Side panel elements**: Stagger children with `delay: idx * 0.08s`
- **Loading state text**: Fade in with stagger if multiple lines
- **Job listings**: Already implemented with containerVariants/itemVariants pattern
- **Rule**: All sequential elements must stagger, never reveal simultaneously

### Loading & Empty States
- **Loading indicators** ("Grabbin jobs", "Gobblin'"): Fade in/out with `0.3s ease`
- **Empty states** ("Shit, I found nothin'", "No mo jobs"): Slide-fade in from bottom with `duration: 0.4s`
- **No blue spinners**: Use text-based indicators only

### Page Reset & Focus States
- **Viewport reset**: On every page load/route change, scroll to top (`window.scrollTo(0, 0)`)
- **Focus outline**: Remove default blue outline on all interactive items
  ```css
  button, a, input { outline: none; }
  button:focus, a:focus, input:focus { outline: 2px solid transparent; }
  ```

---

## 2. Layout & UI Refinement

### Form Button Positioning
- **Save/Cancel buttons**: Use `position: absolute` (not relative)
- **Pinned to**: Bottom-right of form container
- **Spacing**: `bottom: 16px, right: 16px` from form edge
- **Applied to**: All contract forms, settings forms, modal forms

### Mobile Padding
- **Standard mobile padding**: `px-4` (16px) on all sides for mobile pages
- **Applied to**:
  - Contracts listing page
  - Jobs page (already correct)
  - Settings page
  - All new pages going forward
- **Desktop**: `px-8 md:px-12` for breathing room

### Button Labeling Standards
- **"New Contract"** → Change to **"New"** (shorter, consistent)
- **"Load More"** → Remove entirely; use infinite scroll only
- **Action buttons**: Lowercase, action-focused ("Delete", "Track", "Approve")

---

## 3. Infinite Scroll Logic

### Reliability Requirements
- Trigger when user scrolls to within `500px` of bottom
- Check: `scrollHeight - scrollTop - clientHeight < 500`
- **Must include**:
  - Debounce to prevent duplicate requests
  - Check `hasMore && !isLoadingMore` before fetching
  - Cleanup scroll listener on unmount
- **Test**: Scroll to bottom on Jobs page—should load seamlessly every time

### Empty & End-of-List States
- **No results after filter**: Show "Shit, I found nothin'" (centered, large, fades in)
- **End of results**: Show "No mo jobs" (bottom-aligned, small, fades in)
- **Animation**: Slide-fade from bottom with `duration: 0.4s ease`

---

## 4. Component-Specific Standards

### Navigation Icon Interactions
- **Duration**: `1s ease-in-out` (not 0.3s)
- **Opacity fade**: `0 → 1` on load, `1 → 0` on unload
- **No bounce or spring physics**: Linear, smooth easing only

### Side Panels (FilterPanel, CreateContractPanel, etc.)
- **Mobile**: `fixed inset-0` (fills viewport), white bg
- **Desktop**: `fixed top-0 right-0 w-96` (right side), dark bg
- **Content shift**: Only on desktop (`isMd && showPanel ? marginRight: 384 : 0`)
- **Children stagger**: `delay: idx * 0.08s` on entrance

### Timer & Toast Notifications
- **Position**: Bottom-right (`right-4 md:right-8`, `bottom-20 md:bottom-8`)
- **Animation**: Fade + slide up on entrance
- **Duration**: `0.3s` (not 1s—micro-interactions are quick)

---

## 5. Browser Compatibility

### Safari-Specific Fixes
- **No "choppy" animations**: Use `ease-in-out` with 1s duration
- **GPU acceleration**: Add `will-change: transform` to animated elements (but not excessively)
- **Transform-based animations**: Prefer `transform` + `opacity` over `top/left/width/height`

### Mobile Performance
- **Reduce animation complexity on mobile**: Check `window.matchMedia('(max-width: 480px)')`
- **No parallel animations**: Stagger, don't overlap
- **Debounce scroll events**: Max 60fps, not every pixel

---

## 6. Documentation & Checklists

### Pre-Component Audit
Before shipping any new component, verify:

- [ ] All transitions use `1s ease-in-out` or appropriate micro-interaction timing
- [ ] Stagger animations applied to sequential elements (`delay: idx * 0.08s`)
- [ ] Loading states use fade in/out, not spinners
- [ ] Focus outlines removed from interactive items
- [ ] Form buttons use `position: absolute` if action buttons
- [ ] Mobile padding is `px-4` (or greater)
- [ ] Viewport resets to top on page load
- [ ] Infinite scroll tested (scrolls to bottom, loads without stuttering)
- [ ] Empty states have slide-fade animation
- [ ] Safari tested (no choppy animations)

### Per-Page Checklist
- **Jobs**: Stagger on load, infinite scroll, empty state "Shit, I found nothin'"
- **Contracts**: Mobile padding, form buttons absolute, Track/Delete/Approve consistent
- **Settings**: Mobile padding, button styling consistent
- **Timer/Toast**: Bottom-right positioning, 0.3s animations

---

## 7. Future Additions

As new pages/components are built, add section here documenting:
- Animation patterns for that component
- Mobile vs. desktop differences
- Interaction states (hover, active, disabled)
- Accessibility considerations (focus visible, ARIA labels)

---

## Quick Reference

| Aspect | Standard | Notes |
|--------|----------|-------|
| **Page transitions** | 1s ease-in-out fade | Not 0.3s (too fast) |
| **Stagger delay** | `idx * 0.08s` (80ms) | For sequential reveals |
| **Micro-interactions** | 0.3s ease | Buttons, toggles, quick feedback |
| **Focus outline** | None (transparent) | Custom styling if needed |
| **Empty state anim** | 0.4s slide-fade from bottom | Not just fade |
| **Mobile padding** | `px-4` (16px) | Consistent across all pages |
| **Infinite scroll trigger** | Within 500px of bottom | Debounced, not on every pixel |
| **Form buttons** | `position: absolute` | Pinned to form edge |

