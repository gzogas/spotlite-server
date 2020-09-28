import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BarsService } from './bars.service';

@Controller('bars')
export class barsController {

    constructor(private readonly bService: BarsService) { }



    @Get()
    async getAllBars() {
       const bars = await this.bService.getBars();
       return bars;
     }

     @Get(':email')
    async getSingleBar(@Param('email') musicianEmail: string) {
       const bars = await this.bService.getBar(musicianEmail);
       return bars;
     }



   @Post()
   async addBar(
       @Body('name') bName: string,
       @Body('email') bEmail: string,
       @Body('password') bPassword: string,
       @Body('address') bAddress: string,
       @Body('phoneNums') bPhoneNums: [number],
       @Body('openTime')  bOpenTime: 
       [
           {
               day: string,
               from: string,
               to: string
           }
       ],
       @Body('liveSearch') bLiveSearch: boolean,
       @Body('image') bImage: string,
       @Body('description') bDescription: string,
       @Body('musicTags') bMusicTags: [string],
       @Body('lastUpdate') bLastUpdate: Date,
   ) {
       const generatedId = await this.bService.insertBar(
           bName, bEmail, bPassword, bAddress, bPhoneNums, bOpenTime, bLiveSearch, bImage, bDescription, bMusicTags, bLastUpdate);
       return { id: generatedId }
   }

   @Patch(':email')
   async updateBar(
    // DIFFERENT APROACH WITH SINGLE BODY DECORATOR  
        @Param('email') barEmail: string,
        @Body() bar : {
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
   ){
      const updatedBar = await this.bService.updateBar(barEmail, bar)
       return  updatedBar;
   }

   @Delete(':email')
   async removeBar(@Param('email') musicianEmail: string)
   {
      await this.bService.deleteBar(musicianEmail);
   }


}