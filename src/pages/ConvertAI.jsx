"use client";

import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import {
  FileText,
  Trash2,
  Code,
  Copy,
  Download,
  RefreshCw,
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const formats = {
  auto: { name: "Auto-Detect (AI will figure it out)" },
  prisma: { name: "Prisma Schema (.prisma)" },
  mongoose: { name: "Mongoose Models (.js/.ts)" },
  sequelize: { name: "Sequelize Models (.js/.ts)" },
  sql: { name: "Raw SQL DDL" },
  mysql: { name: "MySQL Schema" },
  postgres: { name: "PostgreSQL Schema" },
  sqlite: { name: "SQLite Schema" },
  ts: { name: "TypeScript Interfaces" },
  json: { name: "JSON Schema" },
  zod: { name: "Zod Validation Schema" },
  yup: { name: "Yup Validation Schema" },
  graphql: { name: "GraphQL Schema" },
  openapi: { name: "OpenAPI/Swagger Schema" },
  django: { name: "Django Models (Python)" },
  laravel: { name: "Laravel Eloquent Models (PHP)" },
  drf: { name: "Django REST Framework Serializers" },
  ruby: { name: "Ruby on Rails ActiveRecord" },
  csharp: { name: "C# Entity Framework" },
  java: { name: "Java Hibernate/JPA Entities" },
  kotlin: { name: "Kotlin Exposed ORM" },
  go: { name: "Go GORM Models" },
  rust: { name: "Rust Diesel ORM" },
  xml: { name: "XML Schema (XSD)" },
  avro: { name: "Apache Avro Schema" },
  protobuf: { name: "Protobuf (.proto)" },
};

export default function ConvertAI() {
  const [inputSchema, setInputSchema] = useState("");
  const [outputSchema, setOutputSchema] = useState("");
  const [inputFormat, setInputFormat] = useState("auto");
  const [outputFormat, setOutputFormat] = useState("prisma");
  const [loading, setLoading] = useState(false);

  const inputEditorRef = useRef(null);
  const outputEditorRef = useRef(null);

  const clearInput = () => setInputSchema("");

  const copyOutput = async () => {
    if (outputSchema) {
      await navigator.clipboard.writeText(outputSchema);
    }
  };

  const downloadOutput = () => {
    if (!outputSchema) return;
    const blob = new Blob([outputSchema], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted-schema.${outputFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleConvert = async () => {
    if (!inputSchema.trim()) return;
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
You are an expert database architect.
${
  inputFormat === "auto"
    ? `First, detect the schema type of the following code (SQL, Prisma, Mongoose, GraphQL, JSON, etc.). 
       Then convert it into a ${formats[outputFormat].name}.`
    : `Convert the following ${formats[inputFormat].name} into a ${formats[outputFormat].name}.`
}

**Instructions:**
1. Accurately map data types.
2. Translate primary keys, foreign keys, and relationships.
3. Preserve indexes and constraints.
4. For NoSQL, create logical nested structures.
5. Provide ONLY the converted schema code, no explanations or markdown.

**Source Schema:**
${inputSchema}

**Target Schema (${formats[outputFormat].name}):**
`;

      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      setOutputSchema(text.trim());
    } catch (err) {
      console.error("Conversion failed:", err);
      setOutputSchema("-- Error: Conversion failed. Check console. --");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg text-white">
      {/* header */}
      <div className="w-full z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2  rounded-lg">
                <a href="/">
                  <FontAwesomeIcon
                    icon={faRightLeft}
                    className="w-6 h-6 text-3xl"
                  />
                </a>
              </div>
              <div>
                <h1 className="text-xl font-bold">Database Schema Converter</h1>
                <p className=" text-sm">
                  Convert between 20+ schema formats with advanced support
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleConvert}
                disabled={loading || !inputSchema.trim()}
                className="flex items-center space-x-2 disabled:cursor-not-allowed cursor-pointer px-4 py-2 bg-white text-purple-600 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition duration-300"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                <span>{loading ? "Converting..." : "Convert"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Format selectors + Convert button */}

      <div className="max-w-12xl mx-auto px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 space-x-4">
            <label className="block text-sm font-medium text-slate-300">
              Input Format
            </label>
            <div className="relative">
              <select
                value={inputFormat}
                onChange={(e) => setInputFormat(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(formats).map(([key, format]) => (
                  <option key={key} value={key}>
                    {format.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Output Format
            </label>
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(formats).map(([key, format]) => (
                <option key={key} value={key}>
                  {format.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-280px)] px-6 py-6">
        {/* Input Editor */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium">Input Schema</span>
            </div>
            <button
              onClick={clearInput}
              className="p-1 hover:bg-red-700 rounded transition-colors cursor-pointer"
              title="Clear input"
            >
              <Trash2 className="w-4 h-4 text-slate-400" />
            </button>
          </div>
          <div className="flex-1 w-full relative">
            <Editor
              height="100%"
              value={inputSchema}
              onChange={(value) => setInputSchema(value || "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "monospace",
                lineNumbers: "off",
                folding: false,
                wordWrap: "on",
                automaticLayout: true,
                scrollBeyondLastLine: false,
                renderLineHighlight: "none",
                overviewRulerBorder: false,
              }}
              onMount={(editor) => {
                inputEditorRef.current = editor;
              }}
            />
            {!inputSchema && (
              <span className="absolute top-4 left-4 text-sm font-mono text-slate-500 pointer-events-none">
                Enter your Schema {formats[inputFormat].name} here...
              </span>
            )}
          </div>
        </div>

        {/* Output Editor */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium">Output Schema</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={copyOutput}
                disabled={!outputSchema}
                className="p-1 hover:bg-blue-300 rounded transition-colors disabled:opacity-50 cursor-pointer"
                title="Copy output"
              >
                <Copy className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={downloadOutput}
                disabled={!outputSchema}
                className="p-1 hover:bg-slate-700 rounded transition-colors disabled:opacity-50 cursor-pointer"
                title="Download output"
              >
                <Download className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <Editor
              height="100%"
              value={outputSchema}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "monospace",
                lineNumbers: "off",
                folding: false,
                wordWrap: "on",
                automaticLayout: true,
                scrollBeyondLastLine: false,
                renderLineHighlight: "none",
                overviewRulerBorder: false,
              }}
              onMount={(editor) => {
                outputEditorRef.current = editor;
              }}
            />
            {!outputSchema && (
              <span className="absolute top-4 left-4 text-sm font-mono text-slate-500 pointer-events-none">
                Converted schema will appear here...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
