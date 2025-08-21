import React from "react";

const featuresSection = () => {
  return (
    <div>
      <section id="features" class="py-20 gradient-bg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p class="text-xl text-gray-200 max-w-3xl mx-auto">
              Everything you need to work with database schemas across different
              formats and platforms.
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="glass-effect rounded-2xl p-8 text-center">
              <div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-magic text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-white mb-4">Auto Detection</h3>
              <p class="text-gray-200">
                Automatically detects input format without manual selection.
                Just paste and convert.
              </p>
            </div>

            <div class="glass-effect rounded-2xl p-8 text-center">
              <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-code text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-white mb-4">
                Syntax Highlighting
              </h3>
              <p class="text-gray-200">
                Monaco editor with full syntax highlighting and autocomplete for
                all formats.
              </p>
            </div>

            <div class="glass-effect rounded-2xl p-8 text-center">
              <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-bolt text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-white mb-4">
                Real-time Conversion
              </h3>
              <p class="text-gray-200">
                See results instantly as you type. No need to wait or click
                convert buttons.
              </p>
            </div>

            <div class="glass-effect rounded-2xl p-8 text-center">
              <div class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-exchange-alt text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-white mb-4">
                Multiple Formats
              </h3>
              <p class="text-gray-200">
                Support for Prisma, Mongoose, Sequelize, TypeScript, Zod, and
                more formats.
              </p>
            </div>

            <div class="glass-effect rounded-2xl p-8 text-center">
              <div class="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-shield-alt text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-white mb-4">Error Handling</h3>
              <p class="text-gray-200">
                Smart error detection with helpful suggestions to fix schema
                issues.
              </p>
            </div>

            <div class="glass-effect rounded-2xl p-8 text-center">
              <div class="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-download text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-white mb-4">Export Options</h3>
              <p class="text-gray-200">
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
