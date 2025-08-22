import { useState } from "react";
// import { CheckCircleIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { CheckCircle, SparkleIcon } from "lucide-react";

export default function SchemaConverter() {
  const [mode, setMode] = useState("rule");

  const ruleFormats = [
    "Prisma",
    "Mongoose",
    "Sequelize",
    "TypeORM",
    "GraphQL",
    "JSON Schema",
    "MySQL",
    "Postgres",
    "MongoDB",
    "SQLite",
  ];

  const aiFormats = [
    "Prisma",
    "Mongoose",
    "Sequelize",
    "TypeORM",
    "GraphQL",
    "JSON Schema",
    "MySQL",
    "Postgres",
    "MongoDB",
    "SQLite",
    "Supabase",
    "Firestore",
    "Hasura",
    "Drizzle",
    "Knex",
    "Oracle",
    "SQL Server",
    "DynamoDB",
    "Cassandra",
    "Redis",
    "OpenAPI",
    "Avro",
    "YAML",
  ];

  return (
    <section
      id="converter"
      className="w-full py-20 bg-gradient-to-b from-white to-slate-50"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold mb-4">Schema Converter</h2>
        <p className="text-slate-600 mb-10 max-w-2xl mx-auto">
          Convert your database schemas into multiple formats instantly. Choose
          between our fast{" "}
          <span className="font-semibold">Rule-Based Converter</span>
          or our powerful{" "}
          <span className="font-semibold">AI-Powered Converter</span>.
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => setMode("rule")}
            className={`px-6 py-2 rounded-l-lg border transition cursor-pointer ${
              mode === "rule"
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            }`}
          >
            ⚡ Rule-Based
          </button>
          <button
            onClick={() => setMode("ai")}
            className={`px-6 py-2 rounded-r-lg border transition cursor-pointer  ${
              mode === "ai"
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            }`}
          >
            🤖 AI-Powered
          </button>
        </div>

        {/* Side-by-side Visual */}
        <div className="grid md:grid-cols-3 gap-6 items-center mb-12">
          {/* Input */}
          <div className="p-6 rounded-xl border bg-white shadow">
            <h3 className="text-lg font-semibold mb-2">📥 Input Schema</h3>
            <p className="text-slate-600 text-sm">
              Paste your schema in any supported format.
            </p>
          </div>

          {/* Converter */}
          <div className="p-6 rounded-xl border bg-white shadow relative">
            <h3 className="text-lg font-semibold mb-2">
              {mode === "rule" ? "⚡ Rule-Based Converter" : "🤖 AI Converter"}
            </h3>
            <p className="text-slate-600 text-sm mb-3">
              {mode === "rule"
                ? "Supports 10 popular formats with blazing fast conversion."
                : "Unlock 20+ formats with intelligent AI-powered conversion."}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {(mode === "rule" ? ruleFormats : aiFormats)
                .slice(0, 6)
                .map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-700"
                  >
                    {f}
                  </span>
                ))}
              {mode === "ai" && (
                <span className="px-3 py-1 text-sm rounded-full bg-slate-200 text-slate-600">
                  + more
                </span>
              )}
            </div>
          </div>

          {/* Output */}
          <div className="p-6 rounded-xl border bg-white shadow">
            <h3 className="text-lg font-semibold mb-2">📤 Output Schema</h3>
            <p className="text-slate-600 text-sm">
              Get your schema instantly in the format you choose.
            </p>
          </div>
        </div>

        {/* Feature List */}
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="p-6 rounded-xl border bg-white shadow">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Rule-Based Converter
            </h3>
            <p className="text-slate-600 text-sm mb-3">
              Built with deterministic parsing logic, ensuring fast and reliable
              conversions across the 10 most common schema formats.
            </p>
            <ul className="grid grid-cols-2 gap-2 text-sm text-slate-700">
              {ruleFormats.map((f) => (
                <li key={f}>✅ {f}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-xl border bg-white shadow">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <SparkleIcon className="w-5 h-5 text-purple-500" />
              AI-Powered Converter
            </h3>
            <p className="text-slate-600 text-sm mb-3">
              Backed by advanced AI, supporting 20+ formats with flexibility for
              evolving database ecosystems.
            </p>
            <ul className="grid grid-cols-2 gap-2 text-sm text-slate-700">
              {aiFormats.slice(0, 10).map((f) => (
                <li key={f}>✨ {f}</li>
              ))}
              <li>...and more</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
