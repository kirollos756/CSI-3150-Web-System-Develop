const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

let recipe = require('../models/recipe-schema');

async function getRecipes(){
    const recipes = await recipe.find({});
    console.log('GET ROUTER CALL',recipes);
    return recipes;
}

async function editRecipes(id){
    const recipes = await recipe.findById(id);
    console.log('EDIT ROUTER CALL',recipes);
    return recipes;
}

async function updateRecipes(id, body){
    const recipes = await recipe.findByIdAndUpdate(id, body);
    console.log("UPDATE ROUTER CALL", recipes);
    return recipes;
}

async function deleteRecipes(id){
    const recipes = await recipe.findByIdAndDelete(id);
    console.log("DELETE ROUTER CALL", recipes);
    return recipes;
}
//AMELIO START
router.route('/createAI').post(async (req, res, next) => {
    try {
        const { name, instructions, ingredients } = req.body;

        const newRecipe = new recipe({
            name: name,
            instructions: instructions,
            ingredients: ingredients
        });

        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        console.error('Error saving recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//AMELIO END

router.route('/create').post((req, res, next) => {
    recipe.create(req.body)
        
    .then((result) => {res.json(res)})
    .catch((error) => { return next(error)})
    
});




// router.route('/read').get((req, res, next) => {
//     recipe.find(req.body)
        
//     .then((result) => {res.json(res)})
//     .catch((error) => { return next(error)})
    
// });
// router.route('/read').get(( req, res) => {
   
//     recipe.find().then((res) => {res.json(res)}).catch((error) => { return error});
//     console.log(res);
// });

router.route('/read').get((req, res) => {
    getRecipes().then((result) => {return res.json(result)}).catch((error) => { return error });
})

router.route('/edit/:id').get((req, res) => {
    // recipe.findById(req.params.id, (error, data) => {
    //     if (error) {
    //         // eslint-disable-next-line no-undef
    //         return next(error)
    //     } else {
    //         res.json(data)
    //     }
    // })
    editRecipes(req.params.id).then((result) => {return res.json(result)}).catch((error) => { return error });
})

router.route('/update/:id').put((req, res) => {
    // recipe.findByIdAndUpdate(req.params.id, {
    //     $set: req.body
    // }, (error, data) => {
    //     if (error) {
    //         console.log(error)
    //         return next(error)
    //     } else {
    //         res.json(data)
    //         console.log('User updated successfully !')
    //     }
    // })
    updateRecipes(req.params.id, req.body).then((result) => {return res.json(result)}).catch((error) => { return error });
})
router.route('/delete/:id').delete((req, res) => {
    // recipe.findByIdAndRemove(req.params.id, (error, data) => {
    //     if (error) {
    //         return next(error);
    //     } else {
    //         res.status(200).json({
    //             msg: data
    //         })
    //     }
    // })

    deleteRecipes(req.params.id).then((result) => {return res.json(result)}).catch((error) => { return error });
})
module.exports = router;