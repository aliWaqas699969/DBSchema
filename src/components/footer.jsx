import React from "react";

const footer = () => {
  return (
    <div>
      <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-4 gap-8">
            <div class="col-span-2">
              <h3 class="text-2xl font-bold mb-4">
                <i class="fas fa-exchange-alt mr-2"></i>SchemaFlow
              </h3>
              <p class="text-gray-400 mb-6">
                The most powerful database schema converter for developers.
                Convert between Prisma, Mongoose, Sequelize, and more formats
                instantly.
              </p>
              <div class="flex space-x-4">
                <a
                  href="#"
                  class="bg-purple-600 p-3 rounded-full hover:bg-purple-700 transition"
                >
                  <i class="fab fa-github"></i>
                </a>
                <a
                  href="#"
                  class="bg-purple-600 p-3 rounded-full hover:bg-purple-700 transition"
                >
                  <i class="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  class="bg-purple-600 p-3 rounded-full hover:bg-purple-700 transition"
                >
                  <i class="fab fa-discord"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4">Features</h4>
              <ul class="space-y-2 text-gray-400">
                <li>
                  <a href="#" class="hover:text-white transition">
                    Schema Conversion
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:text-white transition">
                    Format Detection
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:text-white transition">
                    Syntax Highlighting
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:text-white transition">
                    Export Options
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4">Support</h4>
              <ul class="space-y-2 text-gray-400">
                <li>
                  <a href="#" class="hover:text-white transition">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:text-white transition">
                    Examples
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:text-white transition">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:text-white transition">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DBSchema. Made with ❤️ for developers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default footer;
