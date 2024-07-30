import { errorCodes } from "fastify";

import { FastifyRequest, FastifyReply } from "fastify";
import { AccountNotFoundException, NotEnoughFundsException } from "./errors";

export const errorHandler = (error: Error, request: FastifyRequest, reply: FastifyReply) => {
  if (error instanceof errorCodes.FST_ERR_VALIDATION) {
    reply.code(400).send({ statusCode: 400, error: "Bad Request", message: error.message });
  } else if (error instanceof AccountNotFoundException) {
    reply.code(404).send({ statusCode: 404, error: "Not Found", message: error.message });
  } else if (error instanceof NotEnoughFundsException) {
    reply.code(403).send({ statusCode: 403, error: "Forbidden", message: error.message });
  } else {
    reply.code(500).send({ statusCode: 500, error: "Internal Server Error", message: error.message });
  }
};