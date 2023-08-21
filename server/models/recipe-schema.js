const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let recipeSchema = new Schema({
    userID:{
        type: String
    },
    name: {
        type: String
    },
    instructions: {
        type: [String]
    },
    ingredients: {
        type: [String]
    }
}, {
    collection: 'test'

    })
module.exports = mongoose.model('recipe', recipeSchema)