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
    membersSearch: [String],
    liveSearch: [String],
    studioSearch: [String],
    image:String,
    description:String,
    musicTags: [String],
    instruments:[String],
    lastUpdate: Date    
})

export interface Band {
    id: string,
    name: string,
    members: [{member:string,authority:string}],
    email: string,
    membersSearch: [string],
    liveSearch: [string],
    studioSearch: [string],
    image:string,
    description:string,
    musicTags: [string],
    instruments:[string],
    lastUpdate: Date  
}