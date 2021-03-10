import { Router } from "express";
import * as projControler from "./projectControler";

export const ProjectRouter: Router = Router();
ProjectRouter.put("/", projControler.UpdateProjectHandler);
ProjectRouter.post("/", projControler.ProjectHandler);
ProjectRouter.get("/", projControler.getFeatureName);
ProjectRouter.get("/treeFeature", projControler.getFeature)
ProjectRouter.get("/allProject", projControler.getProject)
ProjectRouter.delete("/deleteProject", projControler.deleteProject)
ProjectRouter.post("/getProject",projControler.getProjectById )