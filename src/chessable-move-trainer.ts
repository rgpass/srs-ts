// ref: https://chessable.stonly.com/kb/guide/en/how-does-the-spaced-repetition-scheduling-work-b6A4HAXont/Steps/198511
// Level 1: 4 hours
// Level 2: 1 day
// Level 3: 3 days
// Level 4: 1 week
// Level 5: 2 weeks
// Level 6: 1 month
// Level 7: 3 months
// Level 8: 6 months

import { LeitnerSystem, leitnerSystem } from "./leitner-system";

type MoveTrainer = Omit<LeitnerSystem, "levelDays">;

const levelDays = [4 / 24, 1, 3, 7, 14, 30, 90, 180];

export function nextDateViaMoveTrainer({
  lastCorrectAt,
  prevLevel,
}: MoveTrainer): Date {
  return leitnerSystem({ lastCorrectAt, levelDays, prevLevel });
}
