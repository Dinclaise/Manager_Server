import { Account } from "../Server/Model";

export enum AccessRight {
  CREATE,
  READ,
  UPDATE,
  DELETE,
}

export enum HTTP_CODES {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
}

export enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS",
}

export interface User {
  id: string;
  name: string;
  age: string;
  email: string;
  workingPosition: WorkingPosition;
}

export enum WorkingPosition {
  JUNIOR,
  PROGRAMMER,
  ENGINNER,
  EXPERT,
  MANAGER,
}

export interface UserCredentials extends Account {
  accessRights: AccessRight[];
}
