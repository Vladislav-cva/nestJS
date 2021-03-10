import { Document, model, Schema } from "mongoose";
import { number, string } from "yup";

export interface ProjectFeature extends Document {
  featureName: string;
  level: string;
  featureDescription: string;
  maxEstimate: number;
  minEstimate: number;
}

const featuresSchema = new Schema({
  featureName: {
    type: string,
    required: true,
  },
  level: {
    type: string,
    required: true,
  },
  featureDescription: {
    type: string,
    requared: true,
  },
  maxEstimate: {
    type: number,
    required: true,
  },
  minEstimate: {
    type: number,
    required: true,
  },
});

// interface featureSchemaEntityModela extends ProjectFeature, Document {}
export default model<ProjectFeature>("Project", featuresSchema);
