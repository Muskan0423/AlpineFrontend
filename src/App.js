import React, { useState } from 'react';
import Quiz from './Components/Quiz/Quiz';
import CheckOut from './Components/CheckOut/CheckOut';

const App = () => {
  const [quizData, setQuizData] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleQuizSubmit = (data) => {
    setQuizData(data);
    setQuizSubmitted(true);
  };

  return (
    <div className="App">
      <h1 style={{marginBottom:"15px"}}>Alpine Bliss Energy Drink</h1>
      {!quizSubmitted ? (
        <>
         
          <Quiz onSubmitQuiz={handleQuizSubmit} />
        </>
      ) : (
        <>
          <CheckOut quizData={quizData} />
        </>
      )}
    </div>
  );
};

export default App;
