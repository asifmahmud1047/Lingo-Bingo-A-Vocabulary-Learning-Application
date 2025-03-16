import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const StartLearning = () => {
  const { user } = useAuth();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Start Learning</h1>
      
      {!user ? (
        <div className="bg-yellow-100 p-4 rounded-lg mb-6">
          <p className="mb-2">You need to be logged in to track your progress.</p>
          <Link to="/login" className="text-blue-500 underline">
            Login here
          </Link>
          {" or "}
          <Link to="/register" className="text-blue-500 underline">
            Register for a new account
          </Link>
        </div>
      ) : (
        <p className="mb-6">Welcome back, {user.displayName || "Learner"}! Ready to continue your language journey?</p>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Beginner Level</h2>
          <p className="mb-4">Start with basic vocabulary and simple phrases.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Start Beginner Lessons
          </button>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Intermediate Level</h2>
          <p className="mb-4">Expand your vocabulary and learn more complex sentences.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Start Intermediate Lessons
          </button>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Advanced Level</h2>
          <p className="mb-4">Master advanced vocabulary and fluent conversations.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Start Advanced Lessons
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartLearning; 