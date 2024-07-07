import React from 'react';

const ExamHeader = ({ exam, score, totalQuestions }) => (
  <div className="bg-pink-200 p-4 rounded-lg mb-4">
    <h1 className="text-2xl font-bold">{exam.title}</h1>
    <p>Estado: {score !== null ? 'Finalizado' : 'En progreso'}</p>
    {score !== null && (
      <p>Calificación: {score.toFixed(2)}% ({Math.round(score * totalQuestions / 100)} de {totalQuestions} correctas)</p>
    )}
  </div>
);

export default ExamHeader;