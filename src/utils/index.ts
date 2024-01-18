import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function shortDate(date: Date) {
  // zod adds the timezone to the parsed date which makes the site
  // report incorrect dates for the publishDate frontmatter.
  // Remove the timezone from the date to fix this.
  var timezoneless_date = new Date(date.toISOString().slice(0, -1))
  return new Date(timezoneless_date).toLocaleDateString('default', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function longDate(date: Date) {
  // zod adds the timezone to the parsed date which makes the site
  // report incorrect dates for the publishDate frontmatter.
  // Remove the timezone from the date to fix this.
  var timezoneless_date = new Date(date.toISOString().slice(0, -1))
  return new Date(timezoneless_date).toLocaleDateString('default', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function extractSegmentURL(path: string) {
  if (!path) return "";
  if (path === "/") return null;
  return path.split("/")[1];
}

export function capitalizer(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
