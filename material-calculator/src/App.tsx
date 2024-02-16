import { Container, Paper, styled, Grid } from '@mui/material';
import React, { useState } from 'react';
import { GridDigitButton } from './GridDigitButton';
import { GridOperationButton } from './GridOperationButton';


const PreviousEntryContainer = styled("div") (({theme}) => ({
  width: "100%",
  height: "3em",
  textAlign: "right",
  padding: theme.spacing(2),
  paddingRight: "2em",
  marginBottom: theme.spacing(0),
  fontFamily: "monospace",
  fontSize: "1em",
  overflow: "hidden",
  color: "#767676"
}));

const OutputContainer = styled("div") (({theme}) =>({
  width: "100%",
  height: "2em",
  textAlign: "right",
  marginTop: theme.spacing(0),
  padding: theme.spacing(2),
  fontFamily: "monospace",
  fontSize: "4em",
  overflow: "hidden"
}));

const CalculatorBase = styled(Paper)(( {theme}) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  borderRadius: 15,
}));


function App() {

  const [currentValue, setCurrentValue] = useState("0");
  const [operation, setOperation] = useState("");
  const [currentString, setCurrentString] = useState("");
  const [overwrite, setOverwrite] = useState(true);
  const [previousValue, setPreviousValue] = useState("");
  
  const selectOperation = (operation: string) => {
    setPreviousValue(currentValue);
    setOperation(operation);
    setCurrentString(`${currentValue}` + " " + operation + " ");
    setOverwrite(true);
  }

  const setDigit = (digit: string) => {
    if(digit === "."){
      if(currentValue.includes(".")) return;
      if(overwrite){
        setCurrentValue("0");
        setCurrentString("");
      }
    }
    if(currentValue[0] === "0" && digit === "0") return;
    if (overwrite && digit != "."){
      setCurrentValue(digit);
    }else{
      setCurrentValue(`${currentValue}`+digit);
      
    }
    if (overwrite && currentString.charAt(currentString.length - 1) === "="){
      setCurrentString("");
    }else if (currentValue === "0"){
      setCurrentString(`${currentString}`+"0"+digit);
    }else{
      setCurrentString(`${currentString}`+digit);
    }
    
    
    setOverwrite(false);
  }

  const calculate = () => {
    if (!previousValue || !currentValue) return currentValue;
    let curr = parseFloat(currentValue);
    let prev = parseFloat(previousValue);
    let result;

    switch(operation){
      case "+": {
        result = prev + curr;
        break;
      }
      case "-": {
        result = prev - curr;
        break;
      }
      case "÷": {
        result = prev / curr;
        break;
      }
      case "x": {
        result = prev * curr;
        break;
      }
    }
    return result;

  }

  const equals = () => {
    if (currentString.charAt(currentString.length - 1) === "=") return;
    const val = calculate();
    setCurrentValue(`${val}`);
    setCurrentString(`${currentString}` + " " + "=");
    setOverwrite(true);
    setPreviousValue(currentValue);
  }
  

  

  const clear = () => {
    setOverwrite(true);
    setCurrentValue("0");
    setOperation("");
    setCurrentString("");
    setPreviousValue("");
  }



  return (
    <Container maxWidth="sm">
      <CalculatorBase elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PreviousEntryContainer>{currentString}</PreviousEntryContainer>
            <OutputContainer>{currentValue}</OutputContainer>
          </Grid>
          <Grid item container columnSpacing={2}>
            <GridOperationButton operation={"AC"} selectOperation={clear} selectedOperation={"true"}/>
            <GridOperationButton operation={"±"} selectOperation={selectOperation} selectedOperation={"true"}/>
            <GridOperationButton operation={"%"} selectOperation={selectOperation} selectedOperation={"true"}/>
            <GridOperationButton operation={"÷"} selectOperation={selectOperation} selectedOperation={"true"}/>
          </Grid>
          <Grid item container columnSpacing={2}>
            <GridDigitButton digit={"7"} enterDigit={setDigit} />
            <GridDigitButton digit={"8"} enterDigit={setDigit} />
            <GridDigitButton digit={"9"} enterDigit={setDigit} />
            <GridOperationButton operation={"x"} selectOperation={selectOperation} selectedOperation={"true"}/>
          </Grid>
          <Grid item container columnSpacing={2}>
            <GridDigitButton digit={"4"} enterDigit={setDigit} />
            <GridDigitButton digit={"5"} enterDigit={setDigit} />
            <GridDigitButton digit={"6"} enterDigit={setDigit} />
            <GridOperationButton operation={"-"} selectOperation={selectOperation} selectedOperation={"true"}/>
          </Grid>
          <Grid item container columnSpacing={2}>
            <GridDigitButton digit={"1"} enterDigit={setDigit} />
            <GridDigitButton digit={"2"} enterDigit={setDigit} />
            <GridDigitButton digit={"3"} enterDigit={setDigit} />
            <GridOperationButton operation={"+"} selectOperation={selectOperation} selectedOperation={"true"}/>
          </Grid>
          <Grid item container columnSpacing={2}>
            <GridDigitButton digit={"0"} enterDigit={setDigit} xs={6}/>
            <GridDigitButton digit={"."} enterDigit={setDigit} />
            <GridOperationButton operation={"="} selectOperation={equals} selectedOperation={"true"}/>
          </Grid>
        </Grid>
        </CalculatorBase>  
    </Container>
      
  );
}

export default App;
