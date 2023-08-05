import React, { useState } from 'react';
import axios from 'axios';
import { State } from '@splidejs/splide';
import chefloading from '../images/chef.png';



const OpenAIComponent = () => {
    //state initialization and defines the "setting function" aka the function to set/update the state
    //from my understanding useState('') declares the state and sets it to an empty string
    const [ingredients, setIngredients] = useState('');
    // useState([]) declares the state and sets it to an empty array
    const [recipes, setRecipes] = useState([]);
    const [instructionstate, setInstructions] = useState('');
    const [recipeTitle, setRecipeTitle] = useState('');

    const handleInputChange = (e) => {
        setIngredients(e.target.value);
    };

    const handleSubmit = async (e) => {
        //enable view of loading icon here

        e.preventDefault();

        const prompt = `Please provide a recipe using the following ingredients only: ${ingredients} 
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
            const messageContent = response.data.choices[0].message.content;
            console.log(messageContent);
            //sets "Instructions" state to the response from Open AI API
            setInstructions(messageContent);

            const recipesData = parseInstructions(messageContent);


            setRecipes(recipesData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const parseInstructions = (instructions) => {



        const recipeRegex = /Recipe: (.*?)\n\nIngredients:\n([\s\S]+)\n\nInstructions:\n([\s\S]+)/;
        const stepRegex = /\d+\.\s(.+)/g;

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
            const stepInstruction = stepMatch[1].trim();
            stepsData.push(stepInstruction);
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
    return (
        <div>
             <style>{keyframes}</style>
            <form onSubmit={handleSubmit}>
                <p>Please enter ingredients seperated by commas</p>
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
                        <p key={i}>{i + 1}.{instruction}</p>
                    ))}

                </div>

            ))}
            <div class="loading-icon" style={loadingIconStyle}>
                <img src={chefloading} alt="chef loading icon" />
            </div>
            <div>
                {/* Button for saving to text */}
                {/*Updated function to use the instructionstate */}
                <button onClick={() => { saveRecipe(instructionstate) }}> SAVE RECIPE </button>
            </div>
        </div>
    );
};

export default OpenAIComponent;