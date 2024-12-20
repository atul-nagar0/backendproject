import mongoose, { Schema } from "mongoose";

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoschema = new Schema(
{
    videoFile: {
        type: String,
        required: true,
    },
    
    thumbnail: {
        type: String,
        required: true,
    },
    
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    views: {
        type: Number,
        default: 0
    },

    ispublished: {
        type: Boolean,
        default: true
    },

    duration: {
        type: String,

    },

    title: {
        type: String,
        required: true
    }


},

{timestamps: true})

videoschema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoschema)