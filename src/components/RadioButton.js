import React, { Component }  from 'react';
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

const RadioButton = ({ options, selectedOption, onChange }) => {
const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    // Perform specific functionality based on the selected value
    if (selectedValue === 'option1') {
      // Perform action for option 1
      console.log('Option 1 selected');
    } else if (selectedValue === 'option2') {
      // Perform action for option 2
      console.log('Option 2 selected');
    }
    // Update the selected option in the parent component
    onChange(event);
  };


  return (
    <RadioButtonContainer>
      {options.map((option) => (
        <Label key={option.value}>
          <input
            type="radio"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleOptionChange}
          />
          {option.label}
        </Label>
      ))}
    </RadioButtonContainer>
  );
};

const RadioButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  margin-right: 10px;
`;

export default RadioButton;