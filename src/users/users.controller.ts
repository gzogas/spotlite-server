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

    @Get(":username")
    async getUser(@Param("username") username: string) {
        const user = await this.userService.getSingleUser(username);
        return user;
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addUser(
        @Body()user:{
            name: string,
            surname: string,
            username: string,
            email: string,
            password: string,
            musicTags: [],
            follows: {
                bands: [],
                musicians: [],
                bars: [],
            },
            locations: []
            }
    ) {
        const generateId = await this.userService.insertUser(user);
        return { newId: generateId };
    }

    @Patch(":username")
    @HttpCode(HttpStatus.ACCEPTED)
    async updateUser(
        @Body()user:{name: string,
        surname: string,
        username: string,
        email: string,
        password: string,
        musicTags: [],
        follows: {
            bands: [],
            musicians: [],
            bars: [],
        },
        locations: []
        lastUpdate: Date
        },
        @Param("username") username:string,        
    ) {

        await this.userService.updateUser(user,username);
        return {
            "statusCode": 202,
            "message": "User updated successfully.",
            "error": "ACCEPTED"
        }
    }

    @Delete(":username")
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUser(@Param("username") username: string) {
        await this.userService.deleteUser(username);
    }

}
