import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../st-dominic-website.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
