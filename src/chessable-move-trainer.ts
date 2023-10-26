// ref: https://chessable.stonly.com/kb/guide/en/how-does-the-spaced-repetition-scheduling-work-b6A4HAXont/Steps/198511
// Level 1: 4 hours
// Level 2: 1 day
// Level 3: 3 days
// Level 4: 1 week
// Level 5: 2 weeks
// Level 6: 1 month
// Level 7: 3 months
// Level 8: 6 months

export interface MoveTrainer {
  lastCorrectAt: Date;
  prevLevel: number;
}

const levelToDays: Record<number, number> = {
  1: 4 / 24,
  2: 1,
  3: 3,
  4: 7,
  5: 14,
  6: 30,
  7: 90,
  8: 180,
};

export function nextDateViaMoveTrainer({
  lastCorrectAt,
  prevLevel,
}: MoveTrainer): Date {
  const nextLevel = Math.min(prevLevel + 1, 8);
  const daysToAdd = levelToDays[nextLevel];

  const dueDate = new Date(lastCorrectAt); // Copied to be immutable
  dueDate.setTime(dueDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

  return dueDate;
}
