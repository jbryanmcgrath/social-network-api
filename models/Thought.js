const { Schema, model } = require('mongoose');
const ReactionSchema = require('./reactionSchema')


const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username:
        {
            type: String,
            required: true,
        }
        ,
        reactions: [
            ReactionSchema
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.length
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought