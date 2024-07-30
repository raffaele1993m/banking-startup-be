/* eslint-disable @typescript-eslint/no-explicit-any */
describe("migrate test", () => {
  const processExitFunction = jest.fn();
  const processExitMock = jest.spyOn(process, "exit").mockImplementation(processExitFunction as any);
  const PostgratorMock = jest.fn();
  const pgClientMock = jest.fn();
  const queryMock = jest.fn();
  const connectMock = jest.fn();
  const migrateMock = jest.fn();

  jest.mock("pg", () => ({ Client: pgClientMock }));
  jest.mock("postgrator", () => PostgratorMock);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("main function test", () => {
    describe("when Client throws", () => {
      beforeAll(() => {
        pgClientMock.mockImplementation(() => { throw new Error("Client Error"); });
      });

      it("should call process.exit", async () => {
        await jest.isolateModulesAsync(async () => {
          await import("../src/migrate");
        });
        expect(processExitMock).toHaveBeenCalledTimes(1);
      });
    });

    describe("when Client returns", () => {
      beforeAll(() => {
        pgClientMock.mockReturnValue({
          end: jest.fn(),
          query: queryMock,
          connect: connectMock
        });
      });

      describe("when connect rejects", () => {
        beforeAll(() => {
          connectMock.mockRejectedValue(new Error("connect Error"));
        });

        it("should call process.exit", async () => {
          await jest.isolateModulesAsync(async () => {
            await import("../src/migrate");
          });
          expect(processExitMock).toHaveBeenCalledTimes(1);
        });
      });

      describe("when connect resolves", () => {
        beforeAll(() => {
          connectMock.mockResolvedValue(null);
        });
        describe("when Pogtgrator throws", () => {
          beforeAll(() => {
            PostgratorMock.mockImplementation(() => { new Error("Potgrator Error"); });
          });
          it("should call process.exit", async () => {
            await jest.isolateModulesAsync(async () => {
              await import("../src/migrate");
            });
            expect(processExitMock).toHaveBeenCalledTimes(1);
          });
        });
        describe("when Pogtgrator returns", () => {
          beforeAll(() => {
            PostgratorMock.mockReturnValue({ migrate: migrateMock });
          });
          describe("when migrate rejects", () => {
            beforeAll(() => {
              migrateMock.mockRejectedValue(new Error("migrate Error"));
            });
            it("should call process.exit", async () => {
              await jest.isolateModulesAsync(async () => {
                await import("../src/migrate");
              });
              expect(processExitMock).toHaveBeenCalledTimes(1);
            });
          });

          describe("when migrate rejects", () => {
            beforeAll(() => {
              migrateMock.mockResolvedValue([]);
            });
            it("should not call process.exit", async () => {
              await jest.isolateModulesAsync(async () => {
                await import("../src/migrate");
              });
              expect(processExitMock).toHaveBeenCalledTimes(0);
            });
          });

        });
      });
    });
  });
});