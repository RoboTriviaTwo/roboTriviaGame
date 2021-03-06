// Scoreboard.js
import firebase from "./../firebase.js";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Scoreboard = (props) => {
  const { allPlayersArr, currentScore } = props;

  // firebase data - for userObj
  const [userObj, setUserObj] = useState([]);
  const [userKey, setUserKey] = useState([]);
  const [combineMethod, setCombineMethod] = useState(false);
  const [initialClick, setInitialClick] = useState(0);
  const [scoreSubmit, setScoreSubmit] = useState(false);
  
  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    onValue(dbRef, (response) => {
      // storing new state
      const newState = [];
      const data = response.val();
      // for in loop to access player obj
      for (let key in data) {
        newState.push({ key: key, name: data[key] });
      }

      setUserObj(newState[0].name);
      setUserKey(newState[0].key);

      // combines and compares current score with db scores 
      setCombineMethod(true);
    });
  }, []);

  let userObject = [];

  if (combineMethod) {
    // rest operator to gather array
    const allArray = (...array) => {
      return array;
    };

    // passing in arrays from userObj and allPlayers
    const allUsers = allArray(
      userObj[0],
      userObj[1],
      userObj[2],
      allPlayersArr[0]
    );

    // using new array, return scoreArr
    const scoreArr = allUsers.map((user) => {
      const score = user.score;
      return score;
    });
    
    const minScore = Math.min(...scoreArr);
    // finds obj with low score
    const minScoreUser = allUsers.find((item) => {
      return item.score === minScore;
    });

    // finds index of min score
    const index = allUsers.indexOf(minScoreUser);

    // splice removes from array
    allUsers.splice(index, 1);
    userObject = [...allUsers];
  }

  const submitHandler = () => {
    setInitialClick(initialClick + 1);
    setScoreSubmit(true);
    // set replaces existing values at child
    if (initialClick === 0) {
      const database = getDatabase(firebase);
      const childRef = ref(database, `/${userKey}`);
      return set(childRef, userObject)      
    }
  };

  return (
    <div className="popup">
      <div>
        <div className="currentPlayerInfo">
          <p className="playScore">Score: {currentScore} / 100</p>
        </div>
        <h2>High Scores</h2>
        <ul className="highScores">
        {userObj.map((user, index) => {
          return (
            <li key={index}>
                <p className="scoreName">{user.playerName}</p>
                <p className="highScore">{user.score} / 100</p>
            </li>
          );
        })}
        </ul>
        <button onClick={submitHandler}>{!scoreSubmit ? 'Submit Score': "Submitted!"}</button>
        <Link to="/" className="playAgainBtn">Play again</Link>

      </div>
    </div>
  );
};

export default Scoreboard;
