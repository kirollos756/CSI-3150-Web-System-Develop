import React, { useEffect, useState } from "react";
// import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

import { Grid , Card, Paper, Box, Container } from "@mui/material";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
    );
    const recipes = await data.json();
    setCuisine(recipes.results);
  };
  useEffect(() => {
    getCuisine(params.type);
    console.log(params.type);
  }, [params.type]);

  return (
    <Container>
      <Grid container spacing={2}>
      {cuisine.map((item) => {
        return (
          
          <Grid item xs={4}>
          <Paper variant="outlined" key={item.id} sx={{  display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
            <Link to={"/recipe/" + item.id}>
            <img src={item.image} alt="" />
            <h4>{item.title}</h4>
            </Link>
          </Paper>
          </Grid>
         
          
        );
      })}
      </Grid>
    </Container>
  );
}
// const Grid = styled(motion.div)`
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
export default Cuisine;
