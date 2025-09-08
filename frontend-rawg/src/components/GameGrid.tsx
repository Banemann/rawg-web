
import { Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import type { Game } from "../hooks/useGames";
import { GameCard } from "./GameCard";

export const GameGrid = () => {
  const [games, error] = useGames();

  return (
    <div>
      {error && <Text color="red.500">{error}</Text>}
      <ul>
        {games.map((game: Game) => (
          <li key={game.id}>
            <GameCard game={game} />
          </li>
        ))}
      </ul>
    </div>
  );
};
