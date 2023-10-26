import { leitnerSystem } from "./leitner-system";

const lastCorrectAt = new Date("2022-01-01T00:00:00.000Z");
const levelDays = [4 / 24, 1, 3, 7, 14, 30, 90, 180];

describe("leitnerSystem", () => {
  describe("when given level 0", () => {
    it("adds the level 0 number of days", () => {
      const args = { lastCorrectAt, levelDays, prevLevel: 0 };

      const actual = leitnerSystem(args);
      const expected = new Date("2022-01-01T04:00:00.000Z");

      expect(actual).toEqual(expected);
    });
  });

  describe("when given the max level", () => {
    it("adds the max level number of days", () => {
      const args = { lastCorrectAt, levelDays, prevLevel: 7 };

      const actual = leitnerSystem(args);
      const expected = new Date("2022-06-30T00:00:00.000Z");

      expect(actual).toEqual(expected);
    });
  });

  describe("when given a level higher than the max", () => {
    it("adds the max level number of days", () => {
      const args = { lastCorrectAt, levelDays, prevLevel: 9 };

      const actual = leitnerSystem(args);
      const expected = new Date("2022-06-30T00:00:00.000Z");

      expect(actual).toEqual(expected);
    });
  });
});
