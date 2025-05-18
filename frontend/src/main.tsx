import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { Buffer } from "buffer";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

if (!window.Buffer) {
  window.Buffer = Buffer;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />

      <ToastContainer />
    </ThemeProvider>
  </StrictMode>
);
