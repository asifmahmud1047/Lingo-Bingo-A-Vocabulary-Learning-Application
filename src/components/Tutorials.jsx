import { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
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

export const japaneseVideos = [
  {
    id: 1,
    title: "Japanese Alphabet - Hiragana & Katakana",
    description:
      "Learn the basics of Japanese writing systems with this comprehensive guide.",
    level: "Beginner",
    duration: "18 minutes",
    videoId: "nxTcGPFyiUc",
  },
  {
    id: 2,
    title: "Basic Japanese Greetings and Phrases",
    description:
      "Master essential Japanese greetings and common phrases for everyday conversations.",
    level: "Beginner",
    duration: "7 minutes",
    videoId: "UCjrTom0kAk",
  },
  {
    id: 3,
    title: "Japanese Numbers and Counting",
    description:
      "Learn how to count in Japanese and use numbers in daily conversation.",
    level: "Beginner",
    duration: "15 minutes",
    videoId: "qqT1oL7Edyk",
  },
  {
    id: 4,
    title: "Japanese Particles Explained",
    description:
      "Understand the essential particles in Japanese and how to use them correctly.",
    level: "Intermediate",
    duration: "17 minutes",
    videoId: "37ocL_PY-Bo",
  },
  {
    id: 5,
    title: "Japanese Verb Conjugation",
    description:
      "Master the art of Japanese verb conjugation with this detailed tutorial.",
    level: "Intermediate",
    duration: "13 minutes",
    videoId: "cGA6Tj9_lSg",
  },
  {
    id: 6,
    title: "Kanji Basics for Beginners",
    description:
      "Begin your journey into learning Japanese Kanji with this beginner-friendly guide.",
    level: "Intermediate",
    duration: "18 minutes",
    videoId: "RKWrWRFyfYo",
  },
  {
    id: 7,
    title: "Japanese Conversation Practice",
    description:
      "Practice your Japanese with real conversation examples and scenarios.",
    level: "Intermediate",
    duration: "13 minutes",
    videoId: "VE8napIxLKM",
  },
  {
    id: 8,
    title: "Advanced Japanese Grammar Patterns",
    description:
      "Take your Japanese to the next level with these advanced grammar patterns.",
    level: "Advanced",
    duration: "49 minutes",
    videoId: "UaI7UpOl-Xk",
  },
];

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

const VideoTutorial = ({ video }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md mb-8">
      <div className="aspect-w-16 aspect-h-9">
        <iframe 
          src={`https://www.youtube.com/embed/${video.videoId}`}
          title={video.title}
          className="w-full h-64 md:h-80"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            video.level === 'Beginner' ? 'bg-green-100 text-green-800' : 
            video.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-red-100 text-red-800'
          }`}>
            {video.level}
          </span>
          <span className="text-xs text-gray-500">{video.duration}</span>
        </div>
        <h3 className="text-lg font-bold mb-2">{video.title}</h3>
        <p className="text-gray-600">{video.description}</p>
      </div>
    </div>
  );
};

VideoTutorial.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired
  }).isRequired
};

const Tutorials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const { user } = useAuth();

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleLevelFilter = useCallback((level) => {
    setSelectedLevel(level);
  }, []);

  const filteredVideos = useMemo(() => {
    return japaneseVideos.filter((video) => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = selectedLevel === 'All' || video.level === selectedLevel;
      
      return matchesSearch && matchesLevel;
    });
  }, [searchTerm, selectedLevel]);

  const clearFilters = useCallback(() => {
    setSearchTerm(''); 
    setSelectedLevel('All');
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Japanese Language Tutorials</h1>
      
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
          {(searchTerm || selectedLevel !== 'All') && (
            <button 
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg bg-gray-300"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
      
      {filteredVideos.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">No tutorials match your search criteria.</p>
          <button 
            onClick={clearFilters}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {filteredVideos.map((video) => (
            <VideoTutorial key={video.id} video={video} />
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          to={user ? "/start-learning" : "/login"}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg inline-block transition-colors"
        >
          Learn Vocabularies
        </Link>
      </div>
    </div>
  );
};

export default Tutorials;