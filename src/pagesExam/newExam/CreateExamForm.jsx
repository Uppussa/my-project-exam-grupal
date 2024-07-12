import { useState } from 'react';
import { Link } from 'react-router-dom';
import QuestionForm from './QuestionForm';
import { createExam } from '../../api/fechExam';

const CreateExamForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [nivel, setNivel] = useState('');
  const [duration, setDuration] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctOption: '' }
  ]);
  const [theme, setTheme] = useState('light'); // Estado para el tema (light o dark)

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

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    // Aquí puedes añadir lógica adicional para cambiar los estilos de la aplicación según el tema
  };

  return (
    <div className={`my-10 max-w-4xl  bg-[rgba(15,6,6,0.94)] mx-auto p-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} backdrop-blur-lg shadow-md rounded-lg text-gray-500 ${theme === 'dark' ? 'text-white' : ''}`}>
      <Link to="/all">
        <span className={`${theme === 'light' ? 'text-black' : 'text-white'} mb-4`}>← Back </span>
      </Link>
      <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : ''}`}>Crear Examen</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">{theme === 'light' ? 'Título' : 'Title'}</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-700'} rounded mt-2 ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">{theme === 'light' ? 'Descripción' : 'Description'}</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full p-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-700'} rounded mt-2 ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">{theme === 'light' ? 'Nivel' : 'Level'}</label>
          <select
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
            className={`w-full p-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-700'} rounded mt-2 ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}
            required
          >
            <option value="">{theme === 'light' ? 'Seleccionar nivel' : 'Select level'}</option>
            <option value="Elementary">Elementary</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block">{theme === 'light' ? 'Duración (minutos)' : 'Duration (minutes)'}</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className={`w-full p-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-700'} rounded mt-2 ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}
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
            theme={theme}
          />
        ))}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={addQuestion}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${theme === 'dark' ? 'bg-blue-800' : ''}`}
          >
            {theme === 'light' ? 'Añadir Pregunta' : 'Add Question'}
          </button>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className={`bg-green-500 text-white px-4 py-2 rounded ${theme === 'dark' ? 'bg-green-800' : ''}`}
          >
            {theme === 'light' ? 'Crear Examen' : 'Create Exam'}
          </button>
        </div>
      </form>
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className={`text-lg text-${theme === 'light' ? 'black' : 'white'}`}
        >
          {theme === 'light' ? '🌞' : '🌙'}
        </button>
      </div>
    </div>
  );
};

export default CreateExamForm;
