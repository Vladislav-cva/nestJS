import * as projectRepository from "./projectRepository";
import ProjectSchemaEntityModel, {
  ProjectInterface,
  UpdateProjectInterface,
} from "./schema/projectSchema";
import { ProjectRequestSchema } from "./schema/projectRequestSchema/projectRequestSchema";

import { logger } from "../shared/helpers/logger";
import { AppError } from "../shared/helpers/appError";


export async function projectCreate(project: ProjectInterface) {
  await ProjectRequestSchema.validate(project);
  let user = new ProjectSchemaEntityModel(project);
  let nameProject: boolean = !!(await projectRepository.findByProjectCount(
    project.name
  ));
  if (nameProject) {
    logger.info("project exists");
    throw AppError.badRequest("project exists");
  }

  const response = await projectRepository.create(user);

  return response;
}

export async function updateProject(params: UpdateProjectInterface) {
  const response = await projectRepository.updateProjectData(params);

  return response;
}

export async function getTreeFeatures(queryName: string) {
  const response = await projectRepository.getAllTreeFeaturesName(queryName);
  return response;
}

export async function getFeatureId(queryId: string, queryLevel: string) {
  const response: ProjectInterface = (await projectRepository.findByQueryId(
    queryId
  )) as ProjectInterface;
  let tree: Array<any> = [];
  response.features.forEach((item) => {
    let level = item.level.substr(0, queryLevel.length);
    if (level === queryLevel) {
      tree.push(item);
      
    }
  });
      if(tree[0].level.includes(".")){
        let index = tree[0].level.length
       tree = tree.map((item)=>{
          return {...item, level: `1${item.level.slice(index)}`} 
        })
      }

  return tree;
}

export async function getAllProject() {
  const response = await projectRepository.getAllProjectScchema();
  return response;
}

export async function deleteProjectById(queryId: string) {
 await projectRepository.deleteProjectData(
    queryId
    )
    return {
      message: "Delete"
    }; 
}

export async function getProjectById(queryId: string) {
  let result =  await projectRepository.getProjectById(
     queryId
     )
     return result 
 }