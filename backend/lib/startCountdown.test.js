const { startCountdown } = require("./utils");
jest.useFakeTimers();
const store = {
  toggles: {
    exhibition: {
      pgValue: 2,
      lastSwitchOn: 0
    }
  }
};
describe('utils test', () => {
  test("startCountdown to…", () => {
    startCountdown(store, 10);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 50);

  });
});
