import Pages from "./pages/Pages";
import Category from "./components/Category";
import { BrowserRouter } from "react-router-dom";
import Search from "./components/Search";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import React from "react";
import { useState, useEffect } from "react";
import MealList from "./pages/MealList";
import Navbar from "./components/Navbar";
import RatingStars from "./components/RatingStars";
import { GlobalStyles } from "./components/Global-Style";
import Footer from "./Footer";
import Register from "./Register";

function App() {
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);
  function getMealData() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=7e80980d0a5c4c80849eb1047ec05424&timeFrame=day&targetCalories=${calories}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data);
      })
      .catch(() => {
        console.log("error");
      });
  }

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

      <BrowserRouter>
        <Register />
        <Navbar />

        <Nav>
          <GiKnifeFork />
          <Logo to={"/"}>SAVORY_RECIPES</Logo>
        </Nav>
        <Search />

        <Category />

        <Pages />
        <RatingStars />
        <GlobalStyles />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: 400;
  font-family: "Lobster Two" cursive;
`;

const Nav = styled.div`
  padding: 4rem 0rem;
  display: absolute;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 2.5rem;
  }
`;

export default App;
