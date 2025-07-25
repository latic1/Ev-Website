import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const capitalizeFirstLetter = (str?: string) => {
    if (str === undefined || typeof str !== 'string') {
        return
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
}