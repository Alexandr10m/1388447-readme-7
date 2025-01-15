import {BlogUserEntity} from "../../../../../../apps/account/src/app/blog-user";

export interface RequestWithUser {
  user?: BlogUserEntity;
}
