import Projects from "./pages/Home";
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import TasksPage from "./pages/TaskPage";

function App(){
  return(
    <>
      <Routes>
        <Route path="/" element={<Projects/>}/>
        <Route path="/tasks/:projectId" element={<TasksPage/>}/>
      </Routes>
    </>
  )
}

export default App;