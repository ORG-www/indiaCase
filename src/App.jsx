import { Routes, Route } from "react-router-dom";
// import './App.css'
import Survey from './slide';
import Data from "./slide";

const App = () => {
  return (
   
      <Routes>
        <Route exact path="/" element={<Survey />}></Route>
        {/* <Route exact path="/" element={<Data />}></Route> */}
      </Routes>
  );
}

export default App;
