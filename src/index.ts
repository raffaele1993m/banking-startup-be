import Fastify from "fastify";
import constants from "./constants";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { bankRoutes } from "./routes";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastifyPostgres from "@fastify/postgres";
import { errorHandler } from "./utils/errorHandler";

const fastify = Fastify({
  logger: {
    level: "info",
  },
  disableRequestLogging: true,
}).withTypeProvider<TypeBoxTypeProvider>();

const start = async () => {
  try {
    if (constants.TARGET_ENV === "dev") {
      await fastify.register(fastifySwagger, {
        openapi: {
          openapi: "3.0.0",
          info: {
            title: "Bank Services",
            description: "Services for bank accounts",
            version: "0.1.0"
          },
          servers: [
            {
              url: "http://localhost:3000",
              description: "Local server"
            }
          ],
        }
      });

      await fastify.register(fastifySwaggerUi, {
        routePrefix: "/swagger",
      });
      fastify.log.info(`Swagger available on http://0.0.0.0:${constants.PORT}/swagger`);
    }
    fastify.setErrorHandler(errorHandler);
    await fastify.register(fastifyPostgres, {
      connectionString: `postgres://${constants.DB_USER}:${constants.DB_PASSWORD}@${constants.DB_HOST}/${constants.DB_NAME}`
    });

    await fastify.register(bankRoutes, { prefix: "bank" });
    await fastify.ready();
    await fastify.listen({ port: constants.PORT as number, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
