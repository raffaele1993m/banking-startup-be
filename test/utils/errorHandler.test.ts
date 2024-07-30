/* eslint-disable @typescript-eslint/no-explicit-any */
import { errorCodes } from "fastify";
import { errorHandler } from "../../src/utils/errorHandler";
import { FastifyRequestMock, mockReplyFastify } from "../utils";
import { AccountNotFoundException, NotEnoughFundsException } from "../../src/utils/errors";

describe("erroHandler test", () => {
  describe("when error instance of errorCodes.FST_ERR_VALIDATION", () => {
    it("should return expected value", () => {
      const err = new errorCodes.FST_ERR_VALIDATION({} as any);
      const codeSpy = jest.spyOn(mockReplyFastify, "code");
      errorHandler(err, FastifyRequestMock as any, mockReplyFastify);
      expect(codeSpy).toHaveBeenCalledWith(400);
    });
  });

  describe("when error instance of AccountNotFoundException", () => {
    it("should return expected value", () => {
      const err = new AccountNotFoundException("");
      const codeSpy = jest.spyOn(mockReplyFastify, "code");
      errorHandler(err, FastifyRequestMock as any, mockReplyFastify);
      expect(codeSpy).toHaveBeenCalledWith(404);
    });
  });

  describe("when error instance of NotEnoughFundsException", () => {
    it("should return expected value", () => {
      const err = new NotEnoughFundsException("");
      const codeSpy = jest.spyOn(mockReplyFastify, "code");
      errorHandler(err, FastifyRequestMock as any, mockReplyFastify);
      expect(codeSpy).toHaveBeenCalledWith(403);
    });
  });

  describe("when error is a generic one", () => {
    it("should return expected value", () => {
      const err = new Error("");
      const codeSpy = jest.spyOn(mockReplyFastify, "code");
      errorHandler(err, FastifyRequestMock as any, mockReplyFastify);
      expect(codeSpy).toHaveBeenCalledWith(500);
    });
  });
});