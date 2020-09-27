import * as mongoose from 'mongoose';


export const BarSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    phoneNums: [Number],
    openTime: [{
        mondey: {
            from: Date,
            to: Date
        },
        tuesday: {
            from: Date,
            to: Date
        },
        wednesday: {
            from: Date,
            to: Date
        },
        thursday: {
            from: Date,
            to: Date
        },
        friday: {
            from: Date,
            to: Date
        },
        suturday: {
            from: Date,
            to: Date
        },
        sunday: {
            from: Date,
            to: Date
        }
    }
    ],
    liveSearch: Boolean,
    image: String,
    description: String,
    musicTags: [String],
    lastUpdate: Date
});

export interface Bar extends mongoose.Document {

    _id: string, 
    name: string, 
    email: string, 
    password: string, 
    address: string, 
    phoneNums: [number], 
    openTime: [
        {monday: {from:Date, to:Date}},
        {tuesday: {from:Date, to:Date}},
        {wednesday: {from:Date, to:Date}},
        {thursday: {from:Date, to:Date}},
        {friday: {from:Date, to:Date}},
        {suturday: {from:Date, to:Date}},
        {sunday: {from:Date, to:Date}},
    ], 
    liveSearch: boolean,
    image: string, 
    description: string, 
    musicTags: [string], 
    lastUpdate: Date

}