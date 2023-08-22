import React, { useState } from 'react';
import axios from 'axios';
import { State } from '@splidejs/splide';
import chefloading from '../images/chef.png';

import { Box, Paper, Typography, Input, TextField, ButtonGroup, Button } from '@mui/material';
import { CloudUpload, Refresh } from '@mui/icons-material'; // Importing the icons

import { set } from 'lodash';



const OpenAIComponent = ({ userID }) => {


    //state initialization and defines the "setting function" aka the function to set/update the state
    //from my understanding useState('') declares the state and sets it to an empty string
    const [ingredients, setIngredients] = useState(['']);
    // useState([]) declares the state and sets it to an empty array
    const [recipes, setRecipes] = useState([]);
    const [instructionstate, setInstructions] = useState('');
    const [recipeTitle, setRecipeTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEdible, setIsEdible] = useState(true);
    //makes sure the userID is a string to pass to db
    const [userIDstate, setUserID] = useState(userID.userId);
    const handleIngredientChange = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;

        // Check if the user is typing in the last input field
        if (index === ingredients.length - 1 && value !== '') {
            newIngredients.push(''); // Add a new empty ingredient input
        }

        setIngredients(newIngredients);
    };

    const handleReset = () => {
        setIngredients(['']);
        setRecipes([]);
        setInstructions('');
        setIsEdible(true);
    };

    const validateEdibility = async (content) => {
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
                            role: 'system',
                            content: `You are recipe Validator, check if the following content is an edible recipe:\n${content}. 
                            Simply reply ONLY with lowercase 'yes' or 'no'. It IS VERY IMPORTANT YOUR RESPONSE 
                            FORMAT IS EXACTLY lowercase yes or no.`,
                        },
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

            const messageContent = response.data.choices[0].message.content;
            console.log('Validation response:', messageContent);

            //checks if response is yes edible or no not edible
            if (messageContent === 'yes') {
                setIsEdible(true);
                return true;
            }
            else if (messageContent === 'no') {
                setIsEdible(false);
                return false;
            }


        } catch (error) {
            console.error('Error validating:', error);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //enable view of loading icon here
        setIsLoading(true);

        // Pulls each input tinto a string and removes any empty inputs
        const ingredientsString = ingredients.filter((input) => input.trim() !== '').join(', ');
        // setIngredients(['']);


        const prompt = `Please provide a recipe using the following ingredients only: ${ingredientsString} 
         Format the response starting with the Recipe Name. Your response should be literally exactly the same format below:
         just change the content to whatever the recipe is.  
        
         Recipe: Chicken and Rice

         Ingredients:
         - 2 chicken breasts
         - 1 cup rice
         - Salt, to taste
         - Pepper, to taste
         
         Instructions:
         1. Preheat the oven to 375°F (190°C).
         2. Season the chicken breasts with salt and pepper on both sides.
         3. Heat a large oven-safe skillet over medium-high heat.
         4. Add the chicken breasts to the skillet and cook for about 3-4 minutes on each side until browned.
         5. Remove the chicken from the skillet and set aside.
         6. In the same skillet, add the rice and toast it for about 2 minutes, stirring constantly.
         7. Add 2 cups of water to the skillet and bring it to a boil.
         8. Place the chicken breasts on top of the rice in the skillet.
         9. Cover the skillet with a lid or aluminum foil and transfer it to the preheated oven.
         10. Bake for 20-25 minutes or until the chicken is cooked through and the rice is tender.
         11. Remove from the oven and let it rest for a few minutes before serving.
         12. Serve the chicken and rice together, and adjust the seasoning with salt and pepper if needed.
  
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
                        { role: 'system', content: prompt }
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

            //This is the response from Open AI API
            setIsLoading(false);

            const messageContent = response.data.choices[0].message.content;
            const isEdible = await validateEdibility(messageContent);
            console.log("userID from openAI", userIDstate);

            if (isEdible) {
                const recipesData = parseInstructions(messageContent);
                setRecipes(recipesData);



                const instructions = recipesData[0].instructions.join('\n');
                setInstructions(instructions);


                const extractedIngredients = recipesData[0].ingredients.join(', ');


            } else {
                console.log('Response is not an edible recipe.');
                setRecipes([]);
                setInstructions('');
            }



            //setRecipes(recipesData);
        } catch (error) {
            console.error('Error:', error);
        }

    };

    const extractIngredients = (instructions) => {
        const ingredientsRegex = /Ingredients:\n- (.*?)\n/g;
        const ingredientsMatch = instructions.match(ingredientsRegex);

        if (!ingredientsMatch) {
            return [];
        }

        const ingredients = ingredientsMatch.map(match => match.replace(/Ingredients:\n- /, '').trim());
        return ingredients;
    };


    const extractRecipeName = (instructions) => {
        const recipeNameRegex = /Recipe: (.*?)\n/;
        const recipeNameMatch = instructions.match(recipeNameRegex);

        if (!recipeNameMatch) {
            return "";
        }

        const recipeName = recipeNameMatch[1].trim();
        return recipeName;
    };



    const parseInstructions = (instructions) => {
        const recipeRegex = /Recipe: (.*?)\n\nIngredients:\n([\s\S]+)\n\nInstructions:\n([\s\S]+)/;
        const stepRegex = /(\d+\.\s)(.+)/g; // Modified regex to capture the number prefix

        const recipesData = [];

        const recipeMatch = recipeRegex.exec(instructions);
        if (!recipeMatch) {
            console.error("Parsing error: Could not extract recipe data.");
            return recipesData;
        }

        const mealTitle = recipeMatch[1].trim();
        setRecipeTitle(mealTitle);
        const ingredients = recipeMatch[2].trim();
        const instructionsText = recipeMatch[3].trim();

        const stepsData = [];
        let stepMatch;
        while ((stepMatch = stepRegex.exec(instructionsText)) !== null) {
            const stepNumber = stepMatch[1]; // Captured step number with prefix
            const stepInstruction = stepMatch[2].trim();
            stepsData.push(stepNumber + stepInstruction);
        }

        recipesData.push({
            meal_title: mealTitle,
            ingredients: ingredients.split('\n').map(item => item.trim()),
            instructions: stepsData,
        });

        return recipesData;
    };








    //Saving a recipe
    const saveRecipe = (instructions) => {
        //removed json.stringify
        const blob = new Blob([instructions], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        //Potentially should improve date format
        link.download = "recipe-" + recipeTitle + "-" + Date.now() + ".txt";
        document.body.appendChild(link);
        link.click();
    };


    //Styling for Loading icon
    const loadingIconStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10vh',
        animation: 'spin 2s linear infinite', // Adjust the duration and animation timing as needed
    };

    // CSS keyframes for the spinning animation
    const keyframes = `@keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }`;

    const saveRecipeToDatabase = async (recipeData) => {
        try {
            // Extract recipe name and ingredients
            const { name, ingredients } = recipeData;

            // Convert ingredients to an array if it's a string
            const ingredientsArray = Array.isArray(ingredients)
                ? ingredients
                : ingredients.split(',').map(item => item.trim());

            // Format ingredients array to a comma-separated string without extra spaces
            const formattedIngredients = ingredientsArray.join(', ');

            // Extract instructions from instructionstate and remove recipe name and ingredients
            const instructions = instructionstate
                .replace(`Recipe: ${name}\n\nIngredients:\n${formattedIngredients}\n\n`, '');

            const response = await axios.post('http://localhost:4000/recipes/createAI', {
                userID: userIDstate,
                name: name,
                instructions: instructions,
                ingredients: formattedIngredients,
            });

            console.log('Recipe saved:', response.data);
        } catch (error) {
            console.error('Error saving recipe:', error);
        }
    };












    return (
        <Box sx={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center'
        }}>
            <div>
                <Paper
                    variants="outlined"
                    elevation={3}
                    sx={{ width: '800px' }}
                >
                    <style>{keyframes}</style>
                    <form onSubmit={handleSubmit}>
                        <Typography>Please enter ingredients:</Typography>
                        {ingredients.map((input, index) => (
                            <div key={index}>
                                <Input
                                    type="text"
                                    value={input}
                                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                                    placeholder="Search Ingredients"
                                    variant="Outlined"
                                    sx={{
                                        width: '100%'
                                    }}
                                />
                            </div>
                        ))}
                        <ButtonGroup variant="contained" sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                            <Button type="submit" style={{ backgroundColor: '#d63f2e', color: 'white'}}>
                                <CloudUpload style={{ marginRight: '8px' }} /> Submit
                            </Button>
                            <Button type="button" onClick={handleReset} style={{ backgroundColor: '#d63f2e', color: 'white' }}>
                                <Refresh style={{ marginRight: '8px' }} /> Reset
                            </Button>
                        </ButtonGroup>

                    </form>
                    {/* Display edibility message */}

                    {!isEdible && (
                        <div className="edibility-message">
                            <h3>Sorry! The recipe you generated is not edible. Please try again with
                                different ingredients.
                            </h3>
                        </div>
                    )}
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

                    {/* Uses loading*/}
                    {isLoading && (
                        <div class="loading-icon" style={loadingIconStyle}>
                            <img src={chefloading} alt="chef loading icon" />
                        </div>
                    )}
                    {!isLoading && recipes.length > 0 && (
                        <div>
                            {/* Button for saving to text */}
                            {/*Updated function to use the instructionstate */}
                            <button onClick={() => { saveRecipe(instructionstate) }}> SAVE RECIPE </button>
                            {/* Button for saving to database */}
                            {/* Button for saving to database */}
                            <button onClick={() => {
                                const extractedIngredients = recipes[0].ingredients.join(', ');


                                console.log('Saving to database:', {
                                    userID: userID.userId,
                                    name: recipeTitle,
                                    instructions: instructionstate,
                                    ingredients: extractedIngredients
                                });
                                saveRecipeToDatabase({
                                    name: recipeTitle,
                                    instructions: instructionstate,
                                    ingredients: extractedIngredients
                                });
                            }}>SAVE TO DATABASE</button>


                        </div>
                    )}
                </Paper>
            </div>
        </Box>
    );
};

export default OpenAIComponent;