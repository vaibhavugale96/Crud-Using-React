import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AddStudents from './Components/AddStudents';
import View from './Components/View';
import Edit from './Components/Edit'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
 <Route path="/" element={<AddStudents/>}/>
 <Route path="/view/:id" element={<View/>}/>
 <Route path="/edit/:id" element={<Edit/>}/>
 </Routes>

     </BrowserRouter>
    </div>
  );
}

export default App;
