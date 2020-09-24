import { Module } from "@nestjs/common";
import { barsController } from './bars.controller';
import { BarsService } from './bars.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BarSchema } from "./bars.model";

@Module({
  imports: [MongooseModule.forFeature([{name: 'Bar', schema: BarSchema}])],
  controllers: [barsController],
  providers: [BarsService]
})


export class MusiciansModule {

}