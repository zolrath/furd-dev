import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatDate(date: Date) {
  // zod adds the timezone to the parsed date which makes the site
  // report incorrect dates for the publishDate frontmatter.
  // Remove the timezone from the date to fix this.
  var timezoneless_date = new Date(date.toISOString().slice(0, -1))
  return format(timezoneless_date, "LLL dd, y");
}

export function extractSegmentURL(path: string) {
  if (!path) return "";
  if (path === "/") return null;
  return path.split("/")[1];
}

export function capitalizer(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
