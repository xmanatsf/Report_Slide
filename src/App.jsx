import { Routes, Route, Link } from "react-router-dom";

import Semis from "./Semis-on-Fire 20-Feb-26.jsx";
import CJMuse from "./CJ Muse AI monthly 2025 Feb.jsx";
import TSMC from "./TSMC increase Capex Slide.jsx";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "8px 12px",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Link to="/">Semis</Link> | <Link to="/cjmuse">CJ Muse</Link> |{" "}
        <Link to="/tsmc">TSMC</Link>
      </nav>

      {/* Slide canvas area */}
      <div style={{ width: "100%", height: "100%" }}>
        <Routes>
          <Route path="/" element={<Semis />} />
          <Route path="/cjmuse" element={<CJMuse />} />
          <Route path="/tsmc" element={<TSMC />} />
        </Routes>
      </div>
    </div>
  );
}