import { MoveTrainer, nextDateViaMoveTrainer } from "./chessable-move-trainer";

describe("nextDateViaMoveTrainer", () => {
  describe("when given level 0", () => {
    it("returns a date 4 hours in the future", () => {
      const moveTrainer: MoveTrainer = {
        lastCorrectAt: new Date("2022-01-01T00:00:00.000Z"),
        prevLevel: 0,
      };

      const actual = nextDateViaMoveTrainer(moveTrainer);
      const expected = new Date("2022-01-01T04:00:00.000Z");

      expect(actual).toEqual(expected);
    });
  });

  describe("when given level 8", () => {
    it("returns a date 180 days in the future", () => {
      const moveTrainer: MoveTrainer = {
        lastCorrectAt: new Date("2022-01-01T00:00:00.000Z"),
        prevLevel: 8,
      };

      const actual = nextDateViaMoveTrainer(moveTrainer);
      const expected = new Date("2022-06-30T00:00:00.000Z");

      expect(actual).toEqual(expected);
    });
  });
});
