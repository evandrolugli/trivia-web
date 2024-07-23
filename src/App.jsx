import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export function App() {
  const [level, setLevel] = useState('easy');
  const [topic, setTopic] = useState('javascript');
  const [questionData, setQuestionData] = useState(null);

  //https://ai-trivia-api-b8b0fddaa26a.herokuapp.com/generate-question
  //http://localhost:3000/generate-question

  const generateQuestion = async () => {
    try {
      const response = await axios.post('http://localhost:3000/generate-question', { level, topic });
      setQuestionData(response.data);
    } catch (error) {
      console.error('Error generating question:', error);
    }
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
              <li key={index} className="list-group-item">{option}</li>
            ))}
          </ul>
          <p>Correct Answer: {questionData.correctAnswer}</p>
        </div>
      )}
    </div>
  );
}
