// src/components/sections/donation/utils/formatters.ts

export function formatIDR(value: number) {
    try {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
    } catch {
      return `Rp ${value.toLocaleString("id-ID")}`;
    }
  }