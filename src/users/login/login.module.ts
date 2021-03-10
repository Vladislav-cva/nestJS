import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../userRegister/schemas/user.entity';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { jwtConstants } from './loginConstants/constants';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { JwtAuthGuard } from '../guard/jwt-guard';
import { JwtStrategy } from '../guard/jwt-strategy';
import { FacebookStrategy } from '../guard/facebook.strategy';



@Module({
    imports: [TypeOrmModule.forFeature([Users]),
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1h' },
      }),
      MailModule

],
    providers: [LoginService,  JwtAuthGuard, JwtStrategy, FacebookStrategy],
    controllers: [LoginController],
})


export class loginModule{

}