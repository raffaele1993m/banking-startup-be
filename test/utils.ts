/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { FastifyReply } from "fastify";
import { Bindings } from "fastify/types/logger";
import { AddOrWithdrawSchema, FastifyRequestTypebox, GetBalanceSchema } from "../src/schemas";

export const FastifyRequestMock = {
  server: {
    pg: {}
  },
  log: {
    debug: (x: unknown) => { },
    info: (x: unknown) => { },
    error: (x: unknown) => { },
    warn: (x: unknown) => { },
    fatal: (x: unknown) => { },
    trace: (x: unknown) => { },
    child: (x: Bindings) => null as any,
  },
};

export const getBalanceByAccountIdRequest: FastifyRequestTypebox<typeof GetBalanceSchema> = {
  ...FastifyRequestMock,
  params: {
    accountId: 0
  },
} as any;

export const addOrWithdrawRequest: FastifyRequestTypebox<typeof AddOrWithdrawSchema> = {
  ...getBalanceByAccountIdRequest,
  body: {
    amount: 0
  }
} as any;

export const mockReplyFastify: FastifyReply = {
  code: (x: number) => mockReplyFastify,
  send: (msg: any) => { },
} as any;
