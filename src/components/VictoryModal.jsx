import React from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

function VictoryModal({
  ref,
  minutes,
  seconds,
  moves,
  onResume,
  hasWon,
  isMenuOpen,
  onMenuOpen,
  onSetIsModalOpen,
}) {
  const navigate = useNavigate();

  const handleRestart = () => {
    window.location.reload();
    onSetIsModalOpen(false);
    onResume();
  };

  const handleNewSetup = () => {
    localStorage.removeItem("hasReloaded");
    navigate("/");
  };

  const handleResume = () => {
    onMenuOpen(false);
    onResume();
  };

  let modalElement = null;

  if (hasWon) {
    modalElement = (
      <div className="flex flex-col fixed left-1/2 translate-x-[calc(-50%-24px)] top-1/2 translate-y-[-50%] w-[calc(100%-48px)] max-w-[327px] md:max-w-[654px] px-6 md:px-[55px] py-7 md:py-[59.5px] rounded-[10px] mx-6 bg-grey-100 ">
        <header className="mb-6 md:mb-10 ">
          <h2 className="text-[1.5rem] md:text-[3rem] text-blue-950 font-bold leading-[125%] text-center mb-2 md:mb-4 ">
            You did it!
          </h2>
          <p className="text-[0.875rem] md:text-[1.125rem] text-blue-400 font-bold leading-[125%] text-center ">
            Game over! Here's how you got on...
          </p>
        </header>
        <div className="flex justify-between items-center px-4 md:px-[32.12px] bg-blue-100 rounded-[5px] h-12 md:h-[72px] mb-2 md:mb-4">
          <p className="text-[0.875rem] md:text-[1.125rem] text-blue-400 font-bold leading-[125%]">
            Time Elapsed
          </p>
          <p className="text-[1.25rem] md:text-[2rem] text-blue-800 font-bold">{`${minutes}:${seconds}`}</p>
        </div>
        <div className="flex justify-between items-center px-4 md:px-[32.12px] bg-blue-100 rounded-[5px] h-12 md:h-[72px] mb-6 md:mb-10 ">
          <p className="text-[0.875rem] md:text-[1.125rem] text-blue-400 font-bold leading-[125%]">
            Moves Taken
          </p>
          <p className="text-[1.25rem] md:text-[2rem] text-blue-800 font-bold">{`${moves} Moves`}</p>
        </div>
        <footer className="flex flex-col md:flex-row gap-y-4 md:gap-x-4 ">
          <button
            type="button"
            onClick={() => handleRestart()}
            className="button-big md:text-[1.25rem] w-full md:basis-1/2 h-12 md:h-[52px] "
          >
            Restart
          </button>
          <button
            type="button"
            onClick={() => handleNewSetup()}
            className="button-secondary md:text-[1.25rem] md:basis-1/2 h-12 md:h-[52px] "
          >
            Setup New Game
          </button>
        </footer>
      </div>
    );
  }

  if (!hasWon && isMenuOpen) {
    modalElement = (
      <div className="flex flex-col gap-y-4 fixed left-1/2 translate-x-[calc(-50%-24px)] top-1/2 translate-y-[-50%] w-[calc(100%-48px)] max-w-[327px] px-6 py-7 rounded-[10px] mx-6 bg-grey-100 ">
        <button
          type="button"
          onClick={() => handleRestart()}
          className="button-big h-12 text-[1.125rem]"
        >
          Restart
        </button>
        <button
          type="button"
          onClick={() => handleNewSetup()}
          className="button-secondary h-12 "
        >
          New Game
        </button>
        <button
          type="button"
          onClick={() => handleResume()}
          className="button-secondary h-12 "
        >
          Resume Game
        </button>
      </div>
    );
  }

  return createPortal(
    <dialog ref={ref} className="backdrop:bg-[#00000080] ">
      {modalElement}
    </dialog>,
    document.getElementById("modal-container")
  );
}

export default VictoryModal;
