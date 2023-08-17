import { useEffect, useState } from "react";
// import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Button , Box , Paper } from "@mui/material";

import React from "react";
import { FaPaperPlane } from "react-icons/fa";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    setDetails(detailData);
    console.log(detailData);
  };
 
  useEffect(() => {
    fetchDetails();
  }, [params.name]);

 

  return (
    
    <Box>
 
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Paper>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>

        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <ul key={ingredient.id}>{ingredient.original} </ul>
            ))}
          </ul>
          
        )}
      </Paper>
    </Box>
  );
}

// const DetailWrapper = styled.div`
//   margin-top: 10rem;
//   margin-bottom: 5rem;
//   display: flex;
//   .active {
//     background-image: linear-gradient(35deg, #494949, #313131);
//     color: white;
//   }

//   h2 {
//     margin-bottom: 2rem;
//   }

//   li {
//     font-size: 1.2rem;
//     line-height: 2.5rem;
//   }
//   ul {
//     margin-top: 2rem;
//   }
// `;

// const Button = styled.button`
//   padding: 1rem 2rem;
//   color: #313131;
//   background: white;
//   border: 2px solid black;
//   margin-right: 2rem;
//   font-weight: 600;
//   font-size: larger;
//   margin: 0 0 0 10px;
//   background-image: linear-gradient(
//     to right,
//     #e4afcb 0%,
//     #b8cbb8 0%,
//     #b8cbb8 0%,
//     #e2c58b 30%,
//     #c2ce9c 64%,
//     #7edbdc 100%
//   );
//   justify-content: space-around;
//   box-shadow: 0px 5px 20px rgb(63, 60, 60);
//   border-radius: 10px;
//   margin: 20px;
//   align-items: center;
//   min-width: 40%;
// `;

// const Info = styled.div`
//   background-image: linear-gradient(
//     to right,
//     #e4afcb 0%,
//     #b8cbb8 0%,
//     #b8cbb8 0%,
//     #e2c58b 30%,
//     #c2ce9c 64%,
//     #7edbdc 100%
//   );
//   justify-content: space-around;
//   box-shadow: 0px 5px 20px rgb(63, 60, 60);
//   border-radius: 10px;
//   margin: 20px;
//   align-items: center;
//   min-width: 40%;
// `;
export default Recipe;
