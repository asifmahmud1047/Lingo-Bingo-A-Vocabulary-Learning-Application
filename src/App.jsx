import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import StartLearning from "./components/StartLearning";
import Profile from "./components/Profile";
import Tutorials from "./components/Tutorials";
import TutorialDetail from "./components/TutorialDetail";
import AboutUs from "./components/AboutUs";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import LessonDetail from "./components/LessonDetail";

const App = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/start-learning" element={<StartLearning />} />
            <Route 
              path="/tutorials" 
              element={
                <PrivateRoute>
                  <Tutorials />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/tutorials/:id" 
              element={
                <PrivateRoute>
                  <TutorialDetail />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/lesson/:lessonNo" 
              element={
                <PrivateRoute>
                  <LessonDetail />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/my-profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            <Route path="/about-us" element={<AboutUs />} />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
};

export default App;
