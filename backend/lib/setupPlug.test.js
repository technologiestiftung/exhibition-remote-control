const cases = require("jest-in-case");
const { setupPlugs } = require("./utils");
const config = require("../config.json");
const { Plug } = require("tplink-smarthome-api");
describe('utilitles', () => {
  test("setupPlugs", () => {
    const plugs = setupPlugs();
    expect(plugs).toHaveLength(config.plugs.length);
    expect(plugs[0]).toBeInstanceOf(Plug);

  });
});

/**
 * creates an array of test cases
 */
function createTestCases() {
  const plugs = setupPlugs();
  const res = [];
  for (let i = 0; i < config.plugs.length; i++) {
    res.push({ name: `${config.plugs[i]} should match host of created plug`, ip: config.plugs[i], plug: plugs[i] });
  }
  return res;
}

/**
 * This uses a module jest-in-case that allows to run mulitple cases at once
 *
 */
cases("setupPlugs tests for all items in config.plug", opts => {
  expect(opts.ip).toBe(opts.plug.host);
}, createTestCases());