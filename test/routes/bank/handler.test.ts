/* eslint-disable @typescript-eslint/no-explicit-any */
import { AccountCreationError, AccountNotFoundException, NotEnoughFundsException } from "../../../src/utils/errors";
import * as userModel from "../../../src/models/userModel";
import { addOrWithdraw, getBalanceByAccountId } from "../../../src/routes/bank/handler";
import { addOrWithdrawRequest, getBalanceByAccountIdRequest } from "../../utils";

describe("bank hanlder test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });


  describe("getBalanceByAccountId test", () => {
    describe("when getBalanceByAccountId rejects", () => {
      beforeAll(() => {
        jest.spyOn(userModel, "getBalanceByAccountId").mockRejectedValue(new Error("getBalanceByAccountId Error"));
      });
      it("should be rejected with expected error", async () => {
        expect(async () => await getBalanceByAccountId(getBalanceByAccountIdRequest)).rejects.toThrow(new Error("getBalanceByAccountId Error"));
      });
    });

    describe("when getBalanceByAccountId resolves with rows with lenght of 0", () => {
      beforeAll(() => {
        jest.spyOn(userModel, "getBalanceByAccountId").mockResolvedValue({ rows: [] } as any);
      });
      it("should be rejected with expected error", async () => {
        expect(async () => await getBalanceByAccountId(getBalanceByAccountIdRequest)).rejects.toThrow(new AccountNotFoundException("Account 0 not found"));
      });
    });

    describe("when getBalanceByAccountId resolves with rows with lenght greater than 0", () => {
      beforeAll(() => {
        jest.spyOn(userModel, "getBalanceByAccountId").mockResolvedValue({ rows: [{ amount: 0 }] } as any);
      });
      it("should return expected value", async () => {
        const res = await getBalanceByAccountId(getBalanceByAccountIdRequest);
        expect(res).toEqual({ accountId: 0, amount: 0 });
      });
    });
  });

  describe("addOrWithdraw test", () => {
    describe("when getBalanceByAccountId rejects", () => {
      beforeAll(() => {
        jest.spyOn(userModel, "getBalanceByAccountId").mockRejectedValue(new Error("getBalanceByAccountId Error"));
      });

      it("should be rejected with expected error", async () => {
        expect(async () => await addOrWithdraw(addOrWithdrawRequest)).rejects.toThrow(new Error("getBalanceByAccountId Error"));
      });
    });

    describe("when getBalanceByAccountId resolves with rows with length of 0", () => {
      beforeAll(() => {
        jest.spyOn(userModel, "getBalanceByAccountId").mockResolvedValue({ rows: [] } as any);
      });
      describe("when createAccount rejects", () => {
        beforeAll(() => {
          jest.spyOn(userModel, "createAccount").mockRejectedValue(new Error("createAccount Error"));
        });

        it("should be rejected with expected error", async () => {
          expect(async () => await addOrWithdraw(addOrWithdrawRequest)).rejects.toThrow(new Error("createAccount Error"));
        });

      });

      describe("when createAccount resolves with rows with length of 0", () => {
        beforeAll(() => {
          jest.spyOn(userModel, "createAccount").mockResolvedValue({ rows: [] } as any);
        });

        it("should be rejected with expected error", async () => {
          expect(async () => await addOrWithdraw(addOrWithdrawRequest)).rejects.toThrow(new AccountCreationError("Account Creation Error"));
        });
      });

      describe("when createAccount resolves with rows with length greater than 0", () => {
        beforeAll(() => {
          jest.spyOn(userModel, "createAccount").mockResolvedValue({ rows: [{ id: 0 }] } as any);
        });
        describe("when addOrWithdraw rejects", () => {
          beforeAll(() => {
            jest.spyOn(userModel, "addOrWithdraw").mockRejectedValue(new Error("addOrWithdraw Error"));
          });

          it("should be rejected with expected error", async () => {
            expect(async () => await addOrWithdraw(addOrWithdrawRequest)).rejects.toThrow(new Error("addOrWithdraw Error"));
          });
        });

        describe("when addOrWithdraw resolves with rows with length of 0", () => {
          beforeAll(() => {
            jest.spyOn(userModel, "addOrWithdraw").mockResolvedValue({ rows: [] } as any);
          });

          it("should be rejected with expected error", async () => {
            expect(async () => await addOrWithdraw(addOrWithdrawRequest)).rejects.toThrow(new NotEnoughFundsException("Not enough funds for accountId 0"));
          });
        });

        describe("when addOrWithdraw resolves with rows with length greater than 0", () => {
          beforeAll(() => {
            jest.spyOn(userModel, "addOrWithdraw").mockResolvedValue({ rows: [{ amount: 0 }] } as any);
          });

          it("should be return expected value", async () => {
            const res = await addOrWithdraw(addOrWithdrawRequest);
            expect(res).toEqual({ accountId: 0, amount: 0 });
          });
        });
      });
    });

    describe("when getBalanceByAccountId resolves with rows with length greater than 0", () => {
      beforeAll(() => {
        jest.spyOn(userModel, "getBalanceByAccountId").mockResolvedValue({ rows: [{ id: 0, amount: 0 }] } as any);
      });

      describe("when addOrWithdraw rejects", () => {
        beforeAll(() => {
          jest.spyOn(userModel, "addOrWithdraw").mockRejectedValue(new Error("addOrWithdraw Error"));
        });

        it("should be rejected with expected error", async () => {
          expect(async () => await addOrWithdraw(addOrWithdrawRequest)).rejects.toThrow(new Error("addOrWithdraw Error"));
        });
      });

      describe("when addOrWithdraw resolves with rows with length of 0", () => {
        beforeAll(() => {
          jest.spyOn(userModel, "addOrWithdraw").mockResolvedValue({ rows: [] } as any);
        });

        it("should be rejected with expected error", async () => {
          expect(async () => await addOrWithdraw(addOrWithdrawRequest)).rejects.toThrow(new NotEnoughFundsException("Not enough funds for accountId 0"));
        });
      });

      describe("when addOrWithdraw resolves with rows with length greater than 0", () => {
        beforeAll(() => {
          jest.spyOn(userModel, "addOrWithdraw").mockResolvedValue({ rows: [{ id: 0, amount: 0 }] } as any);
        });

        it("should return expected value", async () => {
          const res = await addOrWithdraw(addOrWithdrawRequest);
          expect(res).toEqual({ accountId: 0, amount: 0 });
        });
      });
    });
  });
});