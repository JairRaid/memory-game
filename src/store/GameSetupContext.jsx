import { createContext, useContext, useReducer } from "react";

// 1. Create the game setup context
const GameSetupContext = createContext();

// 2. Create provider
export const GameSetupProvider = ({ children }) => {
  const playerSetup = JSON.parse(localStorage.getItem("playerSetup"));
  const [setupState, setupDispatch] = useReducer(gameSetupReducer, {
    theme: "numbers",
    players: "1",
    gridSize: playerSetup.gridSize || "4x4",
  });

  const ctxValue = { setupState, setupDispatch };
  return <GameSetupContext value={ctxValue}>{children}</GameSetupContext>;
};

// 3. Set reducer
const gameSetupReducer = (state, action) => {
  const { type, payload } = action;

  if (type === "SELECT_THEME") {
    return { ...state, theme: payload };
  }

  if (type === "SELECT_PLAYERS") {
    return { ...state, players: payload };
  }

  if (type === "SELECT_GRID") {
    return { ...state, gridSize: payload };
  }

  return state;
};

// 4. Custom hook to use the context
export const useGameSetup = () => useContext(GameSetupContext);
