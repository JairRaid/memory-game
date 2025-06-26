import { useEffect, useRef, useState } from "react";
import GameBoard from "../components/GameBoard";
import MenuBar from "../components/MenuBar";
import ScoreBoard from "../components/ScoreBoard";
import VictoryModal from "../components/VictoryModal";
import { useTimer } from "../store/TimerContext";
import { useGame } from "../store/Gamecontext";

function GamePage() {
  const { gameState, hasWon } = useGame();
  const { minutes, seconds, pause, resume } = useTimer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const victoryModal = useRef();

  useEffect(() => {
    resume();
  }, []);

  useEffect(() => {
    if (hasWon) setIsModalOpen(true);
    if (isModalOpen) {
      if (victoryModal.current) victoryModal.current.showModal();
      pause();
    }
  }, [hasWon, isModalOpen, pause]);

  useEffect(() => {
    if (isMenuOpen) {
      if (victoryModal.current) victoryModal.current.showModal();
      pause();
    }

    if (!isMenuOpen) {
      if (victoryModal.current) victoryModal.current.close();
    }
  }, [isMenuOpen, pause]);

  return (
    <main className="self-start grow bg-grey-50 -mx-6 p-6 md:py-[37px] lg:py-[67px] min-h-screen ">
      <MenuBar
        onMenuOpen={setIsMenuOpen}
        onResume={resume}
        onSetIsModalOpen={setIsModalOpen}
      />
      <GameBoard />
      <ScoreBoard />
      <VictoryModal
        ref={victoryModal}
        minutes={minutes}
        seconds={seconds}
        moves={gameState.moves}
        onResume={resume}
        hasWon={hasWon}
        isMenuOpen={isMenuOpen}
        onMenuOpen={setIsMenuOpen}
        onSetIsModalOpen={setIsModalOpen}
      />
    </main>
  );
}

export default GamePage;
