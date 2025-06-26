import { useEffect } from "react";
import StartGameCard from "../components/StartGameCard";

function Home() {
  useEffect(() => {
    const hasReloaded = localStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      localStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, []);

  return (
    <main className="grow">
      <section aria-labelledby="game-title">
        <h1
          id="game-title"
          // className="border filter-[brightness(0)_saturate(100%)_invert(100%)_sepia(4%)_saturate(7484%)_hue-rotate(284deg)_brightness(106%)_contrast(100%)] "
          className="mb-12 md:text-[2.5rem] md:mb-20 "
        >
          memory
        </h1>

        <StartGameCard />
      </section>
    </main>
  );
}

export default Home;
