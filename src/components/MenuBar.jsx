import React from "react";
import { useNavigate } from "react-router-dom";

function MenuBar({ onMenuOpen, onResume, onSetIsModalOpen }) {
  const navigate = useNavigate();
  const handleMenu = () => {
    onMenuOpen(true);
  };

  const handleRestart = () => {
    window.location.reload();
    onSetIsModalOpen(false);
    onResume();
  };

  const handleNewSetup = () => {
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between mb-20 md:mb-[85px] max-w-[328px] mx-auto md:max-w-none lg:max-w-[1110px] ">
      <h1 className="text-blue-950 text-[1.5rem] font-bold leading-[125%] md:text-[2.5rem] ">
        memory
      </h1>
      <div className="md:hidden">
        <button
          onClick={() => handleMenu()}
          className="button-big text-[1rem] md:text-[1.25rem] w-[78px] h-10 md:h-[52px] "
        >
          Menu
        </button>
      </div>
      <div className="hidden md:flex items-center gap-x-4">
        <button
          onClick={() => handleRestart()}
          className="button-big text-[1rem] md:text-[1.25rem] px-6 h-10 md:h-[52px] "
        >
          Restart
        </button>
        <button
          onClick={() => handleNewSetup()}
          className="button-secondary text-[1rem] md:text-[1.25rem] px-6 h-10 md:h-[52px] "
        >
          New Game
        </button>
      </div>
    </header>
  );
}

export default MenuBar;
