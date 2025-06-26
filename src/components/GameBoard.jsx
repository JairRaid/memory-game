import Card from "./Card";
import { useGameSetup } from "../store/GameSetupContext";
import { useGame } from "../store/Gamecontext";

function GameBoard() {
  const { setupState } = useGameSetup();
  const { gridSize } = setupState;

  const { gameState } = useGame();
  const { grid } = gameState;

  let gridElement = null;

  if (gridSize === "4x4") {
    gridElement = (
      <div className="text-[2.5rem] md:text-[3.5rem] grid grid-cols-4 place-items-center gap-3 md:gap-6 w-full max-w-[326.12px] md:max-w-[544px] min-h-[326.12px] md:min-h-[544px] mx-auto mb-[94.8px] ">
        {grid &&
          grid.map((card, index) => {
            return <Card key={index} indexValue={index} cardObj={card} />;
          })}
      </div>
    );
  }

  if (gridSize === "6x6") {
    gridElement = (
      <div className="text-[1.5rem] md:text-[2.75rem] grid grid-cols-6 place-items-center gap-2 md:gap-4 min-h-[321.27px] w-[326px] md:w-[574px] md:h-[574px] mx-auto mb-[107px] md:mb-[122px] lg:mb-[106px] ">
        {grid &&
          grid.map((card, index) => (
            <Card key={index} indexValue={index} cardObj={card} />
          ))}
      </div>
    );
  }

  return (
    <>
      {/* Game grid */}
      {gridElement}
    </>
  );
}

export default GameBoard;
