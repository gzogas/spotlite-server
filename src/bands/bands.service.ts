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

    async getSingleBand(bandName:string,adminUsername:string) {
        const band = await this.findBand(bandName,adminUsername);
        return band;
    }

    //--CREATE
    async insertBand(band:Band) {

        const newBand = new this.bandModel(band);
        newBand.lastUpdate= new Date(Date.now()).toLocaleDateString();
        try {
            const result = await newBand.save();
            return result.id as string;
        } catch (error) {
            throw new ConflictException(error.message);
        }

    }

    //--UPDATE
    async updateBand(
    band:Band,
    bandName:string,
    adminUsername:string){

        const updatedBand = await this.findBand(bandName,adminUsername);

        if (band.name) updatedBand.name = band.name;
        if (band.members) updatedBand.members = band.members;
        if (band.email) updatedBand.email = band.email;
        if (band.membersSearch) updatedBand.membersSearch = band.membersSearch;
        if (band.liveSearch) updatedBand.liveSearch = band.liveSearch;
        if (band.studioSearch) updatedBand.studioSearch = band.studioSearch;
        if (band.image) updatedBand.image = band.image;
        if (band.description) updatedBand.description = band.description;
        if (band.musicTags) updatedBand.musicTags = band.musicTags;
        if (band.instruments) updatedBand.instruments = band.instruments;
        updatedBand.lastUpdate = new Date(Date.now()).toLocaleDateString();

        await updatedBand.save();

    }


    //--DELETE
    async deleteBand(bandName: string,adminUsername: string) {
        const result = await this.bandModel.deleteOne({ "name": bandName,"members":{$elemMatch: {member:adminUsername,"authority": "ADMIN" }}}).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find Band.');
        }
    }

    //FUNCTIONS NOT USED BY CONTROLLER ONLY BY SERVICE

    private async findBand(bandName: string, adminUsername:string) {
        let band;
        try {
            band = await this.bandModel.findOne({ "name": bandName,"members":{$elemMatch: {member:adminUsername,"authority": "ADMIN" }}})
        } catch (error) {
            throw new NotFoundException('Could not find Band.')
        }
        if (!band) {
            throw new NotFoundException('Could not find Band.')
        }
        return band;
    }

}