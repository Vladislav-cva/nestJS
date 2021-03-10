import { Document, model, Schema } from "mongoose";
import { ProjectFeature } from "./featureSchema";

export interface ProjectInterface extends Document {
  name: string;
  description: string;
  features: ProjectFeature[];
}

export interface UpdateProjectInterface {
  _id: string;
  name: string;
  description: string;
  features: ProjectFeature[];
}

const projSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: {
    type: Array,
    required: true,
  },
});

// interface ProjectSchemaEntityModel extends ProjectInterface, Document {}
export default model<ProjectInterface>("Project", projSchema);
