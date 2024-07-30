import { AddOrWithdrawSchema, FastifyRequestTypebox } from "schemas";
import { GetBalanceSchema } from "../../schemas";
import { AccountNotFoundException, NotEnoughFundsException, AccountCreationError } from "../../utils/errors";
import * as userModel from "../../models/userModel";

export const getBalanceByAccountId = async (request: FastifyRequestTypebox<typeof GetBalanceSchema>) => {
  const { accountId } = request.params;
  const { pg: postgresInstance } = request.server;
  const result = { accountId, amount: 0 };

  try {
    const { rows } = await userModel.getBalanceByAccountId(postgresInstance, accountId);

    if (rows.length === 0) throw new AccountNotFoundException(`Account ${accountId} not found`);

    result.amount = rows[0].amount;
  } catch (err) {
    console.error(err instanceof Error ? err.message : "Generic error");
    request.log.error(err);
    throw err;
  }
  return result;
};


export const addOrWithdraw = async (request: FastifyRequestTypebox<typeof AddOrWithdrawSchema>) => {
  let { accountId } = request.params;
  const { amount } = request.body;
  const { pg: postgresInstance } = request.server;

  const result = { accountId, amount: 0 };
  try {
    const { rows } = await userModel.getBalanceByAccountId(postgresInstance, accountId);

    if (rows.length === 0) {
      const { rows: creationRows } = await userModel.createAccount(postgresInstance);

      if (creationRows.length === 0) throw new AccountCreationError("Account Creation Error");

      accountId = creationRows[0].id;
    }

    const { rows: updatedRows } = await userModel.addOrWithdraw(postgresInstance, accountId, amount);

    if (updatedRows.length === 0) throw new NotEnoughFundsException(`Not enough funds for accountId ${accountId}`);

    result.accountId = accountId;
    result.amount = updatedRows[0].amount;
  } catch (err) {
    request.log.error(err);
    throw err;
  }

  return result;
};
