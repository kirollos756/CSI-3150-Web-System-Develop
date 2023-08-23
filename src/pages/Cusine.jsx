import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Grid, Paper, Container, Button } from "@mui/material";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const [showGrid, setShowGrid] = useState(true); // State to toggle grid visibility
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
      <Button
        onClick={() => setShowGrid(!showGrid)} // Toggle grid visibility
        variant="outlined"
        sx={{ marginBottom: "20px" }}
      >
       Compact/expand View
      </Button>
      {showGrid && ( // Render grid only if showGrid is true
        <Grid container spacing={2}>
          {cuisine.map((item) => {
            return (
              <Grid item xs={4} key={item.id}>
                <Paper
                  variant="outlined"
                  sx={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <Link to={"/recipe/" + item.id}>
                    <img src={item.image} alt="" />
                    <h4>{item.title}</h4>
                  </Link>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
}

export default Cuisine;
