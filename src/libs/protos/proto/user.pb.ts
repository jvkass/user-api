/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface CreateUserRequest {
  user: UserCreate | undefined;
}

export interface CreateUserResponse {
  isValid: boolean;
  error: string;
}

export interface UserMailRequest {
  mail: string;
}

export interface UserMailPasswordRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  user: UserData | undefined;
  error: string;
}

export interface UserCreate {
  email: string;
  name: string;
  password: string;
}

export interface UserData {
  userId: string;
  email: string;
  name: string;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  findUserByMail(request: UserMailRequest): Observable<UserResponse>;

  findUserByMailPassword(
    request: UserMailPasswordRequest,
  ): Observable<UserResponse>;
}

export interface UserServiceController {
  findUserByMail(
    request: UserMailRequest,
  ): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  findUserByMailPassword(
    request: UserMailPasswordRequest,
  ): Promise<UserResponse> | Observable<UserResponse> | UserResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findUserByMail", "findUserByMailPassword"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod("UserService", method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod("UserService", method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
