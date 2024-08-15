import {registerAs} from "@nestjs/config";
import * as Joi from "joi";
import * as process from "node:process";
import {DEFAULT_MONGO_PORT} from "./account-config.constants";
// import {MongoConfiguration} from './mongo.env';
// import {ConfigType} from "@nestjs/config";
// import {plainToClass} from 'class-transformer'

interface MongoConfig {
  host: string;
  name: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
}

const dbValidationSchema = Joi.object({
  host: Joi.string().hostname().required(),
  name: Joi.string().required(),
  port: Joi.number().port().default(DEFAULT_MONGO_PORT),
  user: Joi.string().required(),
  password: Joi.string().required(),
  authBase: Joi.string().required(),
})
const validateMongoConfig = (config: MongoConfig):void => {
  const {error} = dbValidationSchema.validate(config, { abortEarly: false });
  if (error) {
    throw new Error(`[DB Config Validation Error] ${error.message}`);
  }
}
const getDbConfig = (): MongoConfig => {
// const async getDbConfig = (): Promise<MongoConfiguration> {
  const config: MongoConfig = {
// const config = plainToClass(MongoConfiguration, {
    host: process.env.MONGO_HOST,
    name: process.env.MONGO_DB,
    port: process.env.MONGO_PORT ? parseInt(process.env.MONGO_PORT, 10) : DEFAULT_MONGO_PORT,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE,
  }
  // )

  validateMongoConfig(config);
  // await config.validate();
  return config;
};

export default registerAs('db', getDbConfig);

// ! one more approach to validate .env config by class-validation
// export default registerAs('db', async (): Promise<ConfigType<typeof getDbConfig>> => {
//   return getDbConfig()
// });
