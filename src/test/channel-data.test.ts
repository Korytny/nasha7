import { describe, it, expect } from "vitest";
import { timeline, filterPrograms } from "@/lib/channel-data";
describe("Channel history and program categories", () => {
  it("uses all five specified historical years", () => {
    expect(timeline.map((t) => t.year)).toEqual(["2010", "2015", "2020", "2024", "2026"]);
  });
  it("keeps the children program in the children filter", () => {
    expect(filterPrograms("Детские").map((p) => p.name)).toEqual(["Детский час"]);
  });
  it("shows all six example programs when unfiltered", () => {
    expect(filterPrograms("Все программы").length).toBe(6);
  });
});
