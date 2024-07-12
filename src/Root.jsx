import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Setting from "./pages/Setting";  
import All from "./pages/All";
import ExamComponent from './pagesExam/ExamComponent';
import CreateExamForm from './pagesExam/newExam/CreateExamForm';
import Login from './login/Login'
import { AuthProvider } from './context/UserContext';
import PrivateRoute from './context/PrivateRoute';
import ParentComponent from './pagesVideos/ParentComponent';
import SelectVideos from './pagesVideos/SelectVideos';
import Alumnos from './teacher/Alumnos';
import AlumnosVideos from './teacher/AlumnosVideos';

const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}> 
        
          <Route path="/all" element={<All />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/solutionExam/:id" element={<ExamComponent />} />
          <Route path='/all/alumnos' element={<Alumnos  />} /> 
          <Route path='/all/alumnos/:id' element={<Alumnos  />} /> 
          <Route path='/all/videos' element={<AlumnosVideos />} />
          <Route path='/all/CreateExamForm' element={<CreateExamForm/>} /> 
          <Route path='/CreateVideos' element={<ParentComponent />} />
          <Route path="/videos/:id" element={<SelectVideos />} />
          </Route>
        </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
