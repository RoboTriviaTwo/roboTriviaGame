import { useState } from "react";
import ReactModal from "react-modal";
import UserScoreCard from "./UserScoreCard.js";
import PlayerDisplay from "./PlayerDisplay.js";
const Quiz = (props) => {
  // quizQuestions, updatePlayerInfo, playerInfo
  const { quizQuestions, updatePlayerInfo, appPlayerInfo } = props;
 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  // const [showScoreModal, setShowScoreModal] = useState(false);

  // const checkAnswer = (event) => {
  //   const userAnswer = event.target.value;

  //   if (currentQuestion < props.quizQuestions.length - 1) {
  //     setCurrentQuestion(currentQuestion + 1);
  //     if (userAnswer === props.quizQuestions[currentQuestion].correct_answer) {
  //       setCurrentScore(currentScore + 10);
  //     } 
  //   } else {
  //     if (userAnswer === props.quizQuestions[currentQuestion].correct_answer) {
  //       setCurrentScore(currentScore + 10);
  //       addScoreToObj(currentScore + 10);
  //     } else {
  //       addScoreToObj(currentScore);
  //     }
  //     // setShowScoreModal(true);
  //    }
  // }

  // const addScoreToObj = (score) => {
  //   let tempAllPlayersArr = [...allPlayersArr];
  //   tempAllPlayersArr[0] = {
  //     ...tempAllPlayersArr[0],
  //     score: score
  //   }
  //   props.updatePlayerArr(tempAllPlayersArr);
  // }

  return (
    <div className="wrapper">
      <PlayerDisplay playerInfo={appPlayerInfo}/>
      <div className="quiz">
      {quizQuestions.length !== 0 && (
      <>
        <div className="quizContainer">
          <div className="questionContainer">
            <p>Question {currentQuestion+ 1}</p>
            <h2 className="currentQuestion">{(quizQuestions[currentQuestion].question).replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&quot;/g, '"').replace(/&rsquo;/g, "'").replace(/&Eacute;/g, "é").replace(/&#039;/g, "'").replace(/&shy;/g, "").replace(/&hellip;/g, "...").replace(/&auml;/g, "Ä").replace(/&ouml;/g, "Ö").replace(/&uuml;/g, "ü").replace(/&Ouml;/g, "Ö")}</h2>
          </div>
          <div className="answerContainer">
            {quizQuestions[currentQuestion].answerButtons.map((answerItem, index) => {
                return (
                  <button
                    value={answerItem.name}
                    // onClick={checkAnswer}
                    key={index}
                    className={answerItem.isCorrect ? "correctAnswer" : "incorrectAnswer"}
                  >{(answerItem.name).replace(/&quot;/g, '"').replace(/&ntilde;/g, "ñ").replace(/&eacute;/g, "é").replace(/&rsquo;/g, "'").replace(/&amp;/g, "&").replace(/&Eacute;/g, "é").replace(/&#039;/g, "'").replace(/&shy;/g, "").replace(/&iacute;/g, "í").replace(/&oacute;/g, "Ó").replace(/&reg;/g, "®").replace(/&trade;/g, "™").replace(/&lt;/g, "<")}
                  </button>
                );
              }
            )}
          </div>   
        </div>
      </>)}
      
      {/* <ReactModal isOpen={showScoreModal} className={"scoreModal"}style={{overlay: {background: "rgba(0, 0, 0, 0.2)"}}} appElement={document.getElementsByClassName('app')}>
        <UserScoreCard currentScore={currentScore} allPlayersArr={allPlayersArr}/>
      </ReactModal> */}
    </div>
  </div>
  );
}

export default Quiz;