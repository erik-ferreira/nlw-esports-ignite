import { SelectHTMLAttributes } from "react";

interface Game {
  id: string;
  title: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  games: Game[];
}

export function Select({ games, ...rest }: SelectProps) {
  return (
    <select
      className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
      {...rest}
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
  );
}
