import type { ScheduleEvent, DayOfWeek, LayoutEvent, TimeOnly, Hour } from '../types';
import { TimeSlotInterval } from '../types';

/**
 * Calculate grid row index from TimeOnly (relative to events grid)
 * @param time - TimeOnly instance
 * @param startHour - Starting hour for the schedule (0-23)
 * @param timeSlotInterval - Interval enum value
 * @returns Grid row index (1-based for CSS Grid, relative to events grid)
 */
export function timeToGridRow(
  time: TimeOnly,
  startHour: Hour,
  timeSlotInterval: TimeSlotInterval
): number {
  const hoursFromStart = time.hours - startHour;
  
  const totalMinutes = hoursFromStart * 60 + time.minutes;
  const slotIndex = Math.floor(totalMinutes / timeSlotInterval);
  
  // +1 because: row 1 is first time slot (relative to events grid)
  return slotIndex + 1;
}

/**
 * Calculate event position and grid properties (relative to events grid)
 * @param event - Event to position
 * @param startHour - Starting hour for the schedule
 * @param timeSlotInterval - Interval enum value
 * @param visibleDays - Array of visible days to determine column index
 * @returns LayoutEvent with grid positioning
 */
export function calculateEventPosition(
  event: ScheduleEvent,
  startHour: Hour,
  timeSlotInterval: TimeSlotInterval,
  visibleDays: DayOfWeek[]
): LayoutEvent {
  const startRow = timeToGridRow(event.startTime, startHour, timeSlotInterval);
  const endRow = timeToGridRow(event.endTime, startHour, timeSlotInterval);
  
  // Ensure minimum height (at least 1 row)
  // TODO: allow for any height based on event duration
  const finalEndRow = Math.max(endRow, startRow + 1);
  
  const dayIndex = visibleDays.indexOf(event.day);
  const gridColumn = dayIndex + 1;
  
  return {
    ...event,
    gridRowStart: startRow,
    gridRowEnd: finalEndRow,
    gridColumn: gridColumn
  };
}

/**
 * Filter events to only those on visible days
 * @param events - All events
 * @param visibleDays - Days to show
 * @returns Filtered events array
 */
export function filterVisibleEvents(
  events: ScheduleEvent[],
  visibleDays: DayOfWeek[]
): ScheduleEvent[] {
  return events.filter(event => visibleDays.includes(event.day));
}

