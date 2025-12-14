
import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Singup from "./Pages/Singup"
import Dashbord from "./Pages/Dashbord"
import NavBar from "./Component/NavBar"
import MaintenanceTask from "./Component/DashbordComponent/MaintenanceTask"
import { useEffect, useState } from "react"
import LandingPage from "./Pages/LandingPage"
import CoachDetailsPage from "./Pages/CoachDetailsPage"
import DepartmentDashboard from "./Pages/DepartmentDashboard"

function App() {

  //!_______________________________This is the Login_____________________________________
  const [isloggin, setIsloggin] = useState(false)


  //!________________________________This is the Coach Profile_________________________________
  const [AddCoach, setAddCoach] = useState([]);
  function AddCoachData(coachData) {
    setAddCoach((pre) => [...pre, coachData])
  }

  // FETCH DATA FROM MONGODB WHEN PAGE LOADS
  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/v1/allcoach");
        const data = await res.json();

        if (res.ok) {
          setAddCoach(data.coaches); // <-- STORE DB DATA HERE
        } else {
          console.log("Error:", data.message);
        }
      } catch (err) {
        console.log("Fetch Error:", err);
      }
    };

    fetchCoaches();
  }, []);

  const [TotalCoach, setTotalCoach] = useState(0)
  const [ActiveCoach, setActiveCoach] = useState(0)
  const [MaintenanceDueCoach, setMaintenanceDueCoach] = useState(0)
  const [OutOfSericeCoach, setOutOfSericeCoach] = useState(0)
  function CountCoachData(CoachLength) {
    // setTotalCoach( CoachLength)
    // console.log(CoachLength[1].status)
    let active = 0;
    let undermaintenance = 0;
    let out = 0;
    CoachLength.map((coach) => {
      if (coach.status === "active")
        active++
      else if (coach.status === "under maintenance")
        undermaintenance++
      else
        out++
    });
    setActiveCoach(active)
    setMaintenanceDueCoach(undermaintenance)
    setOutOfSericeCoach(out)
    setTotalCoach(CoachLength.length)
  }
  useEffect(() => {
    CountCoachData(AddCoach);
  }, [AddCoach]);


  //!_______________________________________This is the Maintenance Task_____________________________

  const [AddMaintenace, setAddMaintenace] = useState([]);
  function AddMaintenaceData(MaintenanceData) {
    setAddMaintenace((pre) => [...pre, MaintenanceData])
  }
    // FETCH DATA FROM MONGODB WHEN PAGE LOADS
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/v1/alltaskdata");
        const data = await res.json();

        if (res.ok) {
          setAddMaintenace(data.tasks); // <-- STORE DB DATA HERE
        } else {
          console.log("Error:", data.message);
        }
      } catch (err) {
        console.log("Fetch Error:", err);
      }
    };

    fetchTask();
  }, []);


  //!_______________________________________Coach updata____________________________________________
  function UpdateCoachData(id, updatedData) {
    setAddCoach((prev) => {
      const newArr = [...prev];
      newArr[id] = updatedData;
      return newArr;
    });
  }


  return (
    <div>
      <NavBar isloggin={isloggin} setIsloggin={setIsloggin} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home TotalCoach={TotalCoach} ActiveCoach={ActiveCoach} MaintenanceDueCoach={MaintenanceDueCoach} OutOfSericeCoach={OutOfSericeCoach} />} />
        <Route path="/maintenance" element={<MaintenanceTask AddMaintenaceData={AddMaintenaceData} AddMaintenace={AddMaintenace} />} />
        <Route path="/login" element={<Login setIsloggin={setIsloggin} />} />
        <Route path="/singup" element={<Singup setIsloggin={setIsloggin} />} />
        <Route path="/coachprofile" element={<Dashbord AddCoachData={AddCoachData} AddCoach={AddCoach} CountCoachData={CountCoachData} />} />
        <Route path="/coach/:id" element={<CoachDetailsPage AddCoach={AddCoach} UpdateCoachData={UpdateCoachData} />} />
        <Route path="/departments" element={<DepartmentDashboard AddMaintenance={AddMaintenace} />}
        />
      </Routes>




    </div>
  )
}

export default App
