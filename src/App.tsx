import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ShowSchools from './pages/ShowSchools';
import AddSchool from './pages/AddSchool';
import DatabaseTest from './pages/DatabaseTest';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />
        <main className="relative">
          <Routes>
            <Route path="/" element={<ShowSchools />} />
            <Route path="/add-school" element={<AddSchool />} />
            <Route path="/test" element={<DatabaseTest />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;