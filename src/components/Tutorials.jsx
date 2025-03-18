import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import useTutorialProgress from '../hooks/useTutorialProgress';
import PropTypes from 'prop-types';

export const tutorialsData = [
  {
    id: 1,
    title: "Getting Started with Language Learning",
    description: "Learn the basics of effective language learning techniques and strategies.",
    level: "Beginner",
    duration: "10 minutes",
    image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Pronunciation Techniques",
    description: "Master the art of proper pronunciation to sound like a native speaker.",
    level: "Beginner",
    duration: "15 minutes",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Vocabulary Building Strategies",
    description: "Learn effective methods to expand your vocabulary quickly and efficiently.",
    level: "Intermediate",
    duration: "12 minutes",
    image: "https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?q=80&w=2059&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Grammar Deep Dive",
    description: "Understand complex grammar rules and how to apply them correctly.",
    level: "Advanced",
    duration: "20 minutes",
    image: "https://images.unsplash.com/photo-1623027238091-b1232669fbb3?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Conversation Practice Tips",
    description: "Learn how to engage in natural conversations with confidence.",
    level: "Intermediate",
    duration: "18 minutes",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Advanced Writing Techniques",
    description: "Perfect your writing skills with advanced techniques and structures.",
    level: "Advanced",
    duration: "25 minutes",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2073&auto=format&fit=crop",
  },
];

// Preload tutorial images to improve perceived performance
const preloadImages = () => {
  tutorialsData.forEach(tutorial => {
    const img = new Image();
    img.src = tutorial.image;
  });
};

// Define TutorialCard component outside the main component
const TutorialCard = ({ tutorial, isCompleted, isInProgress }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
      <div className="relative">
        <img 
          src={tutorial.image} 
          alt={tutorial.title} 
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        {(isCompleted || isInProgress) && (
          <div className="absolute top-2 right-2">
            {isCompleted ? (
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                Completed
              </span>
            ) : (
              <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">
                In Progress
              </span>
            )}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            tutorial.level === 'Beginner' ? 'bg-green-100 text-green-800' : 
            tutorial.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-red-100 text-red-800'
          }`}>
            {tutorial.level}
          </span>
          <span className="text-xs text-gray-500">{tutorial.duration}</span>
        </div>
        <h3 className="text-lg font-bold mb-2">{tutorial.title}</h3>
        <p className="text-gray-600 mb-4">{tutorial.description}</p>
        <Link 
          to={`/tutorials/${tutorial.id}`} 
          className={`block w-full py-2 rounded-lg text-center ${
            isCompleted 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isCompleted 
            ? 'Review Tutorial' 
            : isInProgress 
            ? 'Continue Tutorial' 
            : 'Start Tutorial'}
        </Link>
      </div>
    </div>
  );
};

// Add PropTypes for TutorialCard
TutorialCard.propTypes = {
  tutorial: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  isCompleted: PropTypes.bool.isRequired,
  isInProgress: PropTypes.bool.isRequired
};

const Tutorials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const { user } = useAuth();
  const { 
    isTutorialCompleted, 
    isTutorialInProgress,
    getTutorialProgressPercentage 
  } = useTutorialProgress();

  // Create a unique key for forcing re-render when returning to the tutorials page
  const [updateKey, setUpdateKey] = useState(0);

  // Preload images on component mount
  useEffect(() => {
    preloadImages();
  }, []);

  // Force update on component mount to ensure latest progress is shown
  useEffect(() => {
    setUpdateKey(prev => prev + 1);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleLevelFilter = useCallback((level) => {
    setSelectedLevel(level);
  }, []);

  const filteredTutorials = useMemo(() => {
    return tutorialsData.filter((tutorial) => {
      const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = selectedLevel === 'All' || tutorial.level === selectedLevel;
      
      return matchesSearch && matchesLevel;
    });
  }, [searchTerm, selectedLevel]);

  const progressPercentage = useMemo(() => {
    // Add updateKey dependency to ensure re-calculation when returning to page
    return user ? getTutorialProgressPercentage(tutorialsData.length) : 0;
  }, [user, getTutorialProgressPercentage, tutorialsData.length, updateKey]);

  const clearFilters = useCallback(() => {
    setSearchTerm(''); 
    setSelectedLevel('All');
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Language Learning Tutorials</h1>
      
      {user && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Your Progress</h2>
            <span className="text-blue-500 font-bold">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-500 h-2.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="mb-8 flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-grow max-w-lg">
          <input
            type="text"
            placeholder="Search tutorials..."
            className="w-full p-2 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            width="16" 
            height="16" 
            fill="currentColor" 
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => handleLevelFilter('All')} 
            className={`px-4 py-2 rounded-lg ${selectedLevel === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            All Levels
          </button>
          <button 
            onClick={() => handleLevelFilter('Beginner')} 
            className={`px-4 py-2 rounded-lg ${selectedLevel === 'Beginner' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Beginner
          </button>
          <button 
            onClick={() => handleLevelFilter('Intermediate')} 
            className={`px-4 py-2 rounded-lg ${selectedLevel === 'Intermediate' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Intermediate
          </button>
          <button 
            onClick={() => handleLevelFilter('Advanced')} 
            className={`px-4 py-2 rounded-lg ${selectedLevel === 'Advanced' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Advanced
          </button>
        </div>
      </div>
      
      {filteredTutorials.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500">No tutorials found matching your criteria.</p>
          <button 
            onClick={clearFilters} 
            className="mt-4 text-blue-500 underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial) => {
            // Recalculate status on every render to ensure it's up to date
            const isCompleted = user && isTutorialCompleted(tutorial.id);
            const isInProgress = user && isTutorialInProgress(tutorial.id);
            
            return (
              <TutorialCard 
                key={`${tutorial.id}-${updateKey}`} 
                tutorial={tutorial} 
                isCompleted={Boolean(isCompleted)}
                isInProgress={Boolean(isInProgress)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Tutorials;