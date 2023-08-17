//import React, { useState } from 'react';
import RadioButton from './components/RadioButton';
import Pages from "./pages/Pages";
import Category from "./components/Category";
import { BrowserRouter } from "react-router-dom";
import Search from "./components/Search";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Router } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import React from "react";
import { useState, useEffect } from "react";
import MealList from "./pages/MealList";
import Navbar from "./components/Navbar";
import RatingStars from "./components/RatingStars";
import { GlobalStyles } from "./components/Global-Style";
import Footer from "./Footer";
import Register from "./components/Register";
import SignIn from './components/SignIn';
import AuthPage from './AuthPage';
import axios from 'axios';
import OpenAIComp from "./components/OpenAI";
import CreateRecipe from './components/createRecipe';
import RetrieveRecipe from './components/retrieveRecipe';
import UpdateRecipe from './components/updateRecipe';
import DeleteRecipe from './components/deleteRecipe';

// const mongoose = require("mongoose");

function App() {

  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);
  const [selectedOption, setSelectedOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };



  function getMealData() {
    if (selectedOption === 'option1') {
      handleOpenAIRequest();
    } else if (selectedOption === 'option2') {
      // Fetch data from Recipes API using the search query
      fetch('https://api.recipes.com/your-recipes-endpoint', {
        method: 'POST',
        // Set appropriate headers and body for the Recipes API request
        // Include the searchQuery value in the request
        // ...
      })
        .then((response) => response.json())
        .then((data) => {
          setMealData(data);
        })
        .catch((error) => {
          console.log('Error fetching data from Recipes API:', error);
        });
    }
  }

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


  const handleOpenAIRequest = async () => {
    const prompt = `Please provide a recipe using the following ingredients that will be listed below. 
      Format the response in JSON with the meal name and cooking instructions. Your response should be as follows: 
      {
        "meal_name": "meal name",
        "cooking_instructions": [
          "instruction line 1...",
          "instruction line 2...",
          "However many lines are needed to finish the recipe..."
        ]
      }
      The ingredients are: ${searchQuery}`;

    //Amelio Mansour's API key and org ID
    const apiKey = process.env.REACT_APP_OPEN_API_KEY;
    const orgId = process.env.REACT_APP_OPEN_API_ORGID;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo-0613',
          messages: [
            { role: 'system', content: `You are chefBot you simply do directly as you are told and do not add any notes or extra messages.` },
            { role: 'user', content: prompt },
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

      const recipesData = parseInstructions(messageContent);

      setMealData(recipesData);
    } catch (error) {
      console.error('Error:', error);
    }
  };



  function handleChange(e) {
    setCalories(e.target.value);
  }


  return (
    <div className="App">
      <section className="controls">
        <input
          type="number"
          placeholder="Calories (e.g. 2000)"
          onChange={handleChange}
        />

        <button className="search-button" onClick={getMealData}>
          Get Daily Meal Plan
        </button>

      </section>
      {mealData && <MealList mealData={mealData} />}
      <AuthPage />
      <BrowserRouter>

        <Navbar />

        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to={'/createRecipe'}>
              Create recipe
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to={'/retrieveRecipe'}>
              Retrieve Recipes
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to={'/updateRecipe'}>
              Update Recipes
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to={'/deleteRecipe'}>
              Delete Recipes
            </Link>
          </li>

        </ul>
        <Routes>
          {/* <Route exact path="/" element={<CreateRecipe/>} /> */}
          <Route path="/createRecipe" element={<CreateRecipe />} />
          <Route path="/retrieveRecipe" element={<RetrieveRecipe />} />
          <Route path="/updateRecipe" element={<UpdateRecipe />} />
          <Route path="/deleteRecipe" element={<DeleteRecipe />} />
        </Routes>

        {/* <Nav>
          <GiKnifeFork />
          <Logo to={"/"}>SAVORY_RECIPES</Logo>
        </Nav> */}
        <div className="radio-buttons">
          <RadioButton
            options={[
              { value: 'option1', label: 'ChefBot' },
              { value: 'option2', label: 'Recipie Search' },
            ]}
            selectedOption={selectedOption}
            onChange={handleOptionChange}
          />
        </div>
        <Search
          value={searchQuery}
          onChange={handleSearchQueryChange}
          disabled={!selectedOption} // Disable search input if no option is selected
        />
        {selectedOption === 'option1' ? (
          <OpenAIComp />
        ) : (
          <Category />
        )}
        <Pages />
        <RatingStars />
        <GlobalStyles />
        <Footer />
      </BrowserRouter>
    </div>
  );
}
console.log("started succesfully");
// const Logo = styled(Link)`
//   text-decoration: none;
//   font-size: 1.8rem;
//   font-weight: 400;
//   font-family: "Lobster Two" cursive;
// `;


// const Nav = styled.div`
//   padding: 4rem 0rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   svg {
//     font-size: 2.5rem;
//   }
// `;


// const RadioButtonsContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

export default App;