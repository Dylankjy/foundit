import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import ManageItems from './pages/manage/Items';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/manage' element={<ManageItems />} />
      </Routes>
    </Router>
  );
}

export default App;
