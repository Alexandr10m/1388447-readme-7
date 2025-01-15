import {Inject, Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import jwtConfig from "../jwt.config";
import {ConfigType} from "@nestjs/config";
import {AuthenticationService} from "../../authentication/authentication.service";
import {RefreshTokenPayload} from "@project/core";
import {RefreshTokenService} from "../../../../../../libs/account/refresh-token-module/src/lib/refresh-token.service";
import {TokenNotException} from "../../authentication/exceptions/token-not.exception";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy,'jwt-refresh') {
  constructor(
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthenticationService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtOptions.refreshTokenSecret,
    });
  }

  public async validate(payload: RefreshTokenPayload) {
    const {tokenId} = payload;
    if(! await this.refreshTokenService.isExists(tokenId)) {
      throw new TokenNotException(tokenId);
    }
    await this.refreshTokenService.deleteRefreshSession(tokenId);
    await this.refreshTokenService.deleteExpiredRefreshTokens();

    return this.authService.getUserByEmail(payload.email);
  }
}
