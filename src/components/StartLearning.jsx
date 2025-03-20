import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const StartLearning = () => {
  const { user } = useAuth();
  const lessons = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Let&apos;s Learn Japanese
      </h1>

      {!user ? (
        <div className="bg-yellow-100 p-4 rounded-lg mb-6 text-center">
          <p className="mb-2">
            You need to be logged in to access the lessons and track your
            progress.
          </p>
          <Link to="/login" className="text-blue-500 underline">
            Login here
          </Link>
          {" or "}
          <Link to="/register" className="text-blue-500 underline">
            Register for a new account
          </Link>
        </div>
      ) : (
        <p className="mb-6 text-center">
          Welcome back, {user.displayName || "Learner"}! Ready to continue your
          Japanese language journey?
        </p>
      )}

      <h2 className="text-2xl font-bold mb-4">Choose a Lesson</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
        {lessons.map((lessonNo) => (
          <Link
            key={lessonNo}
            to={user ? `/lesson/${lessonNo}` : "/login"}
            className="bg-white hover:bg-blue-50 border-2 border-blue-500 rounded-lg p-6 shadow-md text-center transition-colors"
          >
            <h3 className="text-xl font-bold">Lesson {lessonNo}</h3>
          </Link>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Japanese Alphabet Tutorial</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            width="853"
            height="480"
            src="https://www.youtube.com/embed/QRvTwpg80sw"
            title="How to Write Japanese A to z -english Calligraphy writting✒️📖"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <div className="mt-4 text-center">
          <Link
            to={user ? "/tutorials" : "/login"}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded inline-block transition-colors"
          >
            View More Tutorials
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartLearning; 

