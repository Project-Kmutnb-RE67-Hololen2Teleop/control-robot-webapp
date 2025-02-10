import React, { useState, useEffect } from 'react';
import BasicTextField from './imput';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import Grid from '@mui/material/Grid2';
import Env_Self from '../utils/environ';

const ENV = new Env_Self();

const MobileRobot_control = () => {
  const [IP, setIP] = useState(ENV.IP);
  const [Port, setPort] = useState(ENV.PORT_HTTP);
  const [endPoint, setEndPoint] = useState(`http://${ENV.IP}:${ENV.PORT_HTTP}/Speed`);

  // Update the endpoint whenever IP or Port changes
  useEffect(() => {
    setEndPoint(`http://${IP}:${Port}/Speed`);
  }, [IP, Port]);

  // Function to handle the IP update
  const ipNet = (value) => {
    setIP(value);
  };

  const sendCommand = async (command) => {
    console.log(command)
    if (!endPoint) {
      console.error('Endpoint is not ready yet.');
      return;
    }

    try {
      await axios.post(endPoint, command, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error sending command:', error);
    }
  };

  // Define button actions to send commands directly
  const Click_TEST = () => {
    sendCommand({
      linear: [0, 0, 0],
      angular: [0, 0, 0.3],
    });
  };

  const Click_Front = () => {
    sendCommand({
      linear: [0.3, 0, 0],
      angular: [0, 0, 0],
    });
  };

  const Click_Back = () => {
    sendCommand({
      linear: [-0.3, 0, 0],
      angular: [0, 0, 0],
    });
  };

  const Click_ForceStop = () => {
    sendCommand({
      linear: [0, 0, 0],
      angular: [0, 0, 0],
    });
  };

  const Click_Left = () => {
    sendCommand({
      linear: [0, 0.3, 0],
      angular: [0, 0, 0],
    });
  };

  const Click_Right = () => {
    sendCommand({
      linear: [0, -0.3, 0],
      angular: [0, 0, 0],
    });
  };

  return (
    <>
      <div>
        <BasicTextField TransferIP={ipNet} />
      </div>

      <div>
        <h4>Current Endpoint: {endPoint}</h4>
      </div>

      <div>
        <Stack spacing={5} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div>
            <Button variant="contained" onClick={Click_TEST}>
              TEST
            </Button>
          </div>
          <div>
            <Button variant="contained" onClick={Click_Front}>
              Front
            </Button>
          </div>
          <div>
            <Grid container spacing={2} columns={16}>
              <Button variant="contained" onClick={Click_Left}>
                Left
              </Button>
              <Button variant="contained" onClick={Click_ForceStop}>
                Break
              </Button>
              <Button variant="contained" onClick={Click_Right}>
                Right
              </Button>
            </Grid>
          </div>
          <div>
            <Button variant="contained" onClick={Click_Back}>
              Back
            </Button>
          </div>
        </Stack>
      </div>
    </>
  );
};

export default MobileRobot_control;