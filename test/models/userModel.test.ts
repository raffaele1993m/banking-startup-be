/* eslint-disable @typescript-eslint/no-explicit-any */
import { addOrWithdraw, createAccount, getBalanceByAccountId } from "../../src/models/userModel";
describe("userModel test", () => {
  const queryMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getBalanceByAccountId test", () => {
    const pgInstance = {
      query: queryMock
    };
    describe("when query rejects", () => {
      beforeAll(() => {
        queryMock.mockRejectedValue(new Error("getBalanceByAccountId Error"));
      });

      it("should be rejected with expected error", async () => {
        expect(async () => await getBalanceByAccountId(pgInstance as any, "0")).rejects.toThrow(new Error("getBalanceByAccountId Error"));
      });
    });

    describe("when query resolves", () => {
      beforeAll(() => {
        queryMock.mockResolvedValue({});
      });

      it("should return expected value", async () => {
        const res = await getBalanceByAccountId(pgInstance as any, "0");
        expect(res).toEqual({});
      });
    });
  });

  describe("createAccount test", () => {
    const pgInstance = {
      query: queryMock
    };
    describe("when query rejects", () => {
      beforeAll(() => {
        queryMock.mockRejectedValue(new Error("createAccount Error"));
      });

      it("should be rejected with expected error", async () => {
        expect(async () => await createAccount(pgInstance as any)).rejects.toThrow(new Error("createAccount Error"));
      });
    });

    describe("when query resolves", () => {
      beforeAll(() => {
        queryMock.mockResolvedValue({});
      });

      it("should return expected value", async () => {
        const res = await createAccount(pgInstance as any);
        expect(res).toEqual({});
      });
    });
  });

  describe("addOrWithdraw test", () => {
    const pgInstance = {
      query: queryMock
    };
    describe("when amount is a negative number", () => {
      describe("when query rejects", () => {
        beforeAll(() => {
          queryMock.mockRejectedValue(new Error("addOrWithdraw Error"));
        });

        it("should be rejected with expected error", async () => {
          expect(async () => await addOrWithdraw(pgInstance as any, "0", -1)).rejects.toThrow(new Error("addOrWithdraw Error"));
        });
      });

      describe("when query resolves", () => {
        beforeAll(() => {
          queryMock.mockResolvedValue({});
        });

        it("should return expected value", async () => {
          const res = await addOrWithdraw(pgInstance as any, "0", -1);
          expect(res).toEqual({});
        });
      });
    });

    describe("when amount is a positive number", () => {
      describe("when query rejects", () => {
        beforeAll(() => {
          queryMock.mockRejectedValue(new Error("addOrWithdraw Error"));
        });

        it("should be rejected with expected error", async () => {
          expect(async () => await addOrWithdraw(pgInstance as any, "0", 1)).rejects.toThrow(new Error("addOrWithdraw Error"));
        });
      });

      describe("when query resolves", () => {
        beforeAll(() => {
          queryMock.mockResolvedValue({});
        });

        it("should return expected value", async () => {
          const res = await addOrWithdraw(pgInstance as any, "0", 1);
          expect(res).toEqual({});
        });
      });
    });
  });
});