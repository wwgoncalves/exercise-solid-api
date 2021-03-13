import { User } from "./User";

describe("User - entity", () => {
  test("should return an user object with any generated uuid", () => {
    const user = {
      name: "john",
      email: "john@doe.com",
      password: "jdsecretpass",
    };
    const userObj = new User(user);
    expect(userObj.id).not.toBe(undefined);
  });

  test("should return an user object with a specific uuid", () => {
    const user = {
      name: "john",
      email: "john@doe.com",
      password: "jdsecretpass",
    };
    const uuid = "ef91b9c5-be7c-4883-99bf-59e23d3cc7cd";
    const userObj = new User(user, uuid);
    expect(userObj.id).toBe("ef91b9c5-be7c-4883-99bf-59e23d3cc7cd");
  });
});
