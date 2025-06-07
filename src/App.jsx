import { useState, useEffect } from 'react';

const quotes = [
  "Keep going!",
  "You’ve got this!",
  "Almost there!",
  "Stay focused!",
  "Finish strong!"
];

export default function App() {
  const [name, setName] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft === 0) {
      setIsRunning(false);
      return;
    }
    const id = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    if (!name) return;
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setTimeLeft(10);
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setQuote('');
  };

  return (
    <div className="app">
      <h1>Reactive Timer Motivator</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={e => setName(e.target.value)}
        disabled={isRunning}
      />
      <button onClick={startTimer} disabled={isRunning || !name}>
        Start Timer
      </button>
      {isRunning && (
        <div className="status">
          {name}, {timeLeft} sec left
        </div>
      )}
      {!isRunning && timeLeft === 0 && quote && (
        <>
          <div className="message">
            You did it, {name}! 💪
          </div>
          <div className="quote">{quote}</div>
          <button onClick={resetTimer}>Try Again</button>
        </>
      )}
    </div>
  );
}