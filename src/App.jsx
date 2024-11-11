import { Routes, Route } from "react-router-dom";
// import './App.css'
import Survey from './slide';
import Introduction from "./intro";
import Conclusion from "./conclusion";

const App = () => {
  return (
   
      <Routes>
        <Route exact path="/" element={<Introduction/>}></Route>
        <Route path="/survey" element={<Survey />} />
        <Route path="/conclusion" element={<Conclusion />} />
      </Routes>
  );
}

export default App;
