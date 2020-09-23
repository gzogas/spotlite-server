import { Injectable } from "@nestjs/common";
import { ConflictException } from "@nestjs/common/exceptions/conflict.exception";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

import { Band } from './bands.model';

@Injectable()
export class BandsService {

    constructor(@InjectModel('Band') private readonly bandModel: Model<Band>) { }

    //FUNCTIONS USED BY CONTROLLER
    //--GETTERS
    async getBands() {
        const bands = await this.bandModel.find().exec();
        return bands;
    }

    async getSingleBand(email: string) {
        const band = await this.findBand(email);
        return band;
    }

    //--CREATE
    async insertBand(
        name: string,
        members: [],
        email: string,
        membersSearch: [],
        liveSearch:[],
        studioSearch:[],
        image:string,
        description:string,
        musicTags: [],
        instruments: [],
        ) {

        const newBand = new this.bandModel({ name, members, email, membersSearch, liveSearch, studioSearch, image, description,musicTags,instruments });
        console.log(newBand);
        try {
            const result = await newBand.save();
            return result.id as string;
        } catch (error) {
            throw new ConflictException('Band already exists.')
        }

    }

    //--UPDATE
    async updateBand(
        name: string,
        members: [],
        email: string,
        membersSearch: [],
        liveSearch:[],
        studioSearch:[],
        image:string,
        description:string,
        musicTags: [],
        instruments: [],
        mail:string) {

        this.ifMailExist(mail);
        const updatedBand = await this.findBand(mail);

        if (name) updatedBand.name = name;
        if (members) updatedBand.members = members;
        if (email) updatedBand.email = email;
        if (membersSearch) updatedBand.membersSearch = membersSearch;
        if (liveSearch) updatedBand.liveSearch = liveSearch;
        if (studioSearch) updatedBand.studioSearch = studioSearch;
        if (image) updatedBand.image = image;
        if (description) updatedBand.description = description;
        if (musicTags) updatedBand.musicTags = musicTags;
        if (instruments) updatedBand.instruments = instruments;

        await updatedBand.save();

    }


    //--DELETE
    async deleteBand(email: string) {
        const result = await this.bandModel.deleteOne({ "email": email }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find Band.');
        }
    }

    //FUNCTIONS NOT USED BY CONTROLLER ONLY BY SERVICE

    private async findBand(email: string) {
        let band;
        try {
            band = await this.bandModel.findOne({ "email": email })
        } catch (error) {
            throw new NotFoundException('Could not find Band.')
        }
        if (!band) {
            throw new NotFoundException('Could not find Band.')
        }
        return band;
    }

    private ifMailExist(email: string) {
        if (!email) {
            throw new NotFoundException('Could not find email variable.')
        }

    }

}