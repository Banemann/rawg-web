import { Card, CardBody, Heading, Image } from "@chakra-ui/react";

export interface Game {
  id: number;
  name: string;
  background_image?: string;
}

interface Props {
  game: Game;
}

export const GameCard = ({ game }: Props) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      <Image src={game.background_image || ""} alt="Game Image" />
      <CardBody>
        <Heading fontSize="2xl">{game.name}</Heading>
      </CardBody>
    </Card>
  );
};

