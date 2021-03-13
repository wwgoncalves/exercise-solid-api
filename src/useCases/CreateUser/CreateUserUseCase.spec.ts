import { CreateUserUseCase } from "./CreateUserUseCase";

describe("Create User - use case", () => {
  const fakeUsersRepository = {
    findByEmail: jest.fn().mockResolvedValue(undefined),
    save: jest.fn().mockResolvedValue(undefined),
  };
  const fakeMailProvider = {
    sendMail: jest.fn().mockResolvedValue(undefined),
  };
  const createUserUseCase = new CreateUserUseCase(
    fakeUsersRepository,
    fakeMailProvider
  );

  test("should execute without errors", async () => {
    const user = {
      name: "john",
      email: "john@doe.com",
      password: "jdsecretpass",
    };
    await expect(createUserUseCase.execute(user)).resolves.toEqual(undefined);
  });

  test("should throw an invalid data error", async () => {
    let user = {
      name: "",
      email: "john@doe.com",
      password: "jdsecretpass",
    };
    await expect(createUserUseCase.execute(user)).rejects.toThrowError(
      "Data are invalid."
    );

    user = {
      name: "john",
      email: "",
      password: "jdsecretpass",
    };
    await expect(createUserUseCase.execute(user)).rejects.toThrowError(
      "Data are invalid."
    );

    user = {
      name: "john",
      email: "john@doe.com",
      password: "",
    };
    await expect(createUserUseCase.execute(user)).rejects.toThrowError(
      "Data are invalid."
    );
  });

  test("should throw an user already exists error", async () => {
    let user = {
      name: "john",
      email: "john@doe.com",
      password: "jdsecretpass",
    };
    await createUserUseCase.execute(user);

    fakeUsersRepository.findByEmail.mockResolvedValue(user);

    user = {
      name: "john2",
      email: "john@doe.com",
      password: "jdsecretpass",
    };
    await expect(createUserUseCase.execute(user)).rejects.toThrowError(
      "User already exists."
    );
  });
});
