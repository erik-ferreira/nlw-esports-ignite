import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check, GameController } from "phosphor-react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { api } from "../services/api";

import { Input } from "@components/Form/Input";

interface Game {
  id: string;
  title: string;
}

const weekDaysDefault = [
  {
    value: "0",
    title: "Domingo",
    label: "D",
  },
  {
    value: "1",
    title: "Segunda",
    label: "S",
  },
  {
    value: "2",
    title: "Terça",
    label: "T",
  },
  {
    value: "3",
    title: "Quarta",
    label: "Q",
  },
  {
    value: "4",
    title: "Quinta",
    label: "Q",
  },
  {
    value: "5",
    title: "Sexta",
    label: "S",
  },
  {
    value: "6",
    title: "Sábado",
    label: "S",
  },
];

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      const { status } = await api.post(`/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel,
      });

      if (status === 201) {
        toast.success("Anúncio criado com sucesso!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Não foi possível criar o anúncio!");
    }
  }

  async function getListGames() {
    const response = await api.get<Game[]>("/games");

    setGames(response.data);
  }

  useEffect(() => {
    getListGames();
  }, []);

  return (
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

        <form className="mt-8 flex flex-col gap-4" onSubmit={handleCreateAd}>
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <select
              id="game"
              name="game"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
              defaultValue="0"
            >
              <option disabled value="0">
                Selecione o game que deseja jogar
              </option>

              {games.map((game) => (
                <option value={game.id} key={game.id}>
                  {game.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              id="name"
              name="name"
              placeholder="Como te chamam dentro do game?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
              <Input
                type="number"
                id="yearsPlaying"
                name="yearsPlaying"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu discord?</label>
              <Input
                type="text"
                id="discord"
                name="discord"
                placeholder="Usuário#0000"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costumo jogar</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                {weekDaysDefault.map((day) => (
                  <ToggleGroup.Item
                    key={day.value}
                    value={day.value}
                    title={day.title}
                    className={`w-8 h-8 rounded  ${
                      weekDays.includes(day.value)
                        ? "bg-violet-400"
                        : "bg-zinc-900"
                    }`}
                  >
                    {day.label}
                  </ToggleGroup.Item>
                ))}
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="time"
                  id="hourStart"
                  name="hourStart"
                  placeholder="De"
                />
                <Input
                  type="time"
                  id="hourEnd"
                  name="hourEnd"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex gap-2 text-sm items-center">
            <Checkbox.Root
              className="w-6 h-6 p-1 rounded bg-zinc-900"
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (
                  checked !== "indeterminate" &&
                  typeof checked === "boolean"
                ) {
                  setUseVoiceChannel(checked);
                }
              }}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController className="w-6 h-6" />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
