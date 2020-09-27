import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BarsService } from './bars.service';

@Controller('bars')
export class barsController {

    constructor(private readonly bService: BarsService) { }



    @Get()
    async getAllBars() {
       const musicians = await this.bService.getBars();
       return musicians;
     }

     @Get(':email')
    async getSingleMusician(@Param('email') musicianEmail: string) {
       const musicians = await this.bService.getBar(musicianEmail);
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
       const generatedId = await this.bService.insertMusician(
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
      const updatedMusician = await this.bService.updateMusician(
          mEmail, mName, mSurname, mPassword, mPhoneNums, mBandSearch, mLiveSearch, mImage, mDescription, mMusicTags, mInstruments)
       return  updatedMusician;
   }

   @Delete(':email')
   async removeMusician(@Param('email') musicianEmail: string)
   {
      await this.bService.deleteMusician(musicianEmail);
   }


}