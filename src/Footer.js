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
      sx={{  display: 'flex', alignContent: 'center', justifyContent: 'center', marginBottom: '20px'}}
      backgroundColor="primary.main"
    >
      <Typography color={"white"} fontSize="30px" >
        SAVORY RECIPES: YOUR INGREDIENTS, OUR RECIPES
      </Typography>
      
        <Grid container direction="row"  >
          <List >
            <ListItemText>About Us</ListItemText>
            <ListItem href="#">Aim</ListItem>
            <ListItem href="#">Vision</ListItem>
            <ListItem href="#">Testimonials</ListItem>
          </List>
          <List >
            <ListItemText>Services</ListItemText>
            <ListItem href="#">Menus</ListItem>
            <ListItem href="#">Meals</ListItem>
            <ListItem href="#">Prices</ListItem>
            <ListItem href="#">Discounts</ListItem>
          </List>
          <List >
            <ListItemText>Contact Us</ListItemText>
            <ListItem href="#">UNew York, NY 10012, US</ListItem>
            <ListItem href="#">info@example.com</ListItem>
            <ListItem href="#"> + 01 234 567 88</ListItem>
            <ListItem href="#"> + 01 234 567 89</ListItem>
          </List>
          <List >
            <ListItemText>Social Media</ListItemText>
            <ListItem href="#">
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
            </ListItem>
            <ListItem href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>Youtube</span>
              </i>
            </ListItem>
          </List>
        </Grid>
      <div className="text-center p-4" style={{ backgroundColor: "darkgrey" }}>
        © 2023 Copyright:
      </div>
      
      </Box>
      
  );
};
export default Footer;
