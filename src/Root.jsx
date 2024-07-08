import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Setting from "./pages/Setting";  
import All from "./pages/All";
import ExamComponent from './pagesExam/ExamComponent';
import AsciiDonut from './components/AsciiDonut';


const App = () => {
  return (
    <BrowserRouter>
      
        
        <Routes>
          <Route path="/" element={<All />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/solutionExam/:id" element={<ExamComponent />} />
          <Route path='/asciiDonut' element={<AsciiDonut/>} />
        </Routes>
    
    </BrowserRouter>
  );
};

export default App;
