const { connectionHandler, togglesHandler } = require("./websocket-server");
const store = require("./store");
// mock the store. We don't want to test the sideeffects of on change for now. This should go into a test for the store
jest.mock("./store", () => {
  return {
    toggles: {
      exhibition: {
        state: false,
        countdownActive: false,
        pgvalue: 0,
        lastSwitchOn: null,
      },
    },
  };
});
describe('websocket server', () => {
  test("connection handler ", () => {
    const mockSocket = {
      emit: jest.fn(),
      on: jest.fn()
    };

    connectionHandler(mockSocket);
    expect(mockSocket.emit).toHaveBeenCalledTimes(1);
    expect(mockSocket.emit).toHaveBeenCalledWith("toggles", store.toggles);
    expect(mockSocket.on).toHaveBeenCalledTimes(1);
    expect(mockSocket.on).toHaveBeenCalledWith("toggles", expect.any(Function));
  });
  test("togglesHandler", () => {

    const data = { exhibition: { state: true } };
    expect(store.toggles.exhibition.state).toBe(false);
    togglesHandler(data);
    expect(store.toggles.exhibition.state).toBe(true);
  });
});
