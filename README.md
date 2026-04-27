# FLOWLY 🍎

A premium Apple OS-inspired productivity intelligence system that combines task management, daily tracking, and behavioral insights.

## Features

- **Dashboard**: Real-time productivity tracking with circular progress indicator
- **Task Management**: Organize tasks by category (Work, Study, Fitness, Personal) and priority
- **Analytics**: Weekly, monthly, and yearly productivity visualizations
- **Insights Engine**: AI-style behavioral interpretations and recommendations
- **Dark Mode**: Beautiful dark theme support
- **Data Export**: Export your productivity data as JSON

## Tech Stack

- React + Vite
- Tailwind CSS
- Chart.js
- LocalStorage

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Design Philosophy

FLOWLY is inspired by Apple's design language:
- Minimal, clean interface
- Glassmorphism effects
- Smooth animations
- Mobile-first responsive design
- SF Pro typography style

## How It Works

### Progress Calculation
Daily progress = (Completed Tasks / Total Tasks) × 100

### Daily Snapshots
The system automatically saves one snapshot per day containing:
- Date
- Total tasks
- Completed tasks
- Completion percentage

### Insights Engine
Generates intelligent insights based on:
- Trend analysis (week-over-week comparison)
- Streak detection (consecutive days ≥60% completion)
- Best day analysis (weekday performance)
- Category performance (strongest/weakest areas)
- Overload detection (too many tasks = lower completion)

## Usage Tips

1. Add tasks daily to build your productivity history
2. Aim for 60%+ completion rate to maintain streaks
3. Focus on 5-7 high-priority tasks for optimal performance
4. Review insights weekly to understand your patterns
5. Use analytics to identify your most productive days

## License

MIT
