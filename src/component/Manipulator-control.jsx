import React, { useState , useEffect } from 'react';
import { Slider, Typography , Switch } from '@mui/material';
import axios from 'axios';
import Env_Self from '../utils/environ';
let ENV = new Env_Self();
function Control_Manipulator() {
  const [J1, setJ1] = useState(0);
  const [J2, setJ2] = useState(0);
  const [J3, setJ3] = useState(0);
  const [J4, setJ4] = useState(0);
  const [J5, setJ5] = useState(0);
  const [J6, setJ6] = useState(43);
  const [speed,setspd]= useState(30)
  const [ButtonStatus,SetButtonStatus] = useState(false)
  const handleSliderChange = (setter) => (event, newValue) => {
    setter(newValue);
  };
  useEffect(() => {
    console.log('Joint values updated:', { J1, J2, J3, J4, J5, J6 ,speed,ButtonStatus});
    const postData = async () =>{
      const data ={ "j1":J1, "j2":J2, "j3":J3, "j4":J4, "j5":J5, "j6":J6 ,"speed":speed, "gripper":ButtonStatus}
      try{
        let url = `http://${ENV.IP}:${ENV.PORT_HTTP}/set_Manipulator/setMovementJoint`
        await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json', // กำหนด Content-Type
          },
        });
        
      }catch(error){
        console.error("Error")
      }
    };postData();
  }, [J1, J2, J3, J4, J5, J6,ButtonStatus]); // Dependency array with J1 to J6

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
          <Typography gutterBottom>Track Bar-J1</Typography>
          <Slider
            value={J1}
            onChange={handleSliderChange(setJ1)}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
            min={-170} // Minimum value
            max={170} // Maximum value
          />
          <Typography>J1: {J1}</Typography>
        </div>
        <div style={styles.sliderContainer}>
          <Typography gutterBottom>Track Bar-J2</Typography>
          <Slider
            value={J2}
            onChange={handleSliderChange(setJ2)}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
            min={-170} // Minimum value
            max={170} // Maximum value
          />
          <Typography>J2: {J2}</Typography>
        </div>
        <div style={styles.sliderContainer}>
          <Typography gutterBottom>Track Bar-J3</Typography>
          <Slider
            value={J3}
            onChange={handleSliderChange(setJ3)}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
            min={-170} // Minimum value
            max={170} // Maximum value
          />
          <Typography>J3: {J3}</Typography>
        </div>
        <div style={styles.sliderContainer}>
          <Typography gutterBottom>Track Bar-J4</Typography>
          <Slider
            value={J4}
            onChange={handleSliderChange(setJ4)}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
            min={-170} // Minimum value
            max={170} // Maximum value
          />
          <Typography>J4: {J4}</Typography>
        </div>
        <div style={styles.sliderContainer}>
          <Typography gutterBottom>Track Bar-J5</Typography>
          <Slider
            value={J5}
            onChange={handleSliderChange(setJ5)}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
            min={-170} // Minimum value
            max={170} // Maximum value
          />
          <Typography>J5: {J5}</Typography>
        </div>
        <div style={styles.sliderContainer}>
          <Typography gutterBottom>Track Bar-J6</Typography>
          <Slider
            value={J6}
            onChange={handleSliderChange(setJ6)}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
            min={-180} // Minimum value
            max={180} // Maximum value
          />
          <Typography>J6: {J6}</Typography>
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

export default Control_Manipulator;