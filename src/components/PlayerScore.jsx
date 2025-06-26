import { useGame } from "../store/Gamecontext";
import { useGameSetup } from "../store/GameSetupContext";
import { useTimer } from "../store/TimerContext";

function PlayerScore() {
  const { gameState } = useGame();
  const { setupState } = useGameSetup();
  const { players } = setupState;

  const { minutes, seconds } = useTimer();

  let playerElement = null;
  if (players === "1") {
    playerElement = (
      <div className="flex items-center gap-x-8 max-w-[328px] md:max-w-[542px] mx-auto ">
        <div className="flex flex-col md:flex-row md:justify-between md:px-[22.5px] center-both bg-blue-100 h-[70px] md:h-[72px] rounded-[5px] basis-1/2">
          <span className="text-blue-400 text-[0.9375rem] md:text-[1.125rem] font-semibold leading-[125%] ">
            Time
          </span>
          <span className="text-blue-800 text-[1.5rem] md:text-[2rem] font-bold leading-[125%]">
            {`${minutes}:${seconds}`}
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:px-[22.5px] center-both bg-blue-100 h-[70px] md:h-[72px] rounded-[5px] basis-1/2">
          <span className="text-blue-400 text-[0.9375rem] md:text-[1.125rem] font-semibold leading-[125%] ">
            Moves
          </span>
          <span className="text-blue-800 text-[1.5rem] md:text-[2rem] font-bold leading-[125%]">
            {gameState.moves}
          </span>
        </div>
      </div>
    );
  }

  if (players !== "1") {
    playerElement = (
      <div className="flex items-center justify-between max-w-[328px] mx-auto ">
        {["1", "2", "3", "4"].map((p, index) => (
          <div
            key={index}
            className="flex flex-col center-both bg-blue-100 max-w-[64px] h-[70px] rounded-[5px] grow"
          >
            <span className="text-blue-400 text-[0.9375rem] font-semibold leading-[125%] ">
              {`P${p}`}
            </span>
            <span className="text-blue-800 text-[1.5rem] font-bold leading-[125%]">
              0
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {playerElement}
      {/* <div className="flex flex-col center-both bg-blue-100 max-w-[64px] h-[70px] rounded-[5px] grow">
        <span className="text-blue-400 text-[0.9375rem] font-semibold leading-[125%] ">
          P1
        </span>
        <span className="text-blue-800 text-[1.5rem] font-bold leading-[125%]">
          0
        </span>
      </div>
      <div className="flex flex-col center-both bg-blue-100 max-w-[64px] h-[70px] rounded-[5px] grow">
        <span className="text-blue-400 text-[0.9375rem] font-semibold leading-[125%] ">
          P1
        </span>
        <span className="text-blue-800 text-[1.5rem] font-bold leading-[125%]">
          0
        </span>
      </div> */}
    </>
  );
}

export default PlayerScore;
