import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { FakePostgresUsersRepository } from "../../repositories/implementations/FakePostgresUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailtrapMailProvider = new MailtrapMailProvider();
const fakePostgresUsersRepository = new FakePostgresUsersRepository();

const createUserUseCase = new CreateUserUseCase(
  fakePostgresUsersRepository,
  mailtrapMailProvider
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
