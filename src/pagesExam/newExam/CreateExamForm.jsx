import React, { useState } from 'react';
import QuestionForm from './QuestionForm';
import { createExam } from '../../api/fechExam';
import { Link } from 'react-router-dom';

const CreateExamForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [nivel, setNivel] = useState('');
    const [duration, setDuration] = useState(''); 
    const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctOption: '' }]);
  
    const handleQuestionChange = (index, updatedQuestion) => {
      const updatedQuestions = [...questions];
      updatedQuestions[index] = updatedQuestion;
      setQuestions(updatedQuestions);
    };
  
    const addQuestion = () => {
      setQuestions([...questions, { question: '', options: ['', '', '', ''], correctOption: '' }]);
    };
  
    const removeQuestion = (index) => {
      const updatedQuestions = questions.filter((_, i) => i !== index);
      setQuestions(updatedQuestions);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const examData = { title, description, nivel, duration, questions };
  
      console.log('Submitting exam data:', examData);
  
      try {
        const response = await createExam(examData);
        if (response) {
          alert('Examen creado con éxito');
        }
      } catch (error) {
        console.error('Error al crear el examen:', error);
      }
    };
  
    return (
      <div className="my-10 max-w-4xl mx-auto p-4 bg-[rgba(113,111,146,0.94)] backdrop-blur-lg shadow-md rounded-lg">
        <Link to="/">
            <span className="text-black mb-4">← Back </span>
          </Link>
        <h2 className="text-2xl font-bold mb-4">Crear Examen</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nivel</label>
            <select
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            >
              <option value="">Seleccionar nivel</option>
              <option value="Elementary">Elementary</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Duración (minutos)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
          </div>
          {questions.map((question, index) => (
            <QuestionForm
              key={index}
              index={index}
              question={question}
              onQuestionChange={handleQuestionChange}
              onRemoveQuestion={removeQuestion}
            />
          ))}
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={addQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Añadir Pregunta
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Crear Examen
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default CreateExamForm;
  