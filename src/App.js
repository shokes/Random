import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Error from './pages/Error';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
