import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MusiciansService } from './musicians.service';

@Controller('musicians')
export class MusiciansController {


    constructor(private readonly mService: MusiciansService) { }

      @Get()
     async getAllMusicians() {
        const musicians = await this.mService.getMusicians();
        return musicians;
      }

      @Get(':email')
     async getSingleMusician(@Param('email') musicianEmail: string) {
        const musicians = await this.mService.getMusician(musicianEmail);
        return musicians;
      }



    @Post()
    async addMusician(
        @Body('name') mName: string,
        @Body('surname') mSurname: string,
        @Body('email') mEmail: string,
        @Body('password') mPassword: string,
        @Body('phoneNums') mPhoneNums: [number],
        @Body('bandSearch') mBandSearch: boolean,
        @Body('liveSearch') mLiveSearch: [string],
        @Body('image') mImage: string,
        @Body('description') mDescription: string,
        @Body('musicTags') mMusicTags: [string],
        @Body('instruments') mInstruments: [string]
    ) {
        const generatedId = await this.mService.insertMusician(
            mName, mSurname, mEmail, mPassword, mPhoneNums, mBandSearch, mLiveSearch, mImage, mDescription, mMusicTags, mInstruments);
        return { id: generatedId }
    }

    @Patch(':email')
    async updateMusician(
        @Param('email') mEmail: string,
        @Body('name') mName: string,
        @Body('surname') mSurname: string,
        @Body('password') mPassword: string,
        @Body('phoneNums') mPhoneNums: [number],
        @Body('bandSearch') mBandSearch: boolean,
        @Body('liveSearch') mLiveSearch: [string],
        @Body('image') mImage: string,
        @Body('description') mDescription: string,
        @Body('musicTags') mMusicTags: [string],
        @Body('instruments') mInstruments: [string]
    ){
       const updatedMusician = await this.mService.updateMusician(
           mEmail, mName, mSurname, mPassword, mPhoneNums, mBandSearch, mLiveSearch, mImage, mDescription, mMusicTags, mInstruments)
        return  updatedMusician;
    }

    @Delete(':email')
    async removeMusician(@Param('email') musicianEmail: string)
    {
       await this.mService.deleteMusician(musicianEmail);
    }

}