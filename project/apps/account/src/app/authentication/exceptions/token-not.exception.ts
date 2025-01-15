import {UnauthorizedException} from "@nestjs/common";

export class TokenNotException extends UnauthorizedException {
  constructor(tokenId: string) {
    super(`Token with ID ${tokenId} does not exist`);
  }
}
