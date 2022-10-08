import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { api } from "./services/api";

import { GameCard } from "@components/GameCard";
import { CreateAdModal } from "@components/CreateAdModal";
import { CreatedAdBanner } from "@components/CreatedAdBanner";

import logoImg from "./assets/logo-nlw-esports.svg";
import "./styles/main.css";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  async function getListGames() {
    const response = await api.get<Game[]>("/games");

    setGames(response.data);
  }

  useEffect(() => {
    getListGames();
  }, []);

  return (
    <>
      <ToastContainer
        icon
        theme="dark"
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
      <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
        <img src={logoImg} alt="" />

        <h1 className="text-6xl text-white font-black mt-20">
          Seu{" "}
          <span className="text-transparent bg-nlw-gradient bg-clip-text">
            duo
          </span>{" "}
          está aqui.
        </h1>

        <div className="grid grid-cols-6 gap-6 mt-16">
          {games.map((game) => (
            <GameCard
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          ))}
        </div>

        <Dialog.Root>
          <CreatedAdBanner />

          <CreateAdModal />
        </Dialog.Root>
      </div>
    </>
  );
}

export default App;
