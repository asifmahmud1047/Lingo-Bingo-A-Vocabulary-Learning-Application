import React from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

const Home = () => {
  return (
    <div className="p-4">
      <section className="text-center my-8">
        <h1 className="text-4xl font-bold">Welcome to Lingo Bingo!</h1>
        <p className="mt-4">
          Learn new languages in a fun and interactive way.
        </p>
      </section>
      <section className="my-8">
        <h2 className="text-2xl font-bold">About Us</h2>
        <p className="mt-4">
          Lingo Bingo is designed to help you expand your vocabulary and improve
          your communication skills in multiple languages.
        </p>
      </section>
      <section className="my-8">
        <h2 className="text-2xl font-bold">Our Success</h2>
        <div className="flex justify-around mt-4">
          <div>
            <h3 className="text-xl font-bold">
              <CountUp end={1000} duration={3} />+
            </h3>
            <p>Users</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">
              <CountUp end={50} duration={3} />+
            </h3>
            <p>Lessons</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">
              <CountUp end={200} duration={3} />+
            </h3>
            <p>Vocabularies</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">
              <CountUp end={20} duration={3} />+
            </h3>
            <p>Tutorials</p>
          </div>
        </div>
      </section>
      <section className="my-8">
        <h2 className="text-2xl font-bold">Get Started</h2>
        <Link
          to="/start-learning"
          className="text-blue-500 underline mt-4 inline-block"
        >
          Start Learning Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
