import React from 'react';

const QuestionForm = ({ index, question, onQuestionChange, onRemoveQuestion }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onQuestionChange(index, { ...question, [name]: value });
  };

  const handleOptionChange = (optionIndex, value) => {
    const updatedOptions = question.options.map((option, i) =>
      i === optionIndex ? value : option
    );
    onQuestionChange(index, { ...question, options: updatedOptions });
  };

  return (
    <div className="mb-4 p-4 border border-gray-300 rounded">
      <h3 className="text-xl font-semibold mb-2">Pregunta {index + 1}</h3>
      <div className="mb-2">
        <label className="block text-gray-700">Pregunta</label>
        <input
          type="text"
          name="question"
          value={question.question}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mt-2"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Opciones</label>
        {question.options.map((option, i) => (
          <input
            key={i}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(i, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            placeholder={`Opción ${i + 1}`}
            required
          />
        ))}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Opción Correcta</label>
        <input
          type="text"
          name="correctOption"
          value={question.correctOption}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mt-2"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onRemoveQuestion(index)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Eliminar Pregunta
        </button>
      </div>
    </div>
  );
};

export default QuestionForm;
