// ref: https://gist.github.com/riceissa/1ead1b9881ffbb48793565ce69d7dbdd

type Status = "learning" | "learned" | "relearning";
type Difficulty = "again" | "hard" | "good" | "easy";

interface Card {
  status: Status; // default is "learning"
  stepsIndex: number; // default 0
  easeFactor: number; // percentage, default is 250%, so 250
  interval: number; // in days
  scheduledFor: number; // in days
}

const GRADUATING_INTERVAL = 1; // in days
const EASY_INTERVAL = 4; // in days
const MINIMUM_INTERVAL = 1; // in days
const MAXIMUM_INTERVAL = 36500; // in days
const NEW_INTERVAL = 70; // percentage
const STARTING_EASE_FACTOR = 250; // percentage
const EASY_BONUS = 130; // percentage

function minutesToDays(minutes: number): number {
  return minutes / (60 * 24);
}

interface Modifier {
  stepsIndex?: (vals: Card) => number;
  interval?: (vals: Card) => number;
  scheduledFor?: (vals: Card) => number;
  status?: (vals: Card) => Status;
  easeFactor?: (vals: Card) => number;
}

type AnkiModifiers = Record<Status, Record<Difficulty, Modifier>>;

const ankiModifiers: AnkiModifiers = {
  learning: {
    again: {
      stepsIndex: () => 0,
      scheduledFor: () => minutesToDays(1),
    },
    hard: {}, // `learning` cards have no `hard` difficulty option
    good: {
      stepsIndex: (vals) => vals.stepsIndex + 1, // called before interval
      interval: ({ stepsIndex }) =>
        stepsIndex === 1 ? null : GRADUATING_INTERVAL,
      scheduledFor: ({ stepsIndex }) =>
        stepsIndex === 1 ? minutesToDays(10) : GRADUATING_INTERVAL,
      status: ({ stepsIndex }) => (stepsIndex === 1 ? "learning" : "learned"),
    },
    easy: {
      interval: () => EASY_INTERVAL,
      scheduledFor: () => EASY_INTERVAL,
      status: () => "learned",
    },
  },
  learned: {
    again: {
      stepsIndex: () => 0,
      easeFactor: ({ easeFactor }) => Math.max(130, easeFactor - 20),
      interval: ({ interval }) =>
        Math.max(MINIMUM_INTERVAL, (interval * NEW_INTERVAL) / 100),
      scheduledFor: () => minutesToDays(10),
      status: () => "relearning",
    },
    hard: {
      easeFactor: ({ easeFactor }) => Math.max(130, easeFactor - 15),
      interval: ({ interval }) => interval * 1.2,
      scheduledFor: ({ interval }) => Math.min(MAXIMUM_INTERVAL, interval),
    },
    good: {
      interval: ({ easeFactor, interval }) => (interval * easeFactor) / 100,
      scheduledFor: ({ interval }) => Math.min(MAXIMUM_INTERVAL, interval),
    },
    easy: {
      easeFactor: ({ easeFactor }) => easeFactor + 15,
      interval: ({ easeFactor, interval }) =>
        interval * (easeFactor / 100) * (EASY_BONUS / 100),
      scheduledFor: ({ interval }) => Math.min(MAXIMUM_INTERVAL, interval),
    },
  },
  relearning: {
    again: {
      stepsIndex: () => 0,
      scheduledFor: () => minutesToDays(10),
    },
    hard: {}, // `relearning` cards have no `hard` difficulty option
    good: {
      stepsIndex: ({ stepsIndex }) => stepsIndex + 1,
      scheduledFor: ({ interval, stepsIndex }) =>
        stepsIndex === 1 ? minutesToDays(10) : interval,
      status: ({ stepsIndex }) => (stepsIndex === 1 ? "relearning" : "learned"),
    },
    easy: {}, // `relearning` cards have no `easy` difficulty option
  },
};

const card: Card = {
  status: "learning",
  stepsIndex: 0,
  easeFactor: STARTING_EASE_FACTOR,
  interval: 0,
  scheduledFor: 0,
};

export function modify(prev: Card, difficulty: Difficulty): Card {
  let { easeFactor, interval, scheduledFor, status, stepsIndex } = prev;
  const modifiers = ankiModifiers[status][difficulty];

  stepsIndex = modifiers.stepsIndex?.(prev) ?? stepsIndex;
  easeFactor = modifiers.easeFactor?.(prev) ?? easeFactor;
  interval = modifiers.interval?.(prev) ?? interval;
  status = modifiers.status?.(prev) ?? status;
  scheduledFor = modifiers.scheduledFor?.(prev) ?? scheduledFor;

  return { easeFactor, interval, scheduledFor, status, stepsIndex };
}

modify(card, "again");
