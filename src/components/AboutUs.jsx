import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center">About Lingo Bingo</h1>
      
      <section className="mb-6 sm:mb-10 bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Our Mission</h2>
        <p className="mb-3 sm:mb-4 text-gray-700 text-sm sm:text-base">
          At Lingo Bingo, our mission is to make Japanese language learning fun, accessible, and effective for everyone. 
          We believe that learning a new language should be an enjoyable journey, not a tedious task.
        </p>
        <p className="text-gray-700 text-sm sm:text-base">
          We&apos;ve designed our platform specifically for those interested in Japanese language and culture, 
          providing a structured approach to vocabulary acquisition that helps you build confidence and fluency.
        </p>
      </section>
      
      <section className="mb-6 sm:mb-10 bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Our Approach</h2>
        <p className="mb-3 sm:mb-4 text-gray-700 text-sm sm:text-base">
          We combine interactive learning with proven language acquisition techniques to create an engaging experience.
          Our lesson-based structure helps you progress systematically while our pronunciation feature allows you
          to hear and practice the correct sounds of Japanese words.
        </p>
        <p className="text-gray-700 text-sm sm:text-base">
          Each vocabulary word comes with detailed usage examples, ensuring you understand not just what words mean,
          but how and when to use them in real conversations.
        </p>
      </section>
      
      <div className="mt-6 sm:mt-8 text-center">
        <Link 
          to="/start-learning" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors inline-block text-sm sm:text-base"
        >
          Start Learning Japanese
        </Link>
      </div>
    </div>
  );
};

export default AboutUs; 