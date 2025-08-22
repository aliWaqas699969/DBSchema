import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Convert from "./pages/Convert";
import ConvertAI from "./pages/ConvertAI";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/convert" element={<Convert />} />
        <Route path="/convertAI" element={<ConvertAI />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
