import React from "react";

const schemaConverter = () => {
  return (
    <div>
      <section id="converter" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">
              Schema Converter
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Paste your schema in any supported format and get instant
              conversion to multiple output formats.
            </p>
          </div>

          {/* <!-- Format Selection --> */}
          <div class="mb-8">
            <div class="flex flex-wrap justify-center gap-4 mb-6">
              <button
                onclick="setInputFormat('auto')"
                class="format-btn active bg-purple-600 text-white px-6 py-2 rounded-full"
              >
                <i class="fas fa-magic mr-2"></i>Auto Detect
              </button>
              <button
                onclick="setInputFormat('prisma')"
                class="format-btn bg-gray-200 text-gray-700 px-6 py-2 rounded-full"
              >
                <i class="fab fa-prisma mr-2"></i>Prisma
              </button>
              <button
                onclick="setInputFormat('mongoose')"
                class="format-btn bg-gray-200 text-gray-700 px-6 py-2 rounded-full"
              >
                <i class="fas fa-leaf mr-2"></i>Mongoose
              </button>
              <button
                onclick="setInputFormat('sequelize')"
                class="format-btn bg-gray-200 text-gray-700 px-6 py-2 rounded-full"
              >
                <i class="fas fa-database mr-2"></i>Sequelize
              </button>
            </div>
          </div>

          {/* <!-- Converter Interface --> */}
          <div class="grid lg:grid-cols-2 gap-8">
            {/* <!-- Input Editor --> */}
            <div class="bg-gray-50 rounded-2xl p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-semibold text-gray-900">
                  Input Schema
                </h3>
                <div class="flex gap-2">
                  <button
                    onclick="loadExample()"
                    class="text-sm bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200"
                  >
                    <i class="fas fa-file-code mr-1"></i>Load Example
                  </button>
                  <button
                    onclick="clearInput()"
                    class="text-sm bg-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300"
                  >
                    <i class="fas fa-trash mr-1"></i>Clear
                  </button>
                </div>
              </div>
              <div id="input-editor" class="code-editor"></div>
              <div class="mt-4 flex items-center gap-4">
                <span class="text-sm text-gray-500">Detected Format:</span>
                <span
                  id="detected-format"
                  class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  None
                </span>
              </div>
            </div>

            {/* <!-- Output Editor --> */}
            <div class="bg-gray-50 rounded-2xl p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-semibold text-gray-900">Output</h3>
                <div class="flex gap-2">
                  <select
                    id="output-format"
                    onchange="convertSchema()"
                    class="text-sm bg-white border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="prisma">Prisma</option>
                    <option value="mongoose">Mongoose</option>
                    <option value="sequelize">Sequelize</option>
                    <option value="typescript">TypeScript</option>
                    <option value="zod">Zod Schema</option>
                  </select>
                  <button
                    onclick="copyOutput()"
                    class="text-sm bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200"
                  >
                    <i class="fas fa-copy mr-1"></i>Copy
                  </button>
                </div>
              </div>
              <div id="output-editor" class="code-editor"></div>
              <div class="mt-4 flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <span class="text-sm text-gray-500">Conversion Status:</span>
                  <span
                    id="conversion-status"
                    class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    Ready
                  </span>
                </div>
                <div id="conversion-stats" class="text-sm text-gray-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default schemaConverter;
