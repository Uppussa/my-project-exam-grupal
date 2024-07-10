import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Setting from "./pages/Setting";  
import All from "./pages/All";
import ExamComponent from './pagesExam/ExamComponent';
import CreateExamForm from './pagesExam/newExam/CreateExamForm';
import CreateVideos from './pagesVideos/CreateVideos';
import Login from './login/Login'
import { AuthProvider } from './context/UserContext';
import PrivateRoute from './context/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}> 
          <Route path="/all" element={<All />} /> //dashboard
          <Route path="/setting" element={<Setting />} />
          <Route path="/solutionExam/:id" element={<ExamComponent />} />
          <Route path='/all/CreateExamForm' element={<CreateExamForm/>} />
          <Route path='/CreateVideos' element={<CreateVideos />} />
          </Route>
        </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
