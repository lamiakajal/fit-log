# ⚡ FitLog — Workout Library & Daily Lift Tracker

> **Track every rep, hit your target progressive overload, and design your daily lifting split with zero friction.**

FitLog is a modern, high-performance fitness tracking and workout management web application built with **Next.js 15 (App Router)**, **Tailwind CSS**, and **TypeScript**. Designed with an aggressive **"Dark Neon"** aesthetic, FitLog empowers athletes and lifters to discover structured compound movements, plan daily routines with intelligent constraints, and track their workout completion seamlessly.

---

## 🔗 Live Demo & Deployment

- **Live Application URL:** [YOUR_LIVE_LINK_HERE](https://)
- **GitHub Repository:** [https://github.com/lamiakajal/fit-log](https://github.com/lamiakajal/fit-log)

---

## 🎯 Key Features

### 1. 🏋️ Curated Workout Library & Dynamic Filtering

- Browse a rich database of resistance routines, strength splits, and hypertrophy exercises.
- Instant, interactive filtering by target muscle groups (**Chest, Back, Legs, Shoulders, Arms, Core**).
- Real-time search query matching and sorting based on workout intensity and ratings.

### 2. ⚡ Intelligent Daily Routine Planner (Max 5-Lift Cap)

- Add target routines directly to your active workout plan from both catalog cards and workout detail pages.
- **Strict Cap Enforcement:** Implements an automated restriction preventing users from adding more than 5 workouts to a single day's plan, preventing overtraining.
- User-friendly visual feedback and alerts when the cap is reached.

### 3. 🔖 Workout Bookmarks (Saved for Later)

- Save and bookmark high-priority exercises to revisit anytime without cluttering the active daily split.
- Toggle bookmarks with interactive micro-animations and badge counters.

### 4. 📊 Real-Time Dynamic Aggregate Metrics

- Automated live calculations on the **My Plan** dashboard displaying:
  - **Total Exercises Selected**
  - **Estimated Workout Duration (Minutes)**
  - **Projected Caloric Burn (kcal)**
- Visual **"Mark as Completed"** checklist mode with strikethrough states and progress indicators.

### 5. 💾 Offline Persistence via LocalStorage

- Fully persistent state management via React Context API and browser `localStorage`.
- Your daily plan and saved bookmarks stay synchronized across sessions and tab refreshes without requiring external database latency.

### 6. 🎨 Cyber-Dark Neon UI & Fluid Animations

- High-contrast visual hierarchy built on `#0f1115` dark background and `#ccff00` fluorescent neon green accents.
- Viewport-aware scroll entrance animations powered by `IntersectionObserver`.
- Custom ambient breathing aura glow loops on interactive banners, feature statistics, and navigation frames.
- Custom styled **404 Not Found** page matching the core brand aesthetic.

---

## 🛠️ Technology Stack

| Layer                | Technology                                                                                     |
| :------------------- | :--------------------------------------------------------------------------------------------- |
| **Framework**        | [Next.js 15 (App Router)](https://nextjs.org/)                                                 |
| **Language**         | [TypeScript](https://www.typescriptlang.org/) (Strict Mode)                                    |
| **Styling**          | [Tailwind CSS](https://tailwindcss.com/)                                                       |
| **State Management** | React Context API + LocalStorage Persistence                                                   |
| **Icons**            | [React Icons](https://react-icons.github.io/react-icons/) (Feather, Ionicons 5, FontAwesome 6) |
| **Typography**       | Oswald (Display/Headings) & Inter (Body UI) via `next/font`                                    |
| **Deployment**       | Vercel / Netlify                                                                               |

---

## 📂 Project Directory Structure

```text
fit-log/
├── public/                 # Static assets and icons
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with custom fonts, metadata, and Navbar/Footer
│   │   ├── page.tsx        # Homepage (Banner, FeatureStats, WorkoutLibrary)
│   │   ├── not-found.tsx   # Custom 404 error page (Dark Neon styled)
│   │   ├── my-plan/
│   │   │   └── page.tsx    # Planner dashboard with metrics and completed states
│   │   └── workouts/
│   │       └── [id]/
│   │           └── page.tsx # Dynamic workout details with specs and instructions
│   ├── components/
│   │   ├── Banner.tsx      # Hero section with animated neon glowing loop
│   │   ├── FeatureStats.tsx# Responsive highlight metrics with breathing glow
│   │   ├── Footer.tsx      # Responsive footer with quick links and scroll-to-top
│   │   ├── Navbar.tsx      # Sticky navigation with dynamic badge counters & drawer
│   │   └── WorkoutLibrary.tsx # Filterable exercise grid with search
│   ├── context/
│   │   └── WorkoutContext.tsx # Centralized state provider (Plan, Saved, LocalStorage)
│   └── data/
│
```
