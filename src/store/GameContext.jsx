import { createContext, useContext, useEffect, useReducer } from "react";
import { generateCardGrid } from "../utils/generateCardGrid";
import { useGameSetup } from "./GameSetupContext";

// 1. Create game context
const GameContext = createContext();

const initGameState = {
  grid: null,
  flippedCards: [],
  isBusy: false,
  moves: 0,
};

// 2. Create provider
export const GameProvider = ({ children }) => {
  const { setupState } = useGameSetup();
  const { gridSize } = setupState;

  const [gameState, gameDispatch] = useReducer(gameReducer, initGameState);

  useEffect(() => {
    if (gridSize) {
      gameDispatch({ type: "RESET", payload: gridSize });
    }
  }, [gridSize]);

  const hasWon =
    gameState.grid !== null &&
    gameState.grid.every((card) => card.isMatched || card.isEmpty);

  const ctxValue = { gameState, gameDispatch, hasWon };

  return (
    <>
      <GameContext value={ctxValue}>{children}</GameContext>
    </>
  );
};

// 3. Set reducer
const gameReducer = (state, action) => {
  const { type, payload } = action;

  if (type === "FLIP_CARD") {
    const newCards = [...state.grid];
    const index = payload;

    if (newCards[index].isFlipped || state.isBusy || newCards[index].isMatched)
      return state;

    newCards[index].isFlipped = true;

    let newFlipped = [...state.flippedCards, index];

    return {
      ...state,
      grid: newCards,
      flippedCards: newFlipped,
    };
  }

  if (type === "EVALUATE_CARDS") {
    const [i1, i2] = state.flippedCards;
    const c1 = state.grid[i1];
    const c2 = state.grid[i2];
    const newCards = [...state.grid];

    if (c1.value === c2.value && c1.value !== null) {
      // Match
      newCards[i1] = { ...c1, isMatched: true };
      newCards[i2] = { ...c2, isMatched: true };
    } else {
      // Flip back
      newCards[i1] = { ...c1, isFlipped: false };
      newCards[i2] = { ...c2, isFlipped: false };
    }

    const newMoves = state.moves + 1;

    return {
      ...state,
      grid: newCards,
      flippedCards: [],
      isBusy: false,
      moves: newMoves,
    };
  }

  if (type === "SET_BUSY") {
    return { ...state, isBusy: true };
  }

  if (type === "RESET") {
    return { ...state, grid: generateCardGrid(payload) };
  }

  return state;
};

// 4. Custom hook to use game context

export const useGame = () => useContext(GameContext);
