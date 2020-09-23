import { Module } from "@nestjs/common";
import { MusiciansController } from './musicians.controller';
import { MusiciansService } from './musicians.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicianSchema } from "./musicians.model";

@Module({
  imports: [MongooseModule.forFeature([{name: 'Musician', schema: MusicianSchema}])],
  controllers: [MusiciansController],
  providers: [MusiciansService]
})


export class MusiciansModule {

}