import React from 'react';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { Grid } from '@mui/material';

const DefaultImage = ({ width, height, className, onClick }) => {
  return (
    <Grid
      container
      className={'bg-[#DFDFDF] rounded-lg ' + className}
      justifyContent='center'
      alignContent='center'
      height={height}
      width={width}
      onClick={onClick}
    >
      <PhotoSizeSelectActualIcon sx={{ color: '#CFCFCF', height: '40%', width: '40%' }} />
    </Grid>
  );
};

export default DefaultImage;
