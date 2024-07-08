import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ExamHeader from './ExamHeader';
import QuestionNavigator from './QuestionNavigator';
import QuestionDisplay from './QuestionDisplay';
import Timer from './Timer';
import { useQuery } from '@tanstack/react-query';
import { fetchExamById } from '../api/fechExam';


const ExamComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: exam, isError, isLoading, error } = useQuery({
    queryKey: ['exams', id],
    queryFn: () => fetchExamById(id),
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [examFinished, setExamFinished] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const calculateScore = useCallback((updatedAnswers) => {
    if (!exam || !exam.questions) return;

    let correctAnswers = 0;
    let answeredQuestions = 0;
    exam.questions.forEach((question) => {
      const questionId = question._id.toString(); // Convertir a string
      if (updatedAnswers[questionId] !== undefined) {
        answeredQuestions++;
        if (updatedAnswers[questionId] === question.correctOption) {
          correctAnswers++;
        }
      }
    });

    const calculatedScore = answeredQuestions > 0 ? (correctAnswers / answeredQuestions) * 100 : 0;
    setScore(calculatedScore);
    setCorrectAnswersCount(correctAnswers);
  }, [exam]);

  const handleTimeUp = useCallback(() => {
    setTimerRunning(false);
    setExamFinished(true);
    calculateScore(answers);
  }, [calculateScore, answers]);

  const handleFinishExam = () => {
    setExamFinished(true);
    setTimerRunning(false);
    calculateScore(answers);
  };

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (examFinished) {
      setTimerRunning(false);
    }
  }, [examFinished]);

  if (isLoading) return <p>Cargando examen...</p>;
  if (isError) return <p>Error al cargar el examen: {error.message}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {exam && exam.questions && (
        <>
          <ExamHeader
            exam={exam}
            score={score}
            totalQuestions={exam.questions.length}
            correctAnswersCount={correctAnswersCount}
          />
          <Timer duration={exam.duration} onTimeUp={handleTimeUp} running={timerRunning} />
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
                answer={answers[exam.questions[currentQuestion]?._id.toString()]}
              />
            </div>
          ) : (
            <div className="mt-4 p-4 bg-green-100 rounded-lg">
              <h2 className="text-2xl font-bold">Examen finalizado</h2>
              <p className="text-xl">Tu puntuación: {score !== null ? score.toFixed(2) : 'Calculando...'}%</p>
              <p>Respuestas correctas: {correctAnswersCount} de {exam.questions.length}</p>
            </div>
          )}
          {!examFinished && (
            <button
              onClick={handleFinishExam}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Finalizar examen
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ExamComponent;