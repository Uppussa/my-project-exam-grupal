import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Setting from "./pages/Setting";  
import All from "./pages/All";
import ExamComponent from './pagesExam/ExamComponent';
import CreateExamForm from './pagesExam/newExam/CreateExamForm';


const App = () => {
  return (
    <BrowserRouter>
      
        
        <Routes>
          <Route path="/" element={<All />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/solutionExam/:id" element={<ExamComponent />} />
          <Route path='/CreateExamForm' element={<CreateExamForm/>} />
        </Routes>
    
    </BrowserRouter>
  );
};

export default App;
