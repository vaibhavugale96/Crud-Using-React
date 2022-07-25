import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AddStudents from './Components/AddStudents';
import View from './Components/View';
import Edit from './Components/Edit'


function App() {
  return (
    <div className="App">
    <div className='title'>
      <h2>Crud Using React and Django Api</h2>
      
    </div>
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
