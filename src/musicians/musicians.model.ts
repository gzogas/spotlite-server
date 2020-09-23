import * as mongoose from 'mongoose';


export const MusicianSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    phoneNums: [Number],
    bandSearch: Boolean,
    liveSearch: [String],
    image: String,
    description: String,
    musicTags: [String],
    instruments: [String]
});

export interface Musician extends mongoose.Document {

    _id: string, name: string, surname: string, email: string, password: string, phoneNums: [number], bandSearch: boolean, liveSearch: [string], image: string, description: string, musicTags: [string], instruments: [string]

}