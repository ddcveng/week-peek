import type { DayOfWeek } from '../types';
import { getDayName } from '../types';
import type { DayNameTranslations } from '../types';

/**
 * Create HTML for a day header (simple div, no positioning)
 * @param day - Day of week enum value
 * @param translations - Optional day name translations (defaults to English)
 * @returns HTML string for day header
 */
export function createDayHeaderHTML(
  day: DayOfWeek,
  translations?: DayNameTranslations,
  selectedDay?: DayOfWeek | null
): string {
  const dayName = getDayName(day, translations);
  const isSelected = selectedDay === day;
  const selectedClass = isSelected ? ' selected' : '';
  const selectedAttr = isSelected ? ' data-selected="1"' : '';
  return `<div class="day-header${selectedClass}" data-day="${day}"${selectedAttr}>${dayName}</div>`;
}


