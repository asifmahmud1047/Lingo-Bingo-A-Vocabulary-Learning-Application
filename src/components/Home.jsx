import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
      title: "Learn Japanese with Lingo Bingo",
      description: "Master the Japanese language in a fun and interactive way."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1953&q=80",
      title: "Build Your Vocabulary",
      description: "Expand your Japanese vocabulary with our proven learning methods."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      title: "Immerse in Japanese Culture",
      description: "Explore the rich culture and traditions behind the language."
    }
  ];

  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div>
      {/* Banner/Slider Section */}
      <section className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-center">
                {slide.title}
              </h2>
              <p className="text-sm sm:text-base md:text-xl text-center max-w-2xl px-2">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-10 sm:py-16 px-4 bg-blue-50" data-aos="fade-up">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">About Lingo Bingo</h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 px-2">
            Lingo Bingo is designed to help you expand your Japanese vocabulary
            and improve your communication skills through interactive lessons,
            engaging tutorials, and practical exercises. Our platform makes
            learning Japanese fun and effective, whether you&apos;re a beginner
            or looking to advance your language skills.
          </p>
          <Link
            to="/start-learning"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg inline-block transition-colors"
          >
            Start Learning
          </Link>
        </div>
      </section>

      {/* Success Section */}
      <section className="py-10 sm:py-16 px-4" data-aos="fade-up">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-center">
            Our Success by Numbers
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="text-2xl sm:text-4xl font-bold text-blue-500 mb-2">
                <CountUp end={5000} duration={2.5} separator="," />+
              </div>
              <p className="text-gray-600 text-sm sm:text-base">Happy Users</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="text-2xl sm:text-4xl font-bold text-blue-500 mb-2">
                <CountUp end={60} duration={2.5} />+
              </div>
              <p className="text-gray-600 text-sm sm:text-base">Vocabulary Words</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="text-2xl sm:text-4xl font-bold text-blue-500 mb-2">
                <CountUp end={10} duration={2.5} />
              </div>
              <p className="text-gray-600 text-sm sm:text-base">Lessons</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="text-2xl sm:text-4xl font-bold text-blue-500 mb-2">
                <CountUp end={8} duration={2.5} />
              </div>
              <p className="text-gray-600 text-sm sm:text-base">Tutorials</p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Method Section */}
      <section className="py-10 sm:py-16 px-4 bg-gray-50" data-aos="fade-up">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-center">
            Our Learning Method
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-blue-500 text-xl sm:text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Learn</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Study new vocabulary with clear examples and pronunciation
                guides.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-blue-500 text-xl sm:text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Practice</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Reinforce your learning through interactive exercises and
                quizzes.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center sm:col-span-2 md:col-span-1 mx-auto sm:mx-0 max-w-xs sm:max-w-full">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-blue-500 text-xl sm:text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Master</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Apply your knowledge in real-life scenarios to achieve fluency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-10 sm:py-16 px-4" data-aos="fade-up">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-center">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-3 sm:mb-4">
                <img
                  src="https://i.pravatar.cc/150?img=1"
                  alt="User 1"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
                />
                <div>
                  <h3 className="font-bold text-sm sm:text-base">Sarah Johnson</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Student</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm sm:text-base">
                &ldquo;Lingo Bingo made learning Japanese enjoyable and
                accessible. The bite-sized lessons fit perfectly into my busy
                schedule!&rdquo;
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-3 sm:mb-4">
                <img
                  src="https://i.pravatar.cc/150?img=59"
                  alt="User 2"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
                />
                <div>
                  <h3 className="font-bold text-sm sm:text-base">Michael Lee</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Business Professional</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm sm:text-base">
                &ldquo;I needed to learn Japanese for business travel. This
                platform provided exactly what I needed to communicate
                confidently with my colleagues.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="py-10 sm:py-16 px-4 bg-blue-500 text-white text-center"
        data-aos="fade-up"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
            Ready to Start Your Japanese Journey?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 px-2">
            Join thousands of happy learners and begin your path to Japanese
            fluency today.
          </p>
          <Link
            to="/start-learning"
            className="bg-white text-blue-500 hover:bg-blue-50 py-2 sm:py-3 px-6 sm:px-8 rounded-lg inline-block transition-colors font-bold text-base sm:text-lg"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
