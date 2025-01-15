import {AuthGuard} from "@nestjs/passport";

export class LocalAccountGuard extends AuthGuard('local') {}
