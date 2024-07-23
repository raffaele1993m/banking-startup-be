
import { FastifyInstance } from 'fastify';
import { getBalanceByAccountId } from './handler';
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { GetBalanceSchema } from '../../schemas';

export const bankRoutes: FastifyPluginAsyncTypebox = async (fastify: FastifyInstance) => {
  fastify.get('/balance/:accountId',
    { schema: GetBalanceSchema },
    getBalanceByAccountId
  );

  // fastify.post('/add', async (request: FastifyRequest, reply: FastifyReply) => {
  //   return { post: "added" };
  // });

};


