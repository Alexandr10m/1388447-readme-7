import {Injectable, Inject} from "@nestjs/common";
import {RefreshTokenRepository} from "./refresh-token.repository";
import jwtConfig from "../../../../../apps/account/src/app/jwt/jwt.config";
import {ConfigType} from "@nestjs/config";
import {RefreshTokenPayload} from "@project/core";
import {parseTime} from "@project/helpers";
import {RefreshTokenEntity} from "./refresh-token.entity";
import * as dayjs from "dayjs";

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
  ) {}

  public async createRefreshSession(payload: RefreshTokenPayload) {
    const timeValue = parseTime(this.jwtOptions.refreshTokenExpiresIn);
    const refreshToken = new RefreshTokenEntity({
      tokenId: payload.tokenId,
      createdAt: new Date(),
      userId: payload.sub,
      expiresIn: dayjs().add(timeValue.value, timeValue.unit).toDate(),
    })

    return this.refreshTokenRepository.save(refreshToken);
  }

  public async deleteRefreshSession(tokenId: string): Promise<void> {
    await this.deleteExpiredRefreshTokens();
    await this.refreshTokenRepository.deleteByTokenId(tokenId)
  }

  public async deleteExpiredRefreshTokens(): Promise<void> {
    await this.refreshTokenRepository.deleteExpiredTokens();
  }

  public async isExists(tokenId: string): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepository.findByTokenId(tokenId)
    return (refreshToken ! == null)
  }
}
