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

    async getSingleUser(email: string) {
        const user = await this.findUser(email);
        return user;
    }

    //--CREATE
    async insertUser(
        name: string,
        surname: string,
        username: string,
        email: string,
        password: string,
        musicTags: [],
        follows: { bands: [], musicians: [], bars: [] },
        locations: []) {

        const newUser = new this.userModel({ name, surname, username, email, password, musicTags, follows, locations });
        try {
            const result = await newUser.save();
            return result.id as string;
        } catch (error) {
            throw new ConflictException('User already exists.')
        }

    }

    //--UPDATE
    async updateUser(
        name: string,
        surname: string,
        username: string,
        email: string,
        password: string,
        musicTags: [],
        follows: { bands: [], musicians: [], bars: [] },
        locations: []) {

        this.ifMailExist(email);
        const updatedUser = await this.findUser(email);

        if (name) updatedUser.name = name;
        if (surname) updatedUser.surname = surname;
        if (username) updatedUser.username = username;
        if (password) updatedUser.password = password;
        if (musicTags) updatedUser.musicTags = musicTags;
        if (follows.bands) updatedUser.follows.bands = follows.bands;
        if (follows.musicians) updatedUser.follows.musicians = follows.musicians;
        if (follows.bars) updatedUser.follows.bars = follows.bars;
        if (locations) updatedUser.locations = locations;

        await updatedUser.save();

    }


    //--DELETE
    async deleteUser(email: string) {
        const result = await this.userModel.deleteOne({ "email": email }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find User.');
        }
    }

    //FUNCTIONS NOT USED BY CONTROLLER ONLY BY SERVICE

    private async findUser(email: string) {
        let user;
        try {
            user = await this.userModel.findOne({ "email": email })
        } catch (error) {
            throw new NotFoundException('Could not find User.')
        }
        if (!user) {
            throw new NotFoundException('Could not find User.')
        }
        return user;
    }

    private ifMailExist(email: string) {
        if (!email) {
            throw new NotFoundException('Could not find email variable.')
        }

    }

}