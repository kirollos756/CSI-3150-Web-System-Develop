import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import styled from "styled-components";
import { Link } from "react-router-dom";

import { Grid , Card, Paper, Box } from "@mui/material";
function Searched() {
  const [searchedRecipes, setSearchRecipes] = useState([]);
  let params = useParams();

  const getSearched = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    );
    const recipes = await data.json();
    setSearchRecipes(recipes.results);
  };

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  return (
    <Grid container sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
      {searchedRecipes.map((item) => {
        return (
          <Paper>
          <Card variant='outlined' key={item.id}>
            <Link to={"/recipe/" + item.id}>
              <img src={item.image} alt="" />
              <h4>{item.title}</h4>
            </Link>
          </Card>
          </Paper>
        );
      })}
    </Grid>
  );
}
// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
//   grid-gap: 3rem;
// `;

// const Card = styled.div`
//   img {
//     width: 100%;
//     border-radius: 2rem;
//   }
//   a {
//     text-decoration: none;
//   }
//   h4 {
//     text-align: center;
//     padding: 1rem;
//   }
// `;
export default Searched;
