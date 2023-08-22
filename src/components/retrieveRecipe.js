import React, { useState } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, Delete, Edit, Save } from '@mui/icons-material';


const RetrieveRecipe = ({ userID }) => {
  const [recipeCollection, setRecipeCollection] = useState([]);
  const [expandedRecipeIndex, setExpandedRecipeIndex] = useState(null);
  const [showHeaders, setShowHeaders] = useState(false);
  const [showRecipes, setShowRecipes] = useState(true);
  const [userIDstate, setUserID] = useState(userID.userId);
  const [editModeIndex, setEditModeIndex] = useState(null);


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
  const handleEdit = (index) => {
    setEditModeIndex(index === editModeIndex ? null : index);
  };



  const handleSave = async (recipeId, index) => {
    const updatedRecipe = recipeCollection[index];

    try {
      await axios.put(`http://localhost:4000/recipes/update/${recipeId}`, updatedRecipe);
      setEditModeIndex(null);
      fetchRecipesByUserID(userIDstate);
    } catch (error) {
      console.log('Error updating recipe:', error);
    }
  };


  const handleDelete = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:4000/recipes/delete/${recipeId}`);
      fetchRecipesByUserID(userIDstate);
    } catch (error) {
      console.log('Error deleting recipe:', error);
    }
  };

  const handleCancelEdit = (index) => {
    setEditModeIndex(null);
    // Refresh the recipe data by fetching again
    fetchRecipesByUserID(userIDstate);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRecipes = [...recipeCollection];
    updatedRecipes[index][field] = value;
    setRecipeCollection(updatedRecipes);
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
                <TableCell>Action</TableCell>
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
                    
                      {editModeIndex === index ? (
                        <textarea
                          value={recipe.ingredients}
                          onChange={(e) => handleInputChange(index, 'ingredients', e.target.value)}
                          style={{ width: '100%', height: '100px' }} // Adjust the height as needed
                        />
                      ) : (
                        <p>{recipe.ingredients}</p>
                      )}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {expandedRecipeIndex === index && (
                    <div>
                      
                      {editModeIndex === index ? (
                        <textarea
                          value={recipe.instructions}
                          onChange={(e) => handleInputChange(index, 'instructions', e.target.value)}
                          style={{ width: '100%', height: '100px' }} // Adjust the height as needed
                        />
                      ) : (
                        <p>{recipe.instructions}</p>
                      )}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {expandedRecipeIndex === index && (
                    <div>
                      {editModeIndex === index ? (
                        <div>
                          <Button
                            onClick={() => handleSave(recipe._id, index)}
                            startIcon={<Save />}
                            sx={{ color: 'green' }}
                          >
                            Save
                          </Button>
                          <Button onClick={() => handleCancelEdit(index)}>Cancel</Button>
                        </div>
                      ) : (
                        <Button onClick={() => handleEdit(index)} startIcon={<Edit />}>
                          Edit
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDelete(recipe._id)}
                        startIcon={<Delete />}
                        sx={{ color: 'red' }}
                      >
                        Delete
                      </Button>
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