import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { Github } from "lucide-react";

const footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold mb-4">
                <FontAwesomeIcon icon={faRightLeft} /> DBSchema
              </h3>
              <p className="text-gray-400 mb-6">
                The most powerful database schema converter for developers.
                Convert between Prisma, Mongoose, Sequelize, and more formats
                instantly.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/aliWaqas699969/DBSchema"
                  className="bg-purple-600 p-3 rounded-full hover:bg-purple-700 transition"
                >
                  <Github />
                </a>
                <span className="text-2xl mt-2">Github</span>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <p className="hover:text-white transition">
                    Schema Conversion
                  </p>
                </li>
                <li>
                  <p className="hover:text-white transition">
                    Format Detection
                  </p>
                </li>
                <li>
                  <p className="hover:text-white transition">
                    Syntax Highlighting
                  </p>
                </li>
                <li>
                  <p className="hover:text-white transition">AI converter</p>
                </li>
                <li>
                  <p className="hover:text-white transition">Export Options</p>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                {/* <li>
                  <a
                    href="#"
                    className="hover:text-white transition hover:underline"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Examples
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    API Reference
                  </a>
                </li> */}
                <li>
                  <a
                    href="/contactUs"
                    className="hover:text-white transition hover:underline"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DBSchema. Made with ❤️ for developers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default footer;
