import Fastify from 'fastify';
import constants from "./constants";
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { bankRoutes } from "./routes";
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

const start = async () => {
  try {
    if (constants.TARGET_ENV === "dev") {
      await fastify.register(fastifySwagger, {
        openapi: {
          openapi: '3.0.0',
          info: {
            title: 'Bank Services',
            description: 'Testing the Fastify swagger API',
            version: '0.1.0'
          },
          servers: [
            {
              url: 'http://localhost:3000',
              description: 'Dev server'
            }
          ],
        }
      });
      await fastify.register(fastifySwaggerUi, {
        routePrefix: '/swagger',
      });
    }

    await fastify.register(bankRoutes);

    await fastify.ready();
    await fastify.listen({ port: constants.PORT as number, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
