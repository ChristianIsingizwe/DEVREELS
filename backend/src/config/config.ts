import * as dotenv from 'dotenv'
import * as fs from 'fs'
import Joi from 'joi'
import path from 'path'

const nodeEnv = process.env.NODE_ENV || 'development'
const envFilePath = path.resolve(__dirname, `.env.${nodeEnv}`)

if (fs.existsSync(envFilePath)) {
    dotenv.config({path: envFilePath})
    console.log(`Loaded ${nodeEnv} environment variables from ${envFilePath}`)
} else{
    console.warn(`No environment file found at ${envFilePath}`)
}

const envSchema = Joi.object({
    APP_PORT: Joi.number().required(),
    DATABASE_URL: Joi.string().uri().required()
})

const {error, value: envVars} = envSchema.validate(process.env)
if (error){
    console.error("Invalid environment variables: ", error.message)
    process.exit(1)
}

export const config = {
    port: envVars.APP_PORT, 
    databaseUrl: envVars.DATABASE_URL
}
