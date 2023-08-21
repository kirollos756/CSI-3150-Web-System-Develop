import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const RetrieveRecipe = ({ userID }) => {
  const [recipeCollection, setRecipeCollection] = useState([]);
  const [expandedRecipeIndex, setExpandedRecipeIndex] = useState(null);
  const [showHeaders, setShowHeaders] = useState(false);
  const [showRecipes, setShowRecipes] = useState(true);
  const [userIDstate, setUserID] = useState(userID.userId);
  console.log('userIDstate', userIDstate);
  console.log('userIDobject', userID)

  const fetchRecipesByUserID = async () => { // No need to pass userIDstate here
    try {
      console.log('Fetching recipes with userID:', userID);

      const response = await axios.get('http://localhost:4000/recipes/read', {
        params: {
          userID: userIDstate // Pass the userID as a query parameter
        }
      });
      const lst = response.data;
      console.log('Received recipes:', lst);
      setRecipeCollection(lst);
      setShowHeaders(true); // Show headers after retrieving recipes
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
        {showRecipes ? ( // Show "Retrieve Recipes" button if showRecipes is true
          <Button
            variant="contained"
            onClick={() => fetchRecipesByUserID(userIDstate)}
            sx={{
              backgroundColor: '#f1b341',
              color: 'white',
              '&:hover': {
                backgroundColor: '#15466b',
              },
            }}
          >
            Retrieve Recipes
          </Button>
        ) : ( // Show "Hide Recipes" button if showRecipes is false
          <Button
            variant="contained"
            onClick={() => {
              setShowHeaders(false);
              setShowRecipes(true);
              setRecipeCollection([]); // Clear recipe data when hiding
            }}
            sx={{
              backgroundColor: '#f1b341',
              color: 'white',
              '&:hover': {
                backgroundColor: '#15466b',
              },
            }}
          >
            Hide Recipes
          </Button>
        )}
      </div>
      <TableContainer component={Paper}>
        <Table>
          {showHeaders && ( // Conditionally render headers if showHeaders is true
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
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
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
