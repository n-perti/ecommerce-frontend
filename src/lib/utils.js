import { clsx } from "clsx";
import { Cookie } from "lucide-react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function handleLogOut() {
  window.location.href = "/";
}