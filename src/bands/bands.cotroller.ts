import { Controller, Post, Get, Body, Param, Delete, Patch } from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { Band } from './bands.model';

import { BandsService } from './bands.service';

@Controller("bands")
export class BandsController {
    constructor(private readonly bandService: BandsService) { }

    @Get()
    async getBands() {
        const band = await this.bandService.getBands();
        return band;
    }

    @Get(":bandName/:adminUsername")
    async getBand(
    @Param("bandName") bandName:string,
    @Param("adminUsername") adminUsername:string
    ) {
        const band = await this.bandService.getSingleBand(bandName,adminUsername);
        return band;
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addBand(
        @Body() band:Band,
    ) {
        const generateId = await this.bandService.insertBand(band);
        return { newId: generateId };
    }

    @Patch(":bandName/:adminUsername")
    @HttpCode(HttpStatus.ACCEPTED)
    async updateBand(
        @Body() band:Band,
        @Param("bandName") bandName:string,
        @Param("adminUsername") adminUsername:string
    ) {
        await this.bandService.updateBand(band,bandName,adminUsername);
        return {
            "statusCode": 202,
            "message": "Band updated successfully.",
            "error": "ACCEPTED"
        }
    }

    @Delete(":bandName/:adminUsername")
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteBand(@Param("bandName") bandName:string,@Param("adminUsername") adminUsername:string) {
        const band = await this.bandService.deleteBand(bandName,adminUsername);
    }

}