import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'; 
import {MusiciansModule} from './musicians/musicians.module';

@Module({
  imports: [MusiciansModule, MongooseModule.forRoot('mongodb+srv://admin:admin@spotlite.cja9l.mongodb.net/spotlite?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
