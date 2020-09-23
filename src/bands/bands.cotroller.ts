import { Controller, Post, Get, Body, Param, Delete, Patch } from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';

import { BandsService } from './bands.service';

@Controller("bands")
export class BandsController {
    constructor(private readonly bandService: BandsService) { }

    @Get()
    async getBands() {
        const band = await this.bandService.getBands();
        return band;
    }

    @Get(":mail")
    async getBand(@Param("mail") mail: string) {
        const band = await this.bandService.getSingleBand(mail);
        return band;
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addBand(
        @Body('name') name: string,
        @Body('members') members: [],
        @Body('email') email: string,
        @Body('membersSearch') membersSearch: [],
        @Body('liveSearch') liveSearch:[],
        @Body('studioSearch') studioSearch:[],
        @Body('image') image:string,
        @Body('description') description:string,
        @Body('musicTags') musicTags: [],
        @Body('instruments') instruments: []
    ) {
        const generateId = await this.bandService.insertBand( name, members, email, membersSearch, liveSearch, studioSearch, image, description,musicTags,instruments );
        return { newId: generateId };
    }

    @Patch(":mail")
    @HttpCode(HttpStatus.ACCEPTED)
    async updateBand(
        @Body('name') name: string,
        @Body('members') members: [],
        @Body('email') email: string,
        @Body('membersSearch') membersSearch: [],
        @Body('liveSearch') liveSearch:[],
        @Body('studioSearch') studioSearch:[],
        @Body('image') image:string,
        @Body('description') description:string,
        @Body('musicTags') musicTags: [],
        @Body('instruments') instruments: [],
        @Param("mail") mail: string
    ) {
        await this.bandService.updateBand(name, members, email, membersSearch, liveSearch, studioSearch, image, description,musicTags,instruments,mail);
        return {
            "statusCode": 202,
            "message": "Band updated successfully.",
            "error": "ACCEPTED"
        }
    }

    @Delete(":mail")
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteBand(@Param("mail") mail: string) {
        const band = await this.bandService.deleteBand(mail);
    }

}