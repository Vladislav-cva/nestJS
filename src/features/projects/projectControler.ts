import { Request, Response, NextFunction } from "express";
import * as projservice from "./projservice";
import { errorHandler } from "../shared/helpers/appError";

export async function ProjectHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  projservice
    .projectCreate(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => next(err));
}

export async function UpdateProjectHandler(req: Request, res: Response) {
  projservice
    .updateProject(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => errorHandler(err, res));
}

export async function getFeatureName(req: Request, res: Response) {
  const name: string = req.query.projectName as string;

  projservice
    .getTreeFeatures(name)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => errorHandler(err, res));
}

export async function getFeature(req: Request, res: Response) {
  const id: string = req.query.id as string;
  const level: string = req.query.level as string;
  projservice
    .getFeatureId(id, level)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => errorHandler(err, res));
}

export async function getProject(req: Request, res: Response) {
  projservice
    .getAllProject()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => errorHandler(err, res));
}

export async function deleteProject(req: Request, res: Response) {
  projservice
    .deleteProjectById(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => errorHandler(err, res));
}

export async function getProjectById(req: Request, res: Response) {
  projservice
    .getProjectById(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => errorHandler(err, res));
}
