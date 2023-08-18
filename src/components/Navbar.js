import React from "react";
// import {
//   Nav,
//   NavLink,
//   Bars,
//   NavMenu
// } from "./NavbarElement";
import { AppBar, Toolbar, Link, Typography } from '@mui/material';

const Navigation = () => {
  return (
    <>
      <AppBar color="primary" >
        {/* <Bars /> */}
        {/* <Typography > Savory Recipes </Typography> */}
        <Toolbar variant="regular" component="div" sx={{ alignContent: 'center', justifyContent: 'center'}} >
          <Typography  align="center" sx={{ marginLeft: '5%'}}>
          
          <Link to="/home" underline="none" color="inherit" sx={{ m: '10px'}}>
            Home
          </Link>
          
          <Link to="/about" underline="none" color="inherit" sx={{ m: '10px'}}>
            About
          </Link>
          <Link to="/events" underline="none" color="inherit" sx={{ m: '10px'}}>
            Events
          </Link>
          <Link to="/news" underline="none" color="inherit" sx={{ m: '10px'}}>
            News
          </Link>
          <Link to="/team" underline="none" color="inherit" sx={{ m: '10px'}}>
            Teams
          </Link>
          </Typography>
        </Toolbar>
       
      </AppBar>
    </>
  );
};

export default Navigation;
