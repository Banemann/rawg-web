
import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import type { Game } from "../hooks/useGames";
import { GameCard } from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";

export const GameGrid = () => {
  const { games, error, isLoading } = useGames();

  const skeletons = [...Array(10).keys()];

  return (
    <div>
      {error && <Text color="red.500">{error}</Text>}
      <SimpleGrid columns={{ sm: 2, md: 2, lg: 3, xl: 4 }} spacing={4} padding={2}>

        {isLoading && skeletons.map((skeleton) => (
          <GameCardContainer key={skeleton}>
            <GameCardSkeleton />
          </GameCardContainer>
        ))}

        {games.map((game: Game) => (
          <GameCardContainer key={game.id}>
            <GameCard game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </div>
  );
};