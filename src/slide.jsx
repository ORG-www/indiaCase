import React, { useState, useEffect, useRef } from "react"
import "../src/slide.css"
import { surveyData, optionsData } from "./data"
import { useLocation, useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';


const songs = [
  { title: "", name: "", source: "https://github.com/ORG-www/indiaCase/raw/master/public/4%20Pieces%20by%20Ludovico%20Einaudi%20_%20Relaxing%20Piano%20%5B20min%5D%20%5B%20ezmp3.cc%20%5D%20(1).mp3" },
  { title: "", name: "", source: "https://github.com/ORG-www/indiaCase/raw/master/public/Interstellar%20-%20Main%20Theme%20-%20Hans%20Zimmer%20(Epic%20instrumentalpiano%20cover).mp3" },
];

export const MusicPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio(songs[currentSongIndex].source));
  const progressRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleLoadedMetadata = () => {
      if (progressRef.current) progressRef.current.max = audio.duration;
    };
    const handleEnded = () => handleNext();

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSongIndex]);

  const updateSongInfo = () => {
    const audio = audioRef.current;
    audio.src = songs[currentSongIndex].source;
    audio.load();
    if (isPlaying) audio.play();
  };

  useEffect(updateSongInfo, [currentSongIndex]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    setCurrentSongIndex((currentSongIndex + 1) % songs.length);
  };

  const handlePrev = () => {
    setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = e.target.value;
    setProgress(e.target.value);
  };

  return (
    <div className="music-player">
      <h1>{songs[currentSongIndex].title}</h1>
      <p>{songs[currentSongIndex].name}</p>
      <input
        type="range"
        ref={progressRef}
        value={progress}
        onChange={handleProgressChange}
        className="progress-bar"
      />

      <div className="controls">
        <button onClick={handlePrev}>
          <i className="fa-solid fa-backward"></i>
        </button>
        <button onClick={togglePlayPause} className="play-pause-btn">
          <i className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
        </button>
        <button onClick={handleNext}>
          <i className="fa-solid fa-forward"></i>
        </button>
      </div>
    </div>
  );
};


// const Survey=()=> {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
//   const [city, setCity] = useState("")
//   const [selectedOption, setSelectedOption] = useState(null)
//   const [responses, setResponses] = useState({ city: "", answers: [] })
//   const [error, setError] = useState("")
//   const [slideDirection, setSlideDirection] = useState("slide-initial")
//   const [percent, setPercent] = useState(1)
//   const initialRender = useRef(true)

//   const currentQuestion = surveyData[currentQuestionIndex]

//   useEffect(() => {
//     if (initialRender.current) {
//       initialRender.current = false
//       setTimeout(() => setSlideDirection("slide-in"), 100)
//     } else {
//       setSlideDirection("slide-in-from-bottom")
//     }
//   }, [currentQuestionIndex])

//   const ProgressBar = ({
//     percent,
//     height = "3px",
//     radius = "50px",
//     fillColor = "lime",
//     colorShift = false,
//     Color = "#140445",
//   }) => {
//     return (
//       <div
//         style={{
//           height,
//           borderRadius: radius,
//           backgroundColor: Color,
//         }}
//       >
//         <div
//           style={{
//             width: `${percent}%`,
//             height: "100%",
//             borderRadius: "inherit",
//             backgroundColor: fillColor,
//             transition: "all .2s ease",
//             [colorShift ? "filter" : null]: `hue-rotate(-${percent}deg)`,
//           }}
//         />
//       </div>
//     )
//   }

//   // const introduction = (id) =>{
//   //   if(id == -4)
//   //     return(
//   //   <>
//   //      <div className="wrap1">
        
//   //      </div>
//   //      <button onClick={handleIntro} className="submit-button">
//   //           BEGIN
//   //         </button>
//   //   </>
//   //   )
//   // }

//   const citySlide = (id) => {
//     if (id === -3)
//       return (
//         <>
//           <div className="wrap1">
//             <div className="options-container">
//               <input
//                 className="inputbox"
//                 type="text"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 aria-label="Enter your city"
//               />
//             </div>
//             {error && (
//               <p className="error-message" role="alert">
//                 {error}
//               </p>
//             )}
//           </div>
//           <button onClick={handleNext} className="submit-button">
//             OK
//           </button>
//         </>
//       )
//   }

//   const genderSlide = (id) => {
//     if (id === -2)
//       return (
//         <>
//           <div className="wrap1">
//             <div className="options-container">
//               {optionsData[0].optionSet5.map((option, index) => (
//                 <button
//                   key={`${option.label}-${index}`}
//                   className={`option-button ${
//                     selectedOption === option.text ? "selected" : ""
//                   }`}
//                   onClick={() => handleOptionClick(option.text)}
//                 >
//                   <span className="option-label">{option.label}</span>
//                   <span className="option-text">{option.text}</span>
//                 </button>
//               ))}
//             </div>
//             {error && (
//               <p className="error-message" role="alert">
//                 {error}
//               </p>
//             )}
//           </div>
//           <button onClick={handleNextQuestion} className="submit-button">
//             OK
//           </button>
//         </>
//       )
//   }

//   const ageSlide = (id) => {
//     if (id === -1)
//       return (
//         <>
//           <div className="wrap1">
//             <div className="options-container">
//               {optionsData[0].optionSet1.map((option, index) => (
//                 <button
//                   key={`${option.label}-${index}`}
//                   className={`option-button ${
//                     selectedOption === option.text ? "selected" : ""
//                   }`}
//                   onClick={() => handleOptionClick(option.text)}
//                 >
//                   <span className="option-label">{option.label}</span>
//                   <span className="option-text">{option.text}</span>
//                 </button>
//               ))}
//             </div>
//             {error && (
//               <p className="error-message" role="alert">
//                 {error}
//               </p>
//             )}
//           </div>
//           <button onClick={handleNextQuestion} className="submit-button">
//             OK
//           </button>
//         </>
//       )
//   }

//   const employementSlide = (id) => {
//     if (id === 0)
//       return (
//         <>
//           <div className="wrap1">
//             <div className="options-container">
//               {optionsData[0].optionSet4.map((option, index) => (
//                 <button
//                   key={`${option.label}-${index}`}
//                   className={`option-button ${
//                     selectedOption === option.text ? "selected" : ""
//                   }`}
//                   onClick={() => handleOptionClick(option.text)}
//                 >
//                   <span className="option-label">{option.label}</span>
//                   <span className="option-text">{option.text}</span>
//                 </button>
//               ))}
//             </div>
//             {error && (
//               <p className="error-message" role="alert">
//                 {error}
//               </p>
//             )}
//           </div>
//           <button onClick={handleNextQuestion} className="submit-button">
//             OK
//           </button>
//         </>
//       )
//   }

//   const questionSlide1 = (id) => {
//     if (id > 0 && id <= 50)
//       return (
//         <>
//           <div className="wrap1">
//             <div className="options-container">
//               {optionsData[0].optionSet2.map((option, index) => (
//                 <button
//                   key={`${option.label}-${index}`}
//                   className={`option-button ${
//                     selectedOption === option.text ? "selected" : ""
//                   }`}
//                   onClick={() => handleOptionClick(option.text)}
//                 >
//                   <span className="option-label">{option.label}</span>
//                   <span className="option-text">{option.text}</span>
//                 </button>
//               ))}
//             </div>
//             {error && (
//               <p className="error-message" role="alert">
//                 {error}
//               </p>
//             )}
//           </div>
//           <button onClick={handleNextQuestion} className="submit-button">
//             OK
//           </button>
//         </>
//       )
//   }

//   const questionSlide2 = (id) => {
//     if (id >= 51 && id <= 96)
//       return (
//         <>
//           <div className="wrap1">
//             <div className="options-container">
//               {optionsData[0].optionSet2.map((option, index) => (
//                 <button
//                   key={`${option.label}-${index}`}
//                   className={`option-button ${
//                     selectedOption === option.text ? "selected" : ""
//                   }`}
//                   onClick={() => handleOptionClick(option.text)}
//                 >
//                   <span className="option-label">{option.label}</span>
//                   <span className="option-text">{option.text}</span>
//                 </button>
//               ))}
//             </div>
//             {error && (
//               <p className="error-message" role="alert">
//                 {error}
//               </p>
//             )}
//           </div>
//           <button onClick={handleNextQuestion} className="submit-button">
//             OK
//           </button>
//         </>
//       )
//   }

//   const handleOptionClick = (option) => {
//     setSelectedOption(option)
//     setError("")
//   }

//   const handleIntro = () => {
//     setSlideDirection("slide-out-up")
//   }

//   const handleNext = () => {
//     if (city) {
//       setResponses((prev) => ({ ...prev, city: city }))
//       setSlideDirection("slide-out-up")
//       setPercent(percent+1)
//       setTimeout(() => {
//         setCurrentQuestionIndex(currentQuestionIndex + 1)
//         setCity("")
//         setError("")
//       }, 300)
//     } else {
//       setError("Please input your city.")
//     }
//   }

//   const handleNextQuestion = () => {
//     if (selectedOption) {
//       const updatedResponses = {
//         ...responses,
//         answers: [...responses.answers, selectedOption],
//       }

//       if (currentQuestionIndex < surveyData.length - 1) {
//         setResponses(updatedResponses)
//         setSlideDirection("slide-out-up")
//         setTimeout(() => {
//           setCurrentQuestionIndex(currentQuestionIndex + 1)
//           setSelectedOption(null)
//         }, 300)
//         setPercent((prev) => (prev === 100 ? 100 : prev + 1))
//       } else {
//         submitToSheet(updatedResponses)
//       }
//     } else {
//       setError("Please select an option before proceeding.")
//     }
//   }

//   const submitToSheet = async (finalResponses) => {
//     try {
//       console.log("Attempting to submit data to Google Sheets:", finalResponses)
//       const response = await fetch(
//         "https://script.google.com/macros/s/AKfycby3uVUjg7-L3XYyzqez5LQhYsWz7i6bNJk4b7427z6nhEh3E3WU2J1I5AN0h_u9lbEC/exec",
//         {
//           method: "POST",
//           body: JSON.stringify(finalResponses),
//         }
//       )

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`)
//       }

//       const result = await response.json()
//       console.log("Submitted successfully:", result)
//     } catch (error) {
//       alert(`Error submitting data: ${error.message}`)
//     }
//   }

//   return (
//     <div className="container">
//       <div className="image" role="img" aria-label="Background image"></div>

//       <ProgressBar
//         colorShift={false}
//         fillColor="rgba(61,173,184,1)"
//         percent={percent}
//       />
//       <MusicPlayer/>

//       <div className="wrapper">
//         <div className={`survey-container ${slideDirection}`}>
//           <p className="question">
//             {currentQuestionIndex + 1}.{currentQuestion.question}
//           </p>
//           {citySlide(currentQuestion.id)}
//           {genderSlide(currentQuestion.id)}
//           {ageSlide(currentQuestion.id)}
//           {employementSlide(currentQuestion.id)}
//           {questionSlide1(currentQuestion.id)}
//           {questionSlide2(currentQuestion.id)}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Survey;

const Survey=()=> {


  const navigate = useNavigate(); 
  const location = useLocation();
  const surveyData = location.state?.surveyData || [];
  const optionsData = location.state?.optionsData || {};

  const [isSubmitted, setIsSubmitted] = useState(false);

  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    // Retrieve the last saved question index from localStorage or start at 0
    const savedIndex = localStorage.getItem("currentQuestionIndex");
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });



  const [city, setCity] = useState("")
  const [selectedOption, setSelectedOption] = useState(null)
  const [responses, setResponses] = useState({ city: "", answers: [] })
  const [error, setError] = useState("")
  const [slideDirection, setSlideDirection] = useState("slide-initial")

  const initialRender = useRef(true)

 

  if (!surveyData || surveyData.length === 0) {
    return <p>Error: No survey questions available.</p>;
  }

  const currentQuestion = surveyData[currentQuestionIndex];

  useEffect(() => {
    // Check if survey has already been submitted
    const submitted = localStorage.getItem("surveySubmitted");
    if (submitted) {
      setIsSubmitted(true);
      navigate("/conclusion"); // Redirect to the conclusion page if already submitted
    }
  }, [navigate]);


  useEffect(() => {
    // Save the current question index to localStorage whenever it changes
    localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
  }, [currentQuestionIndex]);


  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      setTimeout(() => setSlideDirection("slide-in"), 100)
    } else {
      setSlideDirection("slide-in-from-bottom")
    }
  }, [currentQuestionIndex])
 

  const citySlide = (id) => {
    if (id === -3)
      return (
        <>
          <div className="wrap1">
            <div className="options-container">
              <input
                className="inputbox"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                aria-label="Enter your city"
              />
            </div>
            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}
          </div>
          <button onClick={handleNext} className="submit-button">
            OK
          </button>
        </>
      )
  }

  const genderSlide = (id) => {
    if (id === -2)
      return (
        <>
          <div className="wrap1">
            <div className="options-container">
              {optionsData[0].optionSet5.map((option, index) => (
                <button
                  key={`${option.label}-${index}`}
                  className={`option-button ${
                    selectedOption === option.text ? "selected" : ""
                  }`}
                  onClick={() => handleOptionClick(option.text)}
                >
                  <span className="option-label">{option.label}</span>
                  <span className="option-text">{option.text}</span>
                </button>
              ))}
            </div>
            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}
          </div>
          <button onClick={handleNextQuestion} className="submit-button">
            OK
          </button>
        </>
      )
  }

  const ageSlide = (id) => {
    if (id === -1)
      return (
        <>
          <div className="wrap1">
            <div className="options-container">
              {optionsData[0].optionSet1.map((option, index) => (
                <button
                  key={`${option.label}-${index}`}
                  className={`option-button ${
                    selectedOption === option.text ? "selected" : ""
                  }`}
                  onClick={() => handleOptionClick(option.text)}
                >
                  <span className="option-label">{option.label}</span>
                  <span className="option-text">{option.text}</span>
                </button>
              ))}
            </div>
            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}
          </div>
          <button onClick={handleNextQuestion} className="submit-button">
            OK
          </button>
        </>
      )
  }

  const employementSlide = (id) => {
    if (id === 0)
      return (
        <>
          <div className="wrap1">
            <div className="options-container">
              {optionsData[0].optionSet4.map((option, index) => (
                <button
                  key={`${option.label}-${index}`}
                  className={`option-button ${
                    selectedOption === option.text ? "selected" : ""
                  }`}
                  onClick={() => handleOptionClick(option.text)}
                >
                  <span className="option-label">{option.label}</span>
                  <span className="option-text">{option.text}</span>
                </button>
              ))}
            </div>
            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}
          </div>
          <button onClick={handleNextQuestion} className="submit-button">
            OK
          </button>
        </>
      )
  }

  const questionSlide1 = (id) => {
    if (id > 0 && id <= 50)
      return (
        <>
          <div className="wrap1">
            <div className="options-container">
              {optionsData[0].optionSet2.map((option, index) => (
                <button
                  key={`${option.label}-${index}`}
                  className={`option-button ${
                    selectedOption === option.text ? "selected" : ""
                  }`}
                  onClick={() => handleOptionClick(option.text)}
                >
                  <span className="option-label">{option.label}</span>
                  <span className="option-text">{option.text}</span>
                </button>
              ))}
            </div>
            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}
          </div>
          <button onClick={handleNextQuestion} className="submit-button">
            OK
          </button>
        </>
      )
  }

  const questionSlide2 = (id) => {
    if (id >= 51 && id <= 96)
      return (
        <>
          <div className="wrap1">
            <div className="options-container">
              {optionsData[0].optionSet2.map((option, index) => (
                <button
                  key={`${option.label}-${index}`}
                  className={`option-button ${
                    selectedOption === option.text ? "selected" : ""
                  }`}
                  onClick={() => handleOptionClick(option.text)}
                >
                  <span className="option-label">{option.label}</span>
                  <span className="option-text">{option.text}</span>
                </button>
              ))}
            </div>
            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}
          </div>
          <button onClick={handleNextQuestion} className="submit-button">
            OK
          </button>
        </>
      )
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option)
    setError("")
  }


  const handleNext = () => {
    if (city) {
      setResponses((prev) => ({ ...prev, city: city }))
      setSlideDirection("slide-out-up")
    
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setCity("")
        setError("")
      }, 300)
    } else {
      setError("Please input your city.")
    }
  }

  const handleNextQuestion = () => {
    if (selectedOption) {
      const updatedResponses = {
        ...responses,
        answers: [...responses.answers, selectedOption],
      }

      if (currentQuestionIndex < surveyData.length - 1) {
        setResponses(updatedResponses)
        setSlideDirection("slide-out-up")
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1)
          setSelectedOption(null)
        }, 300)
      
      } else {
        submitToSheet(updatedResponses)
      }
    } else {
      setError("Please select an option before proceeding.")
    }
  }

  const submitToSheet = async (finalResponses) => {
    try {
      console.log("Attempting to submit data to Google Sheets:", finalResponses)
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycby3uVUjg7-L3XYyzqez5LQhYsWz7i6bNJk4b7427z6nhEh3E3WU2J1I5AN0h_u9lbEC/exec",
        {
          method: "POST",
          body: JSON.stringify(finalResponses),
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Submitted successfully:", result)
     
       // Set a flag in localStorage to prevent re-filling the survey
       localStorage.setItem("surveySubmitted", "true");

       localStorage.removeItem("currentQuestionIndex");
      
       // Redirect to the conclusion page and replace history entry
       navigate("/conclusion", { replace: true });


    } catch (error) {
      alert(`Error submitting data: ${error.message}`)
    }

    if (isSubmitted) {
      return null; // Prevent rendering if already submitted
    }
  }

  return (
    <div className="container">
      <div className="image" role="img" aria-label="Background image"></div>

      
      <MusicPlayer/>

      <div className="wrapper">
        <div className={`survey-container ${slideDirection}`}>
          <p className="question">
            {currentQuestionIndex + 1}. {currentQuestion.question}
          </p>
          {citySlide(currentQuestion.id)}
          {genderSlide(currentQuestion.id)}
          {ageSlide(currentQuestion.id)}
          {employementSlide(currentQuestion.id)}
          {questionSlide1(currentQuestion.id)}
          {questionSlide2(currentQuestion.id)}
        </div>
      </div>
    </div>
  )
}

export default Survey;
