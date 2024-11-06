import React from 'react';
import { useState, useEffect } from "react";
import '../src/slide.css';
import { surveyData, optionsData } from './data';


const Survey = () => {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [city, setCity] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [responses, setResponses] = useState({ city: "", answers: [] });
  const [error, setError] = useState("");
  const [slideClass, setSlideClass] = useState("slide-in");

  const currentQuestion = surveyData[currentQuestionIndex];

  const [percent, updatePercent] = useState(3);


  useEffect(() => {
    if (slideClass === "slide-out") {
      // Reset to "slide-in" once the question index updates
      setSlideClass("slide-in");
    }
  }, [currentQuestionIndex]);


  const ProgressBar = ({
    percent,
    height = '3px',
    // width = '350px',
    radius = '50px',
    // borderColor = '#eee',
    fillColor = 'lime',
    colorShift = false,
    Color ='#140445'
  }) => {
    return (
      <div
        style={{
          height,
          // width,
          borderRadius: radius,
          backgroundColor: Color ,
          // border: `1px solid ${borderColor}`
        }}>
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            borderRadius: 'inherit',
            backgroundColor: fillColor,
            transition: 'all .2s ease',
            [colorShift ? 'filter' : null]: `hue-rotate(-${percent}deg)`
          }}
        />
      </div>
    );
  };



  const citySlide=(id)=>{
    if(id === -3)
     return(
    <>
      <div className="wrap1">
      <div className="options-container">
      <input 
        className="inputbox"
        type="text"
        value={city}
        onChange={e => setCity(e.target.value)}/>
     </div>
      {error && <p className="error-message">{error}</p>}
      </div>
      {/* <button onClick={handlePreviousQuestion} className="submit-button">Back</button> */}
      <button onClick={handleNext} className="submit-button">OK</button>
      </>
    );
  };

  const genderSlide=(id)=>{
    if(id === -2)
      return(
        <>
        <div className="wrap1">
      <div className="options-container">
     {optionsData[0].optionSet5.map((option, index) => (
      <button
        key={`${option.label}-${index}`}
        className={`option-button ${selectedOption === option.text ? "selected" : ""}`}
        onClick={() => handleOptionClick(option.text)}
      >
          <span className="option-label">{option.label}</span>
          <span className="option-text">{option.text}</span>
 
        </button>
      ))} 
      </div>
      {error && <p className="error-message">{error}</p>}
      </div>
      {/* <button onClick={handlePreviousQuestion} className="submit-button">Back</button> */}
      <button onClick={handleNextQuestion} className="submit-button">OK</button>
      </>
    );    
  };

  const ageSlide=(id)=>{
    if(id === -1)
      return(
        <>
        <div className="wrap1">
      <div className="options-container">
     {optionsData[0].optionSet1.map((option, index) => (
      <button
        key={`${option.label}-${index}`}
        className={`option-button ${selectedOption === option.text ? "selected" : ""}`}
        onClick={() => handleOptionClick(option.text)}
      >
          <span className="option-label">{option.label}</span>
          <span className="option-text">{option.text}</span>
 
        </button>
      ))} 
      </div>
      {error && <p className="error-message">{error}</p>}
      </div>
      {/* <button onClick={handlePreviousQuestion} className="submit-button">Back</button> */}
      <button onClick={handleNextQuestion} className="submit-button">OK</button>
      </>
    );    
  };


  const employementSlide=(id)=>{
    if(id === 0)
      return(
        <>
        <div className="wrap1">
      <div className="options-container">
     {optionsData[0].optionSet4.map((option, index) => (
      <button
        key={`${option.label}-${index}`}
        className={`option-button ${selectedOption === option.text ? "selected" : ""}`}
        onClick={() => handleOptionClick(option.text)}
      >
          <span className="option-label">{option.label}</span>
          <span className="option-text">{option.text}</span>
 
        </button>
      ))} 
      </div>
      {error && <p className="error-message">{error}</p>}
      </div>
      {/* <button onClick={handlePreviousQuestion} className="submit-button">Back</button> */}
      <button onClick={handleNextQuestion} className="submit-button">OK</button>
      </>
    );    
  };

  const questionSlide1=(id)=>{
    if(id > 0 && id <= 50)
      return(
        <>
        <div className="wrap1">
      <div className="options-container">
     {optionsData[0].optionSet2.map((option, index) => (
      <button
        key={`${option.label}-${index}`}
        className={`option-button ${selectedOption === option.text ? "selected" : ""}`}
        onClick={() => handleOptionClick(option.text)}
      >
          <span className="option-label">{option.label}</span>
          <span className="option-text">{option.text}</span>
 
        </button>
      ))} 
      </div>
      {error && <p className="error-message">{error}</p>}
      </div>
      {/* <button onClick={handlePreviousQuestion} className="submit-button">Back</button> */}
      <button onClick={handleNextQuestion} className="submit-button">OK</button>
      </>
    );    
  };


  const questionSlide2=(id)=>{
    if(id>= 51 && id <= 96)
      return(
        <>
        <div className="wrap1">
      <div className="options-container">
     {optionsData[0].optionSet2.map((option, index) => (
      <button
        key={`${option.label}-${index}`}
        className={`option-button ${selectedOption === option.text ? "selected" : ""}`}
        onClick={() => handleOptionClick(option.text)}
      >
          <span className="option-label">{option.label}</span>
          <span className="option-text">{option.text}</span>
 
        </button>
      ))} 
      </div>
      {error && <p className="error-message">{error}</p>}
      </div>
      {/* <button onClick={handlePreviousQuestion} className="submit-button">Back</button> */}
      <button onClick={handleNextQuestion} className="submit-button">OK</button>
      </>
    );    
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  
    setError(""); // Clear any previous error

    // setResponses(prevResponses => ({
    //   ...prevResponses,
    //   answers: [...prevResponses.answers, option]
    // }));

    console.log(responses);
  };


  const handleNext = () =>{
    if(city){
        
        // if (currentQuestionIndex < surveyData.length - 1) {

          setResponses(prev => ({ ...prev, city: city }));

              //  setSlideClass("slide-out");
              //  console.log(slideClass);

          setCurrentQuestionIndex(currentQuestionIndex + 1);
         
          setCity("");
          setError("");
      // }

    }
    else{
      setError("Please input your city.");
    }
  }

  const handleNextQuestion = () => {
    if (selectedOption) {
      console.log(selectedOption);
      // setResponses(prevResponses => ({
      //   ...prevResponses,
      //   answers: [...prevResponses.answers, selectedOption]
      // }));

      const updatedResponses = {
        ...responses,
        answers: [...responses.answers, selectedOption]
      };
      console.log(updatedResponses);
    
      

      if (currentQuestionIndex < surveyData.length - 1) {

        setResponses(updatedResponses); 

              // setSlideClass("slide-out");

        setCurrentQuestionIndex(currentQuestionIndex + 1);

      
        // updatePercent(percent === 100 ? 100 : percent + 3);
        setSelectedOption(null); // Reset selection for next question
      } 
      else {
        // if(currentQuestionIndex == surveyData.length - 1)
        // updatePercent(percent > 3 ? percent - 3 : 3);
        console.log(responses);
        console.log(currentQuestionIndex);
        // setResponses(prevResponses => ({
        //   ...prevResponses,
        //   answers: [...prevResponses.answers, selectedOption]
        // }));
        submitToSheet(updatedResponses);
        // alert("Survey completed!");
      }
    } else {
      setError("Please select an option before proceeding.");
    }
  };

  const submitToSheet = async (finalResponses) => {
    // try {
    //   const response = await fetch("https://script.google.com/macros/s/AKfycbymxhFkqK0Q3pJflVRztVr6E5fNAx-rMng9b9ZstaGIvm2enhb2q4f2Ugy2IEsg1m-SKg/exec", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(responses),
    //   });
    //   const result = await response.json();
    //   console.log("Submitted:", result);
    // } catch (error) {
    //   console.error("Error submitting data:", error);
    // }


    try {
      console.log("Attempting to submit data to Google Sheets:", finalResponses);
      const response = await fetch("https://script.google.com/macros/s/AKfycby3uVUjg7-L3XYyzqez5LQhYsWz7i6bNJk4b7427z6nhEh3E3WU2J1I5AN0h_u9lbEC/exec", {
       method: 'POST',
       body: JSON.stringify(finalResponses)
      });
  
      // Check if the response is okay
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json(); // Attempt to parse JSON
      console.log("Submitted successfully:", result);
    } catch (error) {
      alert(`Error submitting data: ${error.message}`);
    }
  };


  return (
  <div className="container">
  <div className= "image"></div>
    
    <ProgressBar 
    colorShift={false} 
    fillColor="rgba(61,173,184,1)"
    percent={percent}/>

    <div className="wrapper">
       
      <div className="survey-container">


      <p className="question">{currentQuestionIndex+1}.{currentQuestion.question}</p>
      {/* <div className="wrap1">
      <div className="options-container"> */}

      {citySlide(currentQuestion.id)} 
      {genderSlide(currentQuestion.id)}
      {ageSlide(currentQuestion.id)}
      {employementSlide(currentQuestion.id)}
      {questionSlide1(currentQuestion.id)}
      {questionSlide2(currentQuestion.id)}

      


      {/* {surveyData.map((question, index) => (
          <div
            key={index}
            className="survey-container"
            style={{
              transform: `translateY(${(index - currentQuestionIndex) * 100}%)`,
              opacity: index === currentQuestionIndex ? 1 : 0,
              zIndex: index === currentQuestionIndex ? 1 : 0,
            }}
          >
            <p className="question">{index + 1}. {question.question}</p>
            {citySlide(question.id)}
            {genderSlide(question.id)}
            {ageSlide(question.id)}
            {employementSlide(question.id)}
            {questionSlide1(question.id)}
          </div>
        ))} */}


         {/* {optionsData.map((option) => (
          <button
            key={option.optionSet1.label}
            className={`option-button ${selectedOption === option.text ? "selected" : ""}`}
            onClick={() => handleOptionClick(option.text)}
          > */}

          {/* {optionsData[0].optionSet2.map((option, index) => (
        <button
          key={`${option.label}-${index}`}
          className={`option-button ${selectedOption === option.text ? "selected" : ""}`}
          onClick={() => handleOptionClick(option.text)}
        >
            <span className="option-label">{option.label}</span>
            <span className="option-text">{option.text}</span>
   
          </button>
        ))}  */}
        
      

      {/* </div>
      {error && <p className="error-message">{error}</p>}
      </div> */}
      {/* <button onClick={handlePreviousQuestion} className="submit-button">Back</button> */}
      {/* <button onClick={handleNextQuestion} className="submit-button">OK</button> */}
       </div>
      </div>
    </div>
    
  ); 
};

export default Survey;

// const Data=()=>{
// const [activeImage, setActiveImage] = useState(0);

// const goToNextImage = () => {
//   if (activeImage === imagesArray.length - 1) {
//     setActiveImage(0);
//     return;
//   }
//   setActiveImage(activeImage + 1);
// };

// const goToPreviousImage = () => {
//   if (activeImage === 0) {
//     setActiveImage(imagesArray.length - 1);
//     return;
//   }
//   setActiveImage(activeImage - 1);
// };

// return (
//   <main>
//     <section>
//       <div>
//         <img
//           src={back}
//           alt=""
//           width={50}
//           height={50}
//           className="icon-left"
//           onClick={goToPreviousImage}
//         />

//         <img
//           src={next}
//           alt=""
//           width={50}
//           height={50}
//           className="icon-right"
//           onClick={goToNextImage}
//         />
//         <img src={imagesArray[activeImage]} alt="" className="main-image" />
//       </div>
//     </section>
//   </main>
// );
// };

// export default Data;


