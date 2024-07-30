import { PostgresDb } from "@fastify/postgres";
import { GetQueryResult, CreateQueryResult } from "../interfaces/queries";


export const getBalanceByAccountId = async (pgInstance: PostgresDb & Record<string, PostgresDb>, accountId: string) => {
  const query = `SELECT id, amount FROM accounts WHERE id=${accountId}`;
  return pgInstance.query<GetQueryResult>(query);
};

export const createAccount = (pgInstance: PostgresDb & Record<string, PostgresDb>) => {
  const query = "INSERT INTO accounts DEFAULT VALUES RETURNING id, amount";
  return pgInstance.query<CreateQueryResult>(query);
};

export const addOrWithdraw = async (pgInstance: PostgresDb & Record<string, PostgresDb>, accountId: string, amount: number) => {
  let query = `UPDATE accounts SET amount = amount + ${amount} WHERE id = ${accountId} RETURNING amount`;

  if (amount < 0) {
    query = `UPDATE accounts SET amount = amount + ${amount} WHERE id = ${accountId} AND amount >= ${Math.abs(amount)} RETURNING amount`;
  }

  return pgInstance.query<GetQueryResult>(query);
};