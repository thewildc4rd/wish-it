import React from 'react';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { Grid } from '@mui/material';

const DefaultImage = ({ width, height }) => {
  return (
    <Grid
      container
      className='bg-[#DFDFDF] rounded-lg'
      justifyContent='center'
      alignContent='center'
      height={height}
      width={width}
    >
      <PhotoSizeSelectActualIcon sx={{ color: '#CFCFCF', height: '40%', width: '40%' }} />
    </Grid>
  );
};

export default DefaultImage;
