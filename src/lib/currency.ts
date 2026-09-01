const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** Formats a whole-rupee amount for display, e.g. 1999 -> "₹1,999". */
export function formatPrice(amount: number): string {
  return inrFormatter.format(Math.round(amount));
}
