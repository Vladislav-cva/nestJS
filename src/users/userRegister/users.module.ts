import { Module } from '@nestjs/common';
import { userService } from './user.service';
import { UsersController } from './users.controller';

import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from './schemas/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    providers: [userService],
    controllers: [UsersController],
    exports: [TypeOrmModule]
})

export class userModule {

}