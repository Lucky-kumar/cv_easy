import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Report from './pages/Report';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/signin" />;
    }

    return children;
  };

  return (
    <div>
      <Routes>
        <Route path="/">

          <Route path="signin" element={<SignIn />} />
          <Route
            index
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />

          <Route path="about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />

          <Route path="skills"
            element={
              <ProtectedRoute>
                <Skills />
              </ProtectedRoute>
            }
          />

          <Route path="projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />

          <Route path="report"
            element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
