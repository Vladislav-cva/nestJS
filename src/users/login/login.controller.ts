import { Body, Controller, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { createUserDto } from '../userRegister/dto/create-user.dto';
import { LoginService } from './login.service';
const bcrypt = require('bcrypt');
import { ForgotPasswordDTO } from '../userRegister/dto/forgot-password.dto';
import { ChangePassword } from '../userRegister/dto/change-password.dto';
import { Get } from '@nestjs/common';
import { Users } from '../userRegister/schemas/user.entity';


@Controller('login')
export class LoginController {
    
    constructor(
        private LoginService: LoginService
    ){ }


    @Post()
    @HttpCode(HttpStatus.OK)
    async userLogin (@Body() body : createUserDto ){
        let user = await this.LoginService.findEmail(body.email);
            if(!user){
                throw new Error('user not found')
            }
      
        const match = await bcrypt.compare(body.password, user.password);
            if(!match){
                throw new Error('password does match')
            }
            
        const token = await this.LoginService.getToken(body)


    return { token }
    }


    @Post('/forgotPassword')
    @HttpCode(HttpStatus.OK)
    async forgotPassword (@Body() body: ForgotPasswordDTO){
       return await this.LoginService.forgotPasswordUser(body)
    }

    @Post('changePassword')
    async changePassword(@Body() body: ChangePassword ): Promise<any>{
       
        return await this.LoginService.changePasssword(body)
        
    }

    @Post('/facebookLogin')
    async getTokenAfterFacebookSignIn(@Req() req: any) {
        const user = await this.LoginService.findEmail(req.body.email);
        if(!user){
            throw new Error('user not found')
        }
        const token = await this.LoginService.getToken(req.body.email)
        
        return { token}
      }
}













//     async facebookLogin(@Body() body : createUserDto){
//        const token = await this.LoginService.getToken(body)
  
//   console.log(token);
  
//     }