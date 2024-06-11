import { useState, useEffect } from 'react';
import MUIStepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import './Stepper.css';



import {Register} from "../../Pages/Register/Register";
import Workshop from "../../Pages/Workshop/Workshop";
import Classification from "../../Pages/Classification/Classification";
import Legalization from "../../Pages/Legalization/Legalization"
import {useUpdateUi} from "../../Hocks/useUpdateUi"
const stepperComponents = {
  'Pre-inscripcion': <Register/>,
  'Taller y evaluacion': <Workshop/>,
  'Clasificación': <Classification/>,
  'Legalizacion de practicas': <Legalization/>,
  'Seguimiento': <Register/>
}
export function Stepper() {
  const {data} = useUpdateUi("stepper");
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);
  const isLastStep = activeStep === data.length - 1;

  return (
    <div className='box-stepper'>
      <MUIStepper activeStep={activeStep}>
        {data.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </MUIStepper>
      
      <div className='stepper-buttons'>
        <button 
          color="inherit" 
          disabled={activeStep === 0} 
          onClick={handleBack} 
          className='stepper-button'
        >
          <FaArrowLeft />
        </button>
        <button 
          onClick={handleNext} 
          disabled={isLastStep} 
          className='stepper-button'
        >
          <FaArrowRight />
        </button>
      </div>

      <div className='practice-content'>{stepperComponents[data[activeStep]]}</div>
    </div>
  );
}
