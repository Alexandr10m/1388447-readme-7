import {TokenPayload} from "@project/core";

export interface RefreshTokenPayload extends TokenPayload{
  tokenId: string;
}
