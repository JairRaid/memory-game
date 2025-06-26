import React from "react";
import { useGameSetup } from "../store/GameSetupContext";
import { useGame } from "../store/Gamecontext";

function Card({ cardObj, indexValue }) {
  const { setupState } = useGameSetup();
  const { gridSize } = setupState;

  const { gameState, gameDispatch } = useGame();
  const { grid, flippedCards } = gameState;

  const handleCardClick = (index) => {
    if (
      // cannot flip card when player click the same card or there are two flipped cards
      flippedCards.length === 2 ||
      (flippedCards.length === 1 && flippedCards[0] === index) ||
      cardObj.isMatched
    )
      return;
    gameDispatch({ type: "FLIP_CARD", payload: index });

    if (flippedCards.length === 1) {
      gameDispatch({ type: "SET_BUSY" });

      setTimeout(() => {
        gameDispatch({ type: "EVALUATE_CARDS" });
      }, 1000);
    }
  };

  let cardClass = "";

  if (gridSize === "4x4") {
    cardClass = "card size-[72.52px] md:size-[118px]";
  }

  if (gridSize === "6x6") {
    cardClass = "card size-[46.88px] md:size-[82.32px]";
  }

  if (grid[indexValue] && grid[indexValue].isFlipped) {
    cardClass += " is-flipped";
  }

  if (grid[indexValue] && grid[indexValue].isMatched) {
    cardClass += " is-matched";
  }

  return (
    <button
      aria-label="memory card"
      className={cardClass}
      onClick={() => handleCardClick(indexValue)}
    >
      {grid[indexValue].isFlipped ? cardObj.value : ""}
    </button>
  );
}

export default Card;
