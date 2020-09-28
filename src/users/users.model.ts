import * as mongoose from 'mongoose'


export const UsersSchema = new mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    email: {
        type: String,
        index: true,
        unique: true
    },
    password: String,
    musicTags: [String],
    follows: {
        bands: [String],
        musicians: [String],
        bars: [String]
    },
    locations: [String],
    lastUpdate: Date
})

export interface User {
    id: string,
    name: string,
    surname: string,
    username: string,
    email: string,
    password: string,
    musicTags: [string],
    follows: {
        bands: [string],
        musicians: [string],
        bars: [string]
    },
    locations: [string],
    lastUpdate: Date
}
