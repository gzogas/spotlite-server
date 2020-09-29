import * as mongoose from 'mongoose'
import { IsArray, IsDate, IsEmail, IsEmpty, IsOptional } from 'class-validator';

export const BandsSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true,
        required: [true, 'name is mandatory']
    },
    members:{
        type: [{member:{type: String,required: [true, 'member username in members Array is mandatory']},authority:{type: String,required: [true, 'authority Admin/Member in members Array is mandatory']}}],
        validate: [v => Array.isArray(v) && v.length > 0,'members Array must have a member with Admin authority'],
        required: [true, 'members array is mandatory']
        },
    email: {
        type: String,
        index: true,
        unique: true,
    },
    membersSearch: [String],
    liveSearch: [String],
    studioSearch: [String],
    image:String,
    description:String,
    musicTags: [String],
    instruments:[String],
    lastUpdate: Date    
})

export class Band {
    id: string;
    @IsOptional()
    name: string;
    @IsOptional()
    @IsArray()
    members: [{member:string,authority:string}];
    @IsEmail()
    @IsOptional()
    email: string;
    @IsArray()
    @IsOptional()
    membersSearch: [string];
    @IsArray()
    @IsOptional()
    liveSearch: [string];
    @IsArray()
    @IsOptional()
    studioSearch: [string];
    image:string;
    description:string;
    @IsArray()
    @IsOptional()
    musicTags: [string];
    @IsArray()
    @IsOptional()
    instruments:[string];
    @IsOptional()
    @IsEmpty()
    lastUpdate: Date;  
}