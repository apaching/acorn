/**
 *  Returns 'November 7, 2025'
 */
export function formatDateLong(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoDate));
}

/**
 *  Returns 'Nov 7, 2025
 */
export function formatDateShort(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoDate));
}

/**
 *
 */
export function combineDateAndTime(date: Date, time: string) {
  const [hours, minutes, seconds = "0"] = time.split(":");

  const combined = new Date(date);
  combined.setHours(Number(hours), Number(minutes), Number(seconds), 0);

  return combined.toISOString();
}
