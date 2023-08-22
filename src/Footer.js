import React from "react";
// import {
//   Box,
//   Container,
//   Row,
//   Column,
//   FooterLink,
//   Heading,
// } from "./FooterStyles";
import { Box, Container, TableRow, Grid, Link, ListItem, List, ListItemText, Typography } from '@mui/material';



const Footer = () => {
  return (
    <Box
      sx={{position: 'fixed', bottom:0}}
      backgroundColor="#1e507b"
      width='100%'
      marginLeft={'-0px'}
    >
      <Box sx={{  display: 'flex', alignContent: 'center', justifyContent: 'center'}} backgroundColor="#1e507b" >
      <Typography color={"white"} fontSize="30px" fontFamily='Georgia' fontWeight='400' >
        ChefBot - Your Ingredients, Our Recipes
      </Typography>
      </Box>
      <Typography fontFamily='Georgia'>
      <Box  backgroundColor="#1e507b">
        <Grid container direction="row" fontFamily={'Georgia'} fontWeight='400' sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center'}} >
          <List sx={{padding:'5px'}}>
            <ListItemText>About Us</ListItemText>
            {/* <ListItem href="#">Aim</ListItem>
            <ListItem href="#">Vision</ListItem> */}
            
          </List>
          <List sx={{padding:'5px'}}>
            <ListItemText>Services</ListItemText>
            {/* <ListItem href="#">Menus</ListItem>
            <ListItem href="#">Meals</ListItem>
            <ListItem href="#">Prices</ListItem> */}
            
          </List>
          <List sx={{padding:'5px'}}>
            <ListItemText>Contact Us</ListItemText>
            {/* <ListItem href="#">New York, NY 10012, US</ListItem>
            <ListItem href="#">info@example.com</ListItem>
            <ListItem href="#"> + 01 234 567 88</ListItem> */}
            
          </List>
          <List sx={{padding:'5px'}}>
            <ListItemText>Social Media</ListItemText>
            {/* <ListItem href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>Facebook</span>
              </i>
            </ListItem>
            <ListItem href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>Instagram</span>
              </i>
            </ListItem>
            <ListItem href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>Twitter</span>
              </i>
            </ListItem> */}
            
          </List>
        </Grid>
      </Box>
      <Box sx={{  display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
      <div className="text-center p-4" style={{ backgroundColor: "#1e507b" }}>
        © 2023 Copyright
      </div>
      </Box>
      </Typography>
    </Box>
      
  );
};
export default Footer;
