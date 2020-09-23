import { Controller, Post, Get, Body, Param, Delete, Patch } from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';

import { UsersService } from './users.service';

@Controller("users")
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    async getUsers() {
        const user = await this.userService.getUsers();
        return user;
    }

    @Get(":mail")
    async getUser(@Param("mail") mail: string) {
        const user = await this.userService.getSingleUser(mail);
        return user;
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addUser(
        @Body('name') name: string,
        @Body('surname') surname: string,
        @Body('username') username: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('musicTags') musicTags: [],
        @Body('follows') follows: {
            bands: [],
            musicians: [],
            bars: [],
        },
        @Body('locations') locations: []
    ) {
        const generateId = await this.userService.insertUser(name, surname, username, email, password, musicTags, follows, locations);
        return { newId: generateId };
    }

    @Patch(":email")
    @HttpCode(HttpStatus.ACCEPTED)
    async updateUser(
        @Body('name') name: string,
        @Body('surname') surname: string,
        @Body('username') username: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('musicTags') musicTags: [],
        @Body('follows') follows: {
            bands: [],
            musicians: [],
            bars: [],
        },
        @Body('locations') locations: [],
        @Param("email") mail:string
    ) {
        await this.userService.updateUser(name, surname, username, email, password, musicTags, follows, locations,mail);
        return {
            "statusCode": 202,
            "message": "User updated successfully.",
            "error": "ACCEPTED"
        }
    }

    @Delete(":email")
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUser(@Param("email") email: string) {
        await this.userService.deleteUser(email);
    }

}
