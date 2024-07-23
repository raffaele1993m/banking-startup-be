import { FastifyRequestTypebox } from "schemas";
import { GetBalanceSchema } from "../../schemas";

export const getBalanceByAccountId = async (request: FastifyRequestTypebox<typeof GetBalanceSchema>) => {
  console.log(request.params.accountId);
  return { hello: "worl" };
};
