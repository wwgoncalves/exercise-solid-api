import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private emailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    if (data && (!data.name || !data.email || !data.password)) {
      throw new Error("Data are invalid.");
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.emailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Platform team",
        email: "team@platform.com",
      },
      subject: "Welcome to Platform!",
      body: "<p>Great to have you with us! Login and enjoy!</p>",
    });
  }
}
