import { createMock } from "@golevelup/ts-jest";
import { ExecutionContext } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { ValidateJwtGuardService } from "./validate-jwt-guard.service";

describe("ValidateJwtGuardService", () => {
  let validateJwtGuardService: ValidateJwtGuardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: ValidateJwtGuardService,
          useValue: {
            canActivate: jest.fn().mockReturnValue(
              () =>
                new Promise((resolve) => {
                  resolve(true);
                }),
            ),
            validateAccessToken: jest.fn().mockReturnValue(
              new Promise((resolve) => {
                resolve(true);
              }),
            ),
          },
        },
      ],
    }).compile();

    validateJwtGuardService = module.get<ValidateJwtGuardService>(
      ValidateJwtGuardService,
    );
  });

  it("should be defined", () => {
    expect(validateJwtGuardService).toBeDefined();
  });

  describe("canActivate", () => {
    it("should return true when user is authenticated", async () => {
      const mockExecutionContext = createMock<ExecutionContext>({
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              authorization: "Bearer auth",
            },
          }),
        }),
      });

      const canActivate = await validateJwtGuardService.canActivate(
        mockExecutionContext,
      );

      expect(canActivate).toBe(true);
    });
  });
});
