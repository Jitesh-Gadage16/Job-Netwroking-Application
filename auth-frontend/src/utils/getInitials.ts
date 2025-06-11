// src/utils/getInitials.ts
export function getInitials(name?: string): string {
  if (!name) return "";
  // split on whitespace, remove empty parts
  const parts = name.trim().split(/\s+/);
  // take first letter of first two parts
  const initials = parts
    .map((word) => word.charAt(0))
    .filter(Boolean)    // in case of empty strings
    .slice(0, 2)       // only first two letters
    .join("");
  return initials.toUpperCase();
}
