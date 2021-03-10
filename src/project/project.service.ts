import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createProjectDto } from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto'
import { Features } from './projectSchema/feature.entity';
import { Projects } from './projectSchema/projects.entity';


@Injectable()
export class ProjectService {

    constructor(
        @InjectRepository(Projects)
        private readonly projectRepository: Repository<Projects>
    ){}

    async createProject(project: createProjectDto): Promise<Projects>{
        try{
            const newProject = await this.projectRepository.save(project)
            
            return newProject
        }catch{
            throw new Error("Error in creating project")
        }
    }

    
    async getAllProject(){

       return await this.projectRepository.find({relations: ['features']});
    }


    async getProjectById(id: number){ 

        return await this.projectRepository.findOne(id, {relations: ['features']})
    }


    async removeProject(id: number,){

       return await this.projectRepository.delete(id)
    } 


    async updateProject(id: number, Update: UpdateProjectDto): Promise<any>{
        let val = await this.projectRepository.count({id})
            if(!val){
                throw new Error('id not exist')
            }

        await this.removeProject(id);
        
        return await this.projectRepository.save({id, ...Update})
    }
    

    async getFeatureForLevel(queryLevel: string, id: number): Promise<Features[]>{
        // let x = Object.values(queryLevel)
        const project = await this.getProjectById(id);
        let tree = [];
        project.features.forEach((item) => {
            let level = item.level.substr(0, queryLevel.length);
                if (level == queryLevel) {
                    tree.push(item);
                }
        });
        
        if(tree[0].level.includes(".")){
            let index = tree[0].level.length
           tree = tree.map((item)=>{
              return {...item, level: `1${item.level.slice(index)}`} 
            })
          }

        return tree
    }


    async getfeatureName(query: string, id: number){

        let test = await this.getAllProject()
        let arrayTest = []
        test.map(elem => elem.features.forEach(item => {
          if(item.featureName === query){
                arrayTest.push({ features: item, _id: elem.id, name: elem.name})
                }
            })
        )
       
        return arrayTest

    }

}
    
    
    
    
    