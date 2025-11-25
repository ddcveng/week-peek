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
  translations?: DayNameTranslations
): string {
  const dayName = getDayName(day, translations);
  return `<div class="day-header" data-day="${day}">${dayName}</div>`;
}

