import {UserRole} from "@project/core";

export interface TokenPayload {
  sub: string;
  email: string;
  role: UserRole;
  lastname: string;
  firstname: string;
}
