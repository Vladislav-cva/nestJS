import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Features } from './projectSchema/feature.entity';
import {  Projects } from './projectSchema/projects.entity';
// import { ProjectSchema } from './projectSchema/schema';


@Module({
    imports: [TypeOrmModule.forFeature([Projects, Features])],
    controllers:[ProjectController],
    providers: [ProjectService]
})


export class ProjectModule{

}