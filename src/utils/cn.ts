type ClassValue = string | number | bigint | boolean | undefined | null

export const cn = (...classes: ClassValue[]) =>
  classes.filter(Boolean).join(" ");