import * as mongoose from 'mongoose'


export const UsersSchema = new mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    email:{
        type: String,
        index: true,
        unique: true
      },
    password:String,
    musicTags:[{
        musicTag:String
    }],
    follows:{
        bands:[{band:String}],
        musicians:[{musician:String}],
        bars:[{bar:String}]
    },
    locations:[{location:String}]
})

export interface User{
    id: string,
    name: string,
    surname: string,
    username: string,
    email:string,
    password:string,
    musicTags:[{
        musicTag:string
    }],
    follows:{
        bands:[{band:string}],
        musicians:[{musician:string}],
        bars:[{bar:string}]
    },
    locations:[{location:string}]
}
