import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { InMemoryUsersRepository } from "../../repositories/implementations/InMemoryUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailtrapMailProvider = new MailtrapMailProvider();
const fakePostgresUsersRepository = new InMemoryUsersRepository();

const createUserUseCase = new CreateUserUseCase(
  fakePostgresUsersRepository,
  mailtrapMailProvider
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
