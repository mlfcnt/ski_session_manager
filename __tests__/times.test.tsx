import { addTimes, millisecToSkiFormat, strToMillisec } from "../helpers/times";

describe("strToMillisec", () => {
  it("should work", () => {
    expect(strToMillisec("0.01.00")).toBe(1000);
    expect(strToMillisec("0.30.00")).toBe(30_000);
    expect(strToMillisec("0.10.45")).toBe(10_450);
    expect(strToMillisec("1.55.10")).toBe(115_100);
  });
});

describe("addTimes", () => {
  it("should work", () => {
    expect(addTimes("0.30.00", "0.30.00")).toBe(60_000);
    expect(addTimes("1.00.00", "1.00.00")).toBe(120_000);
    expect(addTimes("1.55.10", "1.55.10")).toBe(230_200);
  });
});
describe("millisecToSkiFormat", () => {
  it("should work", () => {
    expect(millisecToSkiFormat(1000)).toBe("0.01.00");
    expect(millisecToSkiFormat(234876)).toBe("3.54.87");
    expect(millisecToSkiFormat(21312)).toBe("0.21.31");
  });
});
