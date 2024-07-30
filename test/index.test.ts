/* eslint-disable @typescript-eslint/no-explicit-any */

describe("Index test", () => {
  const FastifyClassMock = jest.fn();
  const processExitFunction = jest.fn();
  const registerMock = jest.fn();
  const readyMock = jest.fn();
  const listenMock = jest.fn();
  const withTypeProviderMock = jest.fn();
  const processExitMock = jest.spyOn(process, "exit").mockImplementation(processExitFunction as any);

  afterEach(() => {
    jest.clearAllMocks();
  });

  jest.mock("fastify", () => FastifyClassMock);

  describe("when Fastify constructor throws", () => {
    beforeAll(() => {
      FastifyClassMock.mockImplementation(() => { throw new Error("Fastify Error"); });
    });

    it("should be rejected with expected error", async () => {
      await jest.isolateModulesAsync(async () => {
        expect(async () => await import("../src/index")).rejects.toThrow(new Error("Fastify Error"));
      });
    });
  });

  describe("when Fastify constructor returns", () => {
    beforeAll(() => {
      FastifyClassMock.mockReturnValue({
        withTypeProvider: withTypeProviderMock
      });
    });

    describe("when withTypeProvider throws", () => {
      beforeAll(() => {
        withTypeProviderMock.mockImplementation(() => { throw new Error("withTypeProvider Error"); },);
      });

      it("should be rejected with expected error", async () => {
        await jest.isolateModulesAsync(async () => {
          expect(async () => await import("../src/index")).rejects.toThrow(new Error("withTypeProvider Error"));
        });
      });
    });

    describe("when withTypeProvider returns", () => {
      describe("start function test", () => {
        describe("when first register rejects", () => {
          beforeAll(() => {
            registerMock.mockRejectedValueOnce(new Error("first register Error"));

            withTypeProviderMock.mockReturnValue({
              log: { error: jest.fn() },
              register: registerMock
            });
          });

          it("should be call process.exit once", async () => {
            await jest.isolateModulesAsync(async () => {
              await import("../src/index");
            });
            expect(processExitMock).toHaveBeenCalledTimes(1);
          });
        });

        describe("when second register rejects", () => {
          beforeAll(() => {
            registerMock.mockResolvedValueOnce(null).mockRejectedValueOnce(new Error("second register Error"));

            withTypeProviderMock.mockReturnValue({
              log: { error: jest.fn() },
              register: registerMock
            });
          });

          it("should be call process.exit once", async () => {
            await jest.isolateModulesAsync(async () => {
              await import("../src/index");
            });
            expect(processExitMock).toHaveBeenCalledTimes(1);
          });
        });

        describe("when second register resolves", () => {
          describe("when log.info throws", () => {
            beforeAll(() => {
              registerMock.mockResolvedValueOnce(null).mockResolvedValueOnce(null);

              withTypeProviderMock.mockReturnValue({
                log: { error: jest.fn(), info: () => { throw new Error("log.info Error"); } },
                register: registerMock
              });
            });

            it("should be call process.exit once", async () => {
              await jest.isolateModulesAsync(async () => {
                await import("../src/index");
              });
              expect(processExitMock).toHaveBeenCalledTimes(1);
            });
          });

          describe("when log.info returns", () => {
            describe("when setErrorHandler throws", () => {
              beforeAll(() => {
                registerMock.mockResolvedValueOnce(null).mockResolvedValueOnce(null);

                withTypeProviderMock.mockReturnValue({
                  log: { error: jest.fn(), info: jest.fn() },
                  setErrorHandler: () => { throw new Error("setErrorHandler Error"); },
                  register: registerMock
                });
              });

              it("should be call process.exit once", async () => {
                await jest.isolateModulesAsync(async () => {
                  await import("../src/index");
                });
                expect(processExitMock).toHaveBeenCalledTimes(1);
              });

            });

            describe("when setErrorHandler returns", () => {
              describe("when third register rejects", () => {
                beforeAll(() => {
                  registerMock.mockResolvedValueOnce(null).mockResolvedValueOnce(null).mockRejectedValueOnce(new Error("third register Error"));

                  withTypeProviderMock.mockReturnValue({
                    log: { error: jest.fn(), info: jest.fn() },
                    setErrorHandler: jest.fn(),
                    register: registerMock
                  });
                });

                it("should be call process.exit once", async () => {
                  await jest.isolateModulesAsync(async () => {
                    await import("../src/index");
                  });
                  expect(processExitMock).toHaveBeenCalledTimes(1);
                });

              });

              describe("when third register resolves", () => {
                describe("when fourth register rejects", () => {
                  beforeAll(() => {
                    registerMock.mockResolvedValueOnce(null).mockResolvedValueOnce(null).mockResolvedValueOnce(null).mockRejectedValueOnce(new Error("fourth register Error"));

                    withTypeProviderMock.mockReturnValue({
                      log: { error: jest.fn(), info: jest.fn() },
                      setErrorHandler: jest.fn(),
                      register: registerMock
                    });
                  });

                  it("should be call process.exit once", async () => {
                    await jest.isolateModulesAsync(async () => {
                      await import("../src/index");
                    });
                    expect(processExitMock).toHaveBeenCalledTimes(1);
                  });

                });

                describe("when fourth register resolves", () => {
                  describe("when ready rejects", () => {
                    beforeAll(() => {
                      registerMock.mockResolvedValue(null);
                      readyMock.mockRejectedValue(new Error("ready Error"));
                      withTypeProviderMock.mockReturnValue({
                        log: { error: jest.fn(), info: jest.fn() },
                        setErrorHandler: jest.fn(),
                        register: registerMock,
                        ready: readyMock
                      });
                    });

                    it("should be call process.exit once", async () => {
                      await jest.isolateModulesAsync(async () => {
                        await import("../src/index");
                      });
                      expect(processExitMock).toHaveBeenCalledTimes(1);
                    });
                  });

                  describe("when ready resolves", () => {

                    describe("when listen resolves", () => {
                      beforeAll(() => {
                        registerMock.mockResolvedValue(null);
                        readyMock.mockResolvedValue(null);
                        listenMock.mockResolvedValue(null);
                        withTypeProviderMock.mockReturnValue({
                          log: { error: jest.fn(), info: jest.fn() },
                          setErrorHandler: jest.fn(),
                          register: registerMock,
                          ready: readyMock,
                          listen: listenMock
                        });
                      });

                      it("should be call process.exit once", async () => {
                        await jest.isolateModulesAsync(async () => {
                          await import("../src/index");
                        });
                        expect(processExitMock).toHaveBeenCalledTimes(0);
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});