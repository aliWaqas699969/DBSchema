import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";

const nav = () => {
  return (
    <nav class="fixed w-full top-0 z-50 glass-effect">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex ">
              <h1 class="text-2xl font-bold text-white">
                <FontAwesomeIcon icon={faRightLeft} /> DBSchema
              </h1>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <a
                href="#home"
                class="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium"
              >
                Home
              </a>
              <a
                href="#converter"
                class="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium"
              >
                Converter
              </a>
              <a
                href="#features"
                class="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium"
              >
                Features
              </a>
              <a
                href="#examples"
                class="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium"
              >
                Examples
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default nav;
