
import { FastifyReply, FastifyRequest } from "fastify";
import { createUserService } from "../service/createUserService";
import { loginUserService } from "../service/loginUserService";
import { CreateUserInput, createUserSchema, loginUserSchema } from "../schema/userSchema";

export async function registerUserController(req: FastifyRequest<{ Body: CreateUserInput }>, reply: FastifyReply) {
    try {
        const data = createUserSchema.parse(req.body);
        const user = await createUserService(data);
        return reply.code(201).send(user);
    } catch (err) {
        return reply.code(400).send({ error: err });
    }
}

export async function loginUserController(req: FastifyRequest, reply: FastifyReply) {
    try {
        const data = loginUserSchema.parse(req.body);
        const user = await loginUserService(data);

        const token = await reply.jwtSign({
            sub: user.id,
            email: user.email
            // role: user.role,
        });


        return reply.send({ token });
    } catch (error: any) {
        return reply.code(401).send({ message: error.message });
    }
}