import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authorize from './components/Authorize';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
function App() {
  return (
    <div>
   
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Authorize />} />
        <Route path='/register' element={<Authorize register/>} />
      </Routes>
    </div>
  );
}

export default App;
