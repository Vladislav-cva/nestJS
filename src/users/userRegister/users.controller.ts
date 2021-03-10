import { HttpCode, UseGuards } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
const bcrypt = require('bcrypt');
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { createUserDto } from './dto/create-user.dto';
import { userService } from './user.service';


@Controller('users')
export class UsersController {
    
    constructor(private userService: userService ){
        
    }
    @Get()
    getAllUsers() {
        return this.userService.getAllusers()
    }

    @Get(':id')
    getOneUser(@Param('id') id: string ){
        return this.userService.getById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createUser: createUserDto) {
       let userEmail = await this.userService.findByEmail(createUser.email)
       if(userEmail){
           return "user already exsist"
       } 

        let hash = await bcrypt.hash(createUser.password, 10);
        let user = createUser;
        user.password = hash;

            return this.userService.createUsers(createUser)
    }

    @Post('facebookRegister')
    async registerForFacebook(@Req() req: any) {
        const user = await this.userService.findByEmail(req.body.email)
            if(user){
                return "user already exsist"
            } 

        const passwordUser = req.body.userID
        console.log(passwordUser);
        
    }



    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.userService.remove(id)
    }
    
}
