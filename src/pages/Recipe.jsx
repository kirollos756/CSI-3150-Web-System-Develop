import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails, Button, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);

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

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Accordion expanded={isExpanded} onChange={toggleAccordion}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="content-panel" id="content-header">
        {/* Button to toggle */}
      </AccordionSummary>
      <AccordionDetails>
        {isExpanded && (
          <div>
            <h2>{details.title}</h2>
            <img src={details.image} alt="" />
            <Paper>
              {details.summary && (
                <div>
                  <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                  <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
                </div>
              )}
              {details.extendedIngredients && (
                <ul>
                  {details.extendedIngredients.map((ingredient) => (
                    <ul key={ingredient.id}>{ingredient.original} </ul>
                  ))}
                </ul>
              )}
            </Paper>
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

export default Recipe;
