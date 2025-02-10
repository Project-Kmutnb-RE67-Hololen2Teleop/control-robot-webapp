import React, { useState , useEffect } from 'react';
import { Slider, Typography , Switch } from '@mui/material';
import axios from 'axios';
import Env_Self from '../utils/environ';
let ENV = new Env_Self();
function Control_Manipulator_axis() {
  const [X_axis, setX_axis] = useState(0.2);
  const [Y_axis, setY_axis] = useState(0);
  const [Z_axis, setZ_axis] = useState(0.2);
  const [speed,setspd]= useState(30)
  const [ButtonStatus,SetButtonStatus] = useState(false)

  let MinX = 0.10
  let MaxX = 0.2
  let MinY = -0.2
  let MaxY = 0.2
  let MinZ = 0.10
  let MaxZ = 0.2


  const handleSliderChange = (setter) => (event, newValue) => {
    setter(newValue);
  };
  useEffect(() => {
    console.log('Joint values updated:', { X_axis, Y_axis, Z_axis ,speed,ButtonStatus});
    const postData = async () =>{
      const data ={ "X":X_axis, "Y":Y_axis, "Z":Z_axis ,"speed":speed, "gripper":ButtonStatus}
      try{
        let url = `http://${ENV.IP}:${ENV.PORT_HTTP}/set_Manipulator/setCoordinate`
        await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json', // กำหนด Content-Type
          },
        });
        
      }catch(error){
        console.error("Error")
      }
    };postData();
  }, [X_axis, Y_axis, Z_axis,ButtonStatus]); // Dependency array with X_axis to Rz_axis

  return (
    <>
      <div style={styles.container}>
        <div>
        <Switch
        checked={ButtonStatus}
        onChange={(e) => SetButtonStatus(e.target.checked)}
        color="primary" // ยังใช้ color="primary"
        sx={{
          width: 100,
          height: 50,
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          "& .MuiSwitch-switchBase": {
            left: -3,
            top: -4,
            "&.Mui-checked": {
              transform: "translateX(48px)",
            },
          },
          "& .MuiSwitch-thumb": {
            width: 40,
            height: 40,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            backgroundColor: ButtonStatus ? "rgb(255, 255, 255)" : "rgb(255, 255, 255)", // เปลี่ยนสีของ thumb
          },
          "& .MuiSwitch-track": {
            borderRadius: 100,
            width: "100%",
            height: "100%",
            backgroundColor: `${ButtonStatus ? "rgb(98, 255, 7)" : "rgb(244, 27, 27)"} !important`, // เพิ่ม !important
            opacity: 1,
          },
        }}
      />

        <Typography>{ButtonStatus ? "ON" : "OFF"}</Typography>
        </div>
        <div style={styles.sliderContainer}>
          <Typography gutterBottom>Track Bar-X_axis</Typography>
          <Slider
            value={X_axis}
            onChange={handleSliderChange(setX_axis)}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
            min={MinX} // Minimum value
            max={MaxX} // Maximum value
            step={0.01} 
            
          />
          <Typography>X_axis: {X_axis}</Typography>
        </div>
        <div style={styles.sliderContainer}>
          <Typography gutterBottom>Track Bar-Y_axis</Typography>
          <Slider
            value={Y_axis}
            onChange={handleSliderChange(setY_axis)}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
            min={MinY} // Minimum value
            max={MaxY} // Maximum value
            step={0.01} 
          />
          <Typography>Y_axis: {Y_axis}</Typography>
        </div>
        <div style={styles.sliderContainer}>
          <Typography gutterBottom>Track Bar-Z_axis</Typography>
          <Slider
            value={Z_axis}
            onChange={handleSliderChange(setZ_axis)}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
            min={MinZ} // Minimum value
            max={MaxZ} // Maximum value
            step={0.01} 
          />
          <Typography>Z_axis: {Z_axis}</Typography>
        </div>

        
      </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center horizontally
    justifyContent: 'flex-start', // Align at the top
    height: '100vh', // Full viewport height
    padding: '20px', // Add padding
    boxSizing: 'border-box', // Ensure padding is included in the height calculation
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center horizontally
    marginBottom: '20px', // Add spacing between sliders
    width: '50%', // Allow sliders to take full width of the container

  },
  
};

export default Control_Manipulator_axis;