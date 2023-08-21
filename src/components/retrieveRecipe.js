import React, { useState } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

const RetrieveRecipe = ({ userID }) => {
  const [recipeCollection, setRecipeCollection] = useState([]);
  const [expandedRecipeIndex, setExpandedRecipeIndex] = useState(null);
  const [showHeaders, setShowHeaders] = useState(false);
  const [showRecipes, setShowRecipes] = useState(true);
  const [userIDstate, setUserID] = useState(userID.userId);

  const fetchRecipesByUserID = async () => {
    try {
      const response = await axios.get('http://localhost:4000/recipes/read', {
        params: {
          userID: userIDstate
        }
      });
      const lst = response.data;
      setRecipeCollection(lst);
      setShowHeaders(true);
    } catch (e) {
      console.log('Error fetching recipes:', e);
    }
  };

  const toggleRecipeExpansion = (index) => {
    setExpandedRecipeIndex(expandedRecipeIndex === index ? null : index);
  };

  return (
    <div className="wrapper-recipes">
      <div className="form-group">
        {showRecipes ? (
          <Button
            variant="contained"
            onClick={() => {
              fetchRecipesByUserID(userIDstate);
              setShowRecipes(false); // Toggle showRecipes when retrieving recipes
            }}
            sx={{
              backgroundColor: '#f1b341',
              color: 'white',
              '&:hover': {
                backgroundColor: '#15466b',
              },
            }}
            startIcon={<KeyboardArrowDown />}
          >
            Retrieve Recipes
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              setShowHeaders(false);
              setShowRecipes(true);
              setRecipeCollection([]);
            }}
            sx={{
              backgroundColor: '#f1b341',
              color: 'white',
              '&:hover': {
                backgroundColor: '#15466b',
              },
            }}
            startIcon={<KeyboardArrowUp />}
          >
            Hide Recipes
          </Button>
        )}
      </div>
      <TableContainer component={Paper}>
        <Table>
          {showHeaders && (
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Ingredients</TableCell>
                <TableCell>Instructions</TableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {recipeCollection.map((recipe, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Button
                    onClick={() => toggleRecipeExpansion(index)}
                    startIcon={
                      expandedRecipeIndex === index ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )
                    }
                  >
                    {recipe.name}
                  </Button>
                </TableCell>
                <TableCell>
                  {expandedRecipeIndex === index && (
                    <div>
                      <p>{recipe.ingredients}</p>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {expandedRecipeIndex === index && (
                    <div>
                      <p>{recipe.instructions}</p>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RetrieveRecipe;
