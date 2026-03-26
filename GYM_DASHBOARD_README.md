# PHIVE Gym Dashboard

A pixel-perfect recreation of the gym dashboard web application with full-viewport hero section, floating 3D weight plates, and animated navigation bar.

## Features

- Full-bleed gym interior background image
- Two floating 3D weight plates with GSAP animations (top-left and bottom-right)
- Fixed bottom navigation bar with PHIVE logo
- Hamburger menu and soundwave icons with hover glow effects
- Fully responsive design (mobile, tablet, desktop)
- Smooth GSAP animations throughout

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- GSAP (GreenSock Animation Platform)

## Color Palette

- Primary Yellow: `#FFD600`
- Background Black: `#181818`
- White: `#FFFFFF`
- Gray: `#B3B3B3`

## Typography

- Logo/Navigation: Bold, all-caps, yellow (#FFD600)
- Font: System UI / Sans-serif stack

## Component Structure

```
src/
├── components/
│   ├── HeroSection.jsx       - Full-viewport background image
│   ├── FloatingPlate.jsx     - 3D weight plates with animations
│   ├── NavigationBar.jsx     - Bottom fixed navigation
│   ├── HamburgerIcon.jsx     - Menu icon
│   └── SoundwaveIcon.jsx     - Audio icon
├── App.jsx                   - Main application
├── App.css                   - Application styles
└── index.css                 - Global styles
```

## Running the Application

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

## Animations

All animations use GSAP for smooth, performant motion:

1. **Floating Plates**: Continuous rotation and vertical translation (4s duration, yoyo, infinite)
2. **Navigation Bar**: Fade in from bottom on page load (0.8s)
3. **Icon Hover**: Yellow glow effect on hamburger and soundwave icons (0.3s)

## Responsive Breakpoints

- Desktop: ≥1024px - Full layout as designed
- Tablet: 768-1023px - Scaled navigation and plates
- Mobile: <768px - Full-width navigation, repositioned plates

## Performance

- Lazy-loaded images
- Optimized SVG icons
- Hardware-accelerated GSAP animations
- Target Lighthouse score: 90+

## Visual Accuracy

All elements match the reference screenshot:
- Exact color values (#FFD600, #181818)
- Precise spacing and alignment
- Matching 3D weight plate design with "INSHAPE" text
- Correct navigation bar dimensions and positioning
