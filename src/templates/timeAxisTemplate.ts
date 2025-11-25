import { TimeSlotInterval, Hour, Minute, TimeOnly } from '../types';

/**
 * Create HTML for time axis labels (flat list, no positioning)
 * @param startHour - Starting hour (0-23)
 * @param endHour - Ending hour (0-23)
 * @param timeSlotInterval - Interval enum value
 * @returns HTML string for time axis labels
 */
export function createTimeLabelsHTML(
  startHour: Hour,
  endHour: Hour,
  timeSlotInterval: TimeSlotInterval
): string {
  let html = '';
  
  const slots: string[] = [];
  
  const createTimeString = (hour: number, minute: number): string => {
    return new TimeOnly(hour as Hour, minute as Minute).toString();
  };
  
  for (let hour = startHour; hour <= endHour; hour++) {
    if (timeSlotInterval === TimeSlotInterval.SixtyMinutes) {
      slots.push(createTimeString(hour, 0));
    } 
    else if (timeSlotInterval === TimeSlotInterval.ThirtyMinutes) {
      slots.push(createTimeString(hour, 0));
      if (hour < endHour) {
        slots.push(createTimeString(hour, 30));
      }
    } 
    else if (timeSlotInterval === TimeSlotInterval.FifteenMinutes) {
      slots.push(createTimeString(hour, 0));
      if (hour < endHour) {
        slots.push(createTimeString(hour, 15));
        slots.push(createTimeString(hour, 30));
        slots.push(createTimeString(hour, 45));
      }
    }
  }
  
  slots.forEach((time) => {
    html += `<div class="time-label">${time}</div>`;
  });
  
  return html;
}

