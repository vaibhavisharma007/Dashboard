import React from 'react'
import Header from 'components/Header';

import BreakDownChart from 'components/BreakDownChart';
import {Box} from '@mui/material';
const Breakdown = () => {
  return (
    <Box m="1.5rem 2.5rem" >
      <Header title="Breakdown" subtitle="Breakdown of Sales by category" />
      <Box mt="40px " height="75vh" >
        <BreakDownChart/>
      </Box>
    </Box>
  )
}

export default Breakdown