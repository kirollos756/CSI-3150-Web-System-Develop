import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Grid, Card, Paper, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Import the ExpandMoreIcon

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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />} // Use the ExpandMoreIcon as the expand icon
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> Results</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            {searchedRecipes.map((item) => (
              <Paper key={item.id}>
                <Card variant='outlined'>
                  <Link to={"/recipe/" + item.id}>
                    <img src={item.image} alt="" />
                    <h4>{item.title}</h4>
                  </Link>
                </Card>
              </Paper>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}

export default Searched;
