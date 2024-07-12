/* eslint-disable react/prop-types */


const QuestionNavigator = ({ totalQuestions, currentQuestion, setCurrentQuestion, answers }) => (
  <div className="w-1/4 pr-4">
    <h2 className="text-lg font-semibold mb-2">Navegación por el cuestionario</h2>
    <div className="grid grid-cols-5 gap-2">
      {[...Array(totalQuestions)].map((_, index) => (
        <button
          key={index}
          className={`p-2 text-center rounded ${
            index === currentQuestion 
              ? 'bg-blue-500 text-white' 
              : answers[index + 1] 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200'
          }`}
          onClick={() => setCurrentQuestion(index)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  </div>
);

export default QuestionNavigator;