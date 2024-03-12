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

  const flipCard = () => {
    setFlipped(!flipped);
  };


  const showNextCard = () => {
    setFlipped(false); 
    setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % cards.length); 
    }, 150); // Adjusts delay for card answer change 
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
        <p>Current Riddle: {currentIndex + 1} </p>
      </header>
      <div className="card-container">
        <div className={`card ${flipped ? 'flipped' : ''}`} onClick={flipCard}>
          <div className="card-face card-front">
            {cards[currentIndex].riddle}
          </div>
          <div className="card-face card-back">
            {cards[currentIndex].answer}
          </div>
        </div>
        <button className="btn next" onClick={showNextCard}>Next Riddle</button>
      </div>
    </div>
  );
}

export default App;
