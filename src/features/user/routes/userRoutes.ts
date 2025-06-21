import { FastifyInstance } from "fastify";
import { loginUserController, registerUserController } from "../controller/userController";

export async function userRoutes(fastify: FastifyInstance) {

    fastify.post("/register", registerUserController);

    fastify.post("/login", loginUserController);
}