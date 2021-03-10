import { IsNotEmpty } from "class-validator";


export class createProjectDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;
    
    features: featureDto[]
}

export class featureDto {
    featureName: string;
    level: string;
    featureDescription: string;
    maxEstimate: number;
    minEstimate: number;
}