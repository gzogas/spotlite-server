import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose'
import { UsersModule } from './users/users.module';

@Module({
  // Users_z \/\/\/
  imports: [UsersModule,MongooseModule.forRoot('mongodb+srv://admin:admin@spotlite.cja9l.mongodb.net/spotlite?retryWrites=true&w=majority')],
  // Users_z /\/\/\
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
