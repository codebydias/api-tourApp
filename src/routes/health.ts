import { FastifyInstance } from 'fastify'
import { prisma } from '../plugins/prisma';

export async function healthRouter(app: FastifyInstance) {


  app.get('/health', async (req, reply) => {
    try {
      await prisma.$queryRaw`SELECT 1`; // ping no banco
      return { status: "ok", db: "conectado", timestamp: new Date().toISOString() };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      reply.status(500).send({ status: "error", db: "desconectado", error: errorMessage });
    }
  })
}
