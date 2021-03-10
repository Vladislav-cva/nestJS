import { IMailGunData } from './../mail/interface/mail.interface';
import { BadRequestException, HttpException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createUserDto } from "../userRegister/dto/create-user.dto";
import { ForgotPasswordDTO } from "../userRegister/dto/forgot-password.dto";
import { Users } from "../userRegister/schemas/user.entity";
import { JwtService } from '@nestjs/jwt'
import { MailService } from "../mail/mail.service";
import { ChangePassword } from '../userRegister/dto/change-password.dto';
import { HttpStatus } from "@nestjs/common";

const bcrypt = require('bcrypt');


@Injectable()
export class LoginService {
    private readonly clientAppUrl: string;

    constructor(
        @InjectRepository(Users)
        private readonly loginRepository : Repository<Users>,
        private jwtService: JwtService,
        private readonly mailService: MailService,
    ){
        this.clientAppUrl = 'http://localhost:8080'
    }


    async findEmail(email: string):Promise<createUserDto>{
        let user: createUserDto  = (await this.loginRepository.findOne({email}));

        return user
    }

    async getToken (body: createUserDto){
        const accessToken = {
            email : body.email
        }
 
        let token = this.jwtService.sign(accessToken)
     
         return token 
    }

    async forgotPasswordUser (body: ForgotPasswordDTO): Promise<void>{
        const findUserByEmail = await this.findEmail(body.email);
            if(!findUserByEmail){
                throw new BadRequestException('user not found')
            }
        
        const token = await this.getToken(findUserByEmail)
        const forgotLink = `${this.clientAppUrl}/changePassword?token=${token}`;
        
        await this.mailService.send({
            from: 'postmaster@sandbox2e39451cc8cd4590811363cdba133f38.mailgun.org',
            to: findUserByEmail.email,
            subject: 'Forgot Password',
            html: `
            <h3>Hello!</h3>
            <p>Please use this <a href=${forgotLink}> click here </a> to reset your password.</p>
            `,
        });
        
    }

    async changePasssword(body: ChangePassword): Promise<any>{
        
        const data: any = this.jwtService.decode(body.token)       
            if(data === null ){
                throw new HttpException('invalid token', HttpStatus.BAD_REQUEST)
            }

        const user: any = await this.findEmail(data.email)
        const pass = await bcrypt.hash(body.password, 10)

            return await this.loginRepository.update(user.id, {...user, password: pass})
    }


    // async facebookLog(body: Users): Promise<Users>{
    //    const user =  await this.findEmail(body.email)
       

    //    return body
    // }

 
}