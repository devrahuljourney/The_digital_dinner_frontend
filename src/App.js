// src/App.jsx
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './component/Navbar';
import AppRoutes from './router/AppRouter';


function App() {
  return (
  
      <div className="min-h-screen bg-[#FFF8F0] text-[#2F2F2F]">
        <Navbar />
        <AppRoutes />
      </div>
  
  );
}

export default App;

