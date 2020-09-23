import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Musician } from './musicians.model';

@Injectable()
export class MusiciansService {

    constructor(@InjectModel('Musician') private readonly musicianModel: Model<Musician>) { }


    //---------------GET METHODS---------------

    // GET ALL MUSICIANS METHOD
    async getMusicians(): Promise<Musician[]> {
        const musicians = await this.musicianModel.find().exec();
        console.log(musicians);
        return musicians;
    }

    // GET A SINGLE MUSICIAN METHOD
    async getMusician(musicianEmail: string): Promise<Musician> {
        const musician = await this.findMusician(musicianEmail)
        console.log(musician);
        return musician;
    }


    //---------------POST METHODS---------------

    // INSERT A MUSICIAN TO DB METHOD
    async insertMusician(
        name: string,
        surname: string,
        email: string,
        password: string,
        phoneNums: [number],
        bandSearch: boolean,
        liveSearch: [string],
        image: string,
        description: string,
        musicTags: [string],
        instruments: [string]) {
        const newMusician = new this.musicianModel({
            name, surname, email, password, phoneNums, bandSearch, liveSearch, image, description, musicTags, instruments
        }
        )

        const result = await newMusician.save();
        console.log(result);
        return result.email as string;

    };


    //---------------UPDATE METHODS---------------

    // UPDATE A SPESIFIC MUSICIANS DATA BY EMAIL
    async updateMusician(
        musicianEmail: string,
        name: string,
        surname: string,
        password: string,
        phoneNums: [number],
        bandSearch: boolean,
        liveSearch: [string],
        image: string,
        description: string,
        musicTags: [string],
        instruments: [string]): Promise<Musician> {

        const updatedMusician = await this.findMusician(musicianEmail);

        name ? updatedMusician.name = name : null;
        surname ? updatedMusician.surname = surname : null;
        password ? updatedMusician.password = password : null;
        phoneNums ? updatedMusician.phoneNums = phoneNums : null;
        bandSearch ? updatedMusician.bandSearch = bandSearch : null;
        liveSearch ? updatedMusician.liveSearch = liveSearch : null;
        image ? updatedMusician.image = image : null;
        description ? updatedMusician.description = description : null;
        musicTags ? updatedMusician.musicTags = musicTags : null;
        instruments ? updatedMusician.instruments = instruments : null;

        const result = updatedMusician.save();
        return result;

    }

    //---------------DELETE METHODS---------------

    // DELETE A SPECIFIC MUSICIAN BY EMAIL
    async deleteMusician(musicianEmail: string) {

        const result = await this.musicianModel.deleteOne({ email: musicianEmail }).exec();

        if (result.n === 0) {
            throw new NotFoundException('Could not find musician.')
        }


    }

    //---------------SECONDARY FUNCTIONAL METHODS---------------

    // FIND A MUSICIAN IN DB BY EMAIL
    private async findMusician(musicianEmail: string): Promise<Musician> {
        let musician;
        try {
            musician = await this.musicianModel.findOne({ email: musicianEmail }).exec();

        } catch (error) {
            throw new NotFoundException('Could not find musician.')
        }
        if (!musician) {
            throw new NotFoundException('Could not find musician.')
        }
        console.log(musician);
        return musician;
    }
}
