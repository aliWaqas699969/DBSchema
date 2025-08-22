import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faRobot } from "@fortawesome/free-solid-svg-icons";

const hero = () => {
  return (
    <section
      id="home"
      className="gradient-bg min-h-screen flex items-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="floating-animation">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Convert Database <br></br>
            <span className="typing-effect">Schemas Instantly</span>
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Transform your database schemas between Prisma, Mongoose, Sequelize,
          and more formats with just one click.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <a href="/convert">
            <button className="cursor-pointer bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition duration-300">
              <FontAwesomeIcon icon={faRocket} /> Start Converting
            </button>
          </a>
          <a href="/convertAI">
            <button className=" cursor-pointer border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transform hover:scale-105 transition duration-300">
              <FontAwesomeIcon icon={faRobot} /> Convert with AI
            </button>
          </a>
        </div>

        {/* <!-- Stats --> */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div
              className="text-3xl font-bold text-white"
              id="conversions-count"
            >
              210
            </div>
            <div className="text-gray-200">Conversions Made</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">6+</div>
            <div className="text-gray-200">Formats Supported</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">100%</div>
            <div className="text-gray-200">Free to Use</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">⚡</div>
            <div className="text-gray-200">Instant Results</div>
          </div>
        </div>
      </div>

      {/* <!-- Floating Code Examples --> */}
      <div className="absolute top-20 left-10 bg-gray-900 p-4 rounded-lg shadow-lg opacity-80 hidden lg:block floating-animation animation-delay: -2s;  animation-duration: -2s;">
        <pre className="text-green-400 text-sm">
          <code>
            model User{" "}
            {`{
  id    String @id
  email String @unique
  }`}
          </code>
        </pre>
      </div>
      <div className="absolute bottom-20 right-10 bg-gray-900 p-4 rounded-lg shadow-lg opacity-80 hidden lg:block floating-animation animation-delay: -4s;">
        <pre className="text-blue-400 text-sm">
          <code>
            const UserSchema ={" "}
            {`{
  email: { type: String }
}`}
          </code>
        </pre>
      </div>
    </section>
  );
};

export default hero;
