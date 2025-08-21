import React from "react";

const exampleSection = () => {
  return (
    <div>
      <section id="examples" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">
              Schema Examples
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Try these example schemas to see the converter in action.
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition duration-300">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <i class="fas fa-user text-white"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900">
                    User Management
                  </h3>
                  <p class="text-sm text-gray-500">Simple user schema</p>
                </div>
              </div>
              <div class="bg-gray-900 rounded-lg p-4 mb-4">
                <pre class="text-green-400 text-sm">
                  <code>
                    model User{" "}
                    {`{
  id    String @id
  email String @unique
  name  String?
}`}
                  </code>
                </pre>
              </div>
              <button
                onclick="loadUserExample()"
                class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Load Example
              </button>
            </div>

            <div class="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition duration-300">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <i class="fas fa-shopping-cart text-white"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900">E-commerce</h3>
                  <p class="text-sm text-gray-500">Product & order schema</p>
                </div>
              </div>
              <div class="bg-gray-900 rounded-lg p-4 mb-4">
                <pre class="text-blue-400 text-sm">
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
              <button
                onclick="loadEcommerceExample()"
                class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Load Example
              </button>
            </div>

            <div class="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition duration-300">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                  <i class="fas fa-blog text-white"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900">Blog System</h3>
                  <p class="text-sm text-gray-500">Posts & comments</p>
                </div>
              </div>
              <div class="bg-gray-900 rounded-lg p-4 mb-4">
                <pre class="text-green-400 text-sm">
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
              <button
                onclick="loadBlogExample()"
                class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Load Example
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default exampleSection;
