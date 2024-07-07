import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Setting from "./pages/Setting";  
import All from "./pages/All";
import ExamComponent from './pagesExam/ExamComponent';
import { examData } from './pagesExam/examData';
import AsciiDonut from './components/AsciiDonut';


const App = () => {
  return (
    <BrowserRouter>
      
        
        <Routes>
          <Route path="/" element={<All />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/SolutionExam" element={<ExamComponent exam={examData} />} />
          <Route path='/AsciiDonut' element={<AsciiDonut/>} />
        </Routes>
    
    </BrowserRouter>
  );
};

export default App;
