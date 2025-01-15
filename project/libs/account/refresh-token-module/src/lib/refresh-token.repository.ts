import {Injectable, Inject} from "@nestjs/common";
import {Model} from "mongoose";

import {BaseMongoRepository} from "@project/data-access";
import {RefreshTokenEntity} from "./refresh-token.entity";
import {RefreshTokenModel} from "./refresh-token.model";
import {RefreshTokenFactory} from "./refresh-token.factory";

@Injectable()
export class RefreshTokenRepository extends BaseMongoRepository<RefreshTokenEntity, RefreshTokenModel> {
  constructor(
    entityFactory: RefreshTokenFactory,
    @Inject(RefreshTokenModel.name) blogUserModel: Model<RefreshTokenModel>
  ) {
    super(entityFactory, blogUserModel);
  }

  public async deleteByTokenId(tokenId: string) {
    return this.model.deleteOne({tokenId}).exec()
  }

  public async findByTokenId(tokenId: string): Promise<RefreshTokenEntity | null> {
    const refreshTokenDocument = await this.model.findOne({tokenId}).exec();
    return this.createEntityFromDocument(refreshTokenDocument);
  }

  public async deleteExpiredTokens(): Promise<void> {
    this.model.deleteMany({expiresIn: {$lt: new Date()}});
  }
}
