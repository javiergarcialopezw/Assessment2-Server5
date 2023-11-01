import { ReturnHelper } from "@Helper/return.helper";
import { HttpStatusCode } from "axios";

describe("Return Helper Unit Test", () => {
  it("should have data with number type", () => {
    const toReturn = new ReturnHelper<number>(HttpStatusCode.Ok, [2]);
    expect(typeof toReturn.data[0]).toStrictEqual(typeof 199);
  });
});
