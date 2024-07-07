import React, { useState, useCallback, useEffect } from 'react';
import ExamHeader from './ExamHeader';
import QuestionNavigator from './QuestionNavigator';
import QuestionDisplay from './QuestionDisplay';
import Timer from './Timer';

const ExamComponent = ({ exam }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [examFinished, setExamFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (exam && exam.questions) {
      setIsLoading(false);
    }
  }, [exam]);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const calculateScore = useCallback(() => {
    if (!exam || !exam.questions) return;

    let correctAnswers = 0;
    exam.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    const calculatedScore = (correctAnswers / exam.questions.length) * 100;
    setScore(calculatedScore);
    setExamFinished(true);
  }, [answers, exam]);

  const handleTimeUp = useCallback(() => {
    calculateScore();
  }, [calculateScore]);

  if (isLoading) {
    return <div>Cargando examen...</div>;
  }

  if (!exam || !exam.questions) {
    return <div>No se pudo cargar el examen. Por favor, inténtelo de nuevo más tarde.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ExamHeader 
        exam={exam} 
        score={score} 
        totalQuestions={exam.questions.length} 
      />
      <Timer duration={exam.duration} onTimeUp={handleTimeUp} />
      {!examFinished ? (
        <div className="flex">
          <QuestionNavigator 
            totalQuestions={exam.questions.length} 
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            answers={answers}
          />
          <QuestionDisplay 
            question={exam.questions[currentQuestion]}
            onAnswer={handleAnswer}
            answer={answers[exam.questions[currentQuestion].id]}
          />
        </div>
      ) : (
        <div className="mt-4 p-4 bg-green-100 rounded-lg">
          <h2 className="text-2xl font-bold">Examen finalizado</h2>
          <p className="text-xl">Tu puntuación: {score.toFixed(2)}%</p>
        </div>
      )}
      {!examFinished && (
        <button 
          onClick={calculateScore} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Finalizar examen
        </button>
      )}
    </div>
  );
};

export default ExamComponent;