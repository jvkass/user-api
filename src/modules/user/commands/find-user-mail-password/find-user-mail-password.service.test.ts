import { Test, TestingModule } from "@nestjs/testing";
import * as bcrypt from "bcrypt";
import { DomainError } from "@src/libs/ddd/domain/enums/domain-error.enum";
import { IUserCred } from "@src/interface-adapters/interfaces/user/user-cred";
import { FindUserMailPasswordService } from "./find-user-mail-password.service";
import { UserRepository } from "../../domain/database/user.repository";
import { FindUserMailPasswordCommand } from "./find-user-mail-password.command";

describe("FindUserMailPasswordService", () => {
  let service: FindUserMailPasswordService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserMailPasswordService,
        {
          provide: UserRepository,
          useValue: {
            findOneUserPasswordByMail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FindUserMailPasswordService>(
      FindUserMailPasswordService,
    );
    userRepository = module.get(UserRepository);
  });

  it("should return user data if email and password are valid", async () => {
    const command: FindUserMailPasswordCommand = {
      email: "test@example.com",
      password: "password123",
    };

    const mockUser = {
      userId: "1",
      email: "test@example.com",
      name: "Test User",
      password: await bcrypt.hash("password123", 10),
    };

    userRepository.findOneUserPasswordByMail.mockResolvedValue(mockUser);

    const result = await service.handle(command);

    expect(result).toEqual({
      user: {
        userId: "1",
        email: "test@example.com",
        name: "Test User",
      },
      error: "",
    });
  });

  it("should return APIE001 error if user is not found", async () => {
    const command: FindUserMailPasswordCommand = {
      email: "nonexistent@example.com",
      password: "password123",
    };

    userRepository.findOneUserPasswordByMail.mockResolvedValue(
      null as unknown as IUserCred,
    );

    const result = await service.handle(command);

    expect(result).toEqual({
      user: undefined,
      error: DomainError.APIE001,
    });
  });

  it("should return APIE002 error if password is invalid", async () => {
    const command: FindUserMailPasswordCommand = {
      email: "test@example.com",
      password: "wrongpassword",
    };

    const mockUser = {
      userId: "1",
      email: "test@example.com",
      name: "Test User",
      password: await bcrypt.hash("password123", 10),
    };

    userRepository.findOneUserPasswordByMail.mockResolvedValue(mockUser);

    const result = await service.handle(command);

    expect(result).toEqual({
      user: undefined,
      error: DomainError.APIE002,
    });
  });

  it("should return an error string if an exception is thrown", async () => {
    const command: FindUserMailPasswordCommand = {
      email: "test@example.com",
      password: "password123",
    };

    userRepository.findOneUserPasswordByMail.mockRejectedValue(
      new Error("Database error"),
    );

    const result = await service.handle(command);

    expect(result).toEqual({
      user: undefined,
      error: "Error: Database error",
    });
  });
});
