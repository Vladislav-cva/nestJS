import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { createProjectDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';
import { Projects } from './projectSchema/projects.entity';
import {UpdateProjectDto} from './dto/update-project.dto'
import { Features } from './projectSchema/feature.entity';
import { JwtAuthGuard } from 'src/users/guard/jwt-guard';


@Controller('project')
export class ProjectController {
    
    constructor(
        private ProjectService: ProjectService
    ){ }
        
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body(new ValidationPipe()) body: createProjectDto): Promise<Projects>{
        
        return this.ProjectService.createProject(body)
    }
        
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllProjects(){
        
        return await this.ProjectService.getAllProject()
    }

    @UseGuards(JwtAuthGuard)
    @Get('name/:level/:id')
    async getAllFeature(@Param('level') queryLevel: any, @Param('id') id: number):Promise<Features[]>{
    
       return await this.ProjectService.getFeatureForLevel(queryLevel, id)
    }

    @UseGuards(JwtAuthGuard)
    @Get('treeFeature/:query')
    async getTreeFeatureName(@Param('query') query: any, @Param('id') id: number){

       return await this.ProjectService.getfeatureName(query, id)
    }

    
    @Post(':id')
    async gitProjectById(@Param('id') id: number ): Promise<Projects>{
        try{
            return await this.ProjectService.getProjectById(id)
        }catch{
            throw new Error('Error')
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteProject(@Param('id') id: number ){

        return await this.ProjectService.removeProject(id)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateProject(@Param('id') id: number, @Body() UpdateProjectDto: UpdateProjectDto){        

        return this.ProjectService.updateProject(id, UpdateProjectDto)
    }   
}
