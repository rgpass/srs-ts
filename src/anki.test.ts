import { modify } from "./anki";

// const stepsIndex = 0;
const easeFactor = 250;
const interval = 0;
// const scheduledFor = 0;

describe("anki", () => {
  describe("when status is learning", () => {
    const status = "learning" as const;

    describe("when difficulty is again", () => {
      const difficulty = "again" as const;

      it("returns the correctly modified values", () => {
        const card = {
          status,
          stepsIndex: 1,
          easeFactor,
          interval,
          scheduledFor: 0,
        };

        expect(modify(card, difficulty)).toEqual({
          status: "learning",
          stepsIndex: 0,
          easeFactor: 250,
          interval: 0,
          scheduledFor: 1 / (60 * 24), // 1 minute
        });
      });
    });
  });
});
