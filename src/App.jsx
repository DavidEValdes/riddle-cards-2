import React, { useState } from 'react';
import './App.css';

function App() {
  const [cards, setCards] = useState([
    { riddle: "What can travel around the world while staying in a corner?", answer: "A stamp" },
    { riddle: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?", answer: "An echo" },
    { riddle: "You see a boat filled with people. It has not sunk, but when you look again you don’t see a single person on the boat. Why?", answer: "All the people were married" },
    { riddle: "What has keys but can’t open locks?", answer: "A piano" },
    { riddle: "What has a head, a tail, is brown, and has no legs?", answer: "A penny" },
    { riddle: "The more of this there is, the less you see. What is it?", answer: "Darkness" },
    { riddle: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?", answer: "A map" },
    { riddle: "What is always in front of you but can’t be seen?", answer: "The future" },
    { riddle: "What has many keys but can't open a single lock?", answer: "A computer keyboard" },
    { riddle: "What can fill a room but takes up no space?", answer: "Light" }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [history, setHistory] = useState([0]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);
  const [showMasteredList, setShowMasteredList] = useState(false);

  const flipCard = () => {
    setFlipped(!flipped);
  };


  //Used to convert lowercase and removes all non-alphanumeric characters
  const normalizeString = (str) => {
    return str.toLowerCase().replace(/[\W_]+/g, "").trim();
  };
  
  const submitGuess = () => {
    const userGuessNormalized = normalizeString(userGuess);
    const answerNormalized = normalizeString(cards[currentIndex].answer);
  
    if (userGuessNormalized === answerNormalized) {
      setFeedback('Correct!');
      setCurrentStreak(currentStreak + 1);
      if (currentStreak + 1 > longestStreak) {
        setLongestStreak(currentStreak + 1);
      }
      setFlipped(true);
    } else {
      setFeedback('Incorrect, try again!');
      setCurrentStreak(0);
    }
  };
  const markCardAsMastered = () => {
    const masteredCard = cards[currentIndex];
    setMasteredCards([...masteredCards, masteredCard]); 

    // Remove from current cards list
    const updatedCards = cards.filter((_, index) => index !== currentIndex);
    setCards(updatedCards);

    
    if (updatedCards.length > 0) {
        setCurrentIndex(currentIndex % updatedCards.length);
    } else {
        alert("Congratulations! You have mastered all cards!");
       
    }
};



const toggleMasteredList = () => {
  setShowMasteredList(!showMasteredList);
};

  const showNextCard = () => {
    setFlipped(false);
    setFeedback(''); 
    setUserGuess('');
    let nextIndex = (currentIndex + 1) % cards.length;
    setCurrentIndex(nextIndex);
    setHistory([...history, nextIndex]); 
  };

  const showPreviousCard = () => {
    if (history.length > 1) {
      setFlipped(false);
      setFeedback(''); 
      setUserGuess(''); 
      let newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCurrentIndex(newHistory[newHistory.length - 1]);
    }
  };

  const shuffleCards = () => {
    let shuffledCards = [...cards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]]; // Swap
    }
    setCards(shuffledCards);
    setCurrentIndex(0); 
    setHistory([0]); 
    setFlipped(false);
    setFeedback(''); 
    setUserGuess(''); 
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">Riddle Me This</h1>
        <p className="app-description">Challenge yourself with a series of intriguing riddles. Can you solve them all?</p>
        <div className="color-description">
          <div><span className="color-question">Blue</span> = Question</div>
          <div><span className="color-answer">Red</span> = Answer</div>
        </div>
        <p>Total Riddles: 10</p>
        <div className="streak-info">
          <p>Current Streak: {currentStreak}</p>
          <p>Longest Streak: {longestStreak}</p>
        </div>
      </header>
      <div className="card-container">
        <div className={`card ${flipped ? 'flipped' : ''}`} onClick={flipCard}>
          <div className="card-face card-front">
            {!flipped && (
              <>
                <p>{cards[currentIndex].riddle}</p>
              </>
            )}
          </div>
          <div className="card-face card-back">
            {cards[currentIndex].answer}
          </div>
        </div>
        <button className="btn shuffle" onClick={shuffleCards}>Shuffle Cards</button>
        
        </div>
        <button className="btn back" onClick={showPreviousCard}>Back</button>
        <button className="btn next" onClick={showNextCard}>Next</button>
       <div>
        <div>
        <button className="btn mastered" onClick={markCardAsMastered}>Mark as Mastered</button>
        <button className="btn masteredList" onClick={toggleMasteredList}>Show Mastered Cards</button>
        {showMasteredList && (
        <div className="mastered-cards-list">
          <h3>Mastered Cards</h3>
          <ul>
          {masteredCards.map((card, index) => (
            <li key={index} style={{ marginBottom: '20px' }}>
             <div className="question">{card.riddle}</div>
              <br />
              <div className="answer">Answer: {card.answer}</div>
            </li>
          ))}
        </ul>
        </div>
      )}
        
       </div> 
        {feedback && <p style={{ marginTop: '30px' }} >{feedback}</p>}
        <input 
          type="text" 
          value={userGuess} 
          onChange={(e) => setUserGuess(e.target.value)} 
          placeholder="Enter your guess" 
          className="input-guess"
          style={{ marginTop: '20px' }} 
        />
        </div>
       <button 
          onClick={submitGuess}
          className = "btn submit"
          style={{ marginTop: '20px' }}>Submit</button>  
    </div>
    
  );
}

export default App;
