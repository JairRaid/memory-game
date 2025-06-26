import { useNavigate } from "react-router-dom";
import { useGameSetup } from "../store/GameSetupContext";
import { useTimer } from "../store/TimerContext";

function StartGameCard() {
  const { setupState, setupDispatch } = useGameSetup();
  const { theme, players, gridSize } = setupState;

  const { reset } = useTimer();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "playerSetup",
      JSON.stringify({ theme: theme, players: players, gridSize: gridSize })
    );
    console.log(JSON.parse(localStorage.getItem("payerSetup")));
    reset();

    navigate("/game");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-[10px] px-[25.5px] py-[24.5px] md:px-[54.5px] md:py-[57px] md:max-w-[654px] md:mx-auto "
    >
      <fieldset>
        {/* Theme selection */}
        <legend className="mb-2 md:mb-4 ">Select Theme</legend>
        <div className="flex gap-x-2 mb-6 md:mb-8">
          {["numbers", "icons"].map((value) => (
            <label key={value} className="cursor-pointer grow">
              <input
                type="radio"
                name="theme"
                value={value}
                checked={theme === value}
                disabled={value === "icons" ? true : false}
                onChange={() =>
                  setupDispatch({ type: "SELECT_THEME", payload: value })
                }
                className="sr-only peer"
              />
              <span className="flex center-both w-full h-10 md:h-[52px] rounded-full bg-blue-300 text-white peer-checked:bg-blue-800 peer-checked:text-white peer-not-checked:hover:bg-blue-350 transition">
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Numbers of players */}
      <fieldset>
        <legend className="mb-2 md:mb-4">Numbers of Players</legend>
        <div className="flex gap-x-2 mb-6 md:mb-8">
          {["1", "2", "3", "4"].map((value) => (
            <label key={value} className="cursor-pointer grow">
              <input
                type="radio"
                name="players"
                value={value}
                checked={players === value}
                disabled={value > 1 ? true : false}
                onChange={() =>
                  setupDispatch({ type: "SELECT_PLAYERS", payload: value })
                }
                className="sr-only peer"
              />
              <span className="flex center-both w-full h-10 md:h-[52px] rounded-full bg-blue-300 text-white peer-checked:bg-blue-800 peer-checked:text-white peer-not-checked:hover:bg-blue-350 transition">
                {value}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Grid Size */}
      <fieldset>
        <legend className="mb-2 md:mb-4">Grid Size</legend>
        <div className="flex gap-x-2 mb-10 md:mb-8">
          {["4x4", "6x6"].map((value) => (
            <label key={value} className="cursor-pointer grow">
              <input
                type="radio"
                name="grid"
                value={value}
                checked={gridSize === value}
                onChange={() =>
                  setupDispatch({ type: "SELECT_GRID", payload: value })
                }
                className="sr-only peer"
              />
              <span className="flex center-both w-full h-10 md:h-[52px] rounded-full bg-blue-300 text-white peer-checked:bg-blue-800 peer-checked:text-white peer-not-checked:hover:bg-blue-350 transition">
                {value}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <button type="submit" className="button-big w-full h-12 md:h-[70px]">
        Start Game
      </button>
    </form>
  );
}

export default StartGameCard;
