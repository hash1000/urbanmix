import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Form from './Form';
import { resetFormData } from '@/redux/FormDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';

const steps = [
  {
    label: 'Building ID',
    Step: 'Step1',
    heading: 'Enter Your Project Details',
  },
  {
    label: 'Unit Mix',
    Step: 'Step2',
    heading: 'Upload Your Unit Mix',
  },
  {
    label: 'Floor Plans',
    Step: 'Step3',
    heading: 'Upload Floor Plans ',
  },
];

export default function ProductForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [completed, setCompleted] = useState(false);
  const dispatch = useDispatch();
  const formData = useSelector((state: any) => state.formData);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const hadleForm = () => {
    dispatch(resetFormData());
    setActiveStep(0);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    dispatch(resetFormData());
    setActiveStep(0);
  };

  const handleSubmit = async () => {
    const {
      address,
      downloadURL,
      name,
      numOfBuildings,
      numOfFloors,
      numOfUnits,
      type,
      uploadImages,
      yearBuilt,
    } = formData;

    if (
      [
        address,
        downloadURL,
        name,
        numOfBuildings,
        numOfFloors,
        numOfUnits,
        type,
        uploadImages,
        yearBuilt,
      ].every((value) => value !== null && value !== 0)
    ) {
      await axios.post(
        'https://urbanmix-77b32-default-rtdb.firebaseio.com/User.json',
        {
          address,
          downloadURL,
          name,
          numOfBuildings,
          numOfFloors,
          numOfUnits,
          type,
          uploadImages,
          yearBuilt,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      dispatch(resetFormData());
      setCompleted(true);
    } else {
      alert(
        'Please fill in all the required fields and ensure that numeric fields are not zero.'
      );
    }
  };

  React.useEffect(() => {
    if (activeStep === steps.length - 3) {
      formData.name &&
      formData.address &&
      formData.type &&
      formData.numOfBuildings &&
      formData.yearBuilt
        ? setButtonDisable(false)
        : setButtonDisable(true);
    }
    if (activeStep === steps.length - 2) {
      // setButtonDisable(true);
      formData.numOfUnits && formData.numOfFloors && formData.downloadURL
        ? setButtonDisable(false)
        : setButtonDisable(true);
    }

    if (activeStep === steps.length - 1) {
      formData.uploadImages &&
      formData.name &&
      formData.address &&
      formData.type &&
      formData.numOfBuildings &&
      formData.yearBuilt &&
      formData.numOfUnits &&
      formData.numOfFloors &&
      formData.downloadURL
        ? setButtonDisable(false)
        : setButtonDisable(true);
    }
  }, [formData]);

  return (
    <Box sx={{ padding: { md: '0.5rem 1rem', lg: '1rem 2rem' } }}>
      <Typography
        sx={{
          fontWeight: '600',
          fontSize: '25px',
          color: '#fff',
        }}
      >
        Add New Project
      </Typography>
      <Stepper
        activeStep={activeStep}
        sx={{
          height: '80%',
          margin: { md: '0.5rem 0rem', lg: '3rem 0rem' },
          '& .css-8t49rw-MuiStepConnector-line': {
            minHeight: { md: '50px', lg: '100px' },
            color: '#54EAFF',
            margin: { md: '3px 10px', lg: '5px 20px' },
            borderLeft: '3px solid #54EAFF',
          },
          '& .css-aefvjd-MuiStepLabel-root': {
            padding: '5px 10px',
          },
        }}
        orientation="vertical"
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              sx={{
                fontSize: '14px',
                paddingLeft: { md: '5px', lg: '7px' },

                '& .css-rycdat-MuiSvgIcon-root-MuiStepIcon-root.Mui-active': {
                  color: '#54EAFF',
                  border: 'none',
                  borderRadius: 'none',
                  '& .css-1br8stu-MuiStepIcon-text': {
                    fill: 'black',
                  },
                  '& .css-1v6gnqe-MuiStepLabel-root .css-bzdzhw-MuiTypography-root':
                    {
                      color: '#54EAFF !important',
                    },
                },
                '& .css-jctmo4-MuiStepLabel-label.Mui-active': {
                  color: '#54EAFF !important',
                  fontSize: '12px',
                  fontWeight: '700',
                },
                '& .css-rycdat-MuiSvgIcon-root-MuiStepIcon-root': {
                  border: '3px solid #54EAFF',
                  borderRadius: '50%',
                  width: { md: '34.18px', lg: '54.18px' },
                  height: { md: '34.18px', lg: '54.18px' },
                },
                '& .css-rycdat-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed':
                  {
                    color: '#54EAFF !important',
                    border: 'none',
                  },
                '& .css-jctmo4-MuiStepLabel-label.Mui-completed': {
                  color: '#54EAFF !important',
                },
              }}
            ></StepLabel>
            <Box
              sx={{
                color: '#54EAFF !important',
                fontSize: { md: '10px', lg: '1.12rem' },
                p: 0,
                m: 0,
              }}
            >
              {step.label}
            </Box>
            <StepContent
              sx={{
                position: 'absolute',
                top: { md: '50px', lg: '115px' },
                left: { md: '60px', lg: '125px' },
                backgroundColor: 'black',

                width: '100%',
                border: 'none',
              }}
            >
              <Box
                sx={{
                  width: { md: '450px', lg: '528px' },
                  height: { md: '450px', lg: '528px' },
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0px 10px 44px 10px',
                  gap: '8px',
                }}
              >
                <Typography
                  sx={{
                    color: 'rgba(84, 234, 255, 1)',
                    textAlign: 'center',
                    fontSize: { md: '1rem', lg: '1.12rem' },
                    fontWeight: 700,
                  }}
                >
                  {step.Step}
                </Typography>
                <Typography
                  sx={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: { md: '1rem', lg: '1.5rem' },
                    fontWeight: 700,
                    lineHeight: { md: '1rem', lg: '1.5rem' },
                  }}
                >
                  {step.heading}
                </Typography>

                <Form val={index} completed={completed} />
                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      width: {
                        lg: '392px',
                        md: index === steps.length - 1 ? '385px' : '285px',
                      },
                      marginLeft: {
                        md: index === 2 ? 'none' : '4.5rem',
                        lg: index === 2 ? 'none' : '56px',
                      },
                      paddingLeft: index === steps.length - 1 ? '8px' : 0,
                      // border:'4px solid red',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '24px',
                    }}
                  >
                    <Button
                      onClick={handleBack}
                      variant="contained"
                      sx={{
                        flex: 1,
                        textAlign: 'center',
                        position: 'relative',
                        marginLeft: index === steps.length - 1 ? '8px' : 0,
                        width: index === steps.length - 1 ? '180px' : 'none',
                        backgroundColor: '#f528a9 !important',
                        border: 0,
                        display: index === 0 ? 'none' : 'block',
                        padding: index === 1 ? '8px 20px' : 'none',
                        height: { md: '35px', lg: '42px' },
                        fontSize: { md: '12px', xl: '16px' },
                        fontWeight: 600,
                        '&:focus': {
                          border: '0 !important',
                          outline: '0 !important',
                        },
                      }}
                    >
                      <ArrowBackIcon />
                      Previous Step
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={buttonDisable}
                      onClick={
                        index === steps.length - 1 ? hadleForm : handleNext
                      }
                      size="small"
                      sx={{
                        flex: index === 0 ? 'none' : 1,
                        marginLeft: index === 0 ? { lg: '0rem' } : 0,
                        backgroundColor: buttonDisable
                          ? '#a87896 !important'
                          : '#f528a9 !important',
                        border: 0,
                        display: index === steps.length - 1 ? 'none' : 'block',
                        textAlign: 'center',
                        paddingX: index === 0 ? '20px' : 0,
                        height: { md: '35px', lg: '42px' },
                        fontSize: { md: '12px', xl: '16px' },
                        fontWeight: 600,
                        '&:focus': {
                          border: '0 !important',
                          outline: '0 !important',
                        },
                      }}
                    >
                      Next Step
                      <ArrowForwardIcon />
                    </Button>

                    <Button
                      onClick={handleSubmit}
                      disabled={buttonDisable}
                      variant="contained"
                      size="small"
                      type="submit"
                      sx={{
                        flex: 1,
                        backgroundColor: buttonDisable
                          ? '#a87896 !important'
                          : '#f528a9 !important',
                        border: 0,

                        display: index !== steps.length - 1 ? 'none' : 'block',
                        height: { md: '35px', lg: '42px' },
                        fontSize: { md: '12px', xl: '16px' },

                        fontWeight: 600,
                        '&:focus': {
                          border: '0 !important',
                          outline: '0 !important',
                        },
                      }}
                    >
                      Finish
                      <ArrowForwardIcon />
                    </Button>
                  </Box>
                </Box>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button
            onClick={handleReset}
            variant="contained"
            size="medium"
            sx={{
              mt: 1,
              mr: 1,
              backgroundColor: '#f528a9 !important',
              border: 0,
              '&:focus': {
                border: '0 !important',
                outline: '0 !important',
              },
            }}
          >
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
