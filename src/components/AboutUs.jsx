import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">About Lingo Bingo</h1>
      
      <section className="mb-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="mb-4 text-gray-700">
          At Lingo Bingo, our mission is to make Japanese language learning fun, accessible, and effective for everyone. 
          We believe that learning a new language should be an enjoyable journey, not a tedious task.
        </p>
        <p className="text-gray-700">
          We&apos;ve designed our platform specifically for those interested in Japanese language and culture, 
          providing a structured approach to vocabulary acquisition that helps you build confidence and fluency.
        </p>
      </section>
      
      <section className="mb-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
        <p className="mb-4 text-gray-700">
          We combine interactive learning with proven language acquisition techniques to create an engaging experience.
          Our lesson-based structure helps you progress systematically while our pronunciation feature allows you
          to hear and practice the correct sounds of Japanese words.
        </p>
        <p className="text-gray-700">
          Each vocabulary word comes with detailed usage examples, ensuring you understand not just what words mean,
          but how and when to use them in real conversations.
        </p>
      </section>
      
      <section className="mb-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">About the Developer</h2>
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <img 
            src="https://i.pravatar.cc/150?img=68" 
            alt="Developer" 
            className="w-32 h-32 rounded-full object-cover border-2 border-blue-500"
          />
          <div>
            <h3 className="text-xl font-semibold mb-2">John Smith</h3>
            <p className="mb-2 text-gray-700">
              I&apos;m a passionate web developer with experience in building interactive educational applications.
              My journey with Japanese language began during college and has grown into a lifelong interest.
            </p>
            <p className="mb-4 text-gray-700">
              I created Lingo Bingo to combine my love for web development and language learning,
              hoping to make the Japanese learning experience more enjoyable for others.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com/johnsmith" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:underline flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd"></path>
                </svg>
                GitHub
              </a>
              <a 
                href="https://linkedin.com/in/johnsmith" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Other Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Travel Explorer</h3>
            <p className="text-gray-700 mb-2">
              An interactive travel planner app that helps users discover and organize their travel itineraries.
            </p>
            <a href="#" className="text-blue-500 hover:underline">View Project</a>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Recipe Master</h3>
            <p className="text-gray-700 mb-2">
              A recipe collection app with intelligent ingredient substitution suggestions.
            </p>
            <a href="#" className="text-blue-500 hover:underline">View Project</a>
          </div>
        </div>
      </section>
      
      <div className="mt-8 text-center">
        <Link 
          to="/start-learning" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors inline-block"
        >
          Start Learning Japanese
        </Link>
      </div>
    </div>
  );
};

export default AboutUs; 