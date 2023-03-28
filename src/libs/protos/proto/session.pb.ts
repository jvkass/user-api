/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "session";

export interface ValidateSessionLoginRequest {
  accessToken: string;
}

export interface ValidateSessionLoginResponse {
  isValid: boolean;
  error: string;
  sessionLogin: SessionLogin | undefined;
}

export interface SessionLogin {
  userId: string;
}

export const SESSION_PACKAGE_NAME = "session";

export interface SessionServiceClient {
  validateSessionLogin(
    request: ValidateSessionLoginRequest,
  ): Observable<ValidateSessionLoginResponse>;
}

export interface SessionServiceController {
  validateSessionLogin(
    request: ValidateSessionLoginRequest,
  ):
    | Promise<ValidateSessionLoginResponse>
    | Observable<ValidateSessionLoginResponse>
    | ValidateSessionLoginResponse;
}

export function SessionServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["validateSessionLogin"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod("SessionService", method)(
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
      GrpcStreamMethod("SessionService", method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const SESSION_SERVICE_NAME = "SessionService";
