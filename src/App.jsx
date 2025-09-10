import "./App.css";
import { Routes, Route, Link } from 'react-router-dom';
import CourseList from './components/CourseList';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';
import EditCourse from "./components/EditCourse";


function App() {
  return (
    <>
      <div style={{ padding: '20px' }}>
      <h1 className="text-center text-3xl font-bold text-red-500">Course Tracker</h1>

      <nav className="text-center text-xl text-emerald-600">
        <Link to="/">Home</Link> | <Link to="/create">Create Course</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/create" element={<CreateCourse />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/courses/edit/:id" element={<EditCourse />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
