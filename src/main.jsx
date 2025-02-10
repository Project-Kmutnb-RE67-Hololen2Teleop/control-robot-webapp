import { StrictMode ,useState ,useEffect} from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter ,Route , Routes , useNavigate , useLocation } from 'react-router-dom'
import Control_Manipulator from './component/Manipulator-control'
import MobileRobot_control from './component/Mobile_robot_control'
import Control_Manipulator_axis from './component/Manipulator_Axis'
import "./main.css"

let HeaderNavigate = () => {
  
  let nav = useNavigate() ;
  let location = useLocation();
  let [currentPage , UpdatePage] = useState(location.pathname);
  useEffect(()=>{
    UpdatePage(location.pathname);
  },[location]);
  return (
    <>
    <header>
      <div>
        <button onClick={() => nav("/Manipulator")}>
          <h3>Manipulator</h3>
        </button>
        <button onClick={() => nav("/Manipulator/axis")}>
          <h3>Manipulator-axis</h3>
        </button>
        <button onClick={() => nav("/Mobile_control")}>
          <h3>Mobile-control</h3>
        </button>
        <h3> currentPage : {currentPage}</h3>
      </div>
    </header>
    </>
  );
};





createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>  
      <HeaderNavigate/>   
      <Routes>
      <Route path="/" element={<Control_Manipulator />} />  
        <Route path="/Manipulator" element={<Control_Manipulator />} />   
        <Route path="/Mobile_control" element={<MobileRobot_control/>} />
        <Route path="/Manipulator/axis" element={<Control_Manipulator_axis/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
