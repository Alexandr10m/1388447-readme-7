import * as Joi from "joi";
import {registerAs} from "@nestjs/config";
import * as process from "node:process";

export interface JwtConfig {
  accessTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenSecret: string;
  refreshTokenExpiresIn: string;
}

const validationSchema = Joi.object({
  accessTokenSecret: Joi.string().required(),
  accessTokenExpiresIn: Joi.string().required(),
  refreshTokenSecret: Joi.string().required(),
  refreshTokenExpiresIn: Joi.string().required(),
});

function validateConfig(config: JwtConfig): void {
  const {error} = validationSchema.validate(config, {abortEarly: true});
  if (error) {
    throw new Error(`[Account JWTConfig Validation Error] ${error.message}`);
  }
}

function getConfig(): JwtConfig {
  const config: JwtConfig = {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenSecret: process.env.JWWT_REFRESH_TOKEN_SECRET,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  }

  validateConfig(config);
  return config;
}

export default registerAs('jwt', getConfig);
