import bcrypt from "bcrypt";
import { LoginUserInput } from "../schema/userSchema";
import { prisma } from "../../../plugins/prisma";

export async function loginUserService(data: LoginUserInput) {
  const { email, password } = data;

  const user = await prisma.users.findFirst({ where: { email } });
  if (!user) throw new Error("Usuário não encontrado");

  if (!user.password) throw new Error("Senha do usuário não definida");
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Senha incorreta");

  return user;
}
