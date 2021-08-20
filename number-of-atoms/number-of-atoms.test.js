var { numberOfAtoms } = require("./number-of-atoms");

test("parses string correctly when there are nested sibiling groups", () => {
  expect(numberOfAtoms("MgA4(OgHKLMg(HOg3)2(KP9))")).toBe("A4H7K10L1Mg5Og7P9");
});
