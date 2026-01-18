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
 *  Returns Nov 7, 2025
 */
export function formatDateShort(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoDate));
}

/**
 *  Combines date and time from Calendar input and time input
 *  to be inserted into the database as timestampz
 */
export function combineDateAndTime(date: Date, time: string) {
  const [hours, minutes, seconds = "0"] = time.split(":");

  const combined = new Date(date);
  combined.setHours(Number(hours), Number(minutes), Number(seconds), 0);

  return combined.toISOString();
}

/**
 *  Parses a Supabase timestamptz string into useful date/time formats
 */
export function parseSupabaseTimestampToDate(timestamp: string) {
  const iso = timestamp.replace(" ", "T");
  const date = new Date(iso);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid Supabase timestamp");
  }

  const calendarDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  return calendarDate as Date;
}

export function parseSupabaseTimestampToTime(timestamp: string) {
  const iso = timestamp.replace(" ", "T");
  const date = new Date(iso);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid Supabase timestamp");
  }

  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return time;
}

/**
 *
 */
export function formatDateToTime(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

type MonthOption = "number" | "name";

export function getCurrentMonthYear(option: MonthOption = "number") {
  const now = new Date();
  const monthNumber = now.getMonth() + 1;
  const year = now.getFullYear();

  let month: number | string = monthNumber;

  if (option === "name") {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    month = months[monthNumber - 1];
  }

  return { month, year };
}
