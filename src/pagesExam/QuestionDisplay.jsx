import React from 'react';

const QuestionDisplay = ({ question, onAnswer, answer }) => (
  <div className="w-3/4 bg-blue-50 p-4 rounded-lg">
    <h2 className="text-lg font-semibold mb-2">Pregunta {question._id}</h2>
    <p className="mb-4">{question.question}</p>
    <div className="space-y-2">
      {question.options.map((option, index) => (
        <button
          key={index}
          className={`w-full text-left p-2 rounded ${
            answer === option ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
          onClick={() => onAnswer(question._id.toString(), option)}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export default QuestionDisplay;
