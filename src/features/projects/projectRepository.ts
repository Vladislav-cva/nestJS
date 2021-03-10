import ProjectSchemaEntityModel, {
  ProjectInterface,
  UpdateProjectInterface,
} from "./schema/projectSchema";
import { logger } from "../shared/helpers/logger";
import { AppError } from "../shared/helpers/appError";

export async function findByProjectCount(name: string): Promise<number> {
  const count: number = await ProjectSchemaEntityModel.countDocuments({ name });
  return count;
}
export async function findByQueryId(id: string): Promise<ProjectInterface> {
  const result: ProjectInterface = (await ProjectSchemaEntityModel.findById(
    id
  )) as ProjectInterface;
  return result;
}
export async function getUpdateUserInfo(
  name: string
): Promise<ProjectInterface> {
  const user: ProjectInterface = (await ProjectSchemaEntityModel.findOne({
    name,
  })) as ProjectInterface;
  return user;
}

export async function create(project: ProjectInterface) {
  try {
    const result = await ProjectSchemaEntityModel.create(project);
    logger.info("project created!");
    return result;
  } catch (error) {
    logger.error(`Error in creating project ${error.toString()}`);
    throw AppError.internalServerError(error.toString());
  }
}

export async function updateProjectData(project: UpdateProjectInterface) {
  try {
    const { _id, ...rest } = project;
    const result = await ProjectSchemaEntityModel.findByIdAndUpdate(
      { _id },
      rest,
      {new: true}
    );

    return result;
  } catch (error) {
    logger.error(`Error in change project ${error.toString()}`);
    throw AppError.internalServerError(error.toString());
  }
}
// fix
export async function getAllTreeFeaturesName(query: string): Promise<Object> {
  let result = await ProjectSchemaEntityModel.aggregate([
    { $unwind: "$features" },
    {
      $match: {
        "features.featureName": { $regex: query },
      },
    },
    {
      $project: { _id: "$_id", features: "$features", name: "$name" },
    },
  ]);

  return result;
}

export async function getAllProjectScchema(): Promise<Object> {
  const result  = await ProjectSchemaEntityModel.find()
  return result;
}

export async function deleteProjectData(id: string) {
  const result: ProjectInterface = (await ProjectSchemaEntityModel.findByIdAndDelete(
    id
  )) as ProjectInterface
  return;
}

export async function getProjectById(id: string) {
  const result: UpdateProjectInterface = (await ProjectSchemaEntityModel.findById(
    id
  )) as UpdateProjectInterface
  return result;
}