import { FastifyInstance } from "fastify";
import { userRoutes } from "../features/user/routes/userRoutes";


export async function userRouter(fastify: FastifyInstance) {
    fastify.register(userRoutes, { prefix: "/api/users" });
}
