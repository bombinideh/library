import { hash } from "bcryptjs";
import { Knex } from "knex";
import { existUser } from "../../src/functions/existUser";
import { IUser } from "../../src/models/User";

export async function seed(database: Knex): Promise<void> {
  const name = process.env.ROOT_USER_NAME!;
  const email = process.env.ROOT_USER_EMAIL!;
  const password = process.env.ROOT_USER_PASS!;

  if (!(await existUser(email))) {
    const passwordHash = await hash(password, 12);

    const [insertedUser] = await database<IUser>("users")
      .insert({ name, email, password: passwordHash })
      .returning("*");

    await database("logs").insert({
      user_id: insertedUser.user_id,
      description: `Usuário raiz "${name}" criado com sucesso`,
      method: "POST",
    });
  }
}
