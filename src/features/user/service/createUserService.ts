import bcrypt from "bcrypt";
import { prisma } from "../../../plugins/prisma";
import { CreateUserInput } from "../schema/userSchema";

export async function createUserService(data: CreateUserInput) {
    const hashed = await bcrypt.hash(data.password, 10);
    return prisma.users.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashed,
        },
    });
}

