import {registerAs} from "@nestjs/config";
import * as Joi from "joi";

import {ENVIRONMENTS, DEFAULT_PORT} from './account-config.constants'

interface ApplicationConfig {
  environment: Environment;
  port: number;
}
type Environment = typeof ENVIRONMENTS[number];

const validateSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(DEFAULT_PORT),
})
const validateConfig = (config: ApplicationConfig): void => {
  const {error} = validateSchema.validate(config, { abortEarly: false });

  if (error) {
    throw new Error(`[Application Config Validation Error] ${error.message}]`);
  }
}
const getConfig = () => {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10)
  }

  validateConfig(config);
  return config;
};

export default registerAs( 'application', getConfig);
