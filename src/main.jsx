import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GameSetupProvider } from "./store/GameSetupContext.jsx";
import { GameProvider } from "./store/Gamecontext.jsx";
import { TimerProvider } from "./store/TimerContext.jsx";

createRoot(document.getElementById("root")).render(
  <GameSetupProvider>
    <GameProvider>
      <TimerProvider>
        <App />
      </TimerProvider>
    </GameProvider>
  </GameSetupProvider>
);
