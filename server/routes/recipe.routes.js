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
        const { userID, name, instructions, ingredients } = req.body;

        const newRecipe = new recipe({
            userID: userID,
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


//amelio here again  
router.route('/read').get(async (req, res) => {
    const userID = req.query.userID;
  
    console.log('Backend received userID:', userID);
  
    if (!userID) {
      return res.status(400).json({ error: 'userID is required' });
    }
  
    try {
      const recipes = await recipe.find({ userID: userID }); // Use the Recipe model here
      console.log('Sending recipes:', recipes);
      return res.json(recipes);
    } catch (error) {
      console.log('Error fetching recipes:', error);
      return res.status(500).json({ error: 'An error occurred' });
    }
  });
  
//amelio ends here  


router.route('/edit/:id').get(async (req, res) => {
    const recipeId = req.params.id;
  
    try {
      const recipeToEdit = await recipe.findById(recipeId);
      res.json(recipeToEdit);
    } catch (error) {
      console.log('Error fetching recipe for editing:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  

router.route('/update/:id').put(async (req, res) => {
    const recipeId = req.params.id;
    const updatedData = req.body;
  
    try {
      const updatedRecipe = await recipe.findByIdAndUpdate(recipeId, updatedData, { new: true });
      res.json(updatedRecipe);
    } catch (error) {
      console.log('Error updating recipe:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  router.route('/delete/:id').delete(async (req, res) => {
    const recipeId = req.params.id;
    
    try {
      const deletedRecipe = await recipe.findByIdAndDelete(recipeId);
      res.json(deletedRecipe);
    } catch (error) {
      console.log('Error deleting recipe:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
module.exports = router;