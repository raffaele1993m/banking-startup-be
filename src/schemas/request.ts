import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { ContextConfigDefault, FastifyReply, FastifyRequest, FastifySchema, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault, RouteGenericInterface } from "fastify";

export type FastifyRequestTypebox<TSchema extends FastifySchema> = FastifyRequest<
  RouteGenericInterface,
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  TSchema,
  TypeBoxTypeProvider
>;

export type FastifyReplyTypebox<TSchema extends FastifySchema> = FastifyReply<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteGenericInterface,
  ContextConfigDefault,
  TSchema,
  TypeBoxTypeProvider
>

const ErrorResponseSchema = {
  "4xx": Type.Object({
    statusCode: Type.Number(),
    error: Type.String(),
    message: Type.String()
  }),
  "5xx": Type.Object({
    statusCode: Type.Number(),
    error: Type.String(),
    message: Type.String()
  })
};

export const GetBalanceSchema = {
  params: Type.Object({
    accountId: Type.String(),
  }),
  response: {
    ...ErrorResponseSchema,
    200: Type.Object({
      accountId: Type.String(),
      amount: Type.Number()
    }),
  },
  tags: ["bank"]
};

export const AddOrWithdrawSchema = {
  ...GetBalanceSchema,
  body: Type.Object({
    amount: Type.Number()
  }),
  response: {
    ...ErrorResponseSchema,
    200: Type.Object({
      accountId: Type.String(),
      amount: Type.Number()
    }),
  },
  tags: ["bank"]
};