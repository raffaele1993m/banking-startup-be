
import { FastifyInstance } from "fastify";
import { addOrWithdraw, getBalanceByAccountId } from "./handler";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { AddOrWithdrawSchema, GetBalanceSchema } from "../../schemas";

export const bankRoutes: FastifyPluginAsyncTypebox = async (fastify: FastifyInstance) => {
  fastify.get("/balance/:accountId",
    { schema: GetBalanceSchema },
    getBalanceByAccountId
  );

  fastify.post("/add/:accountId", { schema: AddOrWithdrawSchema }, addOrWithdraw);
};


