import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";

const Footer = () => {
  return (
    <Box>
      <h1 style={{ color: "green", textAlign: "center", marginTop: "-5px" }}>
        SAVORY RECIPES: YOUR INGREDIENTS, OUR RECIPES
      </h1>
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="#">Aim</FooterLink>
            <FooterLink href="#">Vision</FooterLink>
            <FooterLink href="#">Testimonials</FooterLink>
          </Column>
          <Column>
            <Heading>Services</Heading>
            <FooterLink href="#">Menus</FooterLink>
            <FooterLink href="#">Meals</FooterLink>
            <FooterLink href="#">Prices</FooterLink>
            <FooterLink href="#">Discounts</FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="#">UNew York, NY 10012, US</FooterLink>
            <FooterLink href="#">info@example.com</FooterLink>
            <FooterLink href="#"> + 01 234 567 88</FooterLink>
            <FooterLink href="#"> + 01 234 567 89</FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>Facebook</span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>Instagram</span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>Twitter</span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>Youtube</span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
      <div className="text-center p-4" style={{ backgroundColor: "darkgrey" }}>
        © 2023 Copyright:
      </div>
    </Box>
  );
};
export default Footer;
