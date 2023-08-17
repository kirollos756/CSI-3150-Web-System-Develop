import { useState,useEffect } from "react";
// import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import Category from "./Category";
import { Box, FormGroup, Paper, Input, ButtonGroup, Button, Typography } from "@mui/material";


import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";


function Search() {
  
  const [input, setInput] = useState("");
  const navigate = useNavigate();

const [message, setMessage] = useState("");
const commands = [
  {
    command: "reset",
    callback: () => resetTranscript(),
  },
  {
    command: "don't speak",
    callback: () => setMessage("I wasn't talking."),
  },
  {
    command: "Hello",
    callback: () => setMessage("Hi there!"),
  },
];
const {
  transcript,
  interimTranscript,
  finalTranscript,
  resetTranscript,
  listening,
} = useSpeechRecognition({ commands });
 useEffect(() => {
   if (finalTranscript !== "") {
     console.log("Got final result:", finalTranscript);
   }
 }, [interimTranscript, finalTranscript]);
 if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
   return null;
 }

 if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
   console.log(
     "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
   );
 }
 const listenContinuously = () => {
   SpeechRecognition.startListening({
     continuous: true,
     language: "en-GB",
   });
 };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + transcript );


  };

  return (
    <Box
    sx={{
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center'
    }}>
    <FormGroup onSubmit={submitHandler}>
      <div>
        <Box>
        <ButtonGroup size="small" color="secondary" variant="contained" sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
        <Typography sx={{ paddingRight: "5px"}}> {listening ? "Listener On" : "Listener Off"}</Typography>
        <div>
          <Button type="button" onClick={resetTranscript}>
            Reset
          </Button>
          <Button type="button" onClick={listenContinuously}>
            Listen
          </Button>
          <Button type="button" onClick={SpeechRecognition.stopListening}>
            Stop
          </Button>
        </div>
        </ButtonGroup>
        </Box>
      </div>
      <div>
        <Paper
        variants="outlined"
        elevation={3}
        sx={{ width: '800px'}}
        >

        {message}
       
        <FaSearch></FaSearch>
        <Input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          value={transcript}
          placeholder="Search Ingredients"
          variant="Outlined"
          sx={{
            width: '100%'
          }}
        />
        
        </Paper>
        <Category />
      </div>
    </FormGroup>
    </Box>
  );
}

// const FormStyle = styled.form`
//   margin: 0rem 20rem;
//   div {
//     position: relative;
//     width: 100%;
//   }
//   input {
//     border: none;
//     background-image: linear-gradient(35deg, #494949, #313131);
//     font-size: 1.5em;
//     color: white;
//     padding: 1rem 3rem;
//     border: none;
//     border-radius: 1rem;
//     outline: none;
//     width: 100%;
//   }
//   svg {
//     position: absolute;
//     top: 50%;
//     left: 0%;
//     transform: translate(100%, -50%);
//     color: white;
//   }
// `;
export default Search;
