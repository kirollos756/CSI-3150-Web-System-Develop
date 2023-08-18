const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let recipeSchema = new Schema({
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