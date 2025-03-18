import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/start-learning" element={<StartLearning />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/tutorials/:id" element={<TutorialDetail />} />
            <Route path="/my-profile" element={<Profile />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route
              path="*"
              element={
                <div className="text-center text-red-500">404 Not Found</div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
