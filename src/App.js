import React, {useState} from "react";
import QuestList from "./elements/QuestList";
import {v4 as uuidv4} from "uuid";
import './App.css';

const App = () => {
  const [currentQuest, setCurrentQuest] = useState(0);
  const [score, setScore] = useState(0);
  const [clicked,setClicked] = useState(false);
  const[showScore, setShowScore] = useState(false); 

  const handleCorrectAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore( score + 1);
    }
    setClicked(true);
  };
  const handleNextQuest = ()=> {
    setClicked (false);
    if (currentQuest < QuestList.length - 1){
      setCurrentQuest(currentQuest + 1);
    } else {
      setShowScore(true);
    }
  }

  return (
  <div className = "app-wrapper"> 
  {showScore ? (
    <div>
      <div className = "completed"> Completed! </div>
      <div className = "score-section">
        Your Score : {score} /{QuestList.length} 
        </div>
    </div>
  ) : (

  <div> 
    <div className ="quest-section-wrapper">
<div className ="quest-count"> 
Question {currentQuest + 1} of {QuestList.length}
</div>
<div className ="question">
  {QuestList[currentQuest].quest}
</div>
    </div>
    <div className = "answer-section-wrapper">{QuestList [currentQuest].answersList.map((answerOption) =>(
<li className = "answer-list" key = {uuidv4()}>
<button 
disabled = {clicked}
className = {`answer-button ${clicked && answerOption.isCorrect ? "correct" : ""}`} 
onClick = {() =>handleCorrectAnswer(answerOption.isCorrect)}
> 
  {answerOption.answer}
</button>
</li>
      ))}
    </div>
    <div>
      <button className ="next-button" onClick = {handleNextQuest}
      disabled = {!clicked}
      > 
        Next
        </button>
    </div>
    </div>
  )}
  </div>
  );
};

export default App;
