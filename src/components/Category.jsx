import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
// import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { List , IconButton, Box } from "@mui/material";

function Category() {
  return (
    <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
    <List>
      <IconButton href="/cusine/Italian" sx={iconButtonStyles}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </IconButton>
      <IconButton href="/cusine/American" sx={iconButtonStyles}>
        <FaHamburger />
        <h4>American</h4>
      </IconButton>
      <IconButton href="/cusine/Thai" sx={iconButtonStyles}>
        <GiNoodles />
        <h4>Thai</h4>
      </IconButton>
      <IconButton href="/cusine/Japanese" sx={iconButtonStyles}>
        <GiChopsticks />
        <h4>Japanese</h4>
      </IconButton>
    </List>
    </Box>
  );
}
const iconButtonStyles = {
  "&:hover": {
    // Set your custom hover styles here
    backgroundColor: "#3ea7bb",
    // Other styling properties
  },
};
// const List = styled.div`
//   display: flex;
//   justify-content: center;
//   margin: 2rem 0rem;
// `;

// const SLink = styled(NavLink)`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   border-radius: 50%;
//   margin-right: 2rem;
//   text-decoration: none;
//   background-image: linear-gradient(35deg, #494949, #313131);
//   width: 6rem;
//   height: 6rem;
//   cursor: pointer;
//   tranform: scale(0.8);

//   h4 {
//     color: white;
//     font-size: 0.8rem;
//   }
//   svg {
//     color: white;
//     font-size: 1.5rem;
//   }
//   &.active {
//     background: linear-gradient(to right, #f27121 ,#e94057);
//   }
//   svg{
//     color: white;
//   }
//   h4{
//     color: white;
//   }
// `;
export default Category;
