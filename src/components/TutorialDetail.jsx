import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { tutorialsData } from './Tutorials';
import useTutorialProgress from '../hooks/useTutorialProgress';
import { useAuth } from '../hooks/useAuth';

// Define tutorial sections outside the component to prevent re-creation on each render
const tutorialSections = [
  {
    title: "Introduction",
    content: "This section introduces the core concepts of the tutorial and what you'll learn."
  },
  {
    title: "Main Content",
    content: "Here's where the primary learning material is presented with examples and explanations."
  },
  {
    title: "Practice Exercises",
    content: "Try these exercises to reinforce what you've learned in this tutorial."
  },
  {
    title: "Summary",
    content: "A recap of the key points covered in this tutorial."
  }
];

const TutorialDetail = () => {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    startTutorial, 
    completeTutorial, 
    isTutorialCompleted, 
    isTutorialInProgress 
  } = useTutorialProgress();

  // Get the tutorial data immediately without artificial delay
  useEffect(() => {
    const foundTutorial = tutorialsData.find(t => t.id === parseInt(id));
    setTutorial(foundTutorial);
    
    if (foundTutorial && user) {
      startTutorial(foundTutorial.id);
    }
    
    setLoading(false);
  }, [id, startTutorial, user]);

  // Memoize the tutorial status to avoid unnecessary calculations
  const { isCompleted, isInProgress } = useMemo(() => {
    return {
      isCompleted: user && tutorial ? isTutorialCompleted(tutorial.id) : false,
      isInProgress: user && tutorial ? isTutorialInProgress(tutorial.id) : false
    };
  }, [user, tutorial, isTutorialCompleted, isTutorialInProgress]);

  const nextSection = useCallback(() => {
    if (currentSection < tutorialSections.length - 1) {
      setCurrentSection(prev => prev + 1);
    }
  }, [currentSection]);

  const prevSection = useCallback(() => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  }, [currentSection]);

  const handleCompleteTutorial = useCallback(() => {
    if (tutorial && user) {
      completeTutorial(tutorial.id);
    }
    navigate('/tutorials');
  }, [tutorial, user, completeTutorial, navigate]);

  // Render the loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Render the 404 state
  if (!tutorial) {
    return (
      <div className="p-4 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Tutorial Not Found</h1>
        <p className="mb-4">Sorry, we couldn&apos;t find the tutorial you&apos;re looking for.</p>
        <Link to="/tutorials" className="text-blue-500 underline">
          Back to Tutorials
        </Link>
      </div>
    );
  }

  // Prepare the level class
  const levelClass = tutorial.level === 'Beginner' 
    ? 'bg-green-100 text-green-800' 
    : tutorial.level === 'Intermediate' 
      ? 'bg-yellow-100 text-yellow-800' 
      : 'bg-red-100 text-red-800';

  // Render the tutorial content
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <Link to="/tutorials" className="text-blue-500 flex items-center gap-2">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
          Back to Tutorials
        </Link>
        
        {user && (
          <div>
            {isCompleted ? (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Completed
              </span>
            ) : isInProgress ? (
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                In Progress
              </span>
            ) : null}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${levelClass}`}>
              {tutorial.level}
            </span>
            <span className="text-xs text-gray-500">{tutorial.duration}</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{tutorial.title}</h1>
          <p className="text-lg text-gray-600 mb-4">{tutorial.description}</p>
        </div>

        <img 
          src={tutorial.image} 
          alt={tutorial.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
          loading="lazy"
        />

        <div className="mb-6">
          <div className="flex mb-4 border-b overflow-x-auto">
            {tutorialSections.map((section, index) => (
              <button
                key={index}
                onClick={() => setCurrentSection(index)}
                className={`py-2 px-4 font-medium whitespace-nowrap ${
                  currentSection === index 
                    ? 'text-blue-500 border-b-2 border-blue-500' 
                    : 'text-gray-500'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
          
          <div className="py-4">
            <h2 className="text-xl font-bold mb-3">{tutorialSections[currentSection].title}</h2>
            <p className="text-gray-700 leading-relaxed">
              {tutorialSections[currentSection].content}
            </p>
            
            {currentSection === 2 && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-bold mb-2">Practice Exercise:</h3>
                <p className="mb-3">Complete the following exercise based on what you&apos;ve learned:</p>
                <div className="p-3 bg-white rounded border border-gray-300">
                  {/* Exercise content would go here */}
                  <p className="italic text-gray-600">Exercise content specific to the tutorial would be displayed here.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          {currentSection === 0 ? (
            <div></div> // Empty div to maintain layout with flex justify-between
          ) : (
            <button 
              onClick={prevSection}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Previous
            </button>
          )}
          
          {currentSection === tutorialSections.length - 1 ? (
            <button 
              onClick={handleCompleteTutorial}
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
            >
              Mark as Completed
            </button>
          ) : (
            <button 
              onClick={nextSection}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorialDetail; 