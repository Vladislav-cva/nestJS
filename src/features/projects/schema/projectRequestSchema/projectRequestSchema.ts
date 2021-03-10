import { object, string } from "yup";

export const ProjectRequestSchema = object().shape(
    {
        name: string().required(),
        description: string().required(),
    }
);