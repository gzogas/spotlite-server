import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bar } from './bars.model';

@Injectable()
export class BarsService {

    constructor(@InjectModel('Bar') private readonly barModel: Model<Bar>) { }



}
