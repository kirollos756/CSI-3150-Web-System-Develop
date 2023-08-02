import React, { useState } from 'react';
import axios from 'axios';
import { State } from '@splidejs/splide';



const OpenAIComponent = () => {
    const [ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);

    const handleInputChange = (e) => {
        setIngredients(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const prompt = `Please provide a recipe using the following ingredients only that will be listed below. 
Format the response in JSON with the meal name and cooking instructions. Your response should start with the text "Recipe". Your response should be literally exactly as follows: 
{
  "Recipe": "meal name",
  "cooking_instructions": [
    "instruction line 1...",
    "instruction line 2...",
    "However many lines are needed to finish the recipe..."
  ]
  The ingredients are: 
`;

        //Amelio Mansour's API key and org ID
        const apiKey = process.env.REACT_APP_OPEN_API_KEY;
        const orgId = process.env.REACT_APP_OPEN_API_ORGID;

        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo-0613',
                    temperature: 0.0,
                    messages: [
                        {
                            role: 'system', content: `You are chefBot you simply do directly as you are told and do not add
                        any notes or extra messages. Also, do not keep any recollection of previous requests made to you. Treat each request as if its the first one received.` },
                        { role: 'user', content: `Please provide a recipe using the following ingredients: ${ingredients}` },
                    ],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'OpenAI-Organization': orgId,
                        Authorization: `Bearer ${apiKey}`,
                    },
                }
            );

            //This is the response
            const messageContent = response.data.choices[0].message.content;


            const recipesData = parseInstructions(messageContent);


            setRecipes(recipesData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const parseInstructions = (instructions) => {
        console.log("Instructions:", instructions);
        const recipeRegex = /Recipe: (.*?)\n\nIngredients:\n([\s\S]+)\n\nInstructions:\n([\s\S]+)/;
        const stepRegex = /\d+\.\s(.+)/g;
    
        const recipesData = [];
        
        const recipeMatch = recipeRegex.exec(instructions);
        if (!recipeMatch) {
            console.error("Parsing error: Could not extract recipe data.");
            return recipesData;
        }
    
        const mealTitle = recipeMatch[1].trim();
        console.log("Meal Title:", mealTitle);
    
        const ingredients = recipeMatch[2].trim();
        console.log("Ingredients:", ingredients);
    
        const instructionsText = recipeMatch[3].trim();
        console.log("Instructions Text:", instructionsText);
    
        const stepsData = [];
        let stepMatch;
        while ((stepMatch = stepRegex.exec(instructionsText)) !== null) {
            const stepInstruction = stepMatch[1].trim();
            stepsData.push(stepInstruction);
        }
    
        recipesData.push({
            meal_title: mealTitle,
            ingredients: ingredients.split('\n').map(item => item.trim()),
            instructions: stepsData,
        });
    
        console.log("Parsed Recipes Data:", recipesData);
        return recipesData;
    };
    
    





    //Saving a recipe
    const saveRecipe = (recipe) => {
        const data = JSON.stringify(recipe);
        const blob = new Blob([data], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "recipe-" + Date.now() + ".txt";
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="ingredients">Enter Ingredients:</label>
                <input
                    type="text"
                    id="ingredients"
                    value={ingredients}
                    onChange={handleInputChange}
                />
                <button type="submit">Submit</button>
            </form>
            {recipes.map((recipe, index) => (
                <div key={index}>
                    <h3>Recipe {index + 1}: {recipe.meal_title}</h3>
                    <h4>Ingredients:</h4>
                    <ul>
                        {recipe.ingredients.map((ingredient, i) => (
                            <li key={i}>{ingredient}</li>
                        ))}
                    </ul>
                    <h4>Instructions:</h4>
                    {recipe.instructions.map((instruction, i) => (
                        <p key={i}>{instruction}</p>
                    ))}
                
                </div>
                
            ))}

            <div>
                {/* Button for saving to text */}
                <button onClick={() => { saveRecipe(recipes) }}> SAVE RECIPE </button>
            </div>
        </div>
    );
};

export default OpenAIComponent;