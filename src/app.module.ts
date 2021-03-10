import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { loginModule } from './users/login/login.module';
import { userModule } from './users/userRegister/users.module';

import { ProjectModule } from './project/project.module';
import { MailModule } from './users/mail/mail.module';



@Module({
  imports: [
    TypeOrmModule.forRoot(),
    userModule,
    loginModule,
    ProjectModule,
    MailModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
   
}
