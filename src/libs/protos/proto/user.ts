/* eslint-disable */
import _m0 from "protobufjs/minimal";

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

function createBaseCreateUserRequest(): CreateUserRequest {
  return { user: undefined };
}

export const CreateUserRequest = {
  encode(
    message: CreateUserRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.user !== undefined) {
      UserCreate.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateUserRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.user = UserCreate.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateUserRequest {
    return {
      user: isSet(object.user) ? UserCreate.fromJSON(object.user) : undefined,
    };
  },

  toJSON(message: CreateUserRequest): unknown {
    const obj: any = {};
    message.user !== undefined &&
      (obj.user = message.user ? UserCreate.toJSON(message.user) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateUserRequest>, I>>(
    base?: I,
  ): CreateUserRequest {
    return CreateUserRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateUserRequest>, I>>(
    object: I,
  ): CreateUserRequest {
    const message = createBaseCreateUserRequest();
    message.user =
      object.user !== undefined && object.user !== null
        ? UserCreate.fromPartial(object.user)
        : undefined;
    return message;
  },
};

function createBaseCreateUserResponse(): CreateUserResponse {
  return { isValid: false, error: "" };
}

export const CreateUserResponse = {
  encode(
    message: CreateUserResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.isValid === true) {
      writer.uint32(8).bool(message.isValid);
    }
    if (message.error !== "") {
      writer.uint32(18).string(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateUserResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.isValid = reader.bool();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.error = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateUserResponse {
    return {
      isValid: isSet(object.isValid) ? Boolean(object.isValid) : false,
      error: isSet(object.error) ? String(object.error) : "",
    };
  },

  toJSON(message: CreateUserResponse): unknown {
    const obj: any = {};
    message.isValid !== undefined && (obj.isValid = message.isValid);
    message.error !== undefined && (obj.error = message.error);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateUserResponse>, I>>(
    base?: I,
  ): CreateUserResponse {
    return CreateUserResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateUserResponse>, I>>(
    object: I,
  ): CreateUserResponse {
    const message = createBaseCreateUserResponse();
    message.isValid = object.isValid ?? false;
    message.error = object.error ?? "";
    return message;
  },
};

function createBaseUserMailRequest(): UserMailRequest {
  return { mail: "" };
}

export const UserMailRequest = {
  encode(
    message: UserMailRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.mail !== "") {
      writer.uint32(10).string(message.mail);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserMailRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserMailRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.mail = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserMailRequest {
    return { mail: isSet(object.mail) ? String(object.mail) : "" };
  },

  toJSON(message: UserMailRequest): unknown {
    const obj: any = {};
    message.mail !== undefined && (obj.mail = message.mail);
    return obj;
  },

  create<I extends Exact<DeepPartial<UserMailRequest>, I>>(
    base?: I,
  ): UserMailRequest {
    return UserMailRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UserMailRequest>, I>>(
    object: I,
  ): UserMailRequest {
    const message = createBaseUserMailRequest();
    message.mail = object.mail ?? "";
    return message;
  },
};

function createBaseUserMailPasswordRequest(): UserMailPasswordRequest {
  return { email: "", password: "" };
}

export const UserMailPasswordRequest = {
  encode(
    message: UserMailPasswordRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): UserMailPasswordRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserMailPasswordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.email = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.password = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserMailPasswordRequest {
    return {
      email: isSet(object.email) ? String(object.email) : "",
      password: isSet(object.password) ? String(object.password) : "",
    };
  },

  toJSON(message: UserMailPasswordRequest): unknown {
    const obj: any = {};
    message.email !== undefined && (obj.email = message.email);
    message.password !== undefined && (obj.password = message.password);
    return obj;
  },

  create<I extends Exact<DeepPartial<UserMailPasswordRequest>, I>>(
    base?: I,
  ): UserMailPasswordRequest {
    return UserMailPasswordRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UserMailPasswordRequest>, I>>(
    object: I,
  ): UserMailPasswordRequest {
    const message = createBaseUserMailPasswordRequest();
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseUserResponse(): UserResponse {
  return { user: undefined, error: "" };
}

export const UserResponse = {
  encode(
    message: UserResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.user !== undefined) {
      UserData.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== "") {
      writer.uint32(18).string(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.user = UserData.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.error = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserResponse {
    return {
      user: isSet(object.user) ? UserData.fromJSON(object.user) : undefined,
      error: isSet(object.error) ? String(object.error) : "",
    };
  },

  toJSON(message: UserResponse): unknown {
    const obj: any = {};
    message.user !== undefined &&
      (obj.user = message.user ? UserData.toJSON(message.user) : undefined);
    message.error !== undefined && (obj.error = message.error);
    return obj;
  },

  create<I extends Exact<DeepPartial<UserResponse>, I>>(
    base?: I,
  ): UserResponse {
    return UserResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UserResponse>, I>>(
    object: I,
  ): UserResponse {
    const message = createBaseUserResponse();
    message.user =
      object.user !== undefined && object.user !== null
        ? UserData.fromPartial(object.user)
        : undefined;
    message.error = object.error ?? "";
    return message;
  },
};

function createBaseUserCreate(): UserCreate {
  return { email: "", name: "", password: "" };
}

export const UserCreate = {
  encode(
    message: UserCreate,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.password !== "") {
      writer.uint32(26).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserCreate {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserCreate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.email = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.password = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserCreate {
    return {
      email: isSet(object.email) ? String(object.email) : "",
      name: isSet(object.name) ? String(object.name) : "",
      password: isSet(object.password) ? String(object.password) : "",
    };
  },

  toJSON(message: UserCreate): unknown {
    const obj: any = {};
    message.email !== undefined && (obj.email = message.email);
    message.name !== undefined && (obj.name = message.name);
    message.password !== undefined && (obj.password = message.password);
    return obj;
  },

  create<I extends Exact<DeepPartial<UserCreate>, I>>(base?: I): UserCreate {
    return UserCreate.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UserCreate>, I>>(
    object: I,
  ): UserCreate {
    const message = createBaseUserCreate();
    message.email = object.email ?? "";
    message.name = object.name ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseUserData(): UserData {
  return { userId: "", email: "", name: "" };
}

export const UserData = {
  encode(
    message: UserData,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.email !== "") {
      writer.uint32(18).string(message.email);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserData {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.email = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserData {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "",
      email: isSet(object.email) ? String(object.email) : "",
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: UserData): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    message.email !== undefined && (obj.email = message.email);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  create<I extends Exact<DeepPartial<UserData>, I>>(base?: I): UserData {
    return UserData.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UserData>, I>>(object: I): UserData {
    const message = createBaseUserData();
    message.userId = object.userId ?? "";
    message.email = object.email ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

export interface UserService {
  FindUserByMail(request: UserMailRequest): Promise<UserResponse>;
  FindUserByMailPassword(
    request: UserMailPasswordRequest,
  ): Promise<UserResponse>;
}

export class UserServiceClientImpl implements UserService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "user.UserService";
    this.rpc = rpc;
    this.FindUserByMail = this.FindUserByMail.bind(this);
    this.FindUserByMailPassword = this.FindUserByMailPassword.bind(this);
  }
  FindUserByMail(request: UserMailRequest): Promise<UserResponse> {
    const data = UserMailRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "FindUserByMail", data);
    return promise.then((data) => UserResponse.decode(_m0.Reader.create(data)));
  }

  FindUserByMailPassword(
    request: UserMailPasswordRequest,
  ): Promise<UserResponse> {
    const data = UserMailPasswordRequest.encode(request).finish();
    const promise = this.rpc.request(
      this.service,
      "FindUserByMailPassword",
      data,
    );
    return promise.then((data) => UserResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
