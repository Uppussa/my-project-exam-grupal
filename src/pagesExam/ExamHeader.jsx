import React from 'react';

const ExamHeader = ({ exam, score, totalQuestions, correctAnswersCount }) => { 
  console.log(score, totalQuestions, correctAnswersCount);
  return (
    <div className="bg-pink-200 p-4 rounded-lg mb-4">
      <h1 className="text-2xl font-bold">{exam.title}</h1>
      <p>Estado: {score !== null ? 'Finalizado' : 'En progreso'}</p>
      {score !== null && (
        <p>Calificación: {score.toFixed(2)}% ({correctAnswersCount} de {totalQuestions} correctas)</p>
      )}
    </div>
  );
};

export default ExamHeader;
