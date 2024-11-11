import {React, useState} from "react";
import "../src/slide.css";
import { MusicPlayer } from "./slide";
import { useNavigate } from "react-router-dom";
import { surveyData, surveyDataHindi, optionsData, optionsDataHindi } from "./data";


const Introduction=()=>{

  const [language, setLanguage] = useState("en");
 
  const navigate = useNavigate(); 

    const handleIntro= async()=>{
      navigate("/survey", {
        state: {
          surveyData: language === "en" ? surveyData : surveyDataHindi,
          optionsData: language === "en" ? optionsData : optionsDataHindi,
        },
      });
    }

    const handleLanguageChange = (e) => {
      setLanguage(e.target.value);
    };
  
  
    const selectedSurveyData = language === "en" ? surveyData : surveyDataHindi;
    const selectedOptionsData = language === "en" ? optionsData : optionsDataHindi;

    return(
        <div className="container">
        <div className="image" role="img" aria-label="Background image"></div>
  
         <MusicPlayer/>
  
        <div className="wrapper">
            <div className="survey-container slide-in-from-bottom-intro">
            <p className="question">Instructions- 
            You will be presented with a series of questions/statements, each followed by a set of answer options.
            Please read each question/statement carefully and select the option that feels most fitting for you. 
            There are no right or wrong answers. Please respond as honestly as you can.(You may play the Piano progression)</p>
            <div className="language-selector">
            <label htmlFor="language-select">Select Language:</label>
            <select
              id="language-select"
              value={language}
              onChange={handleLanguageChange}
              className="translate-dropdown"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>
            <button onClick={handleIntro} className="submit-button">BEGIN</button>
            
          </div>
        </div> 
      </div>
        
    )
}

export default Introduction;
