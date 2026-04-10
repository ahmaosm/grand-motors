export function calculatePrice(
  pricePerDay: number,
  dateStart: string,
  dateEnd: string
): { days: number; total: number } | null {
  if (!dateStart || !dateEnd) return null;

  const start = new Date(dateStart);
  const end = new Date(dateEnd);
  const diffTime = end.getTime() - start.getTime();
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (days <= 0) return null;

  let discount = 0;
  if (days >= 30) discount = 0.2;
  else if (days >= 14) discount = 0.15;
  else if (days >= 7) discount = 0.1;
  else if (days >= 3) discount = 0.05;

  const total = Math.round(pricePerDay * days * (1 - discount));

  return { days, total };
}
