//Repositories
import * as exampleRepository from "./auth.repository";
import { UserLoginRequestSchema, UserSchema } from "./schemas/userRequest.schema";
import userSchemaEntity, { UserInterface } from "./entities/userSchema.entity";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppError } from "../shared/helpers/appError";


import { logger } from "../shared/helpers/logger";
//Schemas



function generationToken(body: UserInterface): string {
  return jwt.sign(
    {
      email: body.email,
    },
    "secretKey",
    { expiresIn: "1h" }
  );
}

const saltRounds = 10;

export async function authCreate(body: UserInterface) {
  await UserSchema.validate(body);
  
  let userEmail: UserInterface = await exampleRepository.getUserInfo(body.email);
  if (userEmail) {
    logger.info("user already exsist");
    throw AppError.badRequest("user already exsist");
  }
 

  let hash = await bcrypt.hash(body.password, saltRounds);
  let user = new userSchemaEntity(body);
  user.password = hash;

  const response = await exampleRepository.create(user);

  return response;
}

export async function iUserLogin(body: UserInterface) {
  await UserLoginRequestSchema.validate(body)
  let user: UserInterface = await exampleRepository.getUserInfo(body.email);

  if (!user) {
    logger.info("user not found");
    throw AppError.badRequest("user not found");
  }

 
  const match = await bcrypt.compare(body.password, user.password);

  if (!match) {
    logger.info("password does match");
    throw AppError.badRequest("password does match");
  }else{
    console.log('yeehooo')
  }

  const userToken = generationToken(body);
  if(!userToken){
    throw AppError.badRequest("token not exist");
  }

  return {
    token: userToken,
  };
}
