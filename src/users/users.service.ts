import { Injectable } from "@nestjs/common";
import { ConflictException } from "@nestjs/common/exceptions/conflict.exception";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

import { User } from './users.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    //FUNCTIONS USED BY CONTROLLER
    //--GETTERS
    async getUsers() {
        const users = await this.userModel.find().exec();
        return users;
    }

    async getSingleUser(username: string) {
        const user = await this.findUser(username);
        return user;
    }

    //--CREATE
    async insertUser(
        user:{
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

        const newUser = new this.userModel(user);
        newUser.lastUpdate= new Date(Date.now()).toLocaleDateString();
        try {
            const result = await newUser.save();
            return result.id as string;
        } catch (error) {
            throw new ConflictException('User already exists.')
        }

    }   

    //--UPDATE
    async updateUser(
        user:
            {
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
            locations: [],
            lastUpdate: Date
            },
            username) {

        this.ifMailExist(username);
        const updatedUser = await this.findUser(username);

        if (user.name) updatedUser.name = user.name;
        if (user.surname) updatedUser.surname = user.surname;
        if (user.email) updatedUser.email = user.email;
        if (user.username) updatedUser.username = user.username;
        if (user.password) updatedUser.password = user.password;
        if (user.musicTags) updatedUser.musicTags = user.musicTags;
        if (user.follows.bands) updatedUser.follows.bands = user.follows.bands;
        if (user.follows.musicians) updatedUser.follows.musicians = user.follows.musicians;
        if (user.follows.bars) updatedUser.follows.bars = user.follows.bars;
        if (user.locations) updatedUser.locations = user.locations;
        updatedUser.lastUpdate = new Date(Date.now()).toLocaleDateString();

        await updatedUser.save();
    }

    //--DELETE
    async deleteUser(username: string) {
        const result = await this.userModel.deleteOne({ "username": username }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find User.');
        }
    }

    //FUNCTIONS NOT USED BY CONTROLLER ONLY BY SERVICE

    private async findUser(username: string) {
        let user;
        try {
            user = await this.userModel.findOne({ "username": username })
        } catch (error) {
            throw new NotFoundException('Could not find User.')
        }
        if (!user) {
            throw new NotFoundException('Could not find User.')
        }
        return user;
    }

    private ifMailExist(username: string) {
        if (!username) {
            throw new NotFoundException('Could not find email variable.')
        }

    }

}