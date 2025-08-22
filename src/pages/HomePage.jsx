import React from "react";
import Nav from "../components/nav";
import Hero from "../components/hero";
import SchemaConverter from "../components/schemaConverter";
import FeaturesSection from "../components/featuresSection";
import ExampleSection from "../components/exampleSection";
import Footer from "../components/footer";
const HomePage = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <SchemaConverter />
      <FeaturesSection />
      <ExampleSection />
      <Footer />
    </div>
  );
};
export default HomePage;
