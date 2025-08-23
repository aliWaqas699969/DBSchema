import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import Editor from "@monaco-editor/react";
import {
  Copy,
  Download,
  Trash2,
  RefreshCw,
  FileText,
  Database,
  Code,
  Settings,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
const Convert = () => {
  const [inputSchema, setInputSchema] = useState(`model User {
  id    String @id @default(uuid())
  email String @unique
  name  String?
  role  Role   @default(USER)
}

enum Role {
  USER
  ADMIN
}`);
  const [outputSchema, setOutputSchema] = useState("");
  const [inputFormat, setInputFormat] = useState("prisma");
  const [outputFormat, setOutputFormat] = useState("mongoose");
  const [isConverting, setIsConverting] = useState(false);
  const [detectedFormat, setDetectedFormat] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputEditorRef = useRef(null);
  const outputEditorRef = useRef(null);

  const formats = {
    prisma: { name: "Prisma Schema", ext: ".prisma", icon: Database },
    mongoose: { name: "Mongoose Models", ext: ".js", icon: Code },
    sequelize: { name: "Sequelize Models", ext: ".js", icon: Code },
    sql: { name: "Raw SQL DDL", ext: ".sql", icon: Database },
    typescript: { name: "TypeScript Interfaces", ext: ".ts", icon: FileText },
    jsonschema: { name: "JSON Schema", ext: ".json", icon: FileText },
    zod: { name: "Zod Validation", ext: ".ts", icon: Settings },
    graphql: { name: "GraphQL Schema", ext: ".graphql", icon: Code },
    openapi: { name: "OpenAPI/Swagger", ext: ".yaml", icon: FileText },
    django: { name: "Django Models", ext: ".py", icon: Code },
  };

  // Auto-detect schema format
  const detectSchemaFormat = (schema) => {
    if (!schema.trim()) return "";

    // Prisma detection
    if (
      schema.includes("model ") &&
      schema.includes("@") &&
      (schema.includes("@@map") ||
        schema.includes("@id") ||
        schema.includes("@unique"))
    ) {
      return "prisma";
    }

    // Mongoose detection
    if (
      schema.includes("mongoose.Schema") ||
      schema.includes("new Schema") ||
      schema.includes("mongoose.model")
    ) {
      return "mongoose";
    }

    // Sequelize detection
    if (
      schema.includes("sequelize.define") ||
      schema.includes("DataTypes.") ||
      schema.includes("Sequelize.")
    ) {
      return "sequelize";
    }

    // SQL detection
    if (
      schema.toUpperCase().includes("CREATE TABLE") ||
      schema.toUpperCase().includes("ALTER TABLE") ||
      schema.toUpperCase().includes("DROP TABLE")
    ) {
      return "sql";
    }

    // TypeScript interface detection
    if (
      schema.includes("interface ") &&
      schema.includes("{") &&
      schema.includes("}") &&
      schema.includes(":")
    ) {
      return "typescript";
    }

    // JSON Schema detection
    if (
      schema.includes('"type":') &&
      schema.includes('"properties":') &&
      (schema.includes('"string"') || schema.includes('"object"'))
    ) {
      return "jsonschema";
    }

    // Zod detection
    if (
      schema.includes("z.object") ||
      schema.includes("z.string") ||
      schema.includes("z.number") ||
      schema.includes("zod")
    ) {
      return "zod";
    }

    // GraphQL detection
    if (
      schema.includes("type ") &&
      schema.includes("{") &&
      (schema.includes("String") ||
        schema.includes("Int") ||
        schema.includes("Boolean"))
    ) {
      return "graphql";
    }

    // OpenAPI detection
    if (
      schema.includes("openapi:") ||
      schema.includes("swagger:") ||
      (schema.includes("components:") && schema.includes("schemas:"))
    ) {
      return "openapi";
    }

    // Django detection
    if (
      schema.includes("models.Model") ||
      schema.includes("models.CharField") ||
      schema.includes("models.IntegerField")
    ) {
      return "django";
    }

    return "";
  };

  // Advanced schema conversion logic
  const convertSchema = (input, fromFormat, toFormat) => {
    try {
      // Parse input schema into intermediate representation
      const parsed = parseSchema(input, fromFormat);

      // Convert to target format
      const converted = generateSchema(parsed, toFormat);

      return converted;
    } catch (err) {
      throw new Error(`Conversion failed: ${err.message}`);
    }
  };

  // Parse schema into intermediate representation
  const parseSchema = (schema, format) => {
    // const models = [];

    switch (format) {
      case "prisma":
        return parsePrismaSchema(schema);
      case "mongoose":
        return parseMongooseSchema(schema);
      case "sequelize":
        return parseSequelizeSchema(schema);
      case "sql":
        return parseSQLSchema(schema);
      case "typescript":
        return parseTypeScriptSchema(schema);
      case "jsonschema":
        return parseJSONSchema(schema);
      case "zod":
        return parseZodSchema(schema);
      case "graphql":
        return parseGraphQLSchema(schema);
      case "openapi":
        return parseOpenAPISchema(schema);
      case "django":
        return parseDjangoSchema(schema);
      default:
        throw new Error(`Unsupported input format: ${format}`);
    }
  };

  // Generate schema in target format
  const generateSchema = (parsed, format) => {
    switch (format) {
      case "prisma":
        return generatePrismaSchema(parsed);
      case "mongoose":
        return generateMongooseSchema(parsed);
      case "sequelize":
        return generateSequelizeSchema(parsed);
      case "sql":
        return generateSQLSchema(parsed);
      case "typescript":
        return generateTypeScriptSchema(parsed);
      case "jsonschema":
        return generateJSONSchema(parsed);
      case "zod":
        return generateZodSchema(parsed);
      case "graphql":
        return generateGraphQLSchema(parsed);
      case "openapi":
        return generateOpenAPISchema(parsed);
      case "django":
        return generateDjangoSchema(parsed);
      default:
        throw new Error(`Unsupported output format: ${format}`);
    }
  };

  // Prisma parsing - FIXED VERSION
  const parsePrismaSchema = (schema) => {
    const models = [];
    const enums = {};

    // First, extract enums
    const enumRegex = /enum\s+(\w+)\s*{([^}]+)}/g;
    let enumMatch;
    while ((enumMatch = enumRegex.exec(schema)) !== null) {
      const enumName = enumMatch[1];
      const enumValues = enumMatch[2]
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("//"))
        .map((line) => line.replace(/,$/, ""));

      enums[enumName] = enumValues;
    }

    // Then extract models
    const modelRegex = /model\s+(\w+)\s*{([^}]+)}/g;
    let match;

    while ((match = modelRegex.exec(schema)) !== null) {
      const modelName = match[1];
      const fields = match[2];
      const parsedFields = [];

      // Enhanced field regex to capture all field variations
      const fieldLines = fields
        .split("\n")
        .map((line) => line.trim())
        .filter(
          (line) => line && !line.startsWith("//") && !line.startsWith("@@")
        );

      fieldLines.forEach((line) => {
        // Enhanced field regex to capture optional fields and complex attributes
        const fieldMatch = line.match(/^(\w+)\s+(\w+)(\[\])?(\?)?\s*(@.*)?$/);
        if (fieldMatch) {
          const fieldName = fieldMatch[1];
          let fieldType = fieldMatch[2];
          const isArray = !!fieldMatch[3];
          const isOptional = !!fieldMatch[4];
          const attributes = fieldMatch[5] || "";

          // Extract default value more robustly
          let defaultValue = null;
          const defaultMatch = attributes.match(/@default\(([^)]+)\)/);
          if (defaultMatch) {
            defaultValue = defaultMatch[1].replace(/['"]/g, ""); // Remove quotes
          }

          const field = {
            name: fieldName,
            type: fieldType,
            isArray: isArray,
            isOptional: isOptional,
            required: !isOptional,
            unique: attributes.includes("@unique"),
            isId: attributes.includes("@id"),
            defaultValue: defaultValue,
          };

          // Handle enum types - keep enum data and set type appropriately
          if (enums[fieldType]) {
            field.enum = enums[fieldType];
            field.type = "string"; // Enums are string-based in Mongoose
          }

          // Convert Prisma types to Mongoose equivalent
          if (fieldType === "String") {
            field.type = "string";
          } else if (fieldType === "Int") {
            field.type = "number";
          } else if (fieldType === "Boolean") {
            field.type = "boolean";
          } else if (fieldType === "DateTime") {
            field.type = "date";
          }

          parsedFields.push(field);
        }
      });

      models.push({
        name: modelName,
        fields: parsedFields,
        relations: [],
        enums: enums,
      });
    }

    return models;
  };

  // Mongoose parsing
  const parseMongooseSchema = (schema) => {
    const models = [];
    const schemaRegex =
      /const\s+(\w+)Schema\s*=\s*new\s+(?:mongoose\.)?Schema\s*\(\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}\s*\)/g;
    let match;

    while ((match = schemaRegex.exec(schema)) !== null) {
      const modelName = match[1].replace("Schema", "");
      const schemaContent = match[2];
      const fields = [];

      // Parse fields with better regex that handles nested objects and arrays
      const fieldRegex = /(\w+):\s*(\[[^\]]+\]|\{[^}]+\}|[^,\n]+)(?:,|\n|$)/g;
      let fieldMatch;

      while ((fieldMatch = fieldRegex.exec(schemaContent)) !== null) {
        const fieldName = fieldMatch[1].trim();
        const fieldDef = fieldMatch[2].trim();

        let fieldObj = {
          name: fieldName,
          type: "string",
          required: false,
          unique: false,
          isArray: false,
          enum: null,
          defaultValue: null,
        };

        // Handle array of schemas like [LessonSchema]
        if (fieldDef.startsWith("[") && fieldDef.endsWith("]")) {
          const arrayContent = fieldDef.slice(1, -1).trim();
          if (arrayContent.endsWith("Schema")) {
            // Reference to another schema
            fieldObj.type = arrayContent.replace("Schema", "");
            fieldObj.isArray = true;
          } else {
            // Array of primitives like [String]
            fieldObj.type = getMongooseType(arrayContent);
            fieldObj.isArray = true;
          }
        }
        // Handle object definitions like { type: String, required: true }
        else if (fieldDef.startsWith("{") && fieldDef.endsWith("}")) {
          const objContent = fieldDef.slice(1, -1);

          // Extract type
          const typeMatch = objContent.match(/type:\s*(\w+)/);
          if (typeMatch) {
            fieldObj.type = getMongooseType(typeMatch[1]);
          }

          // Extract required
          const requiredMatch = objContent.match(/required:\s*(true|false)/);
          if (requiredMatch) {
            fieldObj.required = requiredMatch[1] === "true";
          }

          // Extract unique
          const uniqueMatch = objContent.match(/unique:\s*(true|false)/);
          if (uniqueMatch) {
            fieldObj.unique = uniqueMatch[1] === "true";
          }

          // Extract enum
          const enumMatch = objContent.match(/enum:\s*\[([^\]]+)\]/);
          if (enumMatch) {
            fieldObj.enum = enumMatch[1]
              .split(",")
              .map((v) => v.trim().replace(/['"]/g, ""));
          }

          // Extract default
          const defaultMatch = objContent.match(
            /default:\s*['"]?([^,}]+)['"]?/
          );
          if (defaultMatch) {
            fieldObj.defaultValue = defaultMatch[1];
          }
        }
        // Handle simple types like String, Number, etc.
        else {
          fieldObj.type = getMongooseType(fieldDef);
        }

        fields.push(fieldObj);
      }

      models.push({
        name: modelName,
        fields,
        relations: [],
      });
    }

    return models;
  };

  const getMongooseType = (type) => {
    if (typeof type === "string") return type.toLowerCase();
    if (type === String) return "string";
    if (type === Number) return "number";
    if (type === Boolean) return "boolean";
    if (type === Date) return "date";
    return "mixed";
  };

  // Generate Prisma schema
  const generatePrismaSchema = (models) => {
    let output = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

`;

    models.forEach((model) => {
      output += `model ${model.name} {
`;

      // Add auto ID if not present
      const hasId = model.fields.some(
        (field) => field.isId || field.name === "id"
      );
      if (!hasId) {
        output += `  id Int @id @default(autoincrement())\n`;
      }

      model.fields.forEach((field) => {
        let fieldLine = `  ${field.name} `;

        // Handle relations (references to other models)
        if (field.isArray && models.some((m) => m.name === field.type)) {
          // One-to-many relation
          fieldLine += `${field.type}[]`;
        } else if (models.some((m) => m.name === field.type)) {
          // One-to-one relation
          fieldLine += `${field.type}?`;
        } else {
          // Regular field
          fieldLine += getPrismaType(field.type);
          if (field.isArray) fieldLine += "[]";
          if (!field.required) fieldLine += "?";
        }

        const attributes = [];
        if (field.isId) attributes.push("@id @default(autoincrement())");
        if (field.unique) attributes.push("@unique");
        if (field.defaultValue && !field.isId) {
          if (typeof field.defaultValue === "string") {
            attributes.push(`@default("${field.defaultValue}")`);
          } else {
            attributes.push(`@default(${field.defaultValue})`);
          }
        }

        if (attributes.length > 0) {
          fieldLine += " " + attributes.join(" ");
        }

        output += fieldLine + "\n";
      });

      output += "}\n\n";
    });

    return output;
  };

  const getPrismaType = (type) => {
    const typeMap = {
      string: "String",
      number: "Int",
      boolean: "Boolean",
      date: "DateTime",
      float: "Float",
    };
    // If it's a reference to another model, return as-is
    return typeMap[type] || type;
  };

  // Generate Mongoose schema - FIXED VERSION
  const generateMongooseSchema = (models) => {
    let output = `const mongoose = require('mongoose');

`;

    models.forEach((model) => {
      // Generate enum objects first if they exist
      const modelEnums = {};
      model.fields.forEach((field) => {
        if (field.enum) {
          const enumName =
            field.name.charAt(0).toUpperCase() + field.name.slice(1);
          if (!modelEnums[enumName]) {
            modelEnums[enumName] = field.enum;
          }
        }
      });

      // Generate enum constants
      Object.entries(modelEnums).forEach(([enumName, enumValues]) => {
        output += `const ${enumName} = {
  values: [${enumValues.map((v) => `'${v}'`).join(", ")}],
  message: 'enum validator failed for path \`{PATH}\` with value \`{VALUE}\`'
};

`;
      });

      // Generate schema
      output += `const ${model.name.toLowerCase()}Schema = new mongoose.Schema({
`;

      model.fields.forEach((field, index) => {
        // Skip auto-generated Prisma IDs, but handle custom string IDs
        if (field.isId && field.name === "id" && field.type !== "string")
          return;

        let fieldDef = `  ${field.name}: `;

        // Handle simple types vs complex field definitions
        const needsComplexDef =
          field.required ||
          field.unique ||
          field.enum ||
          field.defaultValue ||
          (field.isId && field.type === "string") ||
          field.isArray;

        if (!needsComplexDef && field.type !== "string") {
          // Simple field definition
          fieldDef += getMongooseTypeString(field.type);
        } else {
          // Complex field definition
          const fieldOptions = [];

          if (field.isId && field.type === "string") {
            fieldOptions.push("type: String");
            fieldOptions.push("required: true");
            fieldOptions.push("unique: true");
            if (field.defaultValue === "uuid") {
              fieldOptions.push("default: mongoose.Types.UUID");
            }
          } else {
            fieldOptions.push(`type: ${getMongooseTypeString(field.type)}`);

            if (field.required) fieldOptions.push("required: true");
            else if (field.isOptional && field.type === "string")
              fieldOptions.push("required: false");

            if (field.unique) fieldOptions.push("unique: true");

            if (field.enum) {
              const enumName =
                field.name.charAt(0).toUpperCase() + field.name.slice(1);
              fieldOptions.push(`enum: ${enumName}.values`);
            }

            if (
              field.defaultValue &&
              field.defaultValue !== "uuid" &&
              field.defaultValue !== "autoincrement"
            ) {
              let defaultVal = field.defaultValue;
              if (field.enum && field.enum.includes(defaultVal)) {
                defaultVal = `'${defaultVal}'`;
              } else if (
                typeof defaultVal === "string" &&
                !defaultVal.startsWith("'")
              ) {
                defaultVal = `'${defaultVal}'`;
              }
              fieldOptions.push(`default: ${defaultVal}`);
            }
          }

          fieldDef += `{
    ${fieldOptions.join(",\n    ")}
  }`;
        }

        // Add comma except for last field
        const remainingFields = model.fields
          .slice(index + 1)
          .filter((f) => !(f.isId && f.name === "id" && f.type !== "string"));
        if (remainingFields.length > 0) {
          fieldDef += ",";
        }

        output += fieldDef + "\n";
      });

      output += `});

const ${model.name} = mongoose.model('${
        model.name
      }', ${model.name.toLowerCase()}Schema);

module.exports = ${model.name};

`;
    });

    return output;
  };

  const getMongooseTypeString = (type) => {
    const typeMap = {
      string: "String",
      number: "Number",
      boolean: "Boolean",
      date: "Date",
    };
    return typeMap[type] || "String";
  };

  // Sequelize parsing
  const parseSequelizeSchema = (schema) => {
    const models = [];
    const defineRegex = /(\w+)\.define\(['"`](\w+)['"`],\s*{([^}]+)}/g;
    let match;

    while ((match = defineRegex.exec(schema)) !== null) {
      const modelName = match[2];
      const fieldsStr = match[3];
      const fields = [];

      const fieldRegex = /(\w+):\s*{([^}]+)}/g;
      let fieldMatch;

      while ((fieldMatch = fieldRegex.exec(fieldsStr)) !== null) {
        const fieldName = fieldMatch[1];
        const fieldDef = fieldMatch[2];

        const typeMatch = fieldDef.match(/type:\s*DataTypes\.(\w+)/);
        const allowNullMatch = fieldDef.match(/allowNull:\s*(true|false)/);
        const uniqueMatch = fieldDef.match(/unique:\s*(true|false)/);
        const defaultMatch = fieldDef.match(
          /defaultValue:\s*['"`]?([^,}]+)['"`]?/
        );

        fields.push({
          name: fieldName,
          type: getSequelizeType(typeMatch?.[1] || "STRING"),
          required: allowNullMatch?.[1] === "false",
          unique: uniqueMatch?.[1] === "true",
          defaultValue: defaultMatch?.[1],
        });
      }

      models.push({
        name: modelName,
        fields,
        relations: [],
      });
    }

    return models.length > 0
      ? models
      : [
          {
            name: "Example",
            fields: [{ name: "id", type: "number" }],
            relations: [],
          },
        ];
  };

  const getSequelizeType = (type) => {
    const typeMap = {
      STRING: "string",
      INTEGER: "number",
      BOOLEAN: "boolean",
      DATE: "date",
      FLOAT: "float",
      TEXT: "string",
      UUID: "string",
    };
    return typeMap[type] || "string";
  };

  // SQL DDL parsing
  const parseSQLSchema = (schema) => {
    const models = [];
    const createTableRegex =
      /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?`?(\w+)`?\s*\(([^;]+)\)/gi;
    let match;

    while ((match = createTableRegex.exec(schema)) !== null) {
      const tableName = match[1];
      const columnsStr = match[2];
      const fields = [];

      const columnRegex =
        /`?(\w+)`?\s+(\w+)(?:\([\d,\s]*\))?(?:\s+(NOT\s+NULL|NULL|PRIMARY\s+KEY|UNIQUE|AUTO_INCREMENT|DEFAULT\s+[^,\n]+))*[,\n]/gi;
      let columnMatch;

      while ((columnMatch = columnRegex.exec(columnsStr + ",")) !== null) {
        const columnName = columnMatch[1];
        const columnType = columnMatch[2];
        const constraints = columnMatch[3] || "";

        fields.push({
          name: columnName,
          type: getSQLType(columnType),
          required: constraints.includes("NOT NULL"),
          unique:
            constraints.includes("UNIQUE") ||
            constraints.includes("PRIMARY KEY"),
          isId: constraints.includes("PRIMARY KEY"),
          defaultValue: constraints.match(/DEFAULT\s+(['"`]?)([^,\s]+)\1/)?.[2],
        });
      }

      models.push({
        name: tableName,
        fields,
        relations: [],
      });
    }

    return models.length > 0
      ? models
      : [
          {
            name: "Example",
            fields: [{ name: "id", type: "number" }],
            relations: [],
          },
        ];
  };

  const getSQLType = (type) => {
    const typeMap = {
      VARCHAR: "string",
      TEXT: "string",
      INT: "number",
      INTEGER: "number",
      BIGINT: "number",
      DECIMAL: "float",
      FLOAT: "float",
      DOUBLE: "float",
      BOOLEAN: "boolean",
      BOOL: "boolean",
      DATE: "date",
      DATETIME: "date",
      TIMESTAMP: "date",
    };
    return typeMap[type.toUpperCase()] || "string";
  };

  // TypeScript interface parsing
  const parseTypeScriptSchema = (schema) => {
    const models = [];
    const interfaceRegex = /interface\s+(\w+)\s*{([^}]+)}/g;
    let match;

    while ((match = interfaceRegex.exec(schema)) !== null) {
      const interfaceName = match[1];
      const fieldsStr = match[2];
      const fields = [];

      const fieldRegex = /(\w+)(\?)?\s*:\s*([^;\n]+)[;\n]/g;
      let fieldMatch;

      while ((fieldMatch = fieldRegex.exec(fieldsStr)) !== null) {
        const fieldName = fieldMatch[1];
        const isOptional = !!fieldMatch[2];
        const fieldType = fieldMatch[3].trim();

        fields.push({
          name: fieldName,
          type: getTSType(fieldType),
          required: !isOptional,
          isArray: fieldType.includes("[]"),
        });
      }

      models.push({
        name: interfaceName,
        fields,
        relations: [],
      });
    }

    return models.length > 0
      ? models
      : [
          {
            name: "Example",
            fields: [{ name: "id", type: "number" }],
            relations: [],
          },
        ];
  };

  const getTSType = (type) => {
    const cleanType = type.replace("[]", "");
    const typeMap = {
      string: "string",
      number: "number",
      boolean: "boolean",
      Date: "date",
      any: "mixed",
    };
    return typeMap[cleanType] || "string";
  };

  // JSON Schema parsing
  const parseJSONSchema = (schema) => {
    try {
      const parsed = JSON.parse(schema);
      const models = [];

      if (parsed.definitions) {
        // Handle definitions
        Object.entries(parsed.definitions).forEach(([name, def]) => {
          const fields = parseJSONSchemaProperties(
            def.properties || {},
            def.required || []
          );
          models.push({ name, fields, relations: [] });
        });
      } else if (parsed.properties) {
        // Single schema - flatten nested objects into separate models
        const mainFields = [];
        const nestedModels = [];

        parseJSONSchemaObject(
          parsed,
          "Schema",
          mainFields,
          nestedModels,
          parsed.required || []
        );

        models.push({ name: "Schema", fields: mainFields, relations: [] });
        models.push(...nestedModels);
      }

      return models.length > 0
        ? models
        : [
            {
              name: "Example",
              fields: [{ name: "id", type: "number" }],
              relations: [],
            },
          ];
    } catch (e) {
      console.error("Error parsing JSON schema:", e);
      return [
        {
          name: "Example",
          fields: [{ name: "id", type: "number" }],
          relations: [],
        },
      ];
    }
  };

  const parseJSONSchemaObject = (
    obj,
    modelName,
    fields,
    nestedModels,
    requiredFields = []
  ) => {
    if (!obj.properties) return;

    Object.entries(obj.properties).forEach(([name, prop]) => {
      if (prop.type === "object" && prop.properties) {
        // Nested object - create separate model
        const nestedModelName = `${modelName}${
          name.charAt(0).toUpperCase() + name.slice(1)
        }`;
        const nestedFields = [];
        const nestedRequired = prop.required || [];

        parseJSONSchemaObject(
          prop,
          nestedModelName,
          nestedFields,
          nestedModels,
          nestedRequired
        );

        nestedModels.push({
          name: nestedModelName,
          fields: nestedFields,
          relations: [],
        });

        // Add reference to nested model
        fields.push({
          name,
          type: nestedModelName,
          required: requiredFields.includes(name),
          isArray: false,
        });
      } else if (prop.type === "array" && prop.items) {
        if (prop.items.type === "object" && prop.items.properties) {
          // Array of objects - create separate model
          const arrayModelName = `${modelName}${
            name.charAt(0).toUpperCase() + name.slice(1)
          }Item`;
          const arrayFields = [];
          const arrayRequired = prop.items.required || [];

          parseJSONSchemaObject(
            prop.items,
            arrayModelName,
            arrayFields,
            nestedModels,
            arrayRequired
          );

          nestedModels.push({
            name: arrayModelName,
            fields: arrayFields,
            relations: [],
          });

          // Add array reference to nested model
          fields.push({
            name,
            type: arrayModelName,
            required: requiredFields.includes(name),
            isArray: true,
          });
        } else {
          // Array of primitives
          fields.push({
            name,
            type: getJSONSchemaType(prop.items.type || "string"),
            required: requiredFields.includes(name),
            isArray: true,
          });
        }
      } else {
        // Simple field
        fields.push({
          name,
          type: getJSONSchemaType(prop.type),
          required: requiredFields.includes(name),
          isArray: false,
        });
      }
    });
  };

  const parseJSONSchemaProperties = (properties, requiredFields = []) => {
    return Object.entries(properties).map(([name, prop]) => ({
      name,
      type: getJSONSchemaType(prop.type),
      required: requiredFields.includes(name),
      isArray: prop.type === "array",
    }));
  };

  const getJSONSchemaType = (type) => {
    const typeMap = {
      string: "string",
      number: "number",
      integer: "number",
      boolean: "boolean",
      array: "array",
      object: "object",
    };
    return typeMap[type] || "string";
  };

  // Zod schema parsing
  const parseZodSchema = (schema) => {
    const models = [];
    const zodSchemaRegex =
      /(?:const|export\s+const)\s+(\w+)\s*=\s*z\.object\(\s*{([^}]+)}\s*\)/g;
    let match;

    while ((match = zodSchemaRegex.exec(schema)) !== null) {
      const schemaName = match[1];
      const fieldsStr = match[2];
      const fields = [];

      const fieldRegex = /(\w+):\s*z\.(\w+)\(\)(?:\.(\w+)\(\))*[,\n]/g;
      let fieldMatch;

      while ((fieldMatch = fieldRegex.exec(fieldsStr + ",")) !== null) {
        const fieldName = fieldMatch[1];
        const zodType = fieldMatch[2];
        const modifier = fieldMatch[3];

        fields.push({
          name: fieldName,
          type: getZodType(zodType),
          required: modifier !== "optional",
          isArray: zodType === "array",
        });
      }

      models.push({
        name: schemaName,
        fields,
        relations: [],
      });
    }

    return models.length > 0
      ? models
      : [
          {
            name: "Example",
            fields: [{ name: "id", type: "number" }],
            relations: [],
          },
        ];
  };

  const getZodType = (type) => {
    const typeMap = {
      string: "string",
      number: "number",
      boolean: "boolean",
      date: "date",
      array: "array",
      object: "object",
    };
    return typeMap[type] || "string";
  };

  // GraphQL schema parsing
  const parseGraphQLSchema = (schema) => {
    const models = [];
    const typeRegex = /type\s+(\w+)\s*{([^}]+)}/g;
    let match;

    while ((match = typeRegex.exec(schema)) !== null) {
      const typeName = match[1];
      const fieldsStr = match[2];
      const fields = [];

      const fieldRegex = /(\w+):\s*(\[?)(\w+)(\]?)(!?)/g;
      let fieldMatch;

      while ((fieldMatch = fieldRegex.exec(fieldsStr)) !== null) {
        const fieldName = fieldMatch[1];
        const isArrayStart = fieldMatch[2];
        const fieldType = fieldMatch[3];
        const isArrayEnd = fieldMatch[4];
        const isRequired = fieldMatch[5];

        fields.push({
          name: fieldName,
          type: getGraphQLType(fieldType),
          required: !!isRequired,
          isArray: !!(isArrayStart && isArrayEnd),
        });
      }

      models.push({
        name: typeName,
        fields,
        relations: [],
      });
    }

    return models.length > 0
      ? models
      : [
          {
            name: "Example",
            fields: [{ name: "id", type: "number" }],
            relations: [],
          },
        ];
  };

  const getGraphQLType = (type) => {
    const typeMap = {
      String: "string",
      Int: "number",
      Float: "float",
      Boolean: "boolean",
      ID: "string",
    };
    return typeMap[type] || "string";
  };

  // OpenAPI/Swagger schema parsing
  const parseOpenAPISchema = (schema) => {
    try {
      const parsed = typeof schema === "string" ? JSON.parse(schema) : schema;
      const models = [];

      if (parsed.components && parsed.components.schemas) {
        Object.entries(parsed.components.schemas).forEach(
          ([name, schemaDef]) => {
            if (schemaDef.properties) {
              const fields = Object.entries(schemaDef.properties).map(
                ([fieldName, fieldDef]) => ({
                  name: fieldName,
                  type: getOpenAPIType(fieldDef.type),
                  required: schemaDef.required?.includes(fieldName) || false,
                })
              );

              models.push({ name, fields, relations: [] });
            }
          }
        );
      }

      return models.length > 0
        ? models
        : [
            {
              name: "Example",
              fields: [{ name: "id", type: "number" }],
              relations: [],
            },
          ];
    } catch (e) {
      console.error(e);
      return [
        {
          name: "Example",
          fields: [{ name: "id", type: "number" }],
          relations: [],
        },
      ];
    }
  };

  const getOpenAPIType = (type) => {
    const typeMap = {
      string: "string",
      number: "number",
      integer: "number",
      boolean: "boolean",
      array: "array",
      object: "object",
    };
    return typeMap[type] || "string";
  };

  // Django models parsing
  const parseDjangoSchema = (schema) => {
    const models = [];
    const classRegex =
      /class\s+(\w+)\(models\.Model\):\s*([^]*?)(?=class\s+\w+\(models\.Model\)|$)/g;
    let match;

    while ((match = classRegex.exec(schema)) !== null) {
      const className = match[1];
      const classBody = match[2];
      const fields = [];

      const fieldRegex = /(\w+)\s*=\s*models\.(\w+)\(([^)]*)\)/g;
      let fieldMatch;

      while ((fieldMatch = fieldRegex.exec(classBody)) !== null) {
        const fieldName = fieldMatch[1];
        const fieldType = fieldMatch[2];
        const fieldArgs = fieldMatch[3];

        fields.push({
          name: fieldName,
          type: getDjangoType(fieldType),
          required:
            !fieldArgs.includes("blank=True") &&
            !fieldArgs.includes("null=True"),
          unique: fieldArgs.includes("unique=True"),
          defaultValue: fieldArgs.match(/default=['"]?([^,'"]+)['"]?/)?.[1],
        });
      }

      models.push({
        name: className,
        fields,
        relations: [],
      });
    }

    return models.length > 0
      ? models
      : [
          {
            name: "Example",
            fields: [{ name: "id", type: "number" }],
            relations: [],
          },
        ];
  };

  const getDjangoType = (type) => {
    const typeMap = {
      CharField: "string",
      TextField: "string",
      IntegerField: "number",
      FloatField: "float",
      BooleanField: "boolean",
      DateField: "date",
      DateTimeField: "date",
      EmailField: "string",
      URLField: "string",
    };
    return typeMap[type] || "string";
  };

  // Generate Sequelize schema
  const generateSequelizeSchema = (models) => {
    let output = `const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Your sequelize instance

`;

    models.forEach((model) => {
      output += `const ${model.name} = sequelize.define('${model.name}', {
`;

      model.fields.forEach((field, index) => {
        const sequelizeType = getSequelizeTypeString(field.type);
        let fieldDef = `  ${field.name}: {
    type: DataTypes.${sequelizeType}`;

        if (field.required)
          fieldDef += `,
    allowNull: false`;
        if (field.unique)
          fieldDef += `,
    unique: true`;
        if (field.isId)
          fieldDef += `,
    primaryKey: true,
    autoIncrement: true`;
        if (field.defaultValue)
          fieldDef += `,
    defaultValue: ${
      typeof field.defaultValue === "string"
        ? `'${field.defaultValue}'`
        : field.defaultValue
    }`;

        fieldDef += `\n  }${index === model.fields.length - 1 ? "" : ","}`;
        output += fieldDef + "\n";
      });

      output += `}, {
  tableName: '${model.name.toLowerCase()}s',
  timestamps: true
});

`;
    });

    output += `module.exports = { ${models.map((m) => m.name).join(", ")} };`;
    return output;
  };

  const getSequelizeTypeString = (type) => {
    const typeMap = {
      string: "STRING",
      number: "INTEGER",
      float: "FLOAT",
      boolean: "BOOLEAN",
      date: "DATE",
    };
    return typeMap[type] || "STRING";
  };

  // Generate SQL DDL schema
  const generateSQLSchema = (models) => {
    let output = `-- Database Schema Generated from Schema Converter
-- Generated on ${new Date().toISOString()}

`;

    models.forEach((model) => {
      output += `CREATE TABLE ${model.name.toLowerCase()}s (
`;

      model.fields.forEach((field, index) => {
        const sqlType = getSQLTypeString(field.type);
        let fieldDef = `  ${field.name} ${sqlType}`;

        if (field.isId) fieldDef += " PRIMARY KEY AUTO_INCREMENT";
        else if (field.required) fieldDef += " NOT NULL";
        if (field.unique && !field.isId) fieldDef += " UNIQUE";
        if (field.defaultValue && !field.isId) {
          fieldDef += ` DEFAULT ${
            typeof field.defaultValue === "string"
              ? `'${field.defaultValue}'`
              : field.defaultValue
          }`;
        }

        fieldDef += index === model.fields.length - 1 ? "" : ",";
        output += fieldDef + "\n";
      });

      output += `);\n\n`;
    });

    return output;
  };

  const getSQLTypeString = (type) => {
    const typeMap = {
      string: "VARCHAR(255)",
      number: "INT",
      float: "DECIMAL(10,2)",
      boolean: "BOOLEAN",
      date: "DATETIME",
    };
    return typeMap[type] || "VARCHAR(255)";
  };

  // Generate TypeScript interfaces
  const generateTypeScriptSchema = (models) => {
    let output = `// TypeScript Interfaces Generated from Schema Converter
// Generated on ${new Date().toISOString()}

`;

    models.forEach((model) => {
      output += `export interface ${model.name} {
`;

      model.fields.forEach((field) => {
        const tsType = getTSTypeString(field.type);
        let fieldDef = `  ${field.name}${field.required ? "" : "?"}: ${tsType}`;
        if (field.isArray) fieldDef += "[]";

        output += fieldDef + ";\n";
      });

      output += `}\n\n`;
    });

    return output;
  };

  const getTSTypeString = (type) => {
    const typeMap = {
      string: "string",
      number: "number",
      float: "number",
      boolean: "boolean",
      date: "Date",
    };
    return typeMap[type] || "string";
  };

  // Generate JSON Schema
  const generateJSONSchema = (models) => {
    const schema = {
      $schema: "http://json-schema.org/draft-07/schema#",
      type: "object",
      definitions: {},
    };

    models.forEach((model) => {
      const properties = {};
      const required = [];

      model.fields.forEach((field) => {
        const jsonType = getJSONSchemaTypeString(field.type);
        properties[field.name] = { type: jsonType };

        if (field.isArray) {
          properties[field.name] = {
            type: "array",
            items: { type: jsonType },
          };
        }

        if (field.required) {
          required.push(field.name);
        }
      });

      schema.definitions[model.name] = {
        type: "object",
        properties,
        required: required.length > 0 ? required : undefined,
      };
    });

    return JSON.stringify(schema, null, 2);
  };

  const getJSONSchemaTypeString = (type) => {
    const typeMap = {
      string: "string",
      number: "integer",
      float: "number",
      boolean: "boolean",
      date: "string",
    };
    return typeMap[type] || "string";
  };

  // Generate Zod validation schema
  const generateZodSchema = (models) => {
    let output = `import { z } from 'zod';

// Zod Validation Schemas Generated from Schema Converter
// Generated on ${new Date().toISOString()}

`;

    models.forEach((model) => {
      output += `export const ${model.name}Schema = z.object({
`;

      model.fields.forEach((field, index) => {
        const zodType = getZodTypeString(field.type);
        let fieldDef = `  ${field.name}: ${zodType}`;

        if (!field.required) fieldDef += ".optional()";
        if (field.isArray) fieldDef += ".array()";

        fieldDef += index === model.fields.length - 1 ? "" : ",";
        output += fieldDef + "\n";
      });

      output += `});

export type ${model.name} = z.infer<typeof ${model.name}Schema>;

`;
    });

    return output;
  };

  const getZodTypeString = (type) => {
    const typeMap = {
      string: "z.string()",
      number: "z.number().int()",
      float: "z.number()",
      boolean: "z.boolean()",
      date: "z.date()",
    };
    return typeMap[type] || "z.string()";
  };

  // Generate GraphQL schema
  const generateGraphQLSchema = (models) => {
    let output = `# GraphQL Schema Generated from Schema Converter
# Generated on ${new Date().toISOString()}

`;

    models.forEach((model) => {
      output += `type ${model.name} {
`;

      model.fields.forEach((field) => {
        const gqlType = getGraphQLTypeString(field.type);
        let fieldDef = `  ${field.name}: `;

        if (field.isArray) fieldDef += `[${gqlType}]`;
        else fieldDef += gqlType;

        if (field.required) fieldDef += "!";

        output += fieldDef + "\n";
      });

      output += `}\n\n`;
    });

    // Add basic Query type
    output += `type Query {
`;
    models.forEach((model) => {
      const modelNameLower = model.name.toLowerCase();
      output += `  ${modelNameLower}s: [${model.name}]\n`;
      output += `  ${modelNameLower}(id: ID!): ${model.name}\n`;
    });
    output += `}\n\n`;

    // Add basic Mutation type
    output += `type Mutation {
`;
    models.forEach((model) => {
      //   const modelNameLower = model.name.toLowerCase();
      output += `  create${model.name}(input: ${model.name}Input!): ${model.name}\n`;
      output += `  update${model.name}(id: ID!, input: ${model.name}Input!): ${model.name}\n`;
      output += `  delete${model.name}(id: ID!): Boolean\n`;
    });
    output += `}\n\n`;

    // Add Input types
    models.forEach((model) => {
      output += `input ${model.name}Input {
`;

      model.fields.forEach((field) => {
        if (field.isId) return; // Skip ID fields in input

        const gqlType = getGraphQLTypeString(field.type);
        let fieldDef = `  ${field.name}: `;

        if (field.isArray) fieldDef += `[${gqlType}]`;
        else fieldDef += gqlType;

        output += fieldDef + "\n";
      });

      output += `}\n\n`;
    });

    return output;
  };

  const getGraphQLTypeString = (type) => {
    const typeMap = {
      string: "String",
      number: "Int",
      float: "Float",
      boolean: "Boolean",
      date: "String",
    };
    return typeMap[type] || "String";
  };

  // Generate OpenAPI/Swagger schema
  const generateOpenAPISchema = (models) => {
    const schema = {
      openapi: "3.0.0",
      info: {
        title: "Generated API",
        version: "1.0.0",
        description: "API Schema generated from Schema Converter",
      },
      components: {
        schemas: {},
      },
    };

    models.forEach((model) => {
      const properties = {};
      const required = [];

      model.fields.forEach((field) => {
        const openAPIType = getOpenAPITypeString(field.type);
        properties[field.name] = { type: openAPIType };

        if (field.isArray) {
          properties[field.name] = {
            type: "array",
            items: { type: openAPIType },
          };
        }

        if (field.required) {
          required.push(field.name);
        }
      });

      schema.components.schemas[model.name] = {
        type: "object",
        properties,
        required: required.length > 0 ? required : undefined,
      };
    });

    return JSON.stringify(schema, null, 2);
  };

  const getOpenAPITypeString = (type) => {
    const typeMap = {
      string: "string",
      number: "integer",
      float: "number",
      boolean: "boolean",
      date: "string",
    };
    return typeMap[type] || "string";
  };

  // Generate Django models
  const generateDjangoSchema = (models) => {
    let output = `from django.db import models
from django.contrib.auth.models import User

# Django Models Generated from Schema Converter
# Generated on ${new Date().toISOString()}

`;

    models.forEach((model) => {
      output += `class ${model.name}(models.Model):
`;

      model.fields.forEach((field) => {
        if (field.isId && field.name === "id") return; // Django auto-creates id field

        const djangoType = getDjangoTypeString(field.type);
        let fieldDef = `    ${field.name} = models.${djangoType}`;

        const options = [];
        if (!field.required) options.push("blank=True", "null=True");
        if (field.unique) options.push("unique=True");
        if (field.defaultValue) options.push(`default='${field.defaultValue}'`);

        if (options.length > 0) {
          fieldDef += `(${options.join(", ")})`;
        } else if (field.type === "string") {
          fieldDef += "(max_length=255)";
        } else {
          fieldDef += "()";
        }

        output += fieldDef + "\n";
      });

      output += `
    class Meta:
        db_table = '${model.name.toLowerCase()}s'
        verbose_name = '${model.name}'
        verbose_name_plural = '${model.name}s'
    
    def __str__(self):
        return f"${model.name} {self.id}"

`;
    });

    return output;
  };

  const getDjangoTypeString = (type) => {
    const typeMap = {
      string: "CharField",
      number: "IntegerField",
      float: "FloatField",
      boolean: "BooleanField",
      date: "DateTimeField",
    };
    return typeMap[type] || "CharField";
  };

  // Handle conversion
  const handleConvert = async () => {
    if (!inputSchema.trim()) {
      setError("Please enter a schema to convert");
      return;
    }

    setIsConverting(true);
    setError("");
    setSuccess("");

    try {
      const converted = convertSchema(inputSchema, inputFormat, outputFormat);
      setOutputSchema(converted);
      setSuccess("Schema converted successfully!");
    } catch (err) {
      setError(err.message);
      setOutputSchema("");
    } finally {
      setIsConverting(false);
    }
  };

  // Auto-detect format when input changes
  useEffect(() => {
    if (inputSchema.trim()) {
      const detected = detectSchemaFormat(inputSchema);
      if (detected && detected !== detectedFormat) {
        setDetectedFormat(detected);
      }
    } else {
      setDetectedFormat("");
    }
  }, [inputSchema]);

  // Auto-convert when format changes
  useEffect(() => {
    if (inputSchema.trim() && inputFormat && outputFormat) {
      handleConvert();
    }
  }, [inputFormat, outputFormat]);

  const clearInput = () => {
    setInputSchema("");
    setOutputSchema("");
    setError("");
    setSuccess("");
    setDetectedFormat("");
  };

  const copyOutput = () => {
    if (outputSchema) {
      navigator.clipboard.writeText(outputSchema);
      setSuccess("Output copied to clipboard!");
      setTimeout(() => setSuccess(""), 2000);
    }
  };

  const downloadOutput = () => {
    if (!outputSchema) return;

    const blob = new Blob([outputSchema], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `schema${formats[outputFormat].ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen gradient-bg text-white">
      {/* Header */}
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
                  Convert between 10+ schema formats with advanced support
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleConvert}
                disabled={isConverting || !inputSchema.trim()}
                className="flex items-center space-x-2 disabled:cursor-not-allowed cursor-pointer px-4 py-2 bg-white text-purple-600 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition duration-300"
              >
                {isConverting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                <span>{isConverting ? "Converting..." : "Convert"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Format Selection */}
      <div className="max-w-12xl mx-auto px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
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
              {detectedFormat && detectedFormat !== inputFormat && (
                <span>
                  {toast.success(
                    `Detected Format: ${formats[detectedFormat]?.name}`
                  )}
                  {setInputFormat(detectedFormat)}
                </span>
              )}
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

      {/* Messages */}
      {(error || success) && (
        <div className="max-w-7xl mx-auto px-6">
          {error && (
            <div className="bg-red-900/50 border border-red-700 rounded-lg px-4 py-3 text-red-200 mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-900/50 border border-green-700 rounded-lg px-4 py-3 text-green-200 mb-4">
              {success}
            </div>
          )}
        </div>
      )}

      {/* Editor Area */}
      <div className="max-w-12xl mx-auto px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-280px)]">
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
                height="100%" // fixed height, like textarea (can be "100%" if container controls it)
                // language="json" // hard-set (remove if not needed)
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
                  if (inputEditorRef) {
                    inputEditorRef.current = editor; // works like your textarea ref
                  }
                }}
              />

              {/* Placeholder (Monaco doesn't support it natively) */}
              {(!inputSchema || inputSchema.length === 0) && (
                <span className="absolute top-4 left-4 text-sm font-mono text-slate-500 pointer-events-none">
                  Enter your {formats[inputFormat].name} here...
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
                  className="p-1 hover:bg-blue-300 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed  cursor-pointer"
                  title="Copy output"
                >
                  <Copy className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={downloadOutput}
                  disabled={!outputSchema}
                  className="p-1 hover:bg-slate-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  title="Download output"
                >
                  <Download className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="flex-1 w-full relative">
              <Editor
                height="100%" // same as textarea height (can be adjusted)
                // language="json" // or "plaintext" if you don’t want syntax highlight
                value={outputSchema}
                theme="vs-dark"
                options={{
                  readOnly: true, // ✅ make it readonly
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
                  if (outputEditorRef) {
                    outputEditorRef.current = editor; // keep your ref
                  }
                }}
              />

              {/* Placeholder */}
              {(!outputSchema || outputSchema.length === 0) && (
                <span className="absolute top-4 left-4 text-sm font-mono text-slate-500 pointer-events-none">
                  Converted schema will appear here...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Convert;
