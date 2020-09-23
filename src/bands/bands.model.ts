import * as mongoose from 'mongoose'

export const BandsSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true
    },
    members: [{member:String,authority:String}],
    email: {
        type: String,
        index: true,
        unique: true
    },
    membersSearch: [{ instruments: String }],
    liveSearch: [{ location: String }],
    studioSearch: [{ location: String }],
    image:String,
    description:String,
    musicTags: [{
        musicTag: String
    }],
    instruments:[{instrument:String}]    
})

export interface Band {
    id: string,
    name: string,
    members: [{member:string,authority:string}],
    email: string,
    membersSearch: [{ isruments: string }],
    liveSearch: [{ location: string }],
    studioSearch: [{ location: string }],
    image:string,
    description:string,
    musicTags: [{
        musicTag: string
    }],
    instruments:[{instruments:String}]  
}