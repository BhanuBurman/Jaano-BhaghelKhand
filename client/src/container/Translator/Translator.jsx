import React, { useState, useRef, useEffect } from "react";
import { PiSpeakerNone } from "react-icons/pi";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import axios from "axios";
import Select from 'react-select'

import "./Translator.scss";

function Translator() {
  const [hindiSentence, setHindiSentence] = useState("");
  const [predictedBagheliSentence, setPredictedBagheliSentence] = useState("");
  const [loading, setLoading] = useState(false);
  const [sloading, setSLoading] = useState(false);
  const [error, setError] = useState("");
  const audioRef = useRef(null);
  const [displayedSentence, setDisplayedSentence] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputIntro, setInputIntro] = useState("Enter your hindi sentence here...");
  const [selectedOption, setSelectedOption] = useState(1);
  

  const styles = {
    fontSize: 14,
    color: 'blue',
    width: 14,
  }

  const options = [
    {label: "Hindi in English", value: 1, className: 'custom-class'},
    {label: "Hindi in हिंदी", value: 2, className: 'awesome-class'}
    // more options...
];


  const handleInputChange = (e) => {
    setHindiSentence(e.target.value);
  };

  const handlePredictClick = async () => {
    if (!hindiSentence.trim()) {
      setError("Please enter a Hindi sentence.");
      return;
    }
    if (predictedBagheliSentence.length > 0) {
      setPredictedBagheliSentence("");
      setDisplayedSentence("");
      setCurrentIndex(0);
    }

    try {
      setLoading(true);
      setError("");
      // console.log("Selected Option in predict fucntion:", selectedOption);
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        hindiSentence: hindiSentence,
        selectedOption: selectedOption
      });

      const predictedBagheliSentence = response.data.predictedBagheliSentence;
      setPredictedBagheliSentence(predictedBagheliSentence);

      // Start displaying sentence word by word with a delay
      const words = predictedBagheliSentence.split(" ");
      setCurrentIndex(0);
      const intervalId = setInterval(() => {
        setCurrentIndex(prevIndex => {
          if (prevIndex < words.length) {
            setDisplayedSentence(prev => prev + words[prevIndex] + " ");
            return prevIndex + 1;
          } else {
            clearInterval(intervalId);
            return prevIndex;
          }
        });
      }, 50);

    } catch (error) {
      console.error("Prediction failed:", error.message);
      setError("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
      setSLoading(false); // Stop speaking loading indicator
    }
  };

  const handleSpeak = async () => {
    try {
      if (sloading) {
        // If already speaking, stop the playback
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setSLoading(false);
        return;
      }

      setSLoading(true); // Start speaking loading indicator

      const response = await axios.post(
        "http://127.0.0.1:5000/text-to-speech",
        {
          text: predictedBagheliSentence,
          language: "hi",
        },
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(blob);

      // Create or reuse the audio element
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
      } else {
        audioRef.current.src = audioUrl;
      }

      // Update sLoading when the audio playback ends
      audioRef.current.onended = () => {
        setSLoading(false); // Stop speaking loading indicator
      };

      // Play the audio
      audioRef.current.play();
    } catch (error) {
      console.error("Text-to-speech request failed:", error.message);
      alert("Text-to-speech request failed. Please try again.");
      setSLoading(false); // Stop speaking loading indicator on error
    }
  };

  const handleChange = (selectedOption) => {
    // Perform operations based on the selected option
    
    // Check the value of the selected option
    if (selectedOption.value === 1) {
      setInputIntro("Enter your hindi sentence here...");
    } else {
      setInputIntro("कृपया अपना हिंदी वाक्य लिखें...");
    }
    setSelectedOption(selectedOption.value);
    console.log('Selected Option in handle Change:', selectedOption.value);
  };

  const [displayedText, setDisplayedText] = useState("");
  const fullText = "बघेली Translator : Convert sentences from hindi to Bagheli";

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(intervalId);
      }
    }, 50); // Adjust the interval as needed

    return () => {
      clearInterval(intervalId); // Cleanup on component unmount
    };
  }, []);

  return (
    <div className="app__translator" id="translator">
      <div className="translator_heading">
        <h3>{displayedText}</h3>
      </div>
      <div className="main_card_outer">
        <div className="main_card">
          <div className="main_card-left">
            {/* <label htmlFor="hindiSentence" className="form-label">
              Enter Hindi (हिंदी) Sentence:
            </label> */}
            <div className="form-label">
              {/* <select htmlFor="hindiSentence" className="form-label">
                <option value="someOption">Hindi in English</option>
                <option value="otherOption">Hindi in हिंदी</option>
              </select> */}
              <Select
                  options={options}
                  defaultValue={options[0]}
                  onChange={(selectedOption) => handleChange(selectedOption)}
                  // value={selectedOption}
                  placeholder={'Select something'}
                  clearable={false}
                  style={styles}
              />
            </div>
            <textarea
              id="hindiSentence"
              placeholder= {inputIntro}
              className="main_card-left-textarea"
              value={hindiSentence}
              onChange={handleInputChange}
              rows={9} // Limit to 10 lines
            />
            <div className="main_card-left-buttons">
              <button
                onClick={handlePredictClick}
                className="translate_button"
                disabled={loading}
              >
                {loading ? "Translating..." : "Translate"}
              </button>
              <button
                onClick={handleSpeak}
                className="speak_button"
                disabled={!predictedBagheliSentence.length || sloading}
              >
                {sloading ? (
                  <HiMiniSpeakerWave style={{ height: 35, width: 35 }} />
                ) : (
                  <PiSpeakerNone style={{ height: 35, width: 35 }} />
                )}
              </button>
            </div>
          </div>
          <div className="main_card-right">
            <h4>Bagheli (बघेली ) Sentence:</h4>
            <p>{displayedSentence}</p>
          </div>
        </div>
        <div className="error">
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Translator;
