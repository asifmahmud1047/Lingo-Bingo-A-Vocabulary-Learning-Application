import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Lingo Bingo</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="mb-4">
          At Lingo Bingo, our mission is to make language learning fun, accessible, and effective for everyone. 
          We believe that learning a new language should be an enjoyable journey, not a tedious task.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
        <p className="mb-4">
          We combine gamification with proven language learning techniques to create an engaging experience.
          Our unique bingo-style learning method helps you remember vocabulary more effectively through repetition and association.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Team</h2>
        <p className="mb-4">
          Our team consists of language experts, educators, and technology enthusiasts who are passionate about creating
          the best language learning experience possible.
        </p>
      </section>
      
      <div className="mt-8">
        <Link to="/start-learning" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
          Start Learning Now
        </Link>
      </div>
    </div>
  );
};

export default AboutUs; 