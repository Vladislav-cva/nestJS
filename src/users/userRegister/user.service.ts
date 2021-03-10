import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import { Users } from './schemas/user.entity';


@Injectable()
export class userService {

    constructor(
        @InjectRepository(Users)
        private readonly userRepository : Repository<Users>
    ){}

    getAllusers():Promise<Users[]>{
        return this.userRepository.find()
    }

    getById(id: string):Promise<Users> {
        return this.userRepository.findOne(id)
    }

    async findByEmail(email: string):Promise<number> {  
        const user: number = (await this.userRepository.count({email}))

        return user
    }

    async createUsers(userDto : createUserDto):Promise<Users> {
       const newUser = await this.userRepository.save(userDto)

        return newUser
    }

    async remove(id: string): Promise<void>{
        await this.userRepository.delete(id)
    }
}