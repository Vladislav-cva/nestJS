import { logger } from "../shared/helpers/logger";
//Models
//Entities
import ExampleEntityModel, {
  UserInterface,
} from "./entities/userSchema.entity";
import { AppError } from "../shared/helpers/appError";



export async function getUserInfo(email: string): Promise<UserInterface> {
  const user: UserInterface = (await ExampleEntityModel.findOne({
    email,
  })) as UserInterface;
  return user;
}

export async function create(user: UserInterface): Promise<UserInterface> {
  try {
    const result = await ExampleEntityModel.create(user);
    logger.info("user created!");
    return result;
  } catch (error) {
    logger.error(`Error in creating user ${error.toString()}`);
    throw AppError.internalServerError(error.toString());
  }
}
