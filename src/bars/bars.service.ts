import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bar } from './bars.model';

@Injectable()
export class BarsService {

    constructor(@InjectModel('Bar') private readonly barModel: Model<Bar>) { }



    //---------------GET METHODS---------------

    // GET ALL BARS METHOD
    async getBars(): Promise<Bar[]> {
        const bars = await this.barModel.find().exec();
        console.log(bars);
        return bars;
    }

    // GET A SINGLE BAR METHOD
    async getBar(barEmail: string): Promise<Bar> {
        const bar = await this.findBar(barEmail)
        console.log(bar);
        return bar;
    }


    //---------------POST METHODS---------------

    // INSERT A BAR TO DB METHOD
    async insertBar(
        name: string,
        email: string,
        password: string,
        address: string,
        phoneNums: [number],
        openTime:
            [
                {
                    day: string,
                    from: string,
                    to: string
                }
            ],
        liveSearch: boolean,
        image: string,
        description: string,
        musicTags: [string],
        lastUpdate: Date) {
        const newBar = new this.barModel({
            name, email, password, address, phoneNums, openTime, liveSearch, image, description, musicTags, lastUpdate
        }
        )

        const result = await newBar.save();
        console.log(result);
        return result.email as string;

    };



    //---------------UPDATE METHODS---------------

    // UPDATE A SPESIFIC BARS DATA BY EMAIL
    async updateBar(
        barEmail: string,
        name: string,
        password: string,
        address: string,
        phoneNums: [number],
        openTime:
            [
                {
                    day: string,
                    from: string,
                    to: string
                }
            ],
        liveSearch: boolean,
        image: string,
        description: string,
        musicTags: [string],
        lastUpdate: Date
    )
        : Promise<Bar> {

        const updatedBar = await this.findBar(barEmail);

        name ? updatedBar.name = name : null;
        password ? updatedBar.password = password : null;
        address ? updatedBar.address = address : null;
        phoneNums ? updatedBar.phoneNums = phoneNums : null;


        openTime.map((day, index) => {
            day.from ? updatedBar.openTime[index].from = day.from : null;
            day.to ? updatedBar.openTime[index].to = day.to : null;
        })

        liveSearch ? updatedBar.liveSearch = liveSearch : null;
        image ? updatedBar.image = image : null;
        description ? updatedBar.description = description : null;
        musicTags ? updatedBar.musicTags = musicTags : null;
        lastUpdate ? updatedBar.lastUpdate = lastUpdate : null;
        const result = updatedBar.save();
        return result;

    }

    //---------------DELETE METHODS---------------

    // DELETE A SPECIFIC BAR BY EMAIL
    async deleteBar(barEmail: string) {

        const result = await this.barModel.deleteOne({ email: barEmail }).exec();

        if (result.n === 0) {
            throw new NotFoundException('Could not find bar.')
        }


    }


    //---------------SECONDARY FUNCTIONAL METHODS---------------

    // FIND A BAR IN DB BY EMAIL
    private async findBar(barEmail: string): Promise<Bar> {
        let bar;
        try {
            bar = await this.barModel.findOne({ email: barEmail }).exec();

        } catch (error) {
            throw new NotFoundException('Could not find musician.')
        }
        if (!bar) {
            throw new NotFoundException('Could not find musician.')
        }
        console.log(bar);
        return bar;
    }

}
