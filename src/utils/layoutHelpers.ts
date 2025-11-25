import type { ScheduleEvent, DayOfWeek, LayoutEvent, TimeOnly, Hour } from '../types';
import { TimeSlotInterval, ScheduleOrientation } from '../types';

/**
 * Calculate time slot index from TimeOnly (0-based, relative to start hour)
 * @param time - TimeOnly instance
 * @param startHour - Starting hour for the schedule (0-23)
 * @param timeSlotInterval - Interval enum value
 * @returns Slot index (0-based)
 */
export function timeToSlotIndex(
  time: TimeOnly,
  startHour: Hour,
  timeSlotInterval: TimeSlotInterval
): number {
  const hoursFromStart = time.hours - startHour;
  const totalMinutes = hoursFromStart * 60 + time.minutes;
  return Math.floor(totalMinutes / timeSlotInterval);
}


/**
 * Calculate the fractional offset within a time slot (0.0 to 1.0)
 * @param time - TimeOnly instance
 * @param startHour - Starting hour for the schedule
 * @param timeSlotInterval - Interval enum value
 * @returns Fractional offset within the slot (0.0 = start of slot, 1.0 = end of slot)
 */
export function timeToSlotOffset(
  time: TimeOnly,
  startHour: Hour,
  timeSlotInterval: TimeSlotInterval
): number {
  const hoursFromStart = time.hours - startHour;
  const totalMinutes = hoursFromStart * 60 + time.minutes;
  const slotIndex = Math.floor(totalMinutes / timeSlotInterval);
  const minutesIntoSlot = totalMinutes - (slotIndex * timeSlotInterval);
  return minutesIntoSlot / timeSlotInterval;
}

/**
 * Calculate event position and grid properties (relative to events grid)
 * Returns integer grid positions and CSS positioning values for fractional offsets.
 * @param event - Event to position
 * @param startHour - Starting hour for the schedule
 * @param timeSlotInterval - Interval enum value
 * @param visibleDays - Array of visible days to determine day index
 * @param orientation - Schedule orientation (determines axis mapping)
 * @returns LayoutEvent with grid positioning and CSS positioning values
 */
export function calculateEventPosition(
  event: ScheduleEvent,
  startHour: Hour,
  timeSlotInterval: TimeSlotInterval,
  visibleDays: DayOfWeek[],
  orientation: ScheduleOrientation
): LayoutEvent {
  // Calculate which slots the event spans (integer positions)
  const startSlot = timeToSlotIndex(event.startTime, startHour, timeSlotInterval);
  const endSlot = timeToSlotIndex(event.endTime, startHour, timeSlotInterval);
  const finalEndSlot = Math.max(endSlot, startSlot + 1);
  
  // Calculate fractional offsets within the start and end slots
  const startOffset = timeToSlotOffset(event.startTime, startHour, timeSlotInterval);
  const endOffset = timeToSlotOffset(event.endTime, startHour, timeSlotInterval);
  
  const dayIndex = visibleDays.indexOf(event.day);
  
  if (orientation === ScheduleOrientation.Horizontal) {
    // Horizontal: rows = days, columns = time slots
    const spanSlots = finalEndSlot - startSlot;
    const leftPercent = startOffset * 100;
    const widthPercent = ((1 - startOffset) + (spanSlots - 1) + endOffset) * 100;
    
    return {
      ...event,
      gridRowStart: dayIndex + 1,
      gridRowEnd: dayIndex + 2, // Days span 1 row
      gridColumnStart: startSlot + 1,
      gridColumnEnd: finalEndSlot + 1,
      leftPercent,
      widthPercent
    };
  } else {
    // Vertical: rows = time slots, columns = days
    const spanSlots = finalEndSlot - startSlot;
    const topPercent = startOffset * 100;
    const heightPercent = ((1 - startOffset) + (spanSlots - 1) + endOffset) * 100;
    
    return {
      ...event,
      gridRowStart: startSlot + 1,
      gridRowEnd: finalEndSlot + 1,
      gridColumnStart: dayIndex + 1,
      gridColumnEnd: dayIndex + 2, // Days span 1 column
      topPercent,
      heightPercent
    };
  }
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

