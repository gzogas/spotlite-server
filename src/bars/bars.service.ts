import { ExceptionFilter, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExecException } from 'child_process';
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
        bar : {
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
                ]
            ,
             
            liveSearch: boolean,
            image: string, 
            description: string, 
            musicTags: [string], 
            lastUpdate: Date
        
        }
    )
        : Promise<Bar> {

        const updatedBar = await this.findBar(barEmail);

        bar.name ? updatedBar.name = bar.name : this._throw(new NotFoundException("Name is required"));
        bar.password ? updatedBar.password = bar.password : this._throw(new NotFoundException("Password is required"));
        bar.address ? updatedBar.address = bar.address : this._throw(new NotFoundException("Address is required"));
        bar.phoneNums ? updatedBar.phoneNums = bar.phoneNums : this._throw(new NotFoundException("Phone numbers are required"));


        bar.openTime.map((day, index) => {
            day.from ? updatedBar.openTime[index].from = day.from : this._throw(new NotFoundException("From is required"));
            day.to ? updatedBar.openTime[index].to = day.to : this._throw(new NotFoundException("To is required"));
        })

        bar.liveSearch ? updatedBar.liveSearch = bar.liveSearch : this._throw(new NotFoundException("Livesearch is required"));
        bar.image ? updatedBar.image = bar.image : this._throw(new NotFoundException("Image is required"));
        bar.description ? updatedBar.description = bar.description : this._throw(new NotFoundException("Description is required"));
        bar.musicTags ? updatedBar.musicTags = bar.musicTags : this._throw(new NotFoundException("Music tags are required"));
        bar.lastUpdate ? updatedBar.lastUpdate = bar.lastUpdate : this._throw(new NotFoundException("Last update is required"));
        const result = updatedBar.save();
        return result;

    }

    //---------------DELETE METHODS---------------

    // DELETE A SPECIFIC BAR BY EMAIL
    async deleteBar(barEmail: string) {

        const result = await this.barModel.deleteOne({ email: barEmail }).exec();

        if (result.n === 0) {
            this._throw(new NotFoundException(`Could not find bar with '${barEmail}' email.`))
        }


    }


    //---------------SECONDARY FUNCTIONAL METHODS---------------

    // FIND A BAR IN DB BY EMAIL
    private async findBar(barEmail: string): Promise<Bar> {
        let bar;
        try {
            bar = await this.barModel.findOne({ email: barEmail }).exec();

        } catch (error) {
            //throw new NotFoundException('Could not find bar.')
            this._throw(error);
        }
        if (!bar) {
            this._throw(new NotFoundException(`Could not find bar with '${barEmail}' email.`))
        }
        console.log(bar);
        return bar;
    }

    // Exception handling method
    private _throw(err: ExecException): Error {
        throw err;
    }

}
