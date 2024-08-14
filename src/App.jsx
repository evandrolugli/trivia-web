import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export function App() {
  const [level, setLevel] = useState('easy');
  const [topic, setTopic] = useState('javascript');
  const [questionData, setQuestionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [hasClicked, setHasClicked] = useState(false);

  //const API_URL = import.meta.env.VITE_API_URL_DEV;
  const API_URL = import.meta.env.VITE_API_URL_PROD;
  
  const generateQuestion = async () => {
    try {
      const response = await axios.post(API_URL, { level, topic });
      setQuestionData(response.data);
      setSelectedOption(null);
      setIsCorrect(null);
      setHasClicked(false);
    } catch (error) {
      console.error('Error generating question:', error);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsCorrect(option === questionData.correctAnswer);
    setHasClicked(true);
  };

  return (
    <div className="container mt-5">
      <h1>Trivia Question Generator</h1>
      <div className="form-group">
        <label>Level:</label>
        <select className="form-control" value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="form-group">
        <label>Topic:</label>
        <select className="form-control" value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
          <option value="react">React</option>
          <option value="node">Node</option>
          <option value="sql">SQL</option>
        </select>
      </div>
      <button className="btn btn-primary mt-3" onClick={generateQuestion}>Generate Question</button>
      {questionData && (
        <div className="mt-4">
          <h3>Question: {questionData.question}</h3>
          <ul className="list-group">
            {questionData.options.map((option, index) => (
              <li
                key={index}
                className={`list-group-item ${selectedOption === option ? (isCorrect ? 'bg-success text-white' : 'bg-danger text-white') : ''}`}
                onClick={() => handleOptionClick(option)}
                style={{ cursor: 'pointer' }}
                >
                {option}
              </li>
              ))}
          </ul>
          {hasClicked && (
            <p>{isCorrect ? 'Correct Answer!' : `Wrong Answer! Correct Answer is: ${questionData.correctAnswer}`}</p>
          )}
        </div>
      )}
    </div>
  );
}
