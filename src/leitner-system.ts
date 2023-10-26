export interface LeitnerSystem {
  lastCorrectAt: Date;
  levelDays: number[];
  prevLevel: number;
}

export function leitnerSystem({
  lastCorrectAt,
  levelDays,
  prevLevel,
}: LeitnerSystem): Date {
  prevLevel = Math.min(prevLevel, levelDays.length - 1);
  const daysToAdd = levelDays[prevLevel];

  const dueDate = new Date(lastCorrectAt); // Copied to be immutable
  dueDate.setTime(dueDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

  return dueDate;
}
