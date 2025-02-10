import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const BasicTextField = ({TransferIP}) => {
  // Initialize value as an empty string
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const Click_handling = () => {
    // Your logic for when the button is clicked
    console.log(value);
    TransferIP(value)
  };

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' , marginTop:"10px"}}>
      <TextField 
        label="IP"
        variant="outlined"
        value={value}
        onChange={handleChange}
        placeholder="Type something..."
      />
      <Button variant="contained" onClick={Click_handling}>
        Change / Connect
      </Button>
    </div>
  );
};

export default BasicTextField ;