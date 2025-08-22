import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCode,
  faDownload,
  faMagic,
  faRightLeft,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";
const featuresSection = () => {
  return (
    <div>
      <section id="features" className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Everything you need to work with database schemas across different
              formats and platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-effect rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon
                  icon={faMagic}
                  className="text-white text-2xl"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Auto Detection
              </h3>
              <p className="text-gray-200">
                Automatically detects input format without manual selection.
                Just paste and convert.
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon
                  icon={faCode}
                  className="text-white text-2xl"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Syntax Highlighting
              </h3>
              <p className="text-gray-200">
                Monaco editor with syntax highlighting for easy navigation.
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon
                  icon={faBolt}
                  className="text-white text-2xl"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Real-time Conversion
              </h3>
              <p className="text-gray-200">
                See results instantly as you type. No need to wait or click
                convert buttons.
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon
                  icon={faRightLeft}
                  className="text-white text-2xl"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Multiple Formats
              </h3>
              <p className="text-gray-200">
                Support for Prisma, Mongoose, Sequelize, TypeScript, Zod, and
                more formats.
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-shield-alt text-white text-2xl"></i>
                <FontAwesomeIcon
                  icon={faRobot}
                  className="text-white text-2xl"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Convert With AI
              </h3>
              <p className="text-gray-200">
                Use the power of AI to convert your database schemas.
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-download text-white text-2xl"></i>
                <FontAwesomeIcon
                  icon={faDownload}
                  className="text-white text-2xl"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Export Options
              </h3>
              <p className="text-gray-200">
                Copy to clipboard or download as files. Multiple export formats
                available.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default featuresSection;
