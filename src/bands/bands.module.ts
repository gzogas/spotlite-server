import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { BandsController } from './bands.cotroller';
import { BandsSchema } from './bands.model';
import { BandsService } from './bands.service';


@Module({
    imports: [MongooseModule.forFeature([{ name: 'Band', schema: BandsSchema }])],
    controllers: [BandsController],
    providers: [BandsService],
})
export class BandsModule { }