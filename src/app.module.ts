import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose'
import { BandsModule } from './bands/bands.module';

@Module({
  // Bamds_z \/\/\/
  imports: [BandsModule,MongooseModule.forRoot('mongodb+srv://admin:admin@spotlite.cja9l.mongodb.net/spotlite?retryWrites=true&w=majority')],
  // Bands_z /\/\/\
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
