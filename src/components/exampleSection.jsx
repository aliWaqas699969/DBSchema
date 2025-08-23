import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
const exampleSection = () => {
  return (
    <div>
      <section id="examples" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Schema Examples
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Try these example schemas to see the converter in action.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-user text-white"></i>
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-white text-2xl"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    User Management
                  </h3>
                  <p className="text-sm text-gray-500">Simple user schema</p>
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-green-400 text-sm">
                  <code>
                    model User{" "}
                    {`{
  id    String @id
  email String @unique
  name  String?
  category User[]
}`}
                  </code>
                </pre>
              </div>
              <a href="/convert">
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition cursor-pointer">
                  Start Converting
                </button>
              </a>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-shopping-cart text-white"></i>
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="text-white text-2xl"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    E-commerce
                  </h3>
                  <p className="text-sm text-gray-500">
                    Product & order schema
                  </p>
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-blue-400 text-sm">
                  <code>
                    model Product{" "}
                    {`{
  id    String @id
  name  String
  price Float
  orders Order[]
}`}
                  </code>
                </pre>
              </div>
              <a href="/convert">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                  Start Converting
                </button>
              </a>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-blog text-white"></i>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-white text-2xl"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Blog System
                  </h3>
                  <p className="text-sm text-gray-500">Posts & comments</p>
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-green-400 text-sm">
                  <code>
                    model Post{" "}
                    {`{
  id       String @id
  title    String
  content  String?
  comments Comment[]
}`}
                  </code>
                </pre>
              </div>
              <a href="/convert">
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition cursor-pointer ">
                  Start Converting
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default exampleSection;
