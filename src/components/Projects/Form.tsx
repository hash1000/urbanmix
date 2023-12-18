import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Paper,
  Typography,
} from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import uploadsvg from '../../assets/upload-file-svgrepo-com.svg';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../src/shared/data/firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import buildingImage from '@/assets/IMG_1611 1.svg';
import benzeneImage from '@/assets/Vector 30 (Stroke).svg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import {
  updateFormData,
  setDownloadURL,
  resetFormData,
  setuploadImages,
} from '@/redux/FormDataSlice';
import axios from 'axios';
import { styled } from '@mui/system';

const style = {
  borderRadius: '14px',
};

const Label = styled('label')({
  fontSize: '1rem',
  fontWeight: 600,
  '@media (max-width: 1024px)': {
    fontSize: '0.7rem',
  },
});
const Form = (props: any) => {
  const { val, completed } = props;
  const dispatch = useDispatch();
  const formData = useSelector((state: any) => state.formData);
  const floors = useSelector((state: any) => state.formData.numOfFloors);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const addImageUrl = (url: string) => {
    setImageUrls((prevImageUrls) => [...prevImageUrls, url]);
    dispatch(setuploadImages([...imageUrls, url]));
  };

  const handleUploadImage = (file: any) => {
    const storageRef = ref(storage, `/Images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        // Handle upload error here
        console.error('Error uploading file:', error);
      },
      () => {
        // Upload completed, get download URL
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            // Add the download URL to the state
            addImageUrl(url);
          })
          .catch((error) => {
            // Handle the error here
            console.error('Error getting download URL:', error);
          });
      }
    );
  };
  const handleChange1 = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      handleUpload1(selectedFile);
    }
  };

  const handleUpload1 = (file: any) => {
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', () => {
      // Upload completed, get download URL
      getDownloadURL(uploadTask.snapshot.ref)
        .then((url) => {
          dispatch(setDownloadURL(url));
        })
        .catch((error) => {
          // Handle the error here
          console.error('Error getting download URL:', error);
        });
    });
  };

  const handleChange = (
    field: string,
    value: string | number | File | null
  ) => {
    // Dispatch action to update the formData state
    dispatch(updateFormData({ [field]: value }));

    // Update localStorage
    const oldData = window.localStorage.getItem('formData');
    if (oldData) {
      let parseOldData = JSON.parse(oldData);
      let newDataToSave = { ...parseOldData, [field]: value };
      window.localStorage.setItem('formData', JSON.stringify(newDataToSave));
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FormControl
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { md: '2px', lg: '8px' },
            '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused': {
              borderColor: 'transparent',
            },
            '& .css-jn943e-MuiFormControl-root .MuiInputBase-root.MuiOutlinedInput-root':
              {
                borderRadius: '14px',
              },
            '& .MuiInputBase-root.MuiOutlinedInput-root': {
              backgroundColor: 'white',
              color: 'black',
              // borderRadius: { md: '6px', lg: '14px' },
            },
            '& .css-ky9mq7-MuiFormControl-root-MuiTextField-root .MuiInputBase-root:not(.MuiInputBase-sizeSmall) input':
              {
                height: '1rem',
              },
            '& .css-s96m2q-MuiFormControl-root-MuiTextField-root .MuiInputBase-root:not(.MuiInputBase-sizeSmall) input':
              {
                height: '1rem',
              },

            '& .css-wzvlvl-MuiFormControl-root-MuiTextField-root .MuiInputBase-root:not(.MuiInputBase-sizeSmall) input':
              {
                height: '1rem',
              },
            '& .css-1clc0ni-MuiFormControl-root .MuiInputBase-root.MuiOutlinedInput-root':
              {
                width: '100px',
              },
            '& .css-18szbt0-MuiButtonBase-root-MuiButton-root:hover': {
              background: 'rgba(0,0,0,0.6)',
            },
            '&[type=number]': {
              '-moz-appearance': 'textfield',
            },
            '&::-webkit-outer-spin-button': {
              '-webkit-appearance': 'none',
              margin: 0,
            },
            '&::-webkit-inner-spin-button': {
              '-webkit-appearance': 'none',
              margin: 0,
            },
          }}
        >
          {val === 0 ? (
            <>
              <Label>Name</Label>
              <TextField
                id="name"
                variant="outlined"
                required
                sx={{
                  '& .MuiInputBase-root.MuiOutlinedInput-root': {
                    width: { md: '18rem', lg: '24rem' },
                    height: { md: '23px', lg: '40px' },
                    '&:hover': {
                      borderColor: 'transparent',
                    },
                    '&.Mui-focused': {
                      borderColor: 'transparent',
                      outline: 'none',
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                      border: 'none !important',
                    },
                  },
                }}
                placeholder="James"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />

              <Label>Address</Label>

              <TextField
                id="address"
                variant="outlined"
                required
                sx={{
                  style,
                  '& .MuiInputBase-root.MuiOutlinedInput-root': {
                    width: { md: '18rem', lg: '24rem' },
                    height: { md: '20px', lg: '40px' },
                    '.MuiOutlinedInput-notchedOutline': {
                      border: 'none !important',
                    },
                  },
                }}
                placeholder="35 East 76th Street"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />

              <Label>Type</Label>
              <TextField
                id="type"
                required
                variant="outlined"
                placeholder="Residential"
                sx={{
                  ...style,
                  '& .MuiInputBase-root.MuiOutlinedInput-root': {
                    width: { md: '18rem', lg: '24rem' },
                    height: { md: '20px', lg: '40px' },
                    '.MuiOutlinedInput-notchedOutline': {
                      border: 'none !important',
                    },
                  },
                }}
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
              />

              <Label>Number of Buildings</Label>
              <TextField
                id="numOfBuildings"
                variant="outlined"
                type="number"
                required
                sx={{
                  ...style,
                  '& .MuiInputBase-root.MuiOutlinedInput-root': {
                    width: { md: '18rem', lg: '24rem' },
                    height: { md: '20px', lg: '40px' },
                    '.MuiOutlinedInput-notchedOutline': {
                      border: 'none !important',
                    },
                  },
                  '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button':
                    {
                      '-webkit-appearance': 'none',
                      margin: 0,
                    },
                }}
                onChange={(e) => handleChange('numOfBuildings', e.target.value)}
                value={
                  formData.numOfBuildings === 0 ? '' : formData.numOfBuildings
                }
                InputProps={{ inputProps: {} }}
              />

              <Label>Year Built</Label>
              <TextField
                id="yearBuilt"
                variant="outlined"
                type="number"
                required
                sx={{
                  ...style,
                  '& .MuiInputBase-root.MuiOutlinedInput-root': {
                    width: { md: '18rem', lg: '24rem' },
                    height: { md: '20px', lg: '40px' },
                  },

                  '.MuiOutlinedInput-notchedOutline': {
                    border: 'none !important',
                  },
                  '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button':
                    {
                      '-webkit-appearance': 'none',
                      margin: 0,
                    },
                }}
                onChange={(e) => handleChange('yearBuilt', e.target.value)}
                value={formData.yearBuilt === 0 ? '' : formData.yearBuilt}
                InputProps={{ inputProps: {} }}
              />
            </>
          ) : null}

          {val === 1 ? (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: { md: '30px', xl: '60px' },
                  marginBottom: { md: '10px', lg: '30px' },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { md: '2px', lg: '8px' },
                  }}
                >
                  <Label>Number of Units</Label>

                  <TextField
                    id="numOfUnits"
                    variant="outlined"
                    type="number"
                    required
                    sx={{
                      ...style,
                      '& .MuiInputBase-root.MuiOutlinedInput-root': {
                        width: { md: '18rem', lg: '24rem' },
                        height: { md: '20px', lg: '40px' },
                        '.MuiOutlinedInput-notchedOutline': {
                          border: 'none !important',
                        },
                      },
                      '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button':
                        {
                          '-webkit-appearance': 'none',
                          margin: 0,
                        },
                    }}
                    onChange={(e) =>
                      handleChange(
                        'numOfUnits',
                        e.target.value === ''
                          ? null
                          : parseInt(e.target.value, 10)
                      )
                    }
                    value={formData.numOfUnits === 0 ? '' : formData.numOfUnits}
                    InputProps={{ inputProps: {} }}
                  />

                  <Label>Number of Floors</Label>

                  <TextField
                    id="numOfFloors"
                    variant="outlined"
                    type="number"
                    required
                    sx={{
                      ...style,
                      '& .MuiInputBase-root.MuiOutlinedInput-root': {
                        width: { md: '18rem', lg: '24rem' },
                        height: { md: '20px', lg: '40px' },
                        '.MuiOutlinedInput-notchedOutline': {
                          border: 'none !important',
                        },
                      },
                      '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button':
                        {
                          '-webkit-appearance': 'none',
                          margin: 0,
                        },
                    }}
                    onChange={(e) =>
                      handleChange('numOfFloors', e.target.value)
                    }
                    value={
                      formData.numOfFloors === 0 ? '' : formData.numOfFloors
                    }
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <Label>Upload Unit Mix</Label>

                  <TextField
                    id="unitMix"
                    variant="outlined"
                    fullWidth
                    required
                    type="file"
                    sx={{
                      '& .MuiInputBase-root.MuiOutlinedInput-root': {
                        width: { md: '18rem', lg: '24rem' },
                        '.MuiOutlinedInput-notchedOutline': {
                          border: 'none !important',
                        },
                      },
                    }}
                    onChange={handleChange1}
                  />
                </Box>
              </Box>
            </>
          ) : null}
          {val === 2 && (
            <>
              <Box
                sx={{
                  minHeight: { lg: completed ? '' : '300px' },
                  maxHeight: { md: '180px' },
                  overflowY: 'auto',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '5rem',
                  }}
                >
                  <div>
                    <FormLabel
                      sx={{
                        color: 'white',
                        fontSize: '12px',
                        padding: '10px 0px 0px 20px',
                      }}
                    >
                      Type
                    </FormLabel>
                    <FormLabel
                      sx={{
                        color: 'white',
                        fontSize: '12px',
                        // position: 'sticky',
                        padding: {
                          lg: '10px 0px 0px 110px',
                          md: '10px 0px 0px 80px',
                        },
                      }}
                    >
                      # of units
                    </FormLabel>
                    <FormLabel
                      sx={{
                        color: 'white',
                        fontSize: '12px',
                        // position: 'sticky',
                        padding: {
                          lg: '10px 0px 0px 140px',
                          md: '10px 0px 0px 120px',
                        },
                      }}
                    >
                      Upload file
                    </FormLabel>
                  </div>
                </Box>

                <Box
                  style={{
                    display: 'flex',
                    overflow: 'auto',
                    justifyContent: 'center',
                    maxHeight: '300px',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <div
                    style={{ flex: 0.3, marginTop: floors > 6 ? '15rem' : 0 }}
                  >
                    {Array.from({ length: floors }).map((_, index) => (
                      <TextField
                        sx={{
                          width: '83%',
                          height: '46px',
                          '.MuiOutlinedInput-notchedOutline': {
                            border: 'none !important',
                          },
                        }}
                        key={index}
                        id={`type-${index}`}
                        variant="outlined"
                        required
                        className="mt-4"
                        placeholder={
                          [
                            'A',
                            'B',
                            'C',
                            'D',
                            'E',
                            'F',
                            'G',
                            'H',
                            'I',
                            'J',
                            'K',
                            'L',
                            'O',
                          ][index]
                        }
                        value={formData[`type-${index}`]}
                        onChange={(e) =>
                          handleChange(`type-${index}`, e.target.value)
                        }
                      />
                    ))}
                  </div>
                  <div
                    style={{ flex: 0.3, marginTop: floors > 6 ? '15rem' : 0 }}
                  >
                    {Array.from({ length: floors }).map((_, index) => (
                      <TextField
                        sx={{
                          width: '96%',
                          borderRadius: '14px',
                          marginTop: '5px',
                          height: '46px',
                        }}
                        id="numOfUnits"
                        key={index}
                        variant="outlined"
                        className="mt-4"
                        type="number"
                        value={
                          formData.numOfUnits === 0 ? '' : formData.numOfUnits
                        }
                        onChange={(e) =>
                          handleChange('numOfUnits', e.target.value)
                        }
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      flex: 0.3,
                      marginLeft: '3rem',
                      marginTop: floors > 6 ? '14.6rem' : 0,
                      padding: '0px 14px',
                    }}
                  >
                    {Array.from({ length: floors }).map((_, index) => (
                      <>
                        <TextField
                          id="file"
                          type="file"
                          key={index}
                          onChange={handleUploadImage}
                          style={{ display: 'none' }}
                          inputProps={{
                            accept: 'image/png, image/gif,image/jpeg',
                          }}
                        />
                        <label htmlFor="file">
                          <Button
                            variant="outlined"
                            sx={{
                              width: 'max-content',
                              marginTop: '1rem',
                              padding: '20px 1.3rem',
                              background: 'rgba(204, 49, 131, 1)',
                              '& .css-1rnaokx-MuiButtonBase-root-MuiButton-root:hover':
                                {
                                  background: 'rgba(0,0,0,0.6) !important',
                                },
                            }}
                            component="span"
                          >
                            <img
                              src={uploadsvg}
                              alt="Upload Icon"
                              style={{ height: '25px', marginRight: '8px' }}
                            />
                          </Button>
                        </label>
                      </>
                    ))}
                  </div>
                </Box>
              </Box>
            </>
          )}

          {completed && (
            <Paper
              square
              elevation={0}
              sx={{
                zIndex: 9999,
                marginTop: { lg: '-102px', md: '-91px' },
                width: '485px',
                height: '32rem',
                backgroundColor: 'black',
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: { lg: '26px', md: '16px' },
                    fontWeight: 'bold',
                    marginLeft: { lg: '9.5rem', md: '11.5rem' },
                    color: 'white',
                  }}
                >
                  You&apos;re all done
                </Typography>
                <img
                  src={buildingImage}
                  style={{ width: '132px', marginLeft: '175px' }}
                />
                <img
                  src={benzeneImage}
                  style={{
                    width: '92px',
                    marginLeft: '178px',
                    zIndex: 9999,
                    marginTop: '-165px',
                  }}
                />

                <Typography
                  sx={{
                    fontSize: { lg: '22px', md: '14px' },
                    fontWeight: 'bold',
                    marginLeft: { lg: '7.2rem', md: '9.8rem' },
                    marginTop: '5rem',
                    color: '#f528a9',
                  }}
                >
                  Now Let Us Do Our Magic...
                </Typography>
                <Typography
                  sx={{
                    fontSize: { lg: '22px', md: '14px' },
                    fontWeight: 'bold',
                    marginLeft: { lg: '7.2rem', md: '10rem' },
                    marginTop: { lg: '1rem', md: '0.5rem' },
                    color: '#f528a9',
                  }}
                >
                  We'll notify you by email
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '7',
                    width: { lg: '70%', md: '56%' },
                    marginTop: { lg: '1rem', md: '0.5rem' },
                    marginLeft: { lg: '4.5rem', md: '6rem' },
                  }}
                >
                  <Button
                    onClick={() => (window.location.href = '/projects')}
                    variant="contained"
                    size="small"
                    sx={{
                      mt: { lg: 1, md: 0 },
                      ml: { lg: 2, md: 4 },
                      fontSize: { lg: '', md: '10px' },
                      backgroundColor: '#f528a9 !important',
                      border: 0,
                      '&:focus': {
                        border: '0 !important',
                        outline: '0 !important',
                      },
                    }}
                  >
                    <ArrowBackIcon />
                    Go to Project
                  </Button>
                  <Button
                    onClick={() => (window.location.href = '/projects')}
                    variant="contained"
                    size="small"
                    sx={{
                      mt: { lg: 1, md: 0 },
                      ml: { lg: 2, md: 1 },
                      fontSize: { lg: '', md: '10px' },
                      backgroundColor: '#f528a9 !important',
                      border: 0,
                      '&:focus': {
                        border: '0 !important',
                        outline: '0 !important',
                      },
                    }}
                  >
                    Go to Portfolio
                    <ArrowForwardIcon />
                  </Button>
                </Box>
              </Box>
            </Paper>
          )}
        </FormControl>
      </Box>

      <Box sx={{ marginBottom: val === 2 ? '20px' : 0 }}></Box>
    </>
  );
};

export default Form;
