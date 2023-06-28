import React, { useState } from 'react';
import axios from 'axios';

const OpenAIComponent = () => {
    const [ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);

    const handleInputChange = (e) => {
        setIngredients(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const prompt = `Please provide a recipe using the following ingredients that will be listed below. 
Format the response in JSON with the meal name and cooking instructions. Your response should be as follows: 
{
  "meal_name": "meal name",
  "cooking_instructions": [
    "instruction line 1...",
    "instruction line 2...",
    "However many lines are needed to finish the recipe..."
  ]
  The ingredients are: 
`;

        const apiKey = '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';
        const orgId = 'org-C4QTzJR2tr7fmUxay8VNzzcV';
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo-0613',
                    messages: [
                        { role: 'system', content: `You are chefBot you simply do directly as you are told and do not add
                        any notes or extra messages.` },
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

            const messageContent = response.data.choices[0].message.content; // Extract the message content
            

            const recipesData = parseInstructions(messageContent); // Pass the message content to parseInstructions

            

            setRecipes(recipesData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const parseInstructions = (instructions) => {
        const recipeRegex = /Ingredients:(.*?)(?=Instructions:|\n\n|\n$|$)(.*?)(?=Ingredients:|$)/gs;
        const stepRegex = /\d+\.\s(.+)/g;
    
        const recipesData = [];
    
        let recipeMatch;
        while ((recipeMatch = recipeRegex.exec(instructions)) !== null) {
            const ingredients = recipeMatch[1].trim();
            const instructionsText = recipeMatch[2].trim();
    
            const stepsData = [];
            let stepMatch;
            while ((stepMatch = stepRegex.exec(instructionsText)) !== null) {
                const stepInstruction = stepMatch[1].trim();
                stepsData.push(stepInstruction);
            }
    
            recipesData.push({
                ingredients: ingredients.split('\n'),
                instructions: stepsData,
            });
        }
    
        return recipesData;
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
                    <h3>Recipe {index + 1}</h3>
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
        </div>
    );
};

export default OpenAIComponent;
