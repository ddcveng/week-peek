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
  const ariaLabel = isSelected ? `Return to full week` : `Zoom to ${dayName}`;
  return `<div class="day-header${selectedClass}" role="button" tabindex="0" aria-label="${ariaLabel}" data-day="${day}"${selectedAttr}><span class="day-header-label">${dayName}</span></div>`;
}


