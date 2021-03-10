import { IsNotEmpty } from "class-validator";
import { featureDto } from "./create-project.dto";


export class UpdateProjectDto {
    id: number

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;
    
    features: featureDto[]
}

