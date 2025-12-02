# Week Peek

Simple weekly schedule component with zoomable days and minimal dependencies.

## Features

- Zero dependencies: vanilla TypeScript + Sass; built with Vite
- Mobile-first responsive design: adapts cleanly from phone to desktop
- Zoomable days: click a day header to focus that day
- Event driven design: emits js events on event click and event hover

## Usage (ES Modules)

```html
<link rel="stylesheet" href="/week-peek/style.css">
<div id="app"></div>
<script type="module">
  import { WeeklySchedule, DayOfWeek } from '/week-peek/week-peek.es.js';

  const container = document.getElementById('app');
  const config = {
    visibleDays: [
      DayOfWeek.Monday,
      DayOfWeek.Tuesday,
      DayOfWeek.Wednesday,
      DayOfWeek.Thursday,
      DayOfWeek.Friday
    ],
    startHour: 9,
    endHour: 17
  };
  const events = [
    { id: 'evt-1', day: DayOfWeek.Monday, title: 'Standup', startTime: { hours: 9, minutes: 0 }, endTime: { hours: 9, minutes: 30 } },
  ];

  const result = WeeklySchedule.create(container, config, events);
  if (!result.success) console.error(result.error);

  // --- Event listeners ---
  // Click events: detail = { event }
  container.addEventListener('schedule-event-click', (e) => {
    const { event } = (e).detail;
    console.log('Clicked:', event.id, event.title);
  });

  // Hover start: detail = { event, element }
  container.addEventListener('schedule-event-hover', (e) => {
    const { event, element } = (e).detail;
    element.style.outline = '2px solid #3b82f6'; // simple highlight
    console.log('Hover start:', event.id);
  });

  // Hover end: detail = { event, element }
  container.addEventListener('schedule-event-hover-end', (e) => {
    const { event, element } = (e).detail;
    element.style.outline = '';
    console.log('Hover end:', event.id);
  });
</script>
```

Ensure your container controls sizing. The component fills its container (width/height via CSS), and switches to mobile layout below the breakpoint.

### Production Build

```pwsh
npm run build
```

Outputs:
- `dist/week-peek.iife.min.js` (global `WeekPeek`)
- `dist/week-peek.es.js` (ES module)
- `dist/style.css`

## License

MIT