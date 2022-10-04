import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { api } from "./services/api";

import { GameCard } from "@components/GameCard";
import { CreatedAdBanner } from "@components/CreatedAdBanner";

import logoImg from "./assets/logo-nlw-esports.svg";

import "./styles/main.css";
import { GameController } from "phosphor-react";

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
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content
            className="w-[480px] fixed bg-[#2A2634] py-8 px-10 text-white 
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg 
            shadow-black/25"
          >
            <Dialog.Title className="text-3xl font-black">
              Publique um anúncio
            </Dialog.Title>
            <Dialog.Content>
              <form>
                <div>
                  <label htmlFor="game">Qual o game?</label>
                  <input
                    id="game"
                    placeholder="Selecione o game que deseja jogar"
                  />
                </div>

                <div>
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <input
                    id="name"
                    placeholder="Como te chamam dentro do game?"
                  />
                </div>

                <div>
                  <div>
                    <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                    <input
                      type="number"
                      id="yearsPlaying"
                      placeholder="Tudo bem ser ZERO"
                    />
                  </div>
                  <div>
                    <label htmlFor="discord">Qual seu discord?</label>
                    <input
                      type="text"
                      id="discord"
                      placeholder="Usuário#0000"
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <label htmlFor="weekDays">Quando costumo jogar</label>
                  </div>
                  <div>
                    <label htmlFor="hourStart">Qual horário do dia?</label>
                    <div>
                      <input type="time" id="hoursStart" placeholder="De" />
                      <input type="time" id="hoursEnd" placeholder="Até" />
                    </div>
                  </div>
                </div>

                <div>
                  <input type="checkbox" />
                  Costumo me conectar ao chat de voz
                </div>

                <footer>
                  <button>Cancelar</button>
                  <button type="submit">
                    <GameController />
                    Encontrar duo
                  </button>
                </footer>
              </form>
            </Dialog.Content>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App;
