import * as mongoose from 'mongoose';


export const BarSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    phoneNums: [Number],
    openTime: [
        {
            day: String,
            from: String,
            to: String
        }
    ]
    ,
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
    openTime: 
        [
            {
                day: string,
                from: string,
                to: string
            }
        ]
    ,
     
    liveSearch: boolean,
    image: string, 
    description: string, 
    musicTags: [string], 
    lastUpdate: Date

}